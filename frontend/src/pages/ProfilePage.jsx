import { useAuth } from "../Context/useAuth";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex justify-center mt-20">
        <p className="text-red-500 text-lg">You are not logged in.</p>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex justify-center bg-gray-100 mt-12">
      <div className="max-w-md w-full p-6 bg-white shadow-lg rounded-2xl text-center">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>
        <p className="mb-2">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="mb-4">
          <strong>Email:</strong> {user.email}
        </p>
        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
