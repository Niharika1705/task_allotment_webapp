import { useState, useEffect } from "react";
import "../Dashboard.css";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import API from "../services/api";

function AdminDashboard() {
  const [tasks, setTasks] = useState([]);
  const [requests, setRequests] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [assignedTo, setAssignedTo] = useState("");
  const [users, setUsers] = useState([]);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await API.get("/pending-requests");
      setRequests(res.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchRequests();
    fetchUsers();
  }, []);

  const createUser = async () => {
    try {
      await API.post("/create-user", {
        name,
        email,
        password,
        role: "trainee",
      });

      alert("Trainee Created Successfully!");

      setName("");
      setEmail("");
      setPassword("");

      fetchUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to create user");
    }
  };

  const addTask = async (taskName) => {
    try {
      if (!assignedTo) {
        alert("Please select a trainee");
        return;
      }

      await API.post("/tasks", {
        title: taskName,
        description: "Task assigned by Admin",
        assigned_to: Number(assignedTo),
      });

      fetchTasks();

    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const approveRequest = async (id) => {
    try {
      await API.post(`/approve/${id}`);

      alert("Request Approved");

      fetchRequests();
      fetchTasks();

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

      <h1>Admin Panel</h1>

      <h2>Create Trainee</h2>

      <div className="task-form">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={createUser}>
          Create User
        </button>
      </div>

      <h2>Assign Task</h2>

      <select
        value={assignedTo}
        onChange={(e) => setAssignedTo(e.target.value)}
      >
        <option value="">
          Select Trainee
        </option>

        {users
          .filter((user) => user.role === "trainee")
          .map((user) => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
      </select>

      <br />
      <br />

      <TaskForm addTask={addTask} />

      <h2>Assigned Tasks</h2>

      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          title={task.title}
          status={task.status}
        />
      ))}

      <h2 style={{ marginTop: "40px" }}>
        Pending Approval Requests
      </h2>

      {requests.length === 0 ? (
        <p>No Pending Requests</p>
      ) : (
        requests.map((request) => (
          <div
            key={request.id}
            className="task-card"
          >
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
              onClick={() => approveRequest(request.id)}
            >
              Approve
            </button>

            <button
              className="reject-btn"
              onClick={() => rejectRequest(request.id)}
            >
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;