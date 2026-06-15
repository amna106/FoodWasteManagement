import { Link } from "react-router-dom";
import welcomeImage from "../assets/auth.jpg"; // image ka path set karein

export default function Auth() {
  const styles = {
    welcome: {
      height: "100vh",
      width: "100vw",
      backgroundImage: `url(${welcomeImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    box: {
      backgroundColor: "rgba(255, 255, 255, 0.85)",
      padding: "40px",
      borderRadius: "15px",
      textAlign: "center",
      boxShadow: "0 5px 20px rgba(0,0,0,0.4)",
    },

    heading: {
      fontSize: "36px",
      marginBottom: "10px",
      color: "#333",
    },

    text: {
      marginBottom: "25px",
      color: "#555",
      fontSize: "18px",
    },

    buttons: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
    },

    button: {
      textDecoration: "none",
      backgroundColor: "#218169",
      color: "white",
      padding: "12px 30px",
      borderRadius: "8px",
      fontWeight: "bold",
      fontSize: "16px",
    },
  };

  return (
    <div style={styles.welcome}>
      <div style={styles.box}>
        <h1 style={styles.heading}>Welcome</h1>

        <p style={styles.text}>
          Choose an option to continue
        </p>

        <div style={styles.buttons}>
          <Link to="/login" style={styles.button}>
            Login
          </Link>

          <Link to="/register" style={styles.button}>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}