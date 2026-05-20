import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import Select from '../Form/Select';
import DateRange from '../Form/DateRange';
import { getMembers } from '../../services/userService';
import { fetchStatusOptions, fetchPriorityOptions, fetchWorkTypeOptions } from '../../services/taskService'

export default function TaskFilterSidebar({ isOpen, onClose, onApply }) {
  const [appliedFilters, setAppliedFilters] = useState({
    status: '',
    priority: '',
    workType: '',
    assignedToId: '',
    taskId: '',
    createdStartDate: '',
    createdEndDate: '',
    dueStartDate: '',
    dueEndDate: '',
  });
  const [statusOptions, setStatusOptions] = useState([]);
  const [priorityOptions, setPriorityOptions] = useState([]);
  const [workTypeOptions, setWorkTypeOptions] = useState([]);
  const [teamOptions, setTeamOptions] = useState([]);

  const methods = useForm({
    defaultValues: appliedFilters
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (!isOpen) {
      reset(appliedFilters);
    }
  }, [isOpen, reset, appliedFilters]);

  useEffect(() => {
    loadStatusOptions();
    loadPriorityOptions();
    loadWorkTypeOptions();
    loadTeamOptions();
  }, []);

  const loadStatusOptions = async () => {
    const res = await fetchStatusOptions();
    setStatusOptions(res);
  };

  const loadPriorityOptions = async () => {
    const res = await fetchPriorityOptions();
    setPriorityOptions(res);
  };

  const loadWorkTypeOptions = async () => {
    const res = await fetchWorkTypeOptions();
    setWorkTypeOptions(res);
  };
  const loadTeamOptions = async () => {
    const res = await getMembers();
    setTeamOptions(res);
  };  


  const onSubmit = (data) => {
    const activeFilters = {};
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        activeFilters[key] = data[key];
      }
    });
    setAppliedFilters(data);
    onApply(activeFilters);
    onClose();
  };

  const handleClear = () => {
    const emptyFilters = {
      status: '',
      priority: '',
      workType: '',
      assignedToId: '',
      taskId: '',
      createdStartDate: '',
      createdEndDate: '',
      dueStartDate: '',
      dueEndDate: '',
    };
    reset(emptyFilters);
    setAppliedFilters(emptyFilters);
    onApply({});
    onClose();
  };

  return (
    <FormProvider {...methods}>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity "
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0  w-full sm:w-[450px] bg-base-100 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-base-200">
          <h1 className="text-2xl font-semibold text-base-content tracking-tight">Filter</h1>

        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          <Select
            label="STATUS"
            name="status"
            options={statusOptions}
          />

          <Select
            label="PRIORITY"
            name="priority"
            options={priorityOptions}
          />

          <Select
            label="WORK TYPE"
            name="workType"
            options={workTypeOptions}
          />

          <Select
            label="ASSIGNED TO"
            name="assignedToId"
            options={teamOptions}
          />

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-base-content/80">Created Date </label>
            <div className="flex items-center gap-3">
              <DateRange title="From" name="createdStartDate" variant="start" />
              <DateRange title="To" name="createdEndDate" variant="end" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5 w-full">
            <label className="text-sm font-medium text-base-content/80">Due Date </label>
            <div className="flex items-center gap-3">
              <DateRange title="From" name="dueStartDate" variant="start" />
              <DateRange title="To" name="dueEndDate" variant="end" />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-base-200 flex gap-4 bg-base-100">
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 py-2 px-4 rounded-xl font-semibold bg-base-200 text-base-content hover:bg-base-300 transition-colors"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="bg-[#0f4069] cursor-pointer flex-1 py-2 px-4 rounded-xl font-semibold btn-primary text-primary-content hover:brightness-110 shadow-md transition-all border-none"
          >
            Update
          </button>
        </div>
      </div>
    </FormProvider>
  );
}
