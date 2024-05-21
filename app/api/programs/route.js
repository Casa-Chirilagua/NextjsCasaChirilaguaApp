import connectDB from "@/config/database";
import Program from "@/app/models/Program";

/*
    @route GET api/programs
    @desc Get all programs
    @access Public
*/
export const GET = async () => {
    try {
      await connectDB();


      const programs = await Program.find({});
  
      return new Response(JSON.stringify(programs));
    } catch (error) {
      //error);
      return new Response("Failed to fetch all programs", { status: 500 });
    }
  };


/**
 * Register new program
 *
 * @route POST api/programs
 * @desc Register new program
 * @access Public
 */
export const POST = async (request) => {
  await connectDB();

  const body = await request.json();

  // TODO: Add your validation logic here.

  const {
    name,
    description,
    start_date,
    end_date,
    cost,
    volunteer_capacity,
    program_capacity,
    student_enrolled,
    when,
    commitment,
    location,
    responsibility,
    additional_notes,
    training,
    students,
  } = body;

  const profile_image = {
    url: 'https://res.cloudinary.com/dwiqo4gbn/image/upload/v1695508566/CasaApp/default_z5hjmp.jpg',
    filename: 'CasaApp/default_z5hjmp',
  };

  try {
    let program = new Program({
      name,
      description,
      start_date,
      end_date,
      cost,
      volunteer_capacity,
      program_capacity,
      student_enrolled,
      when,
      commitment,
      location,
      responsibility,
      additional_notes,
      training,
      students,
      profile_image,
    });

    await program.save();

    return new Response(JSON.stringify({ status: 'success', id: program._id }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error creating new program:', error);
    return new Response(JSON.stringify({ status: 'fail', data: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
