import connectDB from "@/config/database";
import Program from "@/app/models/Program";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const { id } = req.query;
      const program = await Program.findById(id).populate("students", [
        "first_name",
        "middle_name",
        "profile_image",
        "last_name",
        "emergency_contact",
      ]);

      res.status(200).json(program.students);
    } catch (error) {
      res.status(500).send("Failed to fetch students with program id");
    }
  } else {
    // Optionally handle other HTTP methods or return a method not allowed status
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
