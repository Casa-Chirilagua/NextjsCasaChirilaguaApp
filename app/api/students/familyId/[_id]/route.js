import connectDB from "@/config/database";
import Family from "@/app/models/Family";
import Student from "@/app/models/Student";

/*
    @route GET api/students/familyId/:id
    @desc Get students by family id
    @access Public
*/
export const GET = async (request, { params }) => {
    try {
      await connectDB();
      
      // Assuming params._id comes from the URL parameter /familyId/:id
      const family = await Family.findById(params._id).populate('students', [
        'first_name',
        'middle_name',
        'profile_image',
        'last_name',
        'emergency_contact',
      ]);
  
      if (!family) {
        return new Response(JSON.stringify({ msg: "Family not found" }), { status: 404 });
      }
  
      // Assuming you want to return the students, but note the original route logic was to return student.parents
      // Adjust according to your actual data model and requirements
      return new Response(JSON.stringify(family.students), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ msg: "GET request failed" }), { status: 500 });
    }
  };