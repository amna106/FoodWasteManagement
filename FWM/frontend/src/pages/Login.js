import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const styles = {
    container: {
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #e9ebf1, #ece6f1)",
    },

    box: {
      backgroundColor: "white",
      padding: "40px",
      width: "350px",
      borderRadius: "15px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
      textAlign: "center",
    },

    heading: {
      marginBottom: "25px",
      color: "#333",
    },

    input: {
      width: "100%",
      padding: "12px",
      margin: "10px 0",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "15px",
    },

    button: {
      width: "100%",
      padding: "12px",
      marginTop: "15px",
      backgroundColor: "#289168",
      color: "white",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      cursor: "pointer",
      fontWeight: "bold",
    },

    link: {
      color: "#289168",
      textDecoration: "none",
      fontWeight: "bold",
    },
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

      switch (res.data.user.role) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "donor":
          navigate("/donor-dashboard");
          break;
        case "receiver":
          navigate("/receiver-dashboard");
          break;
        default:
          navigate("/dashboard");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>

        <h1 style={styles.heading}>Login</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="donor">Donor</option>
            <option value="receiver">Receiver</option>
          </select>

          <button type="submit" style={styles.button}>
            Login
          </button>

        </form>

        <p style={{ marginTop: "15px" }}>
          No account?{" "}
          <Link to="/register" style={styles.link}>
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;