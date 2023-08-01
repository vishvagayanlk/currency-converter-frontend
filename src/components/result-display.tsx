import { FC } from "react"
import { Result } from "../hooks/useCurrencyConversion"

interface ResultDisplayProps {
    conversionResult: Result,
    isLoading: boolean,
}

const ResultDisplay: FC<ResultDisplayProps> =({conversionResult, isLoading})=>{
    return (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Conversion Result:</h2>
          <p>Amount: {!isLoading && conversionResult ? conversionResult.amount : '..'}</p>
        </div>
      );
}
export default ResultDisplay;