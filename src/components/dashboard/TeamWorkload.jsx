import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { fetchWorkload } from "../../services/taskService";


const TeamWorkload = () => {

  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getWorkload = async () => {
    const data = await fetchWorkload();
    setTeamMembers(data);
  }

  useEffect(async () => {
    setLoading(true);
    try {
      await getWorkload();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="card bg-base-100 shadow-sm rounded-2xl w-full overflow-y-auto max-h-[500px]">
      <div className="card-body p-5 sm:p-6">
        {/* Header */}
        <div className="flex justify-center md:justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-base-content">Team Workload</h2>
        </div>

        {/* Members List */}
        <div className="flex flex-col gap-3">
          {teamMembers.map((member) => {
            const initial = member.name.charAt(0).toUpperCase();
            const progress = ((member.completed) / member.totalTasks) * 100;

            return (
              <div
                key={member.id}
                className="group flex items-center justify-between p-3 sm:p-4 rounded-xl bg-base-200 hover:bg-base-300 transition-all duration-300 cursor-pointer"
              >
                {/* Left: Avatar & Info */}
                <div className="flex items-center gap-4">
                  <div className="avatar placeholder drop-shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black border-2 border-base-100 shadow-lg">
                      {initial}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base-content text-sm sm:text-base group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs text-base-content/60 mt-0.5 font-medium">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Right: Stats & Progress */}
                <div className="flex items-center gap-4 sm:gap-6 ">
                  <div className="text-right">
                    <p className="text-[10px] sm:text-xs text-base-content/50 font-medium tracking-wide">
                      Total Tasks
                    </p>
                    <p className="text-base sm:text-lg font-bold text-primary leading-tight text-center pt-1">
                      {(member.totalTasks)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] sm:text-xs text-base-content/50 font-medium tracking-wide">
                      Active Tasks
                    </p>
                    <p className="text-base sm:text-lg font-bold text-primary leading-tight text-center pt-1">
                      {(member.totalTasks - member.completed)}
                    </p>
                  </div>

                  <div className="tooltip tooltip-top" data-tip={` ${progress || 0}%`}>
                    <progress
                      className="progress progress-primary hidden sm:block w-20 md:w-28 transition-opacity group-hover:opacity-90"
                      value={progress || 0}
                      max="100"
                    ></progress>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TeamWorkload;
