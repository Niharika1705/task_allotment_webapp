import { useEffect, useState } from "react";
import "../Dashboard.css";
import Navbar from "../components/Navbar";
import TaskCard from "../components/TaskCard";
import StatusRequestForm from "../components/StatusRequestForm";
import API from "../services/api";

function TraineeDashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        console.error("No logged in user found");
        return;
      }

      const res = await API.get(
        `/tasks/user/${user.user_id}`
      );

      setTasks(res.data);

    } catch (error) {
      console.error(
        "Error fetching tasks:",
        error
      );
    }
  };

  return (
    <div className="dashboard">
      <Navbar />

      <h1>My Tasks</h1>

      <h2>Assigned Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks assigned.</p>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            title={task.title}
            status={task.status}
          />
        ))
      )}

      <StatusRequestForm />
    </div>
  );
}

export default TraineeDashboard;