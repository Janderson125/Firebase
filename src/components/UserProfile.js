// src/components/UserProfile.js
import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { fetchUserData, updateUserProfile, deleteUserData } from '../firebaseServices';

function UserProfile() {
  const auth = getAuth();
  const user = auth.currentUser;

  const [profile, setProfile] = useState({ name: '', address: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserData(user.uid).then((data) => {
        if (data) setProfile({ name: data.name, address: data.address });
        setLoading(false);
      });
    }
  }, [user]);

  const handleUpdate = async () => {
    if (user) {
      await updateUserProfile(user.uid, profile);
      alert('Profile updated!');
    }
  };

  const handleDelete = async () => {
    if (user) {
      await deleteUserData(user.uid);
      alert('User data deleted.');
      // Optionally sign out user here
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <input
        placeholder="Name"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
      />
      <input
        placeholder="Address"
        value={profile.address}
        onChange={(e) => setProfile({ ...profile, address: e.target.value })}
      />
      <button onClick={handleUpdate}>Update Profile</button>
      <button onClick={handleDelete}>Delete Account Data</button>
    </div>
  );
}

export default UserProfile;