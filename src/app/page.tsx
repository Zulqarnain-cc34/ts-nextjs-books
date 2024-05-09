'use client';
import Head from 'next/head';
import React, { useState, useEffect } from 'react';

import BookGrid from '@/app/components/book_grid';
import SearchBasicExample from '@/app/components/search_bar';

import Papa from 'papaparse';

import '@/lib/env';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */
import Logo from '~/svg/Logo.svg';

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {

    const [csvData, setCsvData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const csvFilePath = '/books/author_title.csv';
    // Function to read and parse the CSV file
    const readAndParseCSV = async () => {
        // URL to the CSV file within the public directory
        const csvFilePath = '/books/author_title.csv'; // Path is relative to the public directory

        try {
            // Fetch the CSV file
            const response = await fetch(csvFilePath);

            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch CSV file');
            }

            // Parse CSV data using PapaParse
            const csvData = await response.text();
            const parsedData = Papa.parse(csvData, {
                header: true,
                delimiter: ',',
                complete: function(results:any) {
                    // Set the state with the parsed CSV data
                    results.data.pop()
                    setCsvData(results.data);
                }
            }); // Assuming the first row contains headers

            // Access the parsed data
        } catch (error) {
            console.error('Error reading or parsing CSV:', error);
        }
    }

    useEffect(() => {
        readAndParseCSV();
    }, []); // Empty dependency array ensures the effect runs only once when the component mounts

  const handleFilteredData = (data:any) => {
    setFilteredData(data);
    // You can further process the received data here
  };

    return (
        <main>
            <Head>
                <title>Book Search</title>
            </Head>
            <section className='bg-white'>
                <div className='layout relative flex min-h-screen flex-col py-12'>
                    <SearchBasicExample csvData={csvData} handleFilteredData={handleFilteredData}/>
                    <BookGrid csvData={filteredData.length !== 0 ? filteredData : csvData} />

                    {/*<footer className='absolute bottom-2 text-gray-700'>
                        © {new Date().getFullYear()} By{' '}
                        <UnderlineLink href='https://theodorusclarence.com?ref=tsnextstarter'>
                            Theodorus Clarence
                        </UnderlineLink>
                    </footer>
                    */}
                </div>
            </section>
        </main>
    );
}
