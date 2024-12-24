import {
  deleteData,
  fetchData,
  formatNumber,
  postData,
  todayDateInIso,
  updateData,
} from "@/api/ClientFunction";
import { Table } from "antd";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useSWR, { mutate } from "swr";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import { AutoComplete } from "antd";
import { useNavigate } from "react-router-dom";
import SearchInput from "@/components/SearchInput";
const today = todayDateInIso();
async function deleteGame(data) {
  toast.dismiss();
  const id = data._id;
  if (!id) return;
  const res = await deleteData(`game/deletegame?gameid=${id}`);
  if (res.success || res.status) {
    toast.success(res.message);
    mutate(`game/getallgames?date=${today}`);
  }
}
async function handleRevert(gameid) {
  toast.dismiss();
  if (!gameid) {
    return toast.error("Please Select a valid Game");
  }
  const res = await updateData(`admin/revertbid?gameid=${gameid}`, {});
  if (res.status || res.success) toast.success(res.message);
}
async function deleteGameResult(gameType, gameId) {
  toast.dismiss();
  if (!gameId || !gameType) return;
  const res = await updateData(`admin/deletegameresult`, { gameType, gameId });
  if (res.success || res.status) {
    toast.success(res.message);
    mutate(`game/getallgames?date=${today}`);
  }
}

async function gameStatusUpdate(status, gameId) {
  if (!status || !gameId) {
    toast.error("GameId or status not persent");
  }
  const res = await updateData("admin/setgamestatus", { status, gameId });
  if (res.success || res.status) {
    toast.success(res.message);

    mutate(`game/getallgames?date=${today}`);
  }
}
export default function Game() {
  const [openCalendarModal, setOpenCalenderModel] = useState(false);
  const columns = [
    {
      title: "Game Name",
      width: 150,
      className: "font-inter",
      render: (_, data) => (
        <div className="flex items-center gap-3 text-blue-500 cursor-pointer">
          <span
            className="font-500 font-inter"
            data-gameId={data._id}
            // onClick={() => navigate(`/gamecontrol/${data._id}`)}
          >
            {data.name}
          </span>
        </div>
      ),
    },
    {
      title: "Opening Time",
      width: 150,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">{data.open}</div>
      ),
    },

    {
      title: "Closing Time",
      width: 150,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">{data.close}</div>
      ),
    },
    {
      title: "Opening Result",
      width: 150,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">
          {data.openResult == 5000
            ? "Not Define"
            : formatNumber(3, data.openResult)}
        </div>
      ),
    },

    {
      title: "Jodi Result",
      width: 150,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">
          {/* {data.combination == 5000
            ? "Not Define"
            : formatNumber(2, data.combination)} */}
          {data.openAnk != 5000 && String(data.openAnk)}
          {data.closeAnk != 5000 && String(data.closeAnk)}
          {data.openResult === 5000 && data.delhi == false && "Not Define"}
        </div>
      ),
    },
    {
      title: "Closing Result",
      width: 150,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">
          {data.closeResult == 5000
            ? "Not Define"
            : formatNumber(3, data.closeResult)}
        </div>
      ),
    },
    {
      title: "GameType",
      width: 150,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter text-red-500">
          {!data.delhi && !data.starline
            ? "Normal"
            : data.delhi
            ? "Delhi"
            : "Starline"}
        </div>
      ),
    },
    {
      title: "Status",
      width: 150,
      className: "font-inter",
      render: (_, data) => (
        <div
          className={`font-500 font-inter capitalize ${
            data.status == "active" ? "text-green-600" : "text-red-600"
          }`}
        >
          {data.status}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",

      className: "font-inter",
      render: (_, data) => (
        <div className=" flex items-center justify-center gap-2">
          <button
            className="font-primary text-pink-600 cursor-pointer bg-transparent border border-pink-600 py-2 px-4 rounded hover:bg-pink-600 hover:text-white transition-colors duration-300"
            title="Edit"
            onClick={() => editGame(data._id)}
          >
            Edit
          </button>
          <button
            className="font-medium font-primary deleteUrl text-purple-500 cursor-pointer bg-transparent border border-purple-600 py-2 px-4 rounded hover:bg-purple-600 hover:text-white transition-colors duration-300"
            title="Delete"
            onClick={() => deleteGame(data)}
          >
            Delete Game
          </button>
          {data.status == "active" && (
            <button
              className="font-primary text-red-600 cursor-pointer bg-transparent border border-red-600 py-2 px-4 rounded hover:bg-red-600 hover:text-white transition-colors duration-300"
              title="Close"
              onClick={() => gameStatusUpdate("close", data._id)}
            >
              Close
            </button>
          )}
          {data.status == "close" && (
            <button
              className="font-primary text-green-600 cursor-pointer bg-transparent border border-green-600 py-2 px-4 rounded hover:bg-green-600 hover:text-white transition-colors duration-300"
              title="Open"
              onClick={() => gameStatusUpdate("active", data._id)}
            >
              Open
            </button>
          )}
          <button
            className="font-primary text-blue-500 cursor-pointer bg-transparent border border-blue-500 py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300"
            title="Calendar"
            onClick={() => {
              setGameId(data._id);
              setUniqueId(data.uniqueId);
              setOpenCalenderModel(true);
            }}
          >
            Calendar
          </button>
          <button
            className="font-primary text-purple-600 cursor-pointer bg-transparent border border-purple-600 py-2 px-4 rounded hover:bg-purple-600 hover:text-white transition-colors duration-300"
            title="Delete"
            onClick={() => deleteGameResult("open", data._id)}
          >
            Delete Open Result
          </button>
          <button
            className="font-primary text-green-600 cursor-pointer bg-transparent border border-green-600 py-2 px-4 rounded hover:bg-green-700 hover:text-white transition-colors duration-300"
            title="Delete"
            onClick={() => deleteGameResult("close", data._id)}
          >
            Delete Close Result
          </button>
          <button
            className="font-primary text-pink-600 cursor-pointer bg-transparent border border-pink-600 py-2 px-4 rounded hover:bg-pink-600 hover:text-white transition-colors duration-300"
            title="Delete"
            onClick={() => handleRevert(data._id)}
          >
            Bid Revert
          </button>
        </div>
      ),
    },
  ];
  const [gameSearch, setGameSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [uniqueId, setUniqueId] = useState();
  const [gameId, setGameId] = useState();
  const [isGameOpen, setIsGameOpen] = useState(false);
  function editGame(id) {
    setGameId(id);
    setIsGameOpen(true);
  }
  function closeEditGame() {
    setIsGameOpen(false);
  }
  const navigate = useNavigate();
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const [gameData, setGameData] = useState([]);

  const [date, setDate] = useState(today);
  const { data, error, isLoading } = useSWR(
    `game/getallgames?date=${date}`,
    fetchData
  );

  useEffect(() => {
    if (data && data.data) {
      setGameData(data.data);
    }
  }, [data]);
  if (isLoading) return <Spinner />;
  const filterGames = (gamesData, searchText) => {
    if (!searchText.trim()) return gamesData;
    const searchLower = searchText.toLowerCase();
    return gamesData.filter((game) => {
      const nameLower = game.name?.toLowerCase();
      const openLower = game.open?.toLowerCase();
      const closeLower = game.close?.toLowerCase();
      const openResult = game.openResult?.toString();
      const closeResult = game.closeResult?.toString();
      const combination = game.combination?.toString();
      const statusLower = game.status?.toLowerCase();
      const category =
        !game.delhi && !game.starline
          ? "Normal"
          : game.delhi
          ? "Delhi"
          : "Starline";
      const categoryLower = category.toLowerCase(); // Convert dynamic category to lower case

      return (
        nameLower?.includes(searchLower) ||
        openLower?.includes(searchLower) ||
        closeLower?.includes(searchLower) ||
        openResult?.includes(searchLower) ||
        closeResult?.includes(searchLower) ||
        combination?.includes(searchLower) ||
        statusLower?.includes(searchLower) ||
        categoryLower.includes(searchLower)
      );
    });
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 mb-6 px-4 rounded"
      >
        Create Game
      </button>
      <SearchInput searchText={gameSearch} setSearchText={setGameSearch} />
      <GameModal isOpen={isOpen} closeModal={closeModal} />
      <EditGameModal
        isOpen={isGameOpen}
        closeModal={closeEditGame}
        gameId={gameId}
      />
      <CalendarModal
        isOpen={openCalendarModal}
        closeModal={() => {
          setOpenCalenderModel(false);
        }}
        gameId={gameId}
        uniqueId={uniqueId}
      />
      <Table
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={filterGames(gameData, gameSearch)}
        pagination={{
          pageSizeOptions: ["25", "50", "100", "250", "500"], // Define the options for rows per page selection
          showSizeChanger: true, // Display the rows per page selector
          showQuickJumper: true, // Display quick jump to page input
          defaultPageSize: 25, // Default number of rows per page
        }}
      />
    </>
  );
}
function generateTimeArray() {
  const times = [];
  let hour = 2;
  let minute = 30;
  while (!(hour == 24 && minute == 0)) {
    let timeString = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;
    times.push({ label: timeString, value: timeString });
    minute += 5;
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }
  return times;
}
const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

const times = generateTimeArray();

function GameModal({ isOpen, closeModal }) {
  const [gameName, setGameName] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [options, setOptions] = useState([]);
  const [delhi, setDelhi] = useState("Non-Delhi");
  const [starline, setStarline] = useState("Non-Starline");
  const resetStates = () => {
    setGameName("");
    setOpenTime("02:30");
    setCloseTime("02:30");
  };
  const sendRequest = async () => {
    toast.dismiss();
    // if (!gameName || !openTime || !closeTime) {
    //   toast.error("Please fill all details");
    //   return;
    // }
    const openDateTime = new Date(`2022-01-01 ${openTime}`);
    const closeDateTime = new Date(`2022-01-01 ${closeTime}`);
    // if (
    //   closeDateTime <= openDateTime ||
    //   closeDateTime.getHours() - openDateTime.getHours() < 1
    // ) {
    //   toast.error(
    //     "Close time should be greater than open time and there should be a minimum gap of 1 hour"
    //   );
    //   closeModal();
    //   return;
    // }
    const data = {
      name: gameName,
      open: openTime,
      close: closeTime,
      delhi: delhi == "Delhi" ? true : false,
      starline: starline == "Starline" ? true : false,
    };
    const res = await postData("game/create", data);

    if (res.success || res.status) {
      toast.success(res.message);
      closeModal();
      resetStates();

      mutate(`game/getallgames?date=${today}`);
    } else {
      closeModal();
      resetStates();
    }
    setDelhi("Non-Delhi");
    setStarline(false);
    setOpenTime("");
    setCloseTime("");
  };
  const selectTime = (state, e) => {
    if (state == "open") {
      setOpenTime(e);
      setOptions(times);
    } else {
      setCloseTime(e);
      setOptions(times);
    }
  };

  const handleSearch = (searchText) => {
    setOptions(() => {
      if (!searchText) {
        return times;
      }
      const filteredTimes = options.filter((time) =>
        time.label.toLowerCase().startsWith(searchText.toLowerCase())
      );
      if (!filteredTimes.length) {
        return times;
      }
      return filteredTimes;
    });
  };

  useEffect(() => {
    setOptions(times);
  }, []);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => console.log("Close")}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium  leading-6 text-gray-900 text-center"
                >
                  Add New Game
                </Dialog.Title>
                <div className="mt-6">
                  <label className="text-lg px-[2px]  font-medium  leading-6 text-gray-900 text-center">
                    Game Name
                  </label>
                  <input
                    className="appearance-none border mt-2  rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Enter Game Name"
                    required
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                  />
                </div>
                <div className="mt-3">
                  <label className="text-lg px-[2px]  font-medium  leading-6 text-gray-900 text-center">
                    Open Time
                  </label>
                  <AutoComplete
                    options={options}
                    onSelect={(e) => selectTime("open", e)}
                    onSearch={handleSearch}
                    placeholder="input here"
                    className="block mt-1 appearance-none w-full  bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    popupClassName="block mt-1 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mt-3">
                  <label className="text-lg px-[2px]  font-medium  leading-6 text-gray-900 text-center">
                    Close Time
                  </label>
                  <AutoComplete
                    options={options}
                    onSelect={(e) => selectTime("close", e)}
                    onSearch={handleSearch}
                    placeholder="input here"
                    className="block mt-1 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    popupClassName="block mt-1 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mt-3">
                  <label className="text-lg px-[2px]  font-medium  leading-6 text-gray-900 text-center">
                    Category
                  </label>
                  <select
                    className="block mt-1 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => {
                      setDelhi(e.target.value);
                      setStarline(e.target.value);
                    }}
                    value={delhi}
                  >
                    {["Normal", "Delhi", "Starline"].map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={sendRequest}
                  >
                    Create Game
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function EditGameModal({ isOpen, closeModal, gameId }) {
  const titleRef = useRef();
  const descriptionRef = useRef();

  async function sendRequest() {
    closeModal();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    if (!title.trim() || !description.trim()) {
      return toast.error("Invalid Input Data");
    }
    if (title.trim().length !== 5 || description.trim().length !== 5) {
      return toast.warning(
        "Open and Close Time should be like 02:15 or 11:55 format"
      );
    }
    const data = {
      open: title.trim(),
      close: description.trim(),
    };
    const res = await updateData(`admin/editgame?gameid=${gameId}`, data);
    if (res.success || res.status) {
      toast.success(res.message);

      mutate(`game/getallgames?date=${today}`);
    }
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => console.log("Close")}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>
        <form className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-xl font-medium  leading-6 text-gray-900 text-center"
                >
                  Edit Game
                </Dialog.Title>
                <div className="mt-6">
                  <label className="text-lg px-[2px]  font-medium  leading-6 text-gray-900 text-center">
                    Open Time
                  </label>
                  <input
                    className="appearance-none border mt-2  rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Enter Open Time ( Format 00:30 )"
                    required
                    ref={titleRef}
                  />
                </div>
                <div className="mt-6">
                  <label className="text-lg px-[2px]  font-medium  leading-6 text-gray-900 text-center">
                    Close Time
                  </label>
                  <input
                    className="appearance-none border mt-2  rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Enter Close Time ( Format 00:30 )"
                    required
                    ref={descriptionRef}
                  />
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={sendRequest}
                  >
                    Update
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </form>
      </Dialog>
    </Transition>
  );
}

function CalendarModal({ isOpen, closeModal, uniqueId }) {
  const { data, setData } = useSWR(
    uniqueId ? `admin/fetchsinglegame?uniqueid=${uniqueId}` : null,
    fetchData,
    { refreshInterval: 2000 }
  );
  const [days, setDays] = useState({
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });
  useEffect(() => {
    if (data && data?.data) {
      setDays({
        sunday: data?.data?.sunday || false,
        monday: data?.data?.monday || false,
        tuesday: data?.data?.tuesday || false,
        wednesday: data?.data?.wednesday || false,
        thursday: data?.data?.thursday || false,
        friday: data?.data?.friday || false,
        saturday: data?.data?.saturday || false,
      });
    }
  }, [data]);
  const handleCheckboxChange = (day) => {
    setDays((prevDays) => ({ ...prevDays, [day]: !prevDays[day] }));
  };

  async function sendRequest() {
    closeModal();
    const res = await updateData(`admin/setgameopenday`, { ...days, uniqueId });
    if (res.success || res.status) {
      toast.success(res.message);
    }
    setDays({
      sunday: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
    });
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => console.log("Close")}
      >
        <div className="flex min-h-screen items-center justify-center p-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-lg transition-all">
              <Dialog.Title
                as="h3"
                className="text-lg font-semibold leading-6 text-gray-900 text-center"
              >
                Edit Game Days
              </Dialog.Title>
              <div className="mt-4 space-y-4">
                {Object.keys(days).map((day) => (
                  <div key={day} className="flex items-center justify-between">
                    <label className="text-md font-medium text-gray-900">
                      {day.charAt(0).toUpperCase() + day.slice(1)}
                    </label>
                    <input
                      type="checkbox"
                      checked={days[day]}
                      onChange={() => handleCheckboxChange(day)}
                      className="ml-4 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={sendRequest}
                >
                  Update
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
