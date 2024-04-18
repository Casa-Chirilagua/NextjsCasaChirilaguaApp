import connectDB from "@/config/database";
import Parent from "@/app/models/Parent";

export const GET = async () => {
  await connectDB();

  try {
    const parents = await Parent.find({}).select('first_name middle_name last_name');

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