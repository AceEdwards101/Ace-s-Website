import React, { useEffect, useState } from "react";
import axios from 'axios';

function User() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3001/api/session`)
      .then(sessionResponse => {
        console.log('Session data:', sessionResponse.data);
        const userId = sessionResponse.data.user_id; // Extract user_id from session
        console.log('User ID from session:', userId);
        
        axios.get(`http://localhost:3001/api/users/${userId}`)
          .then(userResponse => {
            console.log('Fetched user details:', userResponse.data);
            setUser(userResponse.data);
          })
          .catch(error => {
            console.error('Error fetching user details:', error);
          });
      })
      .catch(error => {
        console.error('Error fetching session:', error);
      });
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.first_name} {user.last_name}!</h1>
      <p>Email: {user.email}</p>
      {/* Display other user information here */}
    </div>
  );
}

export default User;