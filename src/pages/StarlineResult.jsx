import React, { useState, useEffect } from "react";
import useSWR from "swr";
import Spinner from "@/components/Spinner";
import {
  fetchData,
  postData,
  todayDateInIso,
  updateData,
} from "@/api/ClientFunction";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker } from "antd";
import SingleGameBet from "./SingleGameBet";
const today = todayDateInIso();
dayjs.extend(customParseFormat);
const dateFormat = "YYYY/MM/DD";
const weekFormat = "MM/DD";
const monthFormat = "YYYY/MM";
const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
const customWeekStartEndFormat = (value) =>
  `${dayjs(value).startOf("week").format(weekFormat)} ~ ${dayjs(value)
    .endOf("week")
    .format(weekFormat)}`;

export default function StarlineResult() {
  const [gameData, setGameData] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  let {
    data: datan,
    _,
    isLoading: betLoading,
  } = useSWR(
    selectedGame ? `admin/getallgamebet?gameid=${selectedGame}` : null,
    fetchData,
    { refreshInterval: 10000 }
  );
  useEffect(() => {
    if (datan && datan.data) {
      setGameData(datan.data);
    }
  }, [datan]);
  const [openResult, setOpenResult] = useState("");
  const [closeResult, setCloseResult] = useState("");
  const [games, setGames] = useState([]);

  const [date, setDate] = useState(today);
  const { data, error, isLoading } = useSWR(
    `game/getallgames?date=${date}`,
    fetchData
  );
  const onChange = (date, dateString) => {
    setDate(dateString);
  };

  useEffect(() => {
    if (data && data.data) {
      setGames(data.data.filter((item) => item.starline));
    }
  }, [data]);
  async function handleRevert() {
    toast.dismiss();
    if (!selectedGame) {
      return toast.error("Please Select a valid Game");
    }
    const res = await updateData(`admin/revertbid?gameid=${selectedGame}`, {});
    if (res.status || res.success) toast.success(res.message);
  }
  async function handleResult(gameType, result) {
    toast.dismiss();
    if (!selectedGame) {
      return toast.error("Please Select a valid Game");
    }
    if (`${result}`.length == 3) {
      const res = await postData("admin/setgameresult", {
        gameType,
        result,
        gameId: selectedGame,
      });
      if (res.status || res.success) toast.success(res.message);
    } else {
      toast.warning("Please enter valid Result");
    }
    gameType == "open" ? setOpenResult("") : setCloseResult("");
  }

  async function handleShowWinner(gameType, result) {
    toast.dismiss();
    if (!selectedGame) {
      return toast.error("Please Select a valid Game");
    }
    if (`${result}`.length == 3) {
      const res = await postData("admin/shownormalgamewinner", {
        gameType,
        result,
        gameId: selectedGame,
      });
      if (res.status || res.success) toast.success(res.message);
    } else {
      toast.warning("Please enter valid Result");
    }
    gameType == "open" ? setOpenResult("") : setCloseResult("");
  }

  async function handleResetWinner(gameType) {
    toast.dismiss();
    if (!selectedGame) {
      return toast.error("Please Select a valid Game");
    }
    const res = await postData("admin/resetwinner", {
      gameType,
      gameId: selectedGame,
    });
    if (res.status || res.success) toast.success(res.message);
  }

  async function handleUpdateResult(gameType, result) {
    toast.dismiss();
    if (!selectedGame) {
      return toast.error("Please Select a valid Game");
    }
    if (`${result}`.length == 3) {
      const res = await updateData("admin/updategameresult", {
        gameType,
        result,
        gameId: selectedGame,
      });
      if (res.status || res.success) toast.success(res.message);
    } else {
      toast.warning("Please enter valid Result");
    }
    gameType == "open" ? setOpenResult("") : setCloseResult("");
  }
  if (isLoading) return <Spinner />;
  return (
    <>
      <div className="max-w-4xl mx-auto p-4 bg-white shadow rounded-lg my-12">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800">
          Set Game Result
        </h2>
        <div className="flex">
          <DatePicker
            defaultValue={dayjs(date, dateFormat)}
            format={dateFormat}
            onChange={onChange}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="gameSelect"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            Select Game
          </label>
          <select
            id="gameSelect"
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            className="form-select w-full border-2 border-gray-400 rounded-lg p-2 text-lg shadow-sm focus:border-blue-500 "
          >
            <option value="">Select a game...</option>
            {games.map((game) => (
              <option key={game._id} value={game._id}>
                {game.name}&nbsp;{game.open}-{game.close}
              </option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
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
              className="w-full border-2  rounded-lg p-2 text-lg shadow-sm border-blue-500 "
            />
            <div className="flex gap-2">
              <div className="flex gap-2">
                <button
                  onClick={() => handleResult("open", openResult)}
                  className="mt-4 w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-150"
                >
                  Submit Open Result
                </button>
                <button
                  onClick={() => handleUpdateResult("open", openResult)}
                  className="mt-4 w-full md:w-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-150"
                >
                  Update Open Result
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleShowWinner("open", openResult)}
                  className="mt-4 w-full md:w-auto bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-150"
                >
                  Show Winner
                </button>
                <button
                  onClick={() => handleResetWinner("open")}
                  className="mt-4 w-full md:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-150"
                >
                  Reset Winner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {selectedGame && (
        <div className="flex justify-center mb-6">
          <button
            onClick={() => handleRevert()}
            className="mt-4 w-full md:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-150 "
          >
            Bid Revert
          </button>
        </div>
      )}
      {selectedGame && (
        <SingleGameBet gameData={gameData} isLoading={betLoading} />
      )}
    </>
  );
}
