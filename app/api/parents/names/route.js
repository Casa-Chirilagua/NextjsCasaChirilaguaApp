import connectDB from "@/config/database";
import Parent from "@/app/models/Parent";

/*
    @route GET api/students/names
    @desc Get names of all students
    @access Public
*/
export const GET = async () => {
    try {
      await connectDB();
  
      const parents = await Parent.find({}).select(
        "first_name middle_name last_name"
      );
  
      return new Response(JSON.stringify(parents), {
        status: 200,
      });
    } catch (error) {
      console.error(error);
      return new Response(
        JSON.stringify({ message: "Cannot retrieve students" }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  };
  