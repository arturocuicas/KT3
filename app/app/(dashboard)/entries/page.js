"use client";

import BasicTable from "@/app/components/BasicTable";
import {Suspense} from "react";
import fetchData from "@/app/utils/fetchData";
import Link from "next/link";
import MainTitle from "@/app/components/MainTitle";

const apiData = fetchData("http://localhost:7000/api/entries");


export default function Page(props) {
  const data = apiData.read();

  return (
    <>
      <div className="w-full flex mb-2">
        <MainTitle title="Entries" />
        <div className="w-1/2 flex mb-4">
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto h-10 mt-auto"
            href="/entries/create"
          >
            Create Entry
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 my-4">
        <div className="w-full">
          <Suspense fallback={<div>Loading...</div>}>
            <BasicTable
              columns={["Description", "Amount", "Date", "Account", "Actions"]}
              dataColumns={["description", "amount", "date_period", "account_name"]}
              data={data}
              actions={{delete: true, update: true}}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}
