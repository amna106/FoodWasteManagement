import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function DonorNavbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>Food Waste Management</h2>

      <div className="nav-links">
        <Link to="/add-donation">Add Donation</Link>
        <Link to="/my-donations">My Donations</Link>
        <Link to="/emergency">Emergency</Link>

        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}