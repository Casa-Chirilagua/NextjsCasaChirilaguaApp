import connectDB from "@/config/database";
import Program from "@/app/models/Program";
import Student from "@/app/models/Student";

/**
 * Get program by ID
 *
 * @route GET api/programs/:id
 * @desc Get program by ID
 * @access Public
 */
export const GET = async (request, { params }) => {
  await connectDB();

  try {
    const program = await Program.findById(params._id);

    if (!program) {
      return new Response(JSON.stringify({ status: "fail", message: "Program not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(program), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error fetching program by ID:', error);
    return new Response(JSON.stringify({ status: "error", message: "Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};


/**
 * Update program information
 *
 * @route PATCH api/programs/:id
 * @desc Update program information
 * @access Public
 */
export const PATCH = async (request, { params }) => {
  await connectDB();

  const body = await request.json();
  const updateOptions = { $set: {} };

  for (const [key, value] of Object.entries(body)) {
    if (key === "students" && Array.isArray(value)) {
      const existingStudents = await Student.find({ _id: { $in: value } });
      if (existingStudents.length !== value.length) {
        return new Response(
          JSON.stringify({
            status: "fail",
            message: "Failed to update program because one or more students do not exist in the database.",
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
      updateOptions["$addToSet"] = { [key]: { $each: value } };
    } else if (key.startsWith("remove") && value) {
     
      const fieldToRemoveFrom = key.replace("remove", "").toLowerCase();
      updateOptions["$pull"] = { [fieldToRemoveFrom]: value };
    } else if (["history", "notes"].includes(key) && Array.isArray(value)) {
      // Handles adding complex objects to history and notes arrays
      if (!updateOptions["$push"]) updateOptions["$push"] = {};
      updateOptions["$push"][key] = { $each: value };
    } else {
      // Use dot notation for nested objects to update fields within them
      if (key.includes('.')) {
        updateOptions.$set[key] = value;
      } else {
        // Directly set the value for top-level fields
        updateOptions.$set[key] = value;
      }
    }
  }

  try {
    const program = await Program.findByIdAndUpdate(params._id, updateOptions, { new: true, runValidators: true });

    if (!program) {
      return new Response(JSON.stringify({ status: "fail", message: "Program not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ status: "success", data: program }), {
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



/**
 * Delete program by ID
 *
 * @route DELETE api/programs/:id
 * @desc DELETE program by ID
 * @access Public
 */
export const DELETE = async (request, { params }) => {
  await connectDB();

  try {
    const deletedProgram = await Program.findByIdAndDelete(params._id);

    if (!deletedProgram) {
      return new Response(JSON.stringify({ status: "fail", message: "Program not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ status: "success", message: "Program successfully deleted" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error deleting program:', error);
    return new Response(JSON.stringify({ status: "error", message: "Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
