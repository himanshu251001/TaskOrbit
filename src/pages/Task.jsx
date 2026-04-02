import Table from "../components/common/Table";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { getTasks } from "../services/taskService";
import { useEffect, useState } from "react";

export default function Tasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getTasks(); //filters will be added later
      setTasks(data);
      setLoading(false);
    }
    fetchTasks();
  }, []);
  return (
    <>
      <div className="flex justify-end">
        <button
          className="btn btn-primary btn-md w-full sm:w-auto"
          onClick={() => navigate("/tasks/create")}
        >
          <Plus className="mr-1" /> Create Task
        </button>
      </div>
      {!loading &&
        <Table
          data={tasks}
          linkColumn="status"
        />}
    </>
  );
}