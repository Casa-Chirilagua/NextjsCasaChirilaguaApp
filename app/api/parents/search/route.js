import connectDB from "@/config/database";
import Parent from "@/app/models/Parent";


/**
 * 
 * Searched for students based on search text and is_active
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
        { name: searchTextPattern },
        { first_name: searchTextPattern },
        { middle_name: searchTextPattern },
        { last_name: searchTextPattern },
        { email: searchTextPattern },
        { phone: searchTextPattern },
        { "address.street": searchTextPattern },
        { "address.address_line_2": searchTextPattern },
        { "address.city": searchTextPattern },
        { "address.state": searchTextPattern },
        { "address.zip": searchTextPattern },
      ],
    };

    const parents = await Parent.find(query);
    return new Response(JSON.stringify({ status: "success", parents }));
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};