import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth"; // Ensure correct import
import { logout } from "../../store/authSlice";

export default function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    const success = await authService.logout();  // Ensure logout happens

    if (success) {
      dispatch(logout());  // Update Redux state
    } else {
      console.error("Logout failed");
    }
  };

  return (
    <button 
      className="px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}
