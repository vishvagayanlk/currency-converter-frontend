import { Formik, Field, Form, ErrorMessage } from "formik";
import CurrencyConverterFormValues from "../../types";
import CustomDatePicker from "../../components/date-picker";
import CurrencySelector from "../../components/currency-selector";
import useCurrencyConversion from "../../hooks/useCurrencyConversion";
import ResultDisplay from "../../components/result-display";
import currencyConverterValidationSchema from "./schema";

const FormActionOptions = [
  { value: "PAYMENT", label: "Payment" },
  { value: "REFUND", label: "Refund" },
];
const CurrencyConverter = () => {
  const initialValues = {
    sourceCurrency: "",
    targetCurrency: "",
    amount: "",
    refundDate: "",
    date: "",
    action: "",
  };

  const { convert, isLoading, conversionResult } = useCurrencyConversion();
  const onSubmit = (values: CurrencyConverterFormValues) => {
    convert(values);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md p-4 form-container  bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Currency Converter</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={currencyConverterValidationSchema}
          onSubmit={onSubmit}
        >
          {({ values }) => (
            <Form className="space-y-4">
              <CurrencySelector name="sourceCurrency" label="Source" />
              <CurrencySelector name="targetCurrency" label="Target" />
              <div className="mb-4">
                <label
                  htmlFor="amount"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                >
                  Amount:
                </label>
                <Field
                  type="number"
                  id="amount"
                  name="amount"
                  placeholder="Amount"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <CustomDatePicker name="date" label="Date" />
              <div className="mb-4">
                <label
                  htmlFor="action"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-dark"
                >
                  Action:
                </label>
                <Field
                  as="select"
                  id="action"
                  name="action"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                >
                  <option value="" disabled>
                    Action
                  </option>
                  {FormActionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="action"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              {values.action === "REFUND" && (
                <CustomDatePicker name="refundDate" label="Refund Date" />
              )}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Convert
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div>
          {conversionResult && (
            <ResultDisplay
              isLoading={isLoading}
              conversionResult={conversionResult}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
