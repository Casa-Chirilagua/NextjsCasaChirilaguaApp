import connectDB from "@/config/database";
import Student from "@/app/models/Student";

/*
    @route GET api/students/names
    @desc Get names of all students
    @access Public
*/
export const GET = async () => {
  try {
    await connectDB();

    const students = await Student.find({}).select(
      "first_name middle_name last_name"
    );

    return new Response(JSON.stringify(students), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Cannot retrieve students" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
