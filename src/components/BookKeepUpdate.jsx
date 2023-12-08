import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

function BookKeepUpdate({ data }) {
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState(data.To);
  const [amount, setAmount] = useState(data.DailyAmount);
  const [name, setName] = useState(data.name);

  const [days, setDays] = useState(data.TotalDays);
  const [total, setTotal] = useState(data.TotalPrice);

  useEffect(() => {
    let from = moment(data.From).format("yyyy-MM-DD");
    setFromDate(from);

    let to = moment(data.To).format("yyyy-MM-DD");
    setToDate(to);
  }, [data]);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (fromDate !== "" && toDate !== "") {
      let start = new Date(fromDate);
      let end = new Date(toDate);
      setDays((end - start) / (1000 * 60 * 60 * 24));
    } else {
      setDays(0);
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    if (days !== "" && amount !== "") {
      setTotal(amount * days);
    } else {
      setTotal(0);
    }
  }, [days, amount]);

  const mutation = useMutation({
    mutationFn: async (newkeep) => {
      return await axios
        .put(
          import.meta.env.VITE_API_URL + `/bookkeeping/${data?._id}`,
          newkeep
        )
        .then((res) => {
          return res.data;
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["bookkeep_post_update"]);
      toast.success("bookKeep posted successfully!");
      setFromDate("");
      setToDate("");
      setName("");
      setAmount("");
      setDays("");
      setTotal("");
    },
    onError: (err) => {
      toast.error(err.response.data);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      userId: data?.userId,
      name: name,
      From: fromDate,
      To: toDate,
      DailyAmount: amount,
      TotalDays: days,
      TotalPrice: total,
    });
  };

  return (
    <Popup
      modal
      trigger={
        <button className="w-30 p-1 text-white bg-green-400 text-center rounded-lg shadow-sm hover:shadow-lg text-md">
          Update
        </button>
      }
    >
      {(close) => (
        <div className="w-full h-[600px] md:border-4 bg-white rounded-lg font-mono md:p-5 flex flex-col">
          <div className="flex flex-col items-center justify-center border-b lg:space-y-3 p-2 relative">
            <h3 className="text-xl lg:text-3xl  font-semibold">Update</h3>
            <button
              className="text-2xl lg:text-3xl absolute right-0 bottom-5 md:-right-2 md:bottom-10"
              onClick={close}
            >
              &times;
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col p-5 gap-5"
          >
            <div className="flex flex-col space-y-3">
              <label htmlFor="" className="text-md lg:text-2xl">
                Name:
              </label>
              <input
                type="text"
                placeholder="Input the Name"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className="border rounded-md p-2 outline-gray-400 text-md lg:text-lg"
              />
            </div>

            <div className="flex flex-col space-y-3">
              <label htmlFor="" className="text-md lg:text-2xl">
                From:
              </label>
              <input
                type="date"
                required
                value={fromDate || ""}
                onChange={(e) => {
                  setFromDate(e.target.value);
                }}
                className="border rounded-md p-2 outline-gray-400 text-md lg:text-lg"
              />
            </div>

            <div className="flex flex-col space-y-3">
              <label htmlFor="" className="text-md lg:text-2xl">
                To:
              </label>
              <input
                type="date"
                required
                value={toDate || ""}
                onChange={(e) => {
                  setToDate(e.target.value);
                }}
                className="border rounded-md p-2 outline-gray-400 text-md lg:text-lg"
              />
            </div>

            <div className="flex flex-col space-y-3">
              <label htmlFor="" className="text-md lg:text-2xl">
                Daily Amount:
              </label>
              <input
                type="number"
                required
                value={amount}
                min={0}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                className="w-full border rounded-md p-2 outline-gray-400 text-md lg:text-lg"
              />
            </div>

            <div className="flex  space-x-3 text-sm">
              <span>Days:{days}</span>
              <span>Total:{total}</span>
            </div>

            <button
              type="submit"
              className="w-32 p-2 text-white bg-green-400 text-center rounded-lg shadow-sm hover:shadow-lg"
            >
              Update
            </button>
          </form>
        </div>
      )}
    </Popup>
  );
}

export default BookKeepUpdate;
