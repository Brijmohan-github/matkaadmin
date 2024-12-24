import { fetchData, postData } from "@/api/ClientFunction";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { toast } from "react-toastify";
export default function GameControl() {
  const gameId = useParams().id;
  const [openResult, setOpenResult] = useState("");
  const [closeResult, setCloseResult] = useState("");
  async function handleResult(gameType, result) {
    toast.dismiss();
    if (`${result}`.length == 3) {
      const res = await postData("admin/setgameresult", {
        gameType,
        result,
        gameId,
      });
      if (res.status || res.success) toast.success(res.message);
    } else {
      toast.warning("Please enter valid Result");
    }
    gameType == "open" ? setOpenResult("") : setCloseResult("");
  }
  const [openCategroyData, setOpenCategoryData] = useState([]);
  const [closeCategoryData, setCloseCategoryData] = useState([]);
  const [openNumberData, setOpenNumberData] = useState([]);
  const [closeNumberData, setCloseNumberData] = useState([]);
  const { data, error, isLoading } = useSWR(
    `admin/livegamedata?gameid=${gameId}`,
    fetchData,
    { refreshInterval: 30000 }
  );
  useEffect(() => {
    if (data && data?.data && data.data?.open && data.data?.close) {
      setOpenCategoryData(data.data.open[0]);
      setOpenNumberData(data.data.open[1]);
      setCloseCategoryData(data.data.close[0]);
      setCloseNumberData(data.data.close[1]);
    }
  }, [data]);

  if (isLoading) return <Spinner />;
  return (
    <>
      <div className="font-medium text-center text-2xl mb-8">
        Open Bet Stastics
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {["SD", "JD", "SP", "DP", "TP", "HS", "FS"].map((category, index) => {
          const categoryColors = [
            "bg-blue-500",
            "bg-red-500",
            "bg-green-500",
            "bg-yellow-500",
            "bg-purple-500",
            "bg-indigo-500",
            "bg-pink-500",
          ];
          const color = categoryColors[index % categoryColors.length];
          return (
            <div
              key={category}
              className={`shadow-md rounded-md p-6 ${color} text-white`}
            >
              <div className="text-xl font-semibold mb-4">
                {category} (Open)
              </div>
              {openCategroyData?.[`${category.toLowerCase()}`]}
              <div className="font-semibold"></div>
            </div>
          );
        })}
        {[...Array(10).keys()].map((number, index) => {
          const numberColors = [
            "bg-purple-500",
            "bg-teal-500",
            "bg-lime-500",
            "bg-orange-500",
            "bg-cyan-500",
            "bg-amber-500",
            "bg-emerald-500",
            "bg-fuchsia-500",
            "bg-rose-500",
            "bg-violet-500",
          ];
          const color = numberColors[number % numberColors.length];
          return (
            <div
              key={number}
              className={`shadow-md rounded-md p-6 ${color} text-white`}
            >
              <div className="text-xl font-semibold mb-4">
                Bet {number} (Open)
              </div>
              <div className="font-semibold">
                {openNumberData?.[`${number}`]}
              </div>
            </div>
          );
        })}
      </div>

      <div className="font-medium text-center text-2xl m-8">
        Close Bet Stastics
      </div>
      <div className="grid mt-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {["SD", "JD", "SP", "DP", "TP", "HS", "FS"].map((category, index) => {
          const categoryColors = [
            "bg-blue-500",
            "bg-red-500",
            "bg-green-500",
            "bg-yellow-500",
            "bg-purple-500",
            "bg-indigo-500",
            "bg-pink-500",
          ];
          const color = categoryColors[index % categoryColors.length];
          return (
            <div
              key={category}
              className={`shadow-md rounded-md p-6 ${color} text-white`}
            >
              <div className="text-xl font-semibold mb-4">
                {category} (Close)
              </div>
              <div className="font-semibold">
                {closeCategoryData?.[`${category.toLowerCase()}`]}
              </div>
            </div>
          );
        })}
        {[...Array(10).keys()].map((number, index) => {
          const numberColors = [
            "bg-purple-500",
            "bg-teal-500",
            "bg-lime-500",
            "bg-orange-500",
            "bg-cyan-500",
            "bg-amber-500",
            "bg-emerald-500",
            "bg-fuchsia-500",
            "bg-rose-500",
            "bg-violet-500",
          ];
          const color = numberColors[number % numberColors.length];
          return (
            <div
              key={number}
              className={`shadow-md rounded-md p-6 ${color} text-white`}
            >
              <div className="text-xl font-semibold mb-4">
                Bet {number} (Close)
              </div>
              <div className="font-semibold">
                {closeNumberData?.[`${number}`]}
              </div>
            </div>
          );
        })}
      </div>

      <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-12 pb-12">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Set Game Result
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <div className="mb-4">
              <label
                htmlFor="headingOpen"
                className="block text-lg font-semibold text-gray-700 mb-2"
              >
                Open Result
              </label>
              <input
                type="text"
                id="headingOpen"
                value={openResult}
                onChange={(e) => setOpenResult(e.target.value)}
                placeholder="Enter Open Result"
                className="w-full border-2 border-gray-300 rounded-lg p-4 text-lg shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline w-full md:w-auto transition-colors duration-200 transform"
              type="button"
              onClick={() => handleResult("open", openResult)}
            >
              Open Result
            </button>
          </div>

          <div className="flex-1 mt-6 md:mt-0">
            <div className="mb-4">
              <label
                htmlFor="detailsClose"
                className="block text-lg font-semibold text-gray-700 mb-2"
              >
                Close Result
              </label>
              <input
                value={closeResult}
                type="text"
                id="detailsClose"
                onChange={(e) => setCloseResult(e.target.value)}
                placeholder="Enter Close Result"
                className="w-full border-2 border-gray-300 rounded-lg p-4 text-lg shadow-sm focus:border-red-500 focus:ring-1 focus:ring-red-500"
              />
            </div>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline w-full md:w-auto transition-colors duration-200 transform"
              type="button"
              onClick={() => handleResult("close", closeResult)}
            >
              Close Result
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
