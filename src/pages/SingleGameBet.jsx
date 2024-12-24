import {
  formatDate,
  formatDateWithTime,
  formatNumber,
  postData,
} from "@/api/ClientFunction";
import InputField from "@/components/InputField";
import SearchInput from "@/components/SearchInput";
import Spinner from "@/components/Spinner";
import { Dialog, Transition } from "@headlessui/react";
import { Table } from "antd";
import { Fragment, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { mutate } from "swr";

export default function SingleGameBet({ gameData, isLoading }) {
  const session = (item) => {
    if (item.betType == "dsd") {
      if (item.gameType == "open") return "left";
      return "right";
    } else if (item.betType == "hs") {
      if (item.openAnk) return "open";
      return "close";
    } else {
      return item.gameType;
    }
  };
  const navigate = useNavigate();
  const [betId, setBetId] = useState("");
  const [betSearch, setBetSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal(betId) {
    setBetId(betId);
    setIsOpen(true);
  }

  const columns = [
    {
      title: "User Name",
      key: "username",
      width: 200,
      className: "font-inter",
      render: (_, data) => (
        <div className="flex items-center gap-3 text-blue-500">
          <span
            className="font-500 font-inter cursor-pointer"
            onClick={() => navigate(`/userdetail/${data?.userId?._id}`)}
          >
            {data?.userId?.name || "*"}
          </span>
        </div>
      ),
    },
    // {
    //   title: "Phone",
    //   width: 200,
    //   key: "phone",

    //   className: "font-inter",
    //   render: (_, data) => (
    //     <div className="font-500 font-inter">{data?.userId?.phone || "*"}</div>
    //   ),
    // },
    // {
    //   title: "Email",
    //   key: "email",
    //   width: 300,
    //   className: "font-inter",
    //   render: (_, data) => (
    //     <div className="font-500 font-inter">{data?.userId?.email || "*"}</div>
    //   ),
    // },
    {
      title: "Game",
      key: "game",
      width: 100,

      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">{data?.gameId?.name || "*"}</div>
      ),
    },
    {
      title: "Bet Amount",
      key: "betamount",
      width: 120,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">{data.betAmount || "*"}</div>
      ),
    },
    {
      title: "Win Amount",
      key: "winamount",
      width: 120,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter text-yellow-500">
          {data.winAmount || "*"}
        </div>
      ),
    },
    // {
    //   title: "Win Amount",
    //   key: "winamount",
    //   width: 180,
    //   className: "font-inter",
    //   render: (_, data) => (
    //     <div className="font-500 font-inter">{data.winAmount || "*"}</div>
    //   ),
    // },
    {
      title: "BetType",
      key: "bettype",
      width: 120,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">{data.betType || "*"}</div>
      ),
    },
    {
      title: "Game Type",
      key: "gametype",
      width: 120,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">{session(data)}</div>
      ),
    },
    {
      title: "On Place",
      key: "onPlace",
      width: 100,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">
          {data.onPlace && (data.betType == "jd" || data.betType == "djd")
            ? formatNumber(2, data.onPlace)
            : data.betType == "sd" || data.betType == "dsd"
            ? data.onPlace
            : formatNumber(3, data.onPlace)}
        </div>
      ),
    },
    {
      title: "Open Panna",
      key: "opennumber",
      width: 120,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">
          {data.openNumber && formatNumber(3, data.openNumber)}
        </div>
      ),
    },
    {
      title: "Close Panna",
      key: "closenumber",
      width: 120,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">
          {data.closeNumber && formatNumber(3, data.closeNumber)}
        </div>
      ),
    },
    {
      title: "Open Ank",
      key: "openank",
      width: 120,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">{data.openAnk}</div>
      ),
    },
    {
      title: "Close Ank",
      key: "closeank",
      width: 120,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">{data.closeAnk}</div>
      ),
    },
    {
      title: "Status",
      key: "status",
      width: 100,
      className: "font-inter",
      render: (_, data) => (
        <div
          className={`font-500 font-inter ${
            data.status == "Pending"
              ? "text-blue-500"
              : data.status == "Win"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {data.status || "*"}
        </div>
      ),
    },
    {
      title: "Date",
      key: "date",
      width: 200,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter text-sm">
          {formatDate(data.createdAt) || "*"}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      className: "font-inter",
      render: (_, data) => (
        <div
          className="w-[50px] flex items-center justify-center gap-2"
          onClick={() => openModal(data._id)}
        >
          <span
            className="font-medium font-primary text-blue-500 cursor-pointer"
            title="Edit"
          >
            <CiEdit size={20} />
          </span>
        </div>
      ),
    },
  ];
  const filterData = (data, searchText) => {
    const searchTerm = searchText.trim()?.toLowerCase();
    if (!searchTerm) {
      return data;
    }
    return data.filter((item) => {
      const formattedDate = new Date(item.createdAt)
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
        .toLowerCase();

      return (
        item.userId?.name?.toLowerCase().includes(searchTerm) ||
        item.userId?.phone?.toString().toLowerCase().includes(searchTerm) ||
        item.gameId?.name?.toLowerCase().includes(searchTerm) ||
        item.betAmount?.toString().includes(searchTerm) ||
        item.winAmount?.toString().includes(searchTerm) ||
        item.betType?.toLowerCase().includes(searchTerm) ||
        item.gameType?.toLowerCase().includes(searchTerm) ||
        item.openNumber?.toString().includes(searchTerm) ||
        item.closeNumber?.toString().includes(searchTerm) ||
        item.openAnk?.toString().includes(searchTerm) ||
        item.closeAnk?.toString().includes(searchTerm) ||
        item.status?.toLowerCase().includes(searchTerm) ||
        formattedDate.includes(searchTerm)
      );
    });
  };
  if (isLoading) return <Spinner />;
  return (
    <>
      <SearchInput searchText={betSearch} setSearchText={setBetSearch} />
      <ChangeResultModal
        isOpen={isOpen}
        closeModal={closeModal}
        betId={betId}
      />
      <Table
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={filterData(gameData, betSearch)}
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

function ChangeResultModal({ isOpen, closeModal, betId }) {
  const [onPlace, setOnPlace] = useState("");
  const [closeAnk, setCloseAnk] = useState("");
  const [openAnk, setOpenAnk] = useState("");
  const [openNumber, setOpenNumber] = useState("");
  const [closeNumber, setCloseNumber] = useState("");

  async function sendRequest() {
    closeModal();
    if (!betId) {
      toast.error("BetId Not Persent");
      return;
    }
    const data = { onPlace, closeAnk, openAnk, openNumber, closeNumber, betId };
    const res = await postData("admin/changebetresult", data);
    if (res.success || res.status) {
      toast.success(res.message);
      mutate("admin/allbets");
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
                  className="text-xl font-medium leading-6 text-gray-900 text-center"
                >
                  Change Result
                </Dialog.Title>
                <div className="mt-4">
                  {[
                    {
                      label: "On Place (SD,JD,SP,DP,TP)",
                      name: "onPlace",
                      value: onPlace,
                      setter: setOnPlace,
                    },
                    {
                      label: "Open Ank (HS)",
                      name: "openAnk",
                      value: openAnk,
                      setter: setOpenAnk,
                    },
                    {
                      label: "Close Ank (HS)",
                      name: "closeAnk",
                      value: closeAnk,
                      setter: setCloseAnk,
                    },

                    {
                      label: "Open Number (HS,FS)",
                      name: "openNumber",
                      value: openNumber,
                      setter: setOpenNumber,
                    },
                    {
                      label: "Close Number (HS,FS)",
                      name: "closeNumber",
                      value: closeNumber,
                      setter: setCloseNumber,
                    },
                  ].map((field, index) => (
                    <div key={index} className="mb-4">
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-700"
                      >
                        {field.label}
                      </label>
                      <InputField
                        type="Number"
                        name={field.name}
                        value={field.value}
                        onChange={(e) => field.setter(e.target.value)}
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={sendRequest}
                  >
                    Submit Result
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
