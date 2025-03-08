import React, { useEffect, useState } from 'react';
import api from '../api/api';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState('');
  const [socialLinks, setSocialLinks] = useState('');
  const token = localStorage.getItem('token');


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/users/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProfile(res.data);
        setBio(res.data.bio || '');
        setSocialLinks(res.data.social_links || '');
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };
    fetchProfile();
  }, [token]);


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/users/me', { bio, social_links: socialLinks }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setProfile(res.data);
      alert('Profile updated!');
    } catch (error) {
      console.error('Error updating profile', error);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Bio: </strong>{profile.bio || "No bio available"}</p>
      

      <form onSubmit={handleUpdate}>
        <div>
          <h3>Bio</h3>
          <textarea 
            placeholder="Update your bio" 
            value={bio} 
            onChange={e => setBio(e.target.value)} 
          />
        </div>

        <button type="submit">Update Profile</button>
      </form>
    
    </div>
  );
};

export default Profile;
