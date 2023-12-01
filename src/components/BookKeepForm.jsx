import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";

function BookKeepForm() {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");

  const [days, setDays] = useState(0);
  const [total, setTotal] = useState(0);
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

  const handleInput = () => {
    if (days == "") {
      toast.error("Please enter the From/To Date");
    } else if (total == "") {
      toast.error("Please enter the amount of days");
    } else if (name == "") {
      toast.error("Please enter the name");
    } else {
      return true;
    }
  };

  const mutation = useMutation({
    mutationFn: async (newkeep) => {
      return await axios
        .post(import.meta.env.VITE_API_URL + "/bookkeeping", newkeep)
        .then((res) => {
          return res.data;
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["bookkeep_post"]);
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

    if (handleInput()) {
      mutation.mutate({
        name: name,
        From: fromDate,
        To: toDate,
        DailyAmount: amount,
        TotalDays: days,
        TotalPrice: total,
      });
    }
  };

  return (
    <div className="w-full border-4 bg-white rounded-lg font-mono p-5 flex flex-col">
      <div className="flex flex-col items-center justify-center border-b space-y-3 pb-5">
        <h3 className="text-3xl font-semibold">Record</h3>
        <p className="text-xl">Keep Your Expenses Recode Over Here!</p>
      </div>

      <form
        onSubmit={handleSubmit}
        action=""
        className="flex flex-col p-5 gap-5"
      >
        <div className="flex flex-col space-y-3">
          <label htmlFor="" className="text-2xl">
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
            className="border rounded-md p-2 outline-gray-400 text-lg"
          />
        </div>

        <div className="flex flex-col space-y-3">
          <label htmlFor="" className="text-2xl">
            From:
          </label>
          <input
            type="date"
            required
            value={fromDate}
            onChange={(e) => {
              setFromDate(e.target.value);
            }}
            className="border rounded-md p-2 outline-gray-400 text-lg"
          />
        </div>

        <div className="flex flex-col space-y-3">
          <label htmlFor="" className="text-2xl">
            To:
          </label>
          <input
            type="date"
            required
            value={toDate}
            onChange={(e) => {
              setToDate(e.target.value);
            }}
            className="border rounded-md p-2 outline-gray-400 text-lg"
          />
        </div>

        <div className="flex flex-col space-y-3">
          <label htmlFor="" className="text-2xl">
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
            className="border rounded-md p-2 outline-gray-400 text-lg"
          />
        </div>

        <div className="flex  space-x-3">
          <span>Days:{days}</span>
          <span>Total:{total}</span>
        </div>

        <button
          type="submit"
          className="w-32 p-2 text-white bg-green-400 text-center rounded-lg shadow-sm hover:shadow-lg"
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default BookKeepForm;
