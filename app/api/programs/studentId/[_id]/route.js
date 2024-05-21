import connectDB from "@/config/database";
import Student from "@/app/models/Student";

/**
 *  @route GET api/programs/studentId/:id
 *  @desc Get all programs by student id
 *  @access Private
 *
 */
export const GET = async (req, { params }) => {
  try {
    await connectDB();
    console.log('api/programs/studentId/:id');
    console.log(params._id);
    const student = await Student.findById(params._id).populate("programs");

    if (!student) {
      return new Response(
        JSON.stringify({ msg: "No Programs found for this student" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Returning the students as a successful response
    return new Response(JSON.stringify(student.programs), {
      status: 200, // OK status
    });
  } catch (error) {
    console.error(error);

    // Returning a 500 response if an error occurs
    return new Response("Failed to fetch programs with student id", {
      status: 500,
    });
  }
};
