import Table from "../components/common/Table";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { getTasks } from "../services/taskService";
import { useEffect, useState } from "react";
import TaskFilterSidebar from "../components/task/TaskFilterSidebar";

export default function Tasks() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const fetchTasks = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await getTasks(filters);
      setTasks(response);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <>
      <div className="flex justify-end md:hidden w-full">
        <button
          className="btn btn-primary btn-md w-full"
          onClick={() => navigate("/tasks/create")}
        >
          <Plus className="mr-1" /> Create Task
        </button>
      </div>
      {!loading &&
        <Table
          data={tasks}
          linkColumn="status"
          onFilterClick={() => setIsFilterOpen(true)}
          onRowClick={(row) => navigate(`/tasks/${row.id}`, { state: { task: row } })}
        />
      }

      <TaskFilterSidebar 
        isOpen={isFilterOpen} 
        onClose={() => setIsFilterOpen(false)} 
        onApply={(filters) => fetchTasks(filters)} 
      />
      
    </>
  );
}