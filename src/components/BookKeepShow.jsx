import React from "react";
import axios from "axios";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import moment from "moment";
import { toast } from "react-toastify";

function BookKeepShow() {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["bookkeep_post"],
    queryFn: () =>
      axios.get(import.meta.env.VITE_API_URL + `/bookkeeping`).then((res) => {
        return res.data;
      }),
  });

  const handleDelete = async (id) => {
    // console.log(id);
    try {
      await axios
        .delete(import.meta.env.VITE_API_URL + `/bookkeeping/${id}`)
        .then(() => {
          toast.success("delete successfully");
          refetch();
        });
    } catch (error) {
      toast.error("delete failed", error);
    }
  };

  return (
    <div className=" border-4 bg-white rounded-lg font-mono p-5 flex flex-col overflow-x-scroll">
      {isLoading ? (
        <div className="font-semibold font-serif text-gray-500 mx-auto">
          Loading.....
        </div>
      ) : error ? (
        "Something went wrong!"
      ) : (
        <table className=" border-collapse border-slate-400 text-center text-sm lg:text-lg font-serif">
          <thead>
            <tr className="p-2">
              <th className="border p-1">Name</th>
              <th className="border p-1">From-To</th>
              <th className="border p-1">Daily Amount ($)</th>
              <th className="border p-1">Total Days</th>
              <th className="border p-1">Total Price ($)</th>
              <th className="border p-1">Operation</th>
            </tr>
          </thead>
          <tbody className="p-2">
            {data?.map((data) => (
              <tr key={data?._id}>
                <td className="border p-1">{data?.name}</td>
                <td className="border p-1">
                  {moment(data?.From).format("DD/MM/YYYY")} -{" "}
                  {moment(data?.To).format("DD/MM/YYYY")}
                </td>
                <td className="border p-1">{data?.DailyAmount}</td>
                <td className="border p-1">{data?.TotalDays}</td>
                <td className="border p-1">{data?.TotalPrice}</td>
                <td className="border p-1">
                  <button
                    onClick={() => handleDelete(data?._id)}
                    className="w-30 p-1 text-white bg-red-400 text-center rounded-lg shadow-sm hover:shadow-lg text-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default BookKeepShow;
