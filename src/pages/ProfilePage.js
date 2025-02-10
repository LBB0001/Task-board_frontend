import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ProfilePage.css";

function ProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  
  const userId = localStorage.getItem("userId"); 

  
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/${userId}`);
      setName(response.data.name);
      setEmail(response.data.email);
      setPreview(response.data.profilePic);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch(`http://localhost:5000/api/profile/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setName(data.name);
          setProfilePic(data.profilePic);
        } else {
          console.error("Failed to fetch profile:", data.message);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }
    fetchProfile();
  }, []); 

 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreview(URL.createObjectURL(file)); 
  };

  
  const handleSave = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/users/${userId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Profile updated successfully!");
      setPreview(response.data.profilePic); 
      fetchProfile(); 
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Profile update failed.");
    }
    setLoading(false);
  };

  return (
    <div className="profile-sidebar">
      <h3>Profile</h3>
      <div className="profile-section">
        <label>Email:</label>
        <input type="email" value={email} disabled />
      </div>
      <div className="profile-section">
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="profile-section">
        <label>Profile Picture:</label>
        <input type="file" onChange={handleFileChange} />
        {preview && <img src={preview} alt="Profile" className="profile-pic" />}
      </div>
      <button onClick={handleSave} className="save-button" disabled={loading}>
        {loading ? "Saving..." : "Save"}
      </button>
    </div>
  );
}

export default ProfilePage;
