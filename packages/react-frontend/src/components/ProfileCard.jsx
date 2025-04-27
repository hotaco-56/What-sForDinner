import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import LocationPicker from "./LocationPicker";

const ProfileCard = ({ user }) => {
  if (!user) {
    return <p>Loading profile...</p>;
  }
  return (
    <Card
      sx={{
        maxWidth: 400,
        borderRadius: "16px",
        boxShadow: 3,
        padding: 2,
        textAlign: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <CardHeader
        title={user.name}
        sx={{ fontWeight: "bold", textTransform: "uppercase", mt: 2 }}
      />
      <CardContent>
        <img src={user.profilePic} alt="Profile Picture" />
        <p>Bio: {user.bio}</p>
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <LocationPicker token={localStorage.getItem("token")} />
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
