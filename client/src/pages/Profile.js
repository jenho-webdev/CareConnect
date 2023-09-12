import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const { username } = useParams();

    useEffect(() => {
        document.title = `CareConnect | ${username}`;
    }, [username]);

    return (
        <div>
        </div>
    );
};

export default Profile;