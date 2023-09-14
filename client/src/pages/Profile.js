import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const { username } = useParams();

    useEffect(() => {
        document.title = `CareConnect | ${username}`;
    }, [username]);

    return (
        <div>
            {/* TODO: 
                User profile page
            */}
        </div>
    );
};

export default Profile;