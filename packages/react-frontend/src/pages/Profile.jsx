import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    displayName: "",
    bio: "",
    email: "",
    phone: "",
    profilePic: "",
  });

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch("http://localhost:8000/users/details", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:8000/users/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedUser),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser.user);
        setIsEditing(false);
        // Show success message or notification
        alert("Profile updated successfully!");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  useEffect(() => {
    if (user) {
      setEditedUser({
        displayName: user.displayName || user.name,
        bio: user.bio || "",
        email: user.email || "",
        phone: user.phone || "",
        profilePic: user.profilePic || "",
      });
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px", color: "white" }}>
        <h2>Please log in to view your profile</h2>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "20px", color: "white" }}>
      <h1>{user.displayName || user.name}</h1>
      {!isEditing ? (
        <>
          <img
            src={user.profilePic || "https://via.placeholder.com/150"}
            alt="Profile"
            style={{
              borderRadius: "50%",
              width: "150px",
              height: "150px",
              border: "2px solid white",
            }}
          />
          <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
            <p><strong>Bio:</strong> {user.bio || "No bio available"}</p>
            <p><strong>Email:</strong> {user.email || "No email available"}</p>
            <p><strong>Phone:</strong> {user.phone || "No phone number available"}</p>
            <Button
              variant="contained"
              onClick={() => setIsEditing(true)}
              sx={{ mt: 2 }}
            >
              Edit Profile
            </Button>
          </div>
        </>
      ) : (
        <Box sx={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
          <TextField
            fullWidth
            label="Display Name"
            value={editedUser.displayName}
            onChange={(e) => setEditedUser({ ...editedUser, displayName: e.target.value })}
            sx={{ mb: 2, bgcolor: "white" }}
          />
          <TextField
            fullWidth
            label="Bio"
            value={editedUser.bio}
            onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
            multiline
            rows={4}
            sx={{ mb: 2, bgcolor: "white" }}
          />
          <TextField
            fullWidth
            label="Email"
            value={editedUser.email}
            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
            sx={{ mb: 2, bgcolor: "white" }}
          />
          <TextField
            fullWidth
            label="Phone"
            value={editedUser.phone}
            onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
            sx={{ mb: 2, bgcolor: "white" }}
          />
          <TextField
            fullWidth
            label="Profile Picture URL"
            value={editedUser.profilePic}
            onChange={(e) => setEditedUser({ ...editedUser, profilePic: e.target.value })}
            sx={{ mb: 2, bgcolor: "white" }}
          />
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleUpdateProfile}
              sx={{ mr: 2 }}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              onClick={() => setIsEditing(false)}
              sx={{ color: "white", borderColor: "white" }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Profile;
