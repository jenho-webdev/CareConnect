import React from 'react';

const Settings = () => {
    useEffect(() => {
        document.title = 'CareConnect | Settings';
    }, []);

    return (
        <div>
            <h1>Settings</h1>
        </div>
    );
};

export default Settings;