import { fetchData } from "@/api/ClientFunction";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";

import {
  BiUser,
  BiDollarCircle,
  BiCreditCard,
  BiXCircle,
  BiCalendar,
  BiGame,
} from "react-icons/bi";
import { FaFantasyFlightGames } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
export default function DashBoard() {
  const [dashboard, setDashboardData] = useState([]);
  const { data, error, isLoading } = useSWR("admin/dashboard", fetchData);
  useEffect(() => {
    if (data && data.data) {
      setDashboardData(data.data);
    }
  }, [data]);
  const navigate = useNavigate();
  if (isLoading) return <Spinner />;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div
        className="bg-blue-50 shadow-md rounded-md p-6 cursor-pointer"
        onClick={() => navigate("/users")}
      >
        <div className="text-xl font-semibold mb-4">Total Users</div>
        <div className="flex items-center">
          <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <BiUser className="h-5 w-5 fill-current" />
          </div>
          <div className="text-gray-700 font-semibold">{dashboard?.totalU}</div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-md p-6">
        <div className="text-xl font-semibold mb-4">Today Registered Users</div>
        <div className="flex items-center">
          <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <BiUser className="h-5 w-5 fill-current" />
          </div>
          <div className="text-gray-700 font-semibold">{dashboard?.todayU}</div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-md p-6">
        <div className="text-xl font-semibold mb-4">Rejected Users</div>
        <div className="flex items-center">
          <div className="bg-yellow-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <BiXCircle className="h-5 w-5 fill-current" />
          </div>
          <div className="text-gray-700 font-semibold">
            {dashboard?.rejectedU}
          </div>
        </div>
      </div>
      <div
        className="shadow-md rounded-md p-6 bg-pink-50 cursor-pointer"
        onClick={() => navigate("/recharge")}
      >
        <div className="text-xl font-semibold mb-4">Total Deposit Requests</div>
        <div className="flex items-center">
          <div className="bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <BiDollarCircle className="h-5 w-5 fill-current" />
          </div>
          <div className="text-gray-700 font-semibold">
            {dashboard?.totalDR}
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-md p-6">
        <div className="text-xl font-semibold mb-4">Today Deposit Requests</div>
        <div className="flex items-center">
          <div className="bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <BiCreditCard className="h-5 w-5 fill-current" />
          </div>
          <div className="text-gray-700 font-semibold">
            {dashboard?.todayDR}
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-md p-6">
        <div className="text-xl font-semibold mb-4">Total Deposit Amount</div>
        <div className="flex items-center">
          <div className="bg-purple-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <BiDollarCircle className="h-5 w-5 fill-current" />
          </div>
          <div className="text-gray-700 font-semibold">
            {dashboard?.totalDA}
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-md p-6">
        <div className="text-xl font-semibold mb-4">Today Deposit Amount</div>
        <div className="flex items-center">
          <div className="bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <BiDollarCircle className="h-5 w-5 fill-current" />
          </div>
          <div className="text-gray-700 font-semibold">
            {dashboard?.todayDA}
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-md p-6">
        <div className="text-xl font-semibold mb-4">
          Total Withdraw Requests
        </div>
        <div className="flex items-center">
          <div className="bg-red-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <BiCreditCard className="h-5 w-5 fill-current" />
          </div>
          <div className="text-gray-700 font-semibold">
            {dashboard?.totalWR}
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-md p-6">
        <div className="text-xl font-semibold mb-4">
          Today Withdraw Requests
        </div>
        <div className="flex items-center">
          <div className="bg-red-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <BiCreditCard className="h-5 w-5 fill-current" />
          </div>
          <div className="text-gray-700 font-semibold">
            {dashboard?.todayWR}
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-md p-6">
        <div className="text-xl font-semibold mb-4">Total Withdraw Amount</div>
        <div className="flex items-center">
          <div className="bg-indigo-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <BiDollarCircle className="h-5 w-5 fill-current" />
          </div>
          <div className="text-gray-700 font-semibold">
            {dashboard?.totalWA}
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-md p-6">
        <div className="text-xl font-semibold mb-4">Today Withdraw Amount</div>
        <div className="flex items-center">
          <div className="bg-red-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <BiDollarCircle className="h-5 w-5 fill-current" />
          </div>
          <div className="text-gray-700 font-semibold">
            {dashboard?.todayWA}
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-md p-6">
        <div className="text-xl font-semibold mb-4">
          Total Distributed Bonus
        </div>
        <div className="flex items-center">
          <div className="bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <BiDollarCircle className="h-5 w-5 fill-current" />
          </div>
          <div className="text-gray-700 font-semibold">
            {dashboard?.totalBonus}
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-md p-6">
        <div className="text-xl font-semibold mb-4">
          Today Distributed Bonus
        </div>
        <div className="flex items-center">
          <div className="bg-yellow-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <BiDollarCircle className="h-5 w-5 fill-current" />
          </div>
          <div className="text-gray-700 font-semibold">
            {dashboard?.todayBonus}
          </div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-md p-6">
        <div className="text-xl font-semibold mb-4">Total Bets</div>
        <div className="flex items-center">
          <div className="bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <FaFantasyFlightGames className="h-5 w-5 fill-current" />
          </div>
          <div className="text-gray-700 font-semibold">{dashboard?.totalB}</div>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-md p-6">
        <div className="text-xl font-semibold mb-4">Today&apos;s Bets</div>
        <div className="flex items-center">
          <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <BiCalendar className="h-5 w-5 fill-current" />
          </div>
          <div className="text-gray-700 font-semibold">{dashboard?.todayB}</div>
        </div>
      </div>
      <div
        className=" shadow-md rounded-md p-6 bg-yellow-50 cursor-pointer"
        onClick={() => navigate("/game")}
      >
        <div className="text-xl font-semibold mb-4">Total Games</div>
        <div className="flex items-center">
          <div className="bg-purple-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <BiGame className="h-5 w-5 fill-current" />
          </div>
          <div className="text-gray-700 font-semibold">{dashboard?.totalG}</div>{" "}
        </div>
      </div>
      <div className="bg-white shadow-md rounded-md p-6">
        <div className="text-xl font-semibold mb-4">Total Bet Amount</div>
        <div className="flex items-center">
          <div className="bg-blue-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <BiDollarCircle className="h-5 w-5 fill-current" />
          </div>
          <div className="text-gray-700 font-semibold">
            {dashboard?.totalBA}
          </div>{" "}
        </div>
      </div>
      <div className="bg-white shadow-md rounded-md p-6">
        <div className="text-xl font-semibold mb-4">
          Today&apos;s Bet Amount
        </div>
        <div className="flex items-center">
          <div className="bg-green-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <BiDollarCircle className="h-5 w-5 fill-current" />
          </div>
          <div className="text-gray-700 font-semibold">
            {dashboard?.todayBA}
          </div>{" "}
        </div>
      </div>
      <div className="bg-white shadow-md rounded-md p-6">
        <div className="text-xl font-semibold mb-4">Total Winning</div>
        <div className="flex items-center">
          <div className="bg-purple-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <BiDollarCircle className="h-5 w-5 fill-current" />
          </div>
          <div className="text-gray-700 font-semibold">
            {dashboard?.totalWin}
          </div>{" "}
        </div>
      </div>
      <div className="bg-white shadow-md rounded-md p-6">
        <div className="text-xl font-semibold mb-4">Today&apos;s Winning</div>
        <div className="flex items-center">
          <div className="bg-yellow-500 text-white rounded-full h-8 w-8 flex items-center justify-center mr-2">
            <BiDollarCircle className="h-5 w-5 fill-current" />
          </div>
          <div className="text-gray-700 font-semibold">
            {dashboard?.todayWin}
          </div>{" "}
        </div>
      </div>
    </div>
  );
}
