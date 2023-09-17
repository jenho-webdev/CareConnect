import React, { useEffect } from 'react';

// Components
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
    useEffect(() => {
        document.title = 'CareConnect';
    }, []);

    return (
        <div>
            <Header />
            <main>
                <h1>Home</h1>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
