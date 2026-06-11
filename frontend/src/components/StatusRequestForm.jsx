import { useState } from "react";
import API from "../services/api";

function StatusRequestForm() {
  const [taskId, setTaskId] = useState("");
  const [status, setStatus] = useState("In Progress");

  const handleRequest = async () => {
    try {

      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        alert("Please login again");
        return;
      }

      await API.post("/request-status", {
        task_id: Number(taskId),
        requested_by: user.user_id,
        requested_status: status,
      });

      alert("Status Change Request Sent!");

      setTaskId("");
      setStatus("In Progress");

    } catch (error) {
      console.error(error);
      alert("Failed to send request");
    }
  };

  return (
    <div>
      <h2>Request Status Change</h2>

      <input
        type="number"
        placeholder="Task ID"
        value={taskId}
        onChange={(e) =>
          setTaskId(e.target.value)
        }
      />

      <br />
      <br />

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
      >
        <option>Not Started</option>
        <option>In Progress</option>
        <option>Completed</option>
      </select>

      <br />
      <br />

      <button onClick={handleRequest}>
        Request Status Change
      </button>
    </div>
  );
}

export default StatusRequestForm;