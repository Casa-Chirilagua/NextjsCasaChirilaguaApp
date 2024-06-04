import connectDB from "@/config/database";
import Parent from "@/app/models/Parent";
import Family from "@/app/models/Family";
import Student from "@/app/models/Student";

/**
 * Fetch parent by id
 *
 * @route GET api/parents/:id
 * @desc Get parent by id
 * @access Public
 */
export const GET = async (request, { params }) => {
  await connectDB();

  try {
    const parent = await Parent.findById(params._id);

    if (!parent) {
      return new Response(
        JSON.stringify({
          status: "fail",
          msg: "There is no profile for this parent",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(JSON.stringify(parent), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ status: "error", message: "Server Error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};

/**
 * Delete parent by id
 *
 * @route DELETE api/parents/:id
 * @desc Delete parent by id
 * @access Public
 */
export const DELETE = async (request, { params }) => {
  await connectDB();

  try {
    await Parent.findByIdAndDelete(params._id);
    await Family.updateMany(
      { parents: params._id },
      { $pull: { parents: params._id } }
    );
    await Student.updateMany(
      { parents: params._id },
      { $pull: { parents: params._id } }
    );

    return new Response(
        JSON.stringify({
          status: "success",
          message: "Parent successfully deleted",
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        status: "fail",
        message: "Can not update parent's information",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};

/*
 *  PATCH request to update parent's information
 *
 *  @route PATCH api/parents/:id
 *  @desc Update parent's information
 *  @access Public
 */
export const PATCH = async (request, { params }) => {
  await connectDB();

  const body = await request.json();
  const updateOps = { $set: {} };

  // Handling dynamic updates for simple fields and nested fields
  for (const [key, value] of Object.entries(body)) {
    if (key === "students" && Array.isArray(value)) {
      const existingStudents = await Student.find({ _id: { $in: value } });
      if (existingStudents.length !== value.length) {
        return new Response(
          JSON.stringify({
            status: "fail",
            message: "Failed to update parent because one or more students do not exist in the database.",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      updateOps["$addToSet"] = { [key]: { $each: value } };
    } else if (key.startsWith("remove") && value) {
      const fieldToRemoveFrom = key.replace("remove", "").toLowerCase();
      updateOps["$pull"] = { [fieldToRemoveFrom]: value };
    } else if (key === "notes" ) {
      if (!updateOps["$push"]) updateOps["$push"] = {};
      updateOps["$push"][key] = { $each: value };
    } else {
      // Use dot notation for nested objects to update fields within them
      if (key.includes(".")) {
        // For keys that are already using dot notation
        updateOps.$set[key] = value;
      } else {
        // Assume other fields are top-level and can be set directly
        updateOps.$set[key] = value;
      }
    }
  }

  try {
    const parent = await Parent.findByIdAndUpdate(params._id, updateOps, {
      new: true,
      runValidators: true,
    });

    if (!parent) {
      return new Response(
        JSON.stringify({ status: "fail", message: "Parent not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(JSON.stringify({ status: "success", _id: parent._id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);

    return new Response(
      JSON.stringify({ status: "fail", message: error.message}),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
