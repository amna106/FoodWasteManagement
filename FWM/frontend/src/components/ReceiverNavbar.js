import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function ReceiverNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>Food Waste Management</h2>

      <div className="nav-links">
        <Link to="/donations">Available Donations</Link>
        <Link to="/food-requests">My Requests</Link>
        <Link to="/emergency">Emergency</Link>

        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}