import React from "react";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
export default function DashboardCard({
  title,
  data,
  icon,
}: {
  title: string;
  data: number;
  icon?: any;
}) {
  return (
    <div className="rounded-md shadow-lg h-26 bg-green-100 ">
      <div className="px-5 py-5 flex justify-between items-center gap-4">
        <div className="">
          <h1 className="text-xl font-bold">{title}</h1>
          <span className="text-xl font-bold text-gray-600">{data}</span>
        </div>
            {icon}
      </div>
    </div>
  );
}
