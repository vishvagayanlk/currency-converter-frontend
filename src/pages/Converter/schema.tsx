import * as Yup from "yup";

const currencyConverterValidationSchema = Yup.object().shape({
  sourceCurrency: Yup.string().required("Source currency is required"),
  targetCurrency: Yup.string().required("Target currency is required"),
  amount: Yup.number()
    .typeError("Amount must be a number")
    .positive("Amount must be a positive number")
    .required("Amount is required"),
  date: Yup.date().required("Date is required"),
  action: Yup.string().required("Action is required"),
  refundDate: Yup.date().when("action", {
    is: (val: string) => val === "REFUND",
    then: () => Yup.date().required(),
    otherwise: () => Yup.date().optional(),
  }),
});

export default currencyConverterValidationSchema;
