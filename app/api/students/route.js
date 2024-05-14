import connectDB from "@/config/database";
import Student from "@/app/models/Student";

/*
    @route GET api/students
    @desc Get all students
    @access Public
*/
export const GET = async () => {
  try {
    await connectDB();
    const students = await Student.find({});

    return new Response(JSON.stringify(students));
  } catch (error) {
    console.log(error);
    return new Response("GET request failed", { status: 500 });
  }
};

/*
    @route POST api/students
    @desc Register Student
    @access Public
*/
export const POST = async (request) => {
  await connectDB();

  const body = await request.json(); // Assuming JSON payload
  const {
    name,
    first_name,
    middle_name,
    last_name,
    date_of_birth,
    email,
    phone,
    address,
    school,
    grade,
    free_and_reduced_lunch,
    date_created,
    enrollment_date,
    description,
    gender,
    has_mentor,
    enrolled,
    reading_level,
    emergency_contact,
    medical_information,
    health_care,
    parents,
    family,
    programs,
  } = body;

  const profile_image = {
    url: "https://res.cloudinary.com/dwiqo4gbn/image/upload/v1695508566/CasaApp/default_z5hjmp.jpg",
    filename: "CasaApp/default_z5hjmp",
  };

  try {
    let student = new Student({
      name,
      first_name,
      middle_name,
      last_name,
      date_of_birth,
      email,
      phone,
      address,
      school,
      grade,
      free_and_reduced_lunch,
      date_created,
      enrollment_date,
      description,
      gender,
      has_mentor,
      enrolled,
      reading_level,
      emergency_contact,
      medical_information,
      health_care,
      parents,
      family,
      programs,
      profile_image,
    });

    await student.save();

    return new Response(JSON.stringify({ status: "success", _id: student._id}), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ status: "fail", message: error.toString() }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
