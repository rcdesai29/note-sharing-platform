import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [user, setUser] = useState({ username: '', email: '' });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('/api/users/profile');
        console.log('Response Status:', response.status); // Log the response status

        if (response.ok) {
          try {
            const userData = await response.json(); // Parse the JSON data directly
            setUser(userData);
          } catch (jsonError) {
            console.error('Error parsing JSON:', jsonError);
          }
        } else {
          const responseText = await response.text(); // Get the response text
          console.error('Error fetching profile:', responseText);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>Email: {user.email}</p>
      {/* Add more user details here */}
    </div>
  );
};

export default Profile;