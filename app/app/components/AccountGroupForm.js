"use client";

import {useState, useRef} from "react";

export default function AccountGroupForm() {
  const [accountGroup, setAccountGroup] = useState({
    name: "",
  });

  const form = useRef(null);

  function handleChange(event) {
    setAccountGroup({
      ...accountGroup,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    fetch(
      "http://localhost:7000/api/account_groups", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountGroup),
    }).then((res) => res.json()).then(() => {
      setAccountGroup({
        name: "",
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
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name="name"
            type="text"
            onChange={handleChange}
            value={accountGroup.name}
          />
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