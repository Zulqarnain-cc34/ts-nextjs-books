import React, { useState, useEffect } from 'react';
import { TERipple } from 'tw-elements-react';

function trimString(s: string): string {
    let l = 0, r = s.length - 1;
    while (l < s.length && s[l] === ' ') l++;
    while (r > l && s[r] === ' ') r -= 1;
    return s.substring(l, r + 1);
}

function compareObjects<T>(o1: T, o2: T): boolean {
    let k: keyof T;
    for (k in o1) if (o1[k] !== o2[k]) return false;
    for (k in o2) if (o1[k] !== o2[k]) return false;
    return true;
}

function itemExists<T>(haystack: T[], needle: T): boolean {
    for (let i = 0; i < haystack.length; i++) if (compareObjects(haystack[i], needle)) return true;
    return false;
}

function searchFor<T extends Record<string, string>>(booksDetail: T[], toSearch: string): T[] {
    const results: T[] = [];
    toSearch = trimString(toSearch); // trim it
    for (let i = 0; i < booksDetail.length; i++) {
        for (const key in booksDetail[i]) {
            if (booksDetail[i][key].indexOf(toSearch) !== -1) {
                if (!itemExists(results, booksDetail[i])) results.push(booksDetail[i]);
            }
        }
    }
    return results;
}

interface Book {
    [key: string]: any; // You can refine this to include specific fields, if known.
}

interface Props {
    csvData: Book[];
    handleFilteredData: any;
}

export default function SearchBasicExample({ csvData, handleFilteredData }: Props): JSX.Element {

    // State to manage the value of the input
    const [searchText, setSearchText] = useState('');

    // Event handler to update the search text
    const handleInputChange = (event: any) => {
        setSearchText(event.target.value);
    };

    // Event handler to trigger the search when the button is clicked
    const handleClick = () => {
        handleFilteredData((searchFor(csvData, searchText)));
    };


    // Log csvData whenever it changes
    //useEffect(() => {
    //    console.log(csvData);
    //}, [csvData]);

    return (
        <div className="mb-3 md:w-full">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <input
                    type="search"
                    className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] t4xt-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="button-addon1"
                    value={searchText} // Bind value to state
                    onChange={handleInputChange} // Handle input change
                />

                {/* <!--Search button--> */}
                <TERipple color='light'>
                    <button
                        className="relative z-[2] flex items-center rounded-r bg-primary-400 px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-primary-800 active:shadow-lg"
                        type="button"
                        id="button-addon1"
                        onClick={handleClick}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5">
                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                </TERipple>
            </div>
        </div>
    );
}

