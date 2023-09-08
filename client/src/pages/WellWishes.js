import React from 'react';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const WellWishes = () => {
    useEffect(() => {
        document.title = 'CareConnect | WellWishes';
    }, []);

    return (
        <div>
            <Navbar />
            <Footer />
        </div>
    );
};

export default WellWishes;