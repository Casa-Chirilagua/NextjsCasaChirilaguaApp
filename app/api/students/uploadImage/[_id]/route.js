import connectDB from "@/config/database";
import Student from "@/app/models/Student";
import cloudinary from "@/config/cloudinary";

export const PATCH = async (request, {params}) => {
  try {
    await connectDB();
    const formData = await request.formData();
    const profile_image = formData.get("profile_image");
    const imageBuffer = await profile_image.arrayBuffer();
    const imageArray = new Uint8Array(imageBuffer);
    const imageData = Buffer.from(imageArray);
    const imageBase64 = imageData.toString("base64");
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      { folder: "CasaApp" }
    );

    const image = {
      profile_image: { url: result.secure_url, public_id: result.public_id, filename: profile_image.name},
    };

    const student = await Student.findByIdAndUpdate(params._id, image, {
      new: true,
      runValidators: true,
    });

    if (!student) {
      return new Response(
        JSON.stringify({ status: "fail", message: "Student not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(JSON.stringify({ status: "success", data: student.profile_image }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log(error);
    return new Response(error.message, { status: 500 });
  }
};
