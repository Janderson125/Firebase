import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { getUser, updateUser, deleteUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [profile, setProfile] = useState<{ name?: string; address?: string; email?: string }>({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      navigate("/login");
      return;
    }
    loadProfile(user.uid);
  }, []);

  const loadProfile = async (uid: string) => {
    const data = await getUser(uid);
    setProfile(data || {});
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    const user = auth.currentUser;
    if (!user) return;
    await updateUser(user.uid, profile);
    alert("Profile updated");
  };

  const handleDelete = async () => {
    const user = auth.currentUser;
    if (!user) return;
    await deleteUser(user.uid);
    await auth.currentUser?.delete();
    alert("Account deleted");
    navigate("/register");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h1>Your Profile</h1>
      <p>Email: {profile.email}</p>
      <input name="name" value={profile.name || ""} onChange={handleChange} placeholder="Name" />
      <input name="address" value={profile.address || ""} onChange={handleChange} placeholder="Address" />
      <div>
        <button onClick={handleUpdate}>Update Profile</button>
        <button className="delete-btn" onClick={handleDelete}>
          Delete Account
        </button>
      </div>
    </div>
  );
}
