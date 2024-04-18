import connectDB from "@/config/database";
import Student from "@/app/models/Student";

/*
    @route PATCH api/students/:id
    @desc Update student by ID
    @access Public
*/
export const PATCH = async (request, { params }) => {
  await connectDB();

  const body = await request.json(); // Assuming this is how you're parsing the request body.
  const { history, ...updateFields } = body; // Destructure the request body to separate history.

  // Ensure history is provided
  if (!history) {
    return new Response(JSON.stringify({ status: 'fail', msg: 'History entry is required' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const student = await Student.findOneAndUpdate(
      { _id: params._id },
      {
        $set: updateFields, // Update the student with the user-provided fields
        $push: { history: history }, // Append the user-provided history to the history array
      },
      { new: true, runValidators: true },
    );

    if (!student) {
      return new Response(JSON.stringify({ status: 'fail', msg: 'Student not found' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    return new Response(JSON.stringify({ status: 'success', data: student }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ status: 'error', msg: 'Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
};