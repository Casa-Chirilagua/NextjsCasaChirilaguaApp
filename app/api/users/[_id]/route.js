import connectDB from "@/config/database";
import User from "@/app/models/User";

/**
 * Update user information
 *
 * @route PATCH api/users/:id
 * @desc Update user information
 * @access Public
 */
export const PATCH = async (request, { params }) => {
  await connectDB();

  const body = await request.json();
  const updateOptions = { $set: {} };

  // Handling dynamic updates for fields
  for (const [key, value] of Object.entries(body)) {
    // For nested objects like 'picture', use dot notation to update specific fields
    if (typeof value === "object" && !Array.isArray(value) && value !== null) {
      for (const [subKey, subValue] of Object.entries(value)) {
        updateOptions.$set[`${key}.${subKey}`] = subValue;
      }
    } else {
      // Directly set the value for top-level fields
      updateOptions.$set[key] = value;
    }
  }

  try {
    const user = await User.findByIdAndUpdate(params.id, updateOptions, { new: true, runValidators: true });

    if (!user) {
      return new Response(JSON.stringify({ status: "fail", message: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ status: "success", data: user }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ status: "error", message: "Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
