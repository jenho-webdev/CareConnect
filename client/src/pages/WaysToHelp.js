import React from 'react';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const WaysToHelp = () => {
    useEffect(() => {
        document.title = 'CareConnect | WaysToHelp';
    }, []);

    return (
        <div>
            <Navbar />
            <Footer />
        </div>
    );
};

export default WaysToHelp;