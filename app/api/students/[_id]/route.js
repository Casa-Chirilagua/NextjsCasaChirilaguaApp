import connectDB from "@/config/database";
import Student from "@/app/models/Student";
import Parent from "@/app/models/Parent";
import Program from "@/app/models/Program";
import Family from "@/app/models/Family";

/*
    @route GET api/students/:id
    @desc Get student by id
    @access Public
*/
export const GET = async (request, { params }) => {
  try {
    await connectDB();
    console.log("HERE");
    const students = await Student.findById(params._id);

    if (!students) {
      return new Response({ msg: "Student not found" }, { status: 404 });
    }

    return new Response(JSON.stringify(students), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("GET request failed", { status: 500 });
  }
};

/**
 * Update student information
 *
 * @route PATCH api/students/:id
 * @desc Update student information
 * @access Public
 */
export const PATCH = async (request, { params }) => {
  await connectDB();

  const body = await request.json();
  const updateOptions = { $set: {} };

  for (const [key, value] of Object.entries(body)) {
    if (["parents", "programs"].includes(key) && Array.isArray(value)) {
      updateOptions["$addToSet"] = { [key]: { $each: value } };
    } else if (key.startsWith("remove") && value) {
      const fieldToRemoveFrom = key.replace("remove", "").toLowerCase();
      updateOptions["$pull"] = { [fieldToRemoveFrom]: value };
    } else if (["history", "notes"].includes(key) && Array.isArray(value)) {
      if (!updateOptions["$push"]) updateOptions["$push"] = {};
      updateOptions["$push"][key] = { $each: value };
    } else {
      // Use dot notation for nested objects to update fields within them
      if (key.includes('.')) {
        // For keys that are already using dot notation
        updateOptions.$set[key] = value;
      } else {
        // Assume other fields are top-level and can be set directly
        updateOptions.$set[key] = value;
      }
    }
  }

  try {
    const student = await Student.findByIdAndUpdate(params._id, updateOptions, { new: true, runValidators: true });

    if (!student) {
      return new Response(JSON.stringify({ status: "fail", message: "Student not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ status: "success", data: student }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ status: "error", message: "Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};

/*
    @route DELETE api/students/:id
    @desc Delete student by ID and remove references from Parent, Program, and Family collections
    @access Public
*/
export const DELETE = async (request, { params }) => {
  await connectDB();

  try {
    const studentId = params._id;

    // First, find and delete the student
    const deletedStudent = await Student.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return new Response(
        JSON.stringify({
          status: "fail",
          message: "Student not found",
        }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Then, remove references to the student in other collections
    await Promise.all([
      Parent.updateMany({}, { $pull: { students: studentId } }),
      Program.updateMany({}, { $pull: { students: studentId } }),
      Family.updateMany({}, { $pull: { students: studentId } }),
    ]);

    // Use a 200 OK response to indicate success and provide a message
    return new Response(
      JSON.stringify({
        status: "success",
        message: "Student successfully deleted",
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
        message: "Server Error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
