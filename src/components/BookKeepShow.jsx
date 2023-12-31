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
import { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import BookKeepUpdate from "./BookKeepUpdate";

function BookKeepShow({ userId }) {
  const queryClient = useQueryClient();

  const deleteBookkeeping = useMutation(
    (id) => axios.delete(import.meta.env.VITE_API_URL + `/bookkeeping/${id}`),
    {
      onSuccess: () => {
        toast.success("Delete successful");
        queryClient.invalidateQueries("bookkeep_post"); // Invalidate the cache
      },
    }
  );
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["bookkeep_post", userId],
    queryFn: () =>
      axios
        .get(import.meta.env.VITE_API_URL + `/bookkeeping/${userId}`)
        .then((res) => {
          return res.data;
        }),
  });

  const handleDelete = async (id) => {
    deleteBookkeeping.mutate(id);
  };

  return (
    <div className=" border-4 bg-white rounded-lg font-mono p-5 flex flex-col overflow-x-scroll">
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
          {isLoading ? (
            <tr className="font-semibold font-serif text-gray-500 mx-auto">
              <td className="col-span-6"> Loading.....</td>
            </tr>
          ) : error ? (
            <tr className="font-semibold font-serif text-red-500 mx-auto">
              <td colSpan="6">Error: {error.message}</td>
            </tr>
          ) : (
            <>
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
                  <td className="border p-1 space-y-2 space-x-0 md:space-x-3 lg:space-y-0">
                    <button
                      onClick={() => handleDelete(data?._id)}
                      className="w-30 p-1 text-white bg-red-400 text-center rounded-lg shadow-sm hover:shadow-lg text-md"
                    >
                      Delete
                    </button>
                    <Popup
                      trigger={
                        <button className="w-30 p-1 text-white bg-green-400 text-center rounded-lg shadow-sm hover:shadow-lg text-md">
                          Update
                        </button>
                      }
                      modal
                      nested
                    >
                      {(close) => (
                        <div className="md:border-4 bg-white rounded-lg font-mono md:p-5 flex flex-col">
                          <div className="flex flex-col items-center justify-center border-b lg:space-y-3 p-2 relative">
                            <h3 className="text-xl lg:text-3xl  font-semibold">
                              Update
                            </h3>
                            <button
                              className="text-2xl lg:text-3xl absolute right-0 bottom-5 md:-right-2 md:bottom-10"
                              onClick={close}
                            >
                              &times;
                            </button>
                          </div>
                          <BookKeepUpdate data={data} />
                        </div>
                      )}
                    </Popup>
                  </td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookKeepShow;
