import connectDB from "@/config/database";
import Parent from "@/app/models/Parent";

/*
    @route GET api/parentId/:id
    @desc Get students by parent id
    @access Public
*/
export const GET = async (req, {params}) => {
  try {
    // Connecting to the database
    await connectDB();
    
    // Fetching the parent and populating the students
    const parent = await Parent.findById(params._id).populate('students', [
      'first_name',
      'middle_name',
      'profile_image',
      'last_name',
      'emergency_contact',
    ]);

    if (!parent || !parent.students) {
      return new Response(JSON.stringify({ msg: 'No students found for this parent' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    // Returning the students as a successful response
    return new Response(JSON.stringify(parent.students), {
      status: 200, // OK status
    });
  } catch (error) {
    console.error(error);
    
    // Returning a 500 response if an error occurs
    return new Response("Failed to fetch students with parent id", {
      status: 500,
    });
  }
};
