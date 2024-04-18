import connectDB from "@/config/database";
import Family from "@/app/models/Family";

/**
 * Get Family by ID
 * 
 * @route GET api/Familys/:id
 * @desc Get Family by ID
 * @access Public
 */
export const GET = async () => {
    try {
      await connectDB();


      const families = await Family.find({});
  
      return new Response(JSON.stringify(families));
    } catch (error) {
      console.log(error);
      return new Response("Failed to fetch all families", { status: 500 });
    }
  };


/**
 * Register new family
 *
 * @route POST api/Familys
 * @desc Register new Family
 * @access Public
 */
export const POST = async (request) => {
  await connectDB();

  const body = await request.json();

  // TODO: Add your validation logic here.

  const {
    family_name,
    primary_address,
    primary_email,
    primary_phone,
    parents,
    students,
  } = body;

  const profile_image = {
    url: 'https://res.cloudinary.com/dwiqo4gbn/image/upload/v1695508566/CasaApp/default_z5hjmp.jpg',
    filename: 'CasaApp/default_z5hjmp',
  };

  try {
    let family = new Family({
        family_name,
        primary_address,
        primary_email,
        primary_phone,
        parents,
        students,
        profile_image,
    });

    await family.save();

    return new Response(JSON.stringify({ status: 'success', id: family._id }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error creating new family:', error);
    return new Response(JSON.stringify({ status: 'fail', data: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
