import connectDB from "@/config/database";
import Parent from "@/app/models/Parent";


/**
 * Get all parents
 * 
 * @route GET api/parents
 * @desc Get all parents
 * @access Public
 */
export const GET = async (request) => {
  await connectDB();

  try {
    const page = request.nextUrl.searchParams.get("page") || 1; // Get page number from query string or or set default to 1
    const total = await Parent.countDocuments({});
    const pageSize = await request.nextUrl.searchParams.get("pageSize") || total; // Get page size from query string or set default to 10
    const startIndex = (page - 1) * pageSize; 
    let parents = await Parent.find({}).skip(startIndex).limit(pageSize);


    const results ={
      total,
      parents,
    }

    return new Response(JSON.stringify(results));
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
    const objectName = "Parent";

    if (error.code === 11000) {
      return new Response(
        JSON.stringify({
          status: "fail",
          message: `${objectName} with name ${error.keyValue.name} already exist`,
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
    
    return new Response(JSON.stringify({ status: 'fail',  message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
