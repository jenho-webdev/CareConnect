import React, { useEffect } from 'react';

const Dashboard = () => {
    useEffect(() => {
        document.title = 'CareConnect | My Dashboard';
    }, []);

    return (
        <div>
            {/* TODO: 
                Dashboard with lists of offers and requests
            */}
        </div>
    );
};

export default Dashboard;