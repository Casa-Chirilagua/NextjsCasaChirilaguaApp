import connectDB from "@/config/database";
import Student from "@/app/models/Student";


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
    const isActive = searchParams.get("is_active");
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
        { school: searchTextPattern },
      ],
      is_active: true,
    };

    //Only check for properties if students is enrolled
    if (isActive && isActive === "false") {
      query.is_active = false;
    }

    const students = await Student.find(query);

    return new Response(JSON.stringify({ status: "success", students }));
  } catch (error) {
    return new Response(error, { status: 500 });
  }
};
