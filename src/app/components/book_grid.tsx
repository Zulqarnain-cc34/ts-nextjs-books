import React, { useState  } from 'react';

import '@/styles/colors.css';

export default function BookGrid({ csvData }) {

    const itemsPerPage = 15; // Number of items to display per page

    const [currentPage, setCurrentPage] = useState(1); // Current page number
    const handleClick = (book) => {
        const bookUrl = `/books/ebooks/${book["Epub.No"]}.epub`;
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = bookUrl;
        link.setAttribute('download', ''); // This sets the download attribute to force download
        document.body.appendChild(link);
        link.click(); // Simulate click on the link
        document.body.removeChild(link); // Clean up after download
    };


    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, csvData.length);

    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                {/* Map over csvData to render each book */}
                {csvData.slice(startIndex, endIndex).map((book, index) => (
                    <button
                        key={index}
                        className="border border-gray-400 lg:border-l lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-l lg:rounded-r p-4 flex flex-col leading-normal text-left h-1000 hover:bg-blue-300"
                        onClick={() => handleClick(book)}>
                        <h2 className="text-gray-900 font-bold text-base overflow-hidden truncate w-full hover:overflow-visible hover:text-wrap">{book["Title"]}</h2>
                        <div className="flex space-x-4 ">
                            <p className="text-gray-700 text-sm">Author: </p>
                            <p className="text-gray-700 text-sm">{book["Author"]}</p>
                        </div>

                    </button>
                ))}
            </div>
            {/* Pagination controls */}
            <div className="flex justify-center mt-4">
                <button
                    className="bg-gray-300 hover:bg-blue-400 py-1 px-4 rounded"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}>
                    Previous
                </button>
                <p className="mx-4">Page {currentPage}</p>
                <button
                    className="bg-gray-300 hover:bg-blue-400 py-1 px-4 rounded"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={endIndex >= csvData.length}>
                    Next
                </button>
            </div>
        </>
    );
}
