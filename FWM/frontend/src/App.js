import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

/* Pages */
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Auth from "./pages/Auth";

/* Dashboards */
import DonorDashboard from "./pages/DonorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ReceiverDashboard from "./pages/ReceiverDashboard";

/* Donor Features */
import AddDonation from "./pages/AddDonation";
import MyDonations from "./pages/MyDonations";

/* Shared Pages */
import Donations from "./pages/Donations";
import FoodRequests from "./pages/FoodRequests";
import Emergency from "./pages/Emergency";
import ReportDonor from "./pages/ReportDonor";

/* Admin */
import AdminReports from "./pages/AdminReports";
        import AddRating from "./pages/AddRating";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth" element={<Auth />} />

        {/* DASHBOARDS */}
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/receiver-dashboard" element={<ReceiverDashboard />} />

        {/* DONOR FEATURES */}
        <Route path="/add-donation" element={<AddDonation />} />
        <Route path="/my-donations" element={<MyDonations />} />

        {/* SHARED */}
        <Route path="/donations" element={<Donations />} />
        <Route path="/food-requests" element={<FoodRequests />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/report" element={<ReportDonor />} />

        {/* ADMIN EXTRA */}
        <Route path="/admin-reports" element={<AdminReports />} />
        <Route path="/add-rating" element={<AddRating />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;