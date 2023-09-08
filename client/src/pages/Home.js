import React, { useEffect } from 'react';

// Components
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        document.title = 'CareConnect';

        // TODO: check if user is logged in
    }, []);

    return (
        <div>
            {loggedIn ? (
                <div>
                <Navbar />
                <main>
                    {/* TODO: Search Form*/}
                    {/* TODO: Filters */}
                    {/* TODO: Results */}
                </main>
                <Footer />
            </div>
            ) : (
                {/* TODO: signed out version */}
            )}
        </div>
    );
};

export default Home;
