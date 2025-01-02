"use client";

import BarChart from "@/app/components/BarChart";
import PieChart from "@/app/components/PieChart";
import BasicTable from "@/app/components/BasicTable";
import {Suspense} from "react";
import fetchData from "@/app/utils/fetchData";
import Link from "next/link";
import MainTitle from "@/app/components/MainTitle";

const apiDataTotal = fetchData("http://localhost:7000/api/analytics/account_groups_total");
const apiData = fetchData("http://localhost:7000/api/account_groups");

export default function Page() {
  const dataTotal = apiDataTotal.read();
  const data = apiData.read();

  return (
    <>
      <div className="w-full flex mb-2">
        <MainTitle title="Account Groups"/>
        <div className="w-1/2 flex mb-4">
          <Link
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto h-10 mt-auto"
            href="/account-groups/create"
          >
            Create Account Group
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 my-4">
        <Suspense fallback={<div>Loading...</div>}>
          <BarChart data={dataTotal}/>
          <PieChart data={dataTotal}/>
        </Suspense>
      </div>
      <div className="grid grid-cols-1 gap-4 my-4">
        <div className="w-full">
          <Suspense fallback={<div>Loading...</div>}>
            <BasicTable
              columns={["Name", "Actions"]}
              dataColumns={["name"]}
              data={data}
              actions={{delete: true, update: true}}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}