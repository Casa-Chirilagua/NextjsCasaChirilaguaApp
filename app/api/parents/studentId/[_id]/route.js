import connectDB from "@/config/database";
import Student from "@/app/models/Student";


/**
 * Fetch parents with student id
 */
export const GET = async (request, { params }) => {
  await connectDB();

  try {
    const student = await Student.findById(params.id).populate('parents', [
      'first_name',
      'middle_name',
      'last_name',
      'email',
      'phone',
      'profile_image',
    ]);

    if (!student) {
      return new Response(JSON.stringify({ status: 'fail', message: 'Failed to fetch parents with student id' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify(student.parents), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ status: 'error', message: 'Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};