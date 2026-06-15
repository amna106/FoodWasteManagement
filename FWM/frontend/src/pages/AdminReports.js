import { useEffect, useState } from "react";
import API from "../api";

export default function AdminReports() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const res = await API.get("/admin/fake-reports");
      setReports(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(
        `/admin/fake-reports/${id}`,
        { status }
      );

      alert("Status Updated");

      loadReports();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Fake Reports</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Report ID</th>
            <th>Donor ID</th>
            <th>Reported By</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {reports.map((report) => (
            <tr key={report.report_id}>
              <td>{report.report_id}</td>
              <td>{report.reported_donor_id}</td>
              <td>{report.reported_by}</td>
              <td>{report.reason}</td>
              <td>{report.status}</td>

              <td>
                <button
                  onClick={() =>
                    updateStatus(
                      report.report_id,
                      "in_process"
                    )
                  }
                >
                  In Process
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      report.report_id,
                      "resolved"
                    )
                  }
                >
                  Resolve
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}