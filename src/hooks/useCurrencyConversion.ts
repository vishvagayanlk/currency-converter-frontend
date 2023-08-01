import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchConvertedAmount from "../services/fetch-converted-amount";
import CurrencyConverterFormValues from "../types";
import { useState } from "react";

export interface Result {
  amount: number;
  currency: string;
  refundDate: string;
}

const useCurrencyConversion = () => {
  const [conversionResult, setConversionResult] = useState<Result | null>(null);
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: async (values: CurrencyConverterFormValues) => {
      const {
        sourceCurrency,
        targetCurrency,
        amount,
        refundDate,
        date,
        action,
      } = values;
      const cacheData = queryClient.getQueryData<Result>([
        "convertCurrency",
        values,
      ]);
      if (cacheData) {
        setConversionResult(cacheData);
        return;
      }
      const response = await fetchConvertedAmount({
        sourceCurrency,
        targetCurrency,
        amount,
        ...(action === "REFUND" && {
          refundDate,
        }),
        date,
        action,
      });
      queryClient.setQueryData(["convertCurrency", values], response);
      setConversionResult(response);
    },
    cacheTime: Infinity,
  });

  return { convert: mutate, isLoading, conversionResult };
};

export default useCurrencyConversion;
