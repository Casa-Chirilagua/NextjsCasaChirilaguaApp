import connectDB from "@/config/database";
import Parent from "@/app/models/Parent";


/**
 * Get all parents
 * 
 * @route GET api/parents
 * @desc Get all parents
 * @access Public
 */
export const GET = async () => {
  await connectDB();

  try {
    const parents = await Parent.find();

    return new Response(JSON.stringify(parents), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ status: 'fail', message: 'Cannot retrieve parents' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};


/**
 * 
 * @route POST api/parents
 * @desc Create a parent
 * @access Public
 */
export const POST = async (request) => {
  await connectDB();

  const body = await request.json();

  try {
    let parent = new Parent({
      ...body,
      profile_image: {
        url: 'https://res.cloudinary.com/dwiqo4gbn/image/upload/v1695508566/CasaApp/default_z5hjmp.jpg',
        filename: 'CasaApp/default_z5hjmp',
      }
    });

    await parent.save();

    return new Response(JSON.stringify({ status: 'success', parent_id: parent._id }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ status: 'fail', message: error.toString() }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
