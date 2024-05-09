// components/ReaderComponent.js
import React, { useState, useEffect } from 'react';
import { ReactReader } from 'react-reader';
import { useRouter } from 'next/router';

const ReaderComponent = () => {
    const [location, setLocation] = useState(0);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        // Fetch data or perform any action based on the ID
        // For example, you can fetch the book data based on the ID
        // fetchBookData(id);
    }, [id]);

    return (
        <div style={{ height: '100vh' }}>
            <ReactReader
                url={`/books/ebooks/${id}.epub`}
                location={location}
                locationChanged={(epubcfi) => setLocation(epubcfi)}
            />
        </div>
    );
};

export default ReaderComponent;
