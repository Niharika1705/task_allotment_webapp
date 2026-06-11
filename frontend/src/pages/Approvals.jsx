import { useEffect, useState } from "react";
import "../Dashboard.css";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Approvals() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await API.get("/pending-requests");
      setRequests(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const approveRequest = async (id) => {
    try {
      await API.post(`/approve/${id}`);
      alert("Request Approved");
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  const rejectRequest = async (id) => {
    try {
      await API.post(`/reject/${id}`);
      alert("Request Rejected");
      fetchRequests();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard">
      <Navbar />

      <h1>Approval Requests</h1>

      {requests.length === 0 ? (
        <p>No Pending Requests</p>
      ) : (
        requests.map((request) => (
          <div className="task-card" key={request.id}>
            <h3>Task ID: {request.task_id}</h3>

            <p>
              Requested By User ID: {request.requested_by}
            </p>

            <p>
              Requested Status: {request.requested_status}
            </p>

            <p>
              Approval Status: {request.approval_status}
            </p>

            <button
              className="approve-btn"
              onClick={() =>
                approveRequest(request.id)
              }
            >
              Approve
            </button>

            <button
              className="reject-btn"
              onClick={() =>
                rejectRequest(request.id)
              }
            >
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Approvals;