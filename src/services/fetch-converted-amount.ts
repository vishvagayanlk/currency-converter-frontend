import axios from "axios";
import CurrencyConverterFormValues from "../types";

const fetchConvertedAmount = async ({
  sourceCurrency,
  targetCurrency,
  amount,
  refundDate,
  date,
  action,
}: CurrencyConverterFormValues) => {
  try {
    console.log("api calling");
    const apiRes = await axios.post("http://localhost:3000/api/convert", {
      sourceCurrency,
      targetCurrency,
      amount: parseFloat(amount),
      date,
      action,
      ...(refundDate && {
        refundDate,
      }),
    });

    if (apiRes.status !== 200) {
      throw new Error("Error occurred while converting amount");
    }

    console.log(apiRes);
    return apiRes.data;
  } catch (error) {
    console.error("Error occurred while making the request:", error.message);
    throw error;
  }
};

export default fetchConvertedAmount;
