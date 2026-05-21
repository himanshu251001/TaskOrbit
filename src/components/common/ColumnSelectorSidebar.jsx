import React, { useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { X, CheckSquare, Square } from 'lucide-react';

export default function ColumnSelectorSidebar({ isOpen, onClose, columns, visibleColumns, onApply }) {
  const methods = useForm();
  const { register, handleSubmit, reset, setValue, watch } = methods;

  // Initialize form values whenever columns or visibility changes
  useEffect(() => {
    if (isOpen) {
      const defaultValues = {};
      columns.forEach(col => {
        defaultValues[col] = visibleColumns.includes(col);
      });
      reset(defaultValues);
    }
  }, [isOpen, columns, visibleColumns, reset]);

  const watchedValues = watch();
  const isAllSelected = columns.every(col => watchedValues[col]);

  const toggleAll = () => {
    const newValue = !isAllSelected;
    columns.forEach(col => {
      setValue(col, newValue);
    });
  };

  const onSubmit = (data) => {
    const nextVisibleColumns = columns.filter(col => data[col]);
    onApply(nextVisibleColumns);
    onClose();
  };

  return (
    <FormProvider {...methods}>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity animate-in fade-in duration-300"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-[450px] bg-base-100 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-base-200 bg-base-100">
          <div>
            <h1 className="text-2xl font-bold text-base-content tracking-tight">Customize Columns</h1>
            <p className="text-xs text-base-content/50 mt-1 font-medium">Select which columns to display in the table</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-base-200 rounded-full transition-colors text-base-content/70"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-2 custom-scrollbar bg-base-50/30">
          {/* Select All Toggle */}
          <div
            onClick={toggleAll}
            className="flex items-center gap-3 p-4 bg-primary/5 hover:bg-primary/10 rounded-xl cursor-pointer transition-all border border-primary/10 mb-4 group"
          >
            <div className="text-primary group-hover:scale-110 transition-transform">
              {isAllSelected ? <CheckSquare size={20} /> : <Square size={20} />}
            </div>
            <span className="text-sm font-bold text-primary uppercase tracking-wider">
              {isAllSelected ? 'Deselect All' : 'Select All'}
            </span>
          </div>

          <div className="flex flex-col gap-2">
            {columns.map((column) => (
              <label
                key={column}
                className="flex items-center gap-4 p-4 bg-base-100 border border-base-200 rounded-xl cursor-pointer hover:border-primary/30 hover:shadow-sm transition-all group"
              >
                <input
                  type="checkbox"
                  {...register(column)}
                  className="checkbox checkbox-primary checkbox-sm rounded-md"
                />
                <span className="text-sm font-semibold text-base-content/80 group-hover:text-base-content transition-colors uppercase tracking-wide">
                  {column.replace(/_/g, ' ')}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-base-200 flex gap-4 bg-base-100">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl font-bold bg-base-200 text-base-content hover:bg-base-300 transition-all active:scale-95"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit(onSubmit)}
            className="flex-1 py-3 px-4 rounded-xl font-bold bg-primary text-primary-content hover:brightness-110 shadow-lg shadow-primary/20 transition-all active:scale-95"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </FormProvider>
  );
}
