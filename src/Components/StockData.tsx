// useStockData.ts
import { useEffect, useState } from "react";

const API_KEY = "RIBXT3XYLI69PC0Q";
const API_URL = `https://www.alphavantage.co/query`;

interface StockData {
  date: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
}

interface ApiResponse {
  [date: string]: {
    "1. open": string;
    "2. high": string;
    "3. low": string;
    "4. close": string;
    "5. volume": string;
  };
}

export const useStockData = (symbol: string): { data: StockData[] | null, loading: boolean, error: string | null } => {
    const [data, setData] = useState<StockData[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `${API_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&outputsize=full&apikey=${API_KEY}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const json = await response.json();
          console.log(json)
          const intradayData: ApiResponse = json["Time Series (5min)"]; // This line seems to be causing the issue
          const formattedData = Object.keys(intradayData).map((key) => {
            const item = intradayData[key];
            return {
              date: key,
              open: item["1. open"],
              high: item["2. high"],
              low: item["3. low"],
              close: item["4. close"],
              volume: item["5. volume"]
            };
          });
          setData(formattedData);
        } catch (error:any) {
          console.error("Error fetching data:", error);
          setError(error.message || "Unknown error occurred");
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, [symbol]);
  
    return { data, loading, error };
  };
  