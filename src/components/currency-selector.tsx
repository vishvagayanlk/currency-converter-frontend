import { ErrorMessage, Field } from "formik";
import supportCurrencies from "../constants";

interface CurrencySelectorProps {
    name: string,
    label: string,
}

const CurrencySelector = ({ name, label }: CurrencySelectorProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
        {label}:
      </label>
      <Field
        as="select"
        id={name}
        name={name}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
      >
        <option value="" disabled>Select {label} currency</option>
        {supportCurrencies.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
    </div>
  );
};

export default CurrencySelector;
