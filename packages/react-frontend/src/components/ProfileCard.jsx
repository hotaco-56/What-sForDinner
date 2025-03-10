import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";

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
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Location: {user.location}</p>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
