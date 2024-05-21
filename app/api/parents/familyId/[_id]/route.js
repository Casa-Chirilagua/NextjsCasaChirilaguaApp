import connectDB from "@/config/database";
import Family from "@/app/models/Family";

export const GET = async (request, { params }) => {
  await connectDB();

  try {
    const family = await Family.findById(params._id).populate('parents', [
      // Assuming you want to select specific fields, uncomment and adjust as needed.
      // 'name',
      // 'email',
      // 'phone',
      // 'profile_image',
    ]);

    if (!family) {
      return new Response(JSON.stringify({ status: 'fail', message: 'Family does not exist' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify(family.parents), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ status: 'error', message: 'Failed to fetch parents with family id' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};