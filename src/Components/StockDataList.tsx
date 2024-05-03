import React, { useState } from "react";
import { useStockData } from "./StockData";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const StockDataList = () => {
  const { data, loading, error } = useStockData("IBM");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 10;

  // Logic to calculate pagination
  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);

  // Logic to change page
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center h-screen">
        <div className="w-full sm:w-3/4 lg:w-1/2 mt-5">
          <div className="text-center text-4xl">Stock Data</div>
          <div className="block mt-5">
            <table className="table-auto border-collapse w-full text-center">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Open</th>
                  <th className="px-4 py-2">High</th>
                  <th className="px-4 py-2">Low</th>
                  <th className="px-4 py-2">Close</th>
                  <th className="px-4 py-2">Volume</th>
                </tr>
              </thead>
              <tbody>
                {currentItems &&
                  currentItems.map((item) => (
                    <tr key={item.date}>
                      <td className="border px-4 py-2">{item.date}</td>
                      <td className="border px-4 py-2">{item.open}</td>
                      <td className="border px-4 py-2">{item.high}</td>
                      <td className="border px-4 py-2">{item.low}</td>
                      <td className="border px-4 py-2">{item.close}</td>
                      <td className="border px-4 py-2">{item.volume}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex justify-end mt-4 w-full">
              {data && data.length > itemsPerPage && (
                <Stack spacing={2}>
                  <Pagination
                    count={Math.ceil(data.length / itemsPerPage)}
                    page={currentPage}
                    onChange={handleChange}
                    color="primary"
                  />
                </Stack>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDataList;
