import React from 'react';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Journal = () => {
    useEffect(() => {
        document.title = 'CareConnect | Journal';
    }, []);

    return (
        <div>
            <Navbar />
            <Footer />
        </div>
    );
};

export default Journal;