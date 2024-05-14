import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react"; // Import useState hook


const Pagination = ({ page, pageSize, totalItems, onPageChange, onPageSizeChange, itemName }) => {
    const totalPages = Math.ceil(totalItems / pageSize);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    }

    const handlePageSizeChange = (event) => {
        const newSize = parseInt(event.target.value);
        onPageSizeChange(newSize);
    }

    const pageSizeOptions = [5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000].filter(option => option <= 2*totalItems );

    return (
        <section className='mx-8 flex  items-center font-medium p-4 justify-between text-lg'>
            <div className="flex justify-center items-center flex-row">
                <span>{itemName} per page              
                <select className='p-3 border border-gray-300 mx-2' value={pageSize} onChange={handlePageSizeChange}>
                    {pageSizeOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>{page}-{page + pageSize - 1} of {totalItems}</span>
            </div>
            <div className="flex justify-center items-center flex-row">
                <button className="mr-2 p-3 border border-gray-300 rounded flex flex-row items-center justify-items-center gap-1 " disabled={page === 1} onClick={() => handlePageChange(page - 1)}><IoIosArrowBack /> Previous </button>
                <span>Page {page} of {totalPages}</span>
                <button className="ml-2 p-3 border border-gray-300 rounded flex flex-row items-center justify-items-center gap-1" disabled={page === totalPages} onClick={() => handlePageChange(page + 1)}>Next <IoIosArrowForward /></button>
            </div>
        </section>
    )
}

export default Pagination;