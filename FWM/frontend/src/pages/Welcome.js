import { useNavigate } from "react-router-dom";
import welcomeImg from "../assets/welcome.png";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>

      {/* Background Image */}
      <img src={welcomeImg} alt="bg" style={styles.bg} />

      {/* Button */}
      <button
        onClick={() => navigate("/auth")}
        style={styles.button}
      >
        Continue
      </button>

    </div>
  );
};

export default Welcome;

// ================= INLINE CSS =================
const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    position: "relative",
    overflow: "hidden",
  },

  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",   // ✅ BEST FIX (no distortion)
    objectPosition: "center",
  },

  button: {
    position: "absolute",
    bottom: "30px",
    right: "30px",
    padding: "12px 22px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    backgroundColor: "#099146",
    color: "white",
    zIndex: 2,
  },
};