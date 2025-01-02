"use client";

import {useState, useRef, Suspense} from "react";
import fetchData from "@/app/utils/fetchData";

const apiData = fetchData("http://localhost:7000/api/account_groups");

export default function AccountForm() {
  const [account, setAccount] = useState({
    code: "",
    name: "",
    account_group_id: "",
  });

  const form = useRef(null);
  const account_groups = apiData.read();

  function handleChange(event) {
    setAccount({
      ...account,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    fetch(
      "http://localhost:7000/api/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    }).then((res) => res.json()).then(() => {
      setAccount({
        code: "",
        name: "",
        account_group_id: "",
      })
      window.location.reload();
    });
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        ref={form}
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="code"
          >
            Code
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="code"
            type="number"
            onChange={handleChange}
            value={account.code}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="name"
            type="text"
            onChange={handleChange}
            value={account.name}
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
              name="account_group_id"
              onChange={handleChange}
              value={account.account_group_id}
            >
              <option value="none">Select an account group</option>
              {account_groups?.map((item) => (
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