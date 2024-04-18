import connectDB from "@/config/database";
import Family from "@/app/models/Family";


/**
 * Get family by ID
 *
 * @route GET api/familys/:id
 * @desc Get family by ID
 * @access Public
 */
export const GET = async (request, { params }) => {
  await connectDB();

  try {
    const family = await Family.findById(params._id);

    if (!family) {
      return new Response(JSON.stringify({ status: "fail", message: "family not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(family), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error fetching family by ID:', error);
    return new Response(JSON.stringify({ status: "error", message: "Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};


/**
 * Update family information
 *
 * @route PATCH api/families/:id
 * @desc Update family information
 * @access Public
 */
export const PATCH = async (request, { params }) => {
    await connectDB();
  
    const body = await request.json();
    const updateOptions = { $set: {} };
  
    for (const [key, value] of Object.entries(body)) {
      if (["parents", "students"].includes(key) && Array.isArray(value)) {
        // Handles adding to parents and students arrays without duplicates
        updateOptions["$addToSet"] = { [key]: { $each: value } };
      } else if (key.startsWith("remove") && value) {
        // Handles removing from any specified array field
        const fieldToRemoveFrom = key.replace("remove", "").toLowerCase();
        updateOptions["$pull"] = { [fieldToRemoveFrom]: value };
      } else if (["history", "notes"].includes(key) && Array.isArray(value)) {
        // Handles adding complex objects to history and notes arrays
        if (!updateOptions["$push"]) updateOptions["$push"] = {};
        updateOptions["$push"][key] = { $each: value };
      } else {
        // Use dot notation for nested objects to update specific fields within them
        if (key.includes('.')) {
          updateOptions.$set[key] = value;
        } else {
          // Directly set the value for top-level fields
          updateOptions.$set[key] = value;
        }
      }
    }
  
    try {
      const family = await Family.findByIdAndUpdate(params._id, updateOptions, { new: true, runValidators: true });
  
      if (!family) {
        return new Response(JSON.stringify({ status: "fail", message: "Family not found" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }
  
      return new Response(JSON.stringify({ status: "success", data: family }), {
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


/**
 * Delete family by ID
 *
 * @route DELETE api/familys/:id
 * @desc DELETE family by ID
 * @access Public
 */
export const DELETE = async (request, { params }) => {
  await connectDB();

  try {
    const deletedfamily = await Family.findByIdAndDelete(params._id);

    if (!deletedfamily) {
      return new Response(JSON.stringify({ status: "fail", message: "family not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ status: "success", message: "family successfully deleted" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error deleting family:', error);
    return new Response(JSON.stringify({ status: "error", message: "Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
