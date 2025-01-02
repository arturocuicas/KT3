"use client";

import {useState, useRef, Suspense} from "react";
import fetchData from "@/app/utils/fetchData";

const apiData = fetchData("http://localhost:7000/api/accounts");

export default function EntryForm() {
  const [entry, setEntry] = useState({
    date_period: new Date().toISOString().split("T")[0],
    description: "",
    amount: "",
    account_id: "",
  })

  const form = useRef(null);
  const accounts = apiData.read();

  function handleChange(event) {
    setEntry({
      ...entry,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault()

    fetch(
        "http://127.0.0.1:7000/api/entries/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(entry),
        }
      ).then(res => res.json()).then(() => {
        setEntry({
          date_period: new Date().toISOString().split("T")[0],
          description: "",
          amount: "",
          account_id: "",
        })
        window.location.reload();
      });
  }

  return (
    <div className={"max-w-4xl mx-auto"}>
      <form
        className={"bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"}
        ref={form}
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date_period"
          >
            date_period
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="date_period"
            type="date"
            onChange={handleChange}
            value={entry.date_period}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="date_period"
          >
            description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="description"
            type="textarea"
            onChange={handleChange}
            value={entry.description}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="amount"
          >
            amount
          </label>
          <input
            className={"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"}
            name="amount"
            type="number"
            onChange={handleChange}
            value={entry.amount}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="account_id"
          >
            Account
          </label>
          <Suspense fallback={<div>Loading...</div>}>
            <select
              className="bg-white shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="account_id"
              onChange={handleChange}
              value={entry.account_id}
            >
              <option value="none">Select an account</option>
              {accounts?.map((item) => (
                <option key={item.id} value={item.id}>{item.name}</option>
              ))}
            </select>
          </Suspense>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-auto"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
}