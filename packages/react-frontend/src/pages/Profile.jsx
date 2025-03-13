import { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";

const Profile = () => {
  const [user, setUser] = useState(null);

  const fetchUser = () => {
    const promise = fetch(
      "http://localhost:8000/users/67d1ffc9ff5e6d6ff11fb423",
    );
    return promise;
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
      <ProfileCard user={user} />
    </div>
  );
};

export default Profile;
