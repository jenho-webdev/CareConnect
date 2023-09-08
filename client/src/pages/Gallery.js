import React from 'react';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Gallery = () => {
    useEffect(() => {
        document.title = 'CareConnect | Gallery';
    }, []);

    return (
        <div>
            <Navbar />
            <Footer />
        </div>
    );
};

export default Gallery;