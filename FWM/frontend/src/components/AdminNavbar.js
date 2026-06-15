import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function AdminNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>Food Waste Management</h2>

      <div className="nav-links">
        <Link to="/donations">Donations</Link>
        <Link to="/add-donation">Add Donation</Link>
        <Link to="/food-requests">Food Requests</Link>
        <Link to="/emergency">Emergency</Link>
        <Link to="/my-donations">My Donations</Link>

        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}