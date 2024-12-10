import React, { useState } from 'react';

const Profile = () => {
  const [user] = useState(null);

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>Email: {user.email}</p>
      {/* Add more user details here */}
    </div>
  );
};

export default Profile;