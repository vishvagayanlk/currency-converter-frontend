import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ErrorMessage, useField, useFormikContext } from "formik";

interface DatePickerProps {
  name: string;
  label: string;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({ name, label }) => {
  const [field] = useField<Date | null>({ name });
  const formik = useFormikContext();

  const handleDateChange = (date: Date | null) => {
    formik.setFieldValue(name, date);
  };

  const filterPastDates = (date: Date) => {
    return date <= new Date();
  };

  return (
    <div className="mb-4" style={{ width: "100%" }}>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
      >
        {label}:
      </label>
      <DatePicker
        selected={field.value}
        name={name}
        onChange={handleDateChange}
        filterDate={filterPastDates}
        placeholderText="Select date"
        className="w-full shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default CustomDatePicker;
