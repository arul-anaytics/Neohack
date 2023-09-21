
import React from 'react';

const UserProfile = ({ userData }) => (
    <div className="t-text-black t-font-medium t-relative t-flex t-gap-20 t-flex-col t-justify-center t-items-center">
        <div id='user_profile' className="t-w-[110px] t-h-[110px] t-relative t-border-4 t-border-white t-outline-2 t-outline t-outline-blue-400 t-overflow-hidden t-border-solid t-bg-blue-400 t-rounded-full">
            <img src="../src/assets/userProfile.jpg" alt="User Profile" />
        </div>
        <div className='t-w-30 t-flex t-justify-center t-items-center t-h-30 t-rounded-full t-bg-primary t-text-white t-font-medium t-absolute t-left-[58%] t-top-[73px]'>2</div>
        <span>{userData.name}</span>
        <span>{userData.email}</span>
    </div>
);

export default UserProfile;
