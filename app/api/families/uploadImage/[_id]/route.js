import connectDB from "@/config/database";
import Family from "@/app/models/Family";
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

    const family = await Family.findByIdAndUpdate(params._id, image, {
      new: true,
      runValidators: true,
    });

    if (!family) {
      return new Response(
        JSON.stringify({ status: "fail", message: "Family not found" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    return new Response(JSON.stringify({ status: "success", data: family }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response("Failed to upload profile image", { status: 500 });
  }
};