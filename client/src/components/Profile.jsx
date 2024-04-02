import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${props.match.params.id}`);
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, [props.match.params.id]);

  return (
    <div>
      {user ? (
        <div>
          <h2>{user.first_name} {user.last_name}</h2>
          <p>Email: {user.email}</p>
          <p>Gender: {user.gender}</p>
          <p>Domain: {user.domain}</p>
          <p>Available: {user.available ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
