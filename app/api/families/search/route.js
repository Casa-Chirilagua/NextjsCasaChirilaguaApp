import connectDB from "@/config/database";
import Family from "@/app/models/Family";


/**
 * 
 * Searched for families based on search text 
 * 
 * @param {*} request 
 * @returns 
 */
export const GET = async (request) => {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get("search");
    const searchTextPattern = new RegExp(searchText, "i");

    //Match location pattern against all fields
    let query = {
      $or: [
        { family_name: searchTextPattern },
        { primary_email: searchTextPattern },
        { primary_phone: searchTextPattern },
        { "primary_address.street": searchTextPattern },
        { "primary_address.address_line_2": searchTextPattern },
        { "primary_address.city": searchTextPattern },
        { "primary_address.state": searchTextPattern },
        { "primary_address.zip": searchTextPattern },
      ],
    };
    const families = await Family.find(query);
    return new Response(JSON.stringify({ status: "success", families }));
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
