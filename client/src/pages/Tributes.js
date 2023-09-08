import React from 'react';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Tributes = () => {
    useEffect(() => {
        document.title = 'CareConnect | Tributes';
    }, []);

    return (
        <div>
            <Navbar />
            <Footer />
        </div>
    );
};

export default Tributes;