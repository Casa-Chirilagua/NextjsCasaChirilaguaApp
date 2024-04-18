
import connectDB from "@/config/database";
import Program from "@/app/models/Program";


/*
    Get the students by the program ID

    @route GET api/students/programId/[id]
    @desc Get students by program id
    @access Public
*/
export const GET = async (req, {params}) => {
    try {
      console.log("GET students by program ID");
      // Connecting to the database
      await connectDB();

      // Fetching the program and populating the students
      const program = await Program.findById(params._id).populate('students', [
        'first_name',
        'middle_name',
        'profile_image',
        'last_name',
        'emergency_contact',
      ]);
  
      // If no program is found, or it has no students, return a 404 response
      if (!program || !program.students || program.students.length === 0) {
        return new Response(JSON.stringify({ msg: 'No students found for this program' }), {
          status: 404,
        });
      }
      
      // Returning the students as a successful response
      return new Response(JSON.stringify(program.students), {
        status: 200, // OK status
      });
    } catch (error) {
      // Logging the error to the server console
      console.error(error);
      
      // Returning a 500 response if an error occurs
      return new Response("Failed to fetch students with program id", {
        status: 500,
      });
    }
  };