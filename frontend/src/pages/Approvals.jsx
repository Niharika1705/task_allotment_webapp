import { useEffect, useState } from "react";
import "../Dashboard.css";
import Navbar from "../components/Navbar";
import API from "../services/api";
import TaskCard from "../components/TaskCard";

function Approvals() {
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);

  const fetchData = async () => {
    try {
      const [reqsRes, usersRes, tasksRes] = await Promise.all([
        API.get("/pending-requests"),
        API.get("/users"),
        API.get("/tasks")
      ]);
      setRequests(reqsRes.data);
      setUsers(usersRes.data);
      setTasks(tasksRes.data);
    } catch (error) {
      console.error("Error fetching approval page data:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const loadApprovalsData = async () => {
      try {
        const [reqsRes, usersRes, tasksRes] = await Promise.all([
          API.get("/pending-requests"),
          API.get("/users"),
          API.get("/tasks")
        ]);
        if (isMounted) {
          setRequests(reqsRes.data);
          setUsers(usersRes.data);
          setTasks(tasksRes.data);
        }
      } catch (error) {
        console.error("Error loading approvals data:", error);
      }
    };
    loadApprovalsData();
    return () => {
      isMounted = false;
    };
  }, []);

  const approveRequest = async (id) => {
    try {
      await API.post(`/approve/${id}`);
      alert("Request Approved Successfully!");
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Failed to approve request");
    }
  };

  const rejectRequest = async (id) => {
    try {
      await API.post(`/reject/${id}`);
      alert("Request Rejected");
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Failed to reject request");
    }
  };

  const getUserNameById = (id) => {
    const found = users.find(u => Number(u.id) === Number(id));
    return found ? found.name : `ID: ${id}`;
  };

  const getTaskTitleById = (id) => {
    const found = tasks.find(t => Number(t.id) === Number(id));
    return found ? found.title : `Task #${id}`;
  };

  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar />
      <div className="dashboard">
        <h1>Approval Requests Management</h1>
        <p style={{ color: "var(--text-muted)", marginTop: "-20px", marginBottom: "30px" }}>
          Review and approve status change requests submitted by trainees.
        </p>

        <div className="cards-list">
          {requests.length === 0 ? (
            <div className="no-data">
              <span style={{ fontSize: "24px", display: "block", marginBottom: "10px" }}>🎉</span>
              No pending tracking changes require confirmation. All clear!
            </div>
          ) : (
            requests.map((request) => (
              <TaskCard 
                key={request.id} 
                title={getTaskTitleById(request.task_id)} 
                status={`Status Target: ${request.requested_status}`}
                priority="Medium"
                candidateName={getUserNameById(request.requested_by)}
              >
                <div style={{ marginTop: "8px", fontSize: "13px", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <p style={{ margin: 0 }}><strong>Request ID:</strong> #{request.id}</p>
                  <p style={{ margin: 0 }}><strong>Task ID Reference:</strong> #{request.task_id}</p>
                  <p style={{ margin: 0 }}><strong>Workflow Status:</strong> <span style={{ color: "var(--warning)", fontWeight: 700 }}>⏳ {request.approval_status}</span></p>
                </div>
                <div className="action-group">
                  <button className="approve-btn" onClick={() => approveRequest(request.id)}>Approve</button>
                  <button className="reject-btn" onClick={() => rejectRequest(request.id)}>Reject</button>
                </div>
              </TaskCard>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Approvals;