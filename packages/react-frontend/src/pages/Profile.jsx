import { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";


const Profile = () => {
  const [user, setUser] = useState(null);

  const fetchUser = () => {
    const token = localStorage.getItem("token");
    return fetch("http://localhost:8000/users/current", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  useEffect(() => {
    fetchUser()
      .then((res) => res.json())
      .then((json) => setUser(json))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {user ? (
        <>
          <ProfileCard user={user} />
        </>
      ) : (
        <p style={{ color: "red", fontSize: "18px" }}>
          Please log in to view your profile.
        </p>
      )}
    </div>
  );
};

export default Profile;
