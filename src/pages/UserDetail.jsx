import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { CiCircleMinus, CiCirclePlus, CiEdit } from "react-icons/ci";
import {
  fetchData,
  formatDate,
  formatNumber,
  updateData,
} from "@/api/ClientFunction";
import Spinner from "@/components/Spinner";
import { Table, Typography, Card } from "antd";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FiEye } from "react-icons/fi";
import { Dialog, Transition } from "@headlessui/react";
import { BASE_API_URL } from "@/api/Constant";
import SearchInput from "@/components/SearchInput";
const { Title } = Typography;
export default function UserDetail() {
  function formatTransactionType(type) {
    const types = {
      d: { text: "Deposit", color: "green" },
      w: { text: "Withdraw", color: "red" },
      b: { text: "Bonus", color: "blue" },
      p: { text: "Bet", color: "purple" }, // Updated color for "Bet"
      v: { text: "Winning", color: "green" }, // Updated color for "Winning"
    };

    const result = types[type] || { text: "Unknown type", color: "grey" };

    // Return a React element (JSX)
    return <span style={{ color: result.color }}>{result.text}</span>;
  }

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
  const columns = [
    {
      title: "Game",
      key: "game",
      width: 180,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">{data?.gameId?.name || "0"}</div>
      ),
    },
    {
      title: "Bet Amount",
      key: "betamount",
      width: 180,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">{data.betAmount || "0"}</div>
      ),
    },
    {
      title: "Win Amount",
      key: "winamount",
      width: 180,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">{data.winAmount || "0"}</div>
      ),
    },
    {
      title: "BetType",
      key: "bettype",
      width: 180,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">{data.betType || "0"}</div>
      ),
    },
    {
      title: "Game Type",
      key: "gametype",
      width: 180,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">{session(data)}</div>
      ),
    },
    {
      title: "On Place",
      key: "onPlace",
      width: 180,
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
      title: "Open Number",
      key: "opennumber",
      width: 180,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">
          {data.openNumber && formatNumber(3, data.openNumber)}
        </div>
      ),
    },
    {
      title: "Close Number",
      key: "closenumber",
      width: 180,
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
      width: 180,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">{data.openAnk}</div>
      ),
    },
    {
      title: "Close Ank",
      key: "closeank",
      width: 180,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">{data.closeAnk}</div>
      ),
    },
    {
      title: "Status",
      key: "status",
      width: 200,
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
          {data.status || "0"}
        </div>
      ),
    },
    {
      title: "Date",
      key: "date",
      width: 180,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">
          {formatDate(data.createdAt) || "0"}
        </div>
      ),
    },
  ];
  const transectionColums = [
    {
      title: "Money",
      key: "money",
      width: 180,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">{data.money}</div>
      ),
    },
    {
      title: "Type",
      key: "type",
      width: 180,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">
          {formatTransactionType(data?.type)}
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      width: 180,
      className: "font-inter",
      render: (_, data) => (
        <div
          className={`font-500 font-inter ${
            data.status == "Approved"
              ? "text-green-600"
              : data.status == "Rejected"
              ? "text-red-600"
              : "text-blue-500"
          }`}
        >
          {`${data.status}`}
        </div>
      ),
    },
    {
      title: "UTR Number",
      key: "utr",
      width: 200,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">{data.utr || "0"}</div>
      ),
    },
    // {
    //   title: "TransectionId",
    //   key: "transectionid",
    //   width: 200,
    //   className: "font-inter",
    //   render: (_, data) => (
    //     <div className="font-500 font-inter">{data.transectionId || "0"}</div>
    //   ),
    // },
    {
      title: "Date",
      key: "date",
      width: 180,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">
          {formatDate(data.createdAt) || "0"}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      className: "font-inter",
      render: (_, data) => (
        <>
          <div className="w-[50px] flex items-center gap-3">
            {data.status == "Pending" && data.type == "d" && (
              <>
                <span
                  title="Reject"
                  className=" font-primary text-red-600 cursor-pointer"
                >
                  <MdOutlineCancel
                    size={22}
                    onClick={() =>
                      handleDeposit("Rejected", data._id, userId, data.money)
                    }
                  />
                </span>
                <span
                  title="Approve"
                  className="font-primary cursor-pointer text-blue-500 "
                >
                  <IoMdCheckmarkCircleOutline
                    size={20}
                    onClick={() =>
                      handleDeposit("Approved", data._id, userId, data.money)
                    }
                  />
                </span>
              </>
            )}
            {/* {data.type =="d" && (
                <span
                  title="View"
                  className="font-primary cursor-pointer text-green-600 "
                >
                  <FiEye
                    size={20}
                    onClick={() => {
                      setIsOpen(!isOpen);
                      setImagePath(data.depositScreenshot);
                    }}
                  />
                </span>
              )} */}
            {data.status == "Pending" && data.type == "w" && (
              <>
                <span
                  title="Reject"
                  className=" font-primary text-red-600 cursor-pointer"
                >
                  <MdOutlineCancel
                    size={22}
                    onClick={() =>
                      handleWithdraw("Rejected", data._id, userId, data.money)
                    }
                  />
                </span>
                <span
                  title="Approve"
                  className="font-primary cursor-pointer text-blue-500 "
                >
                  <IoMdCheckmarkCircleOutline
                    size={20}
                    onClick={() =>
                      handleWithdraw("Approved", data._id, userId, data.money)
                    }
                  />
                </span>
              </>
            )}
          </div>
        </>
      ),
    },
  ];
  const { id: userId } = useParams();
  const [transectionText, setTransectionText] = useState("");
  const [betSearchText, setBetSearchText] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const [betData, setBetData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [imagePath, setImagePath] = useState("");
  const [transactionData, setTransactionData] = useState([]);
  const [summary, setSummary] = useState([]);
  const [edit, setEdit] = useState(false);
  const [money, setMoney] = useState();

  async function updateUserMoney(type) {
    toast.dismiss();
    if (!money || !type) {
      toast.error("Please Provide Type And Money");
    }
    const res = await updateData(`admin/updateuserbalance?userid=${userId}`, {
      money,
      type,
    });
    if (res.status || res.success) {
      toast.success(res.message);
      mutate(`admin/getuserinfo?userid=${userId}`);
    }
  }
  // filter data
  const filterTransactions = (transactionData, transactionSearch) => {
    if (!transactionSearch.trim()) {
      return transactionData;
    }
    const searchNormalized = transactionSearch.toLowerCase();
    return transactionData.filter((transaction) => {
      const moneyString = transaction?.money?.toString().toLowerCase();
      const statusNormalized = transaction?.status?.toLowerCase();
      const utrString = transaction?.utr?.toString().toLowerCase();
      const transectionId = transaction?.transectionId
        ?.toString()
        .toLowerCase();
      const dateString = new Date(transaction?.createdAt)
        .toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        .toLowerCase();
      let typeString = "";
      if (transaction.type.toLowerCase() == "w") typeString = "withdraw";
      if (transaction.type.toLowerCase() == "d") typeString = "deposit";
      if (transaction.type.toLowerCase() == "b") typeString = "bonus";
      return (
        moneyString?.includes(searchNormalized) ||
        statusNormalized?.includes(searchNormalized) ||
        typeString?.includes(searchNormalized) ||
        utrString?.includes(searchNormalized) ||
        transectionId?.includes(searchNormalized) ||
        dateString?.includes(searchNormalized)
      );
    });
  };
  const filterBets = (betData, betSearchText) => {
    if (!betSearchText.trim()) {
      return betData;
    }
    const searchNormalized = betSearchText.toLowerCase();

    return betData.filter((item) => {
      const dateMatch = new Date(item.createdAt)
        .toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
        .toLowerCase();
      const gameIdName = item.gameId?.name?.toLowerCase() || "";
      const betAmount = item.betAmount?.toString();
      const winAmount = item.winAmount?.toString();
      const betType = item.betType?.toLowerCase() || "";
      const gameType = item.gameType?.toLowerCase() || "";
      const onPlace = item.onPlace?.toString();
      const openNumber = item.openNumber?.toString();
      const closeNumber = item.closeNumber?.toString();
      const openAnk = item.openAnk?.toString();
      const closeAnk = item.closeAnk?.toString();
      const status = item.status?.toLowerCase() || "";

      // Check if any of the search conditions match
      return (
        gameIdName.includes(searchNormalized) ||
        betAmount?.includes(searchNormalized) ||
        winAmount?.includes(searchNormalized) ||
        betType.includes(searchNormalized) ||
        gameType.includes(searchNormalized) ||
        onPlace?.includes(searchNormalized) ||
        openNumber?.includes(searchNormalized) ||
        closeNumber?.includes(searchNormalized) ||
        openAnk?.includes(searchNormalized) ||
        closeAnk?.includes(searchNormalized) ||
        status.includes(searchNormalized) ||
        dateMatch.includes(searchNormalized)
      );
    });
  };

  const { data, error, isLoading } = useSWR(
    `admin/getuserinfo?userid=${userId}`,
    fetchData
  );
  async function handleWithdraw(status, withdrawId, userId, money) {
    const res = await updateData("admin/acceptwithdraw", {
      status: status,
      withdrawId,
      userId,
      money,
    });
    if (res.status || res.success) {
      toast.success(res.message);
      mutate(`admin/getuserinfo?userid=${userId}`);
    }
  }
  useEffect(() => {
    if (data && data.data) {
      const { userProfile, allBets, allTransections, summary } = data.data;
      setUserProfile(userProfile);
      setBetData(allBets);
      setTransactionData(allTransections);
      setSummary(summary);
    }
  }, [data]);
  async function handleDeposit(status, depositId, userId, money) {
    const res = await updateData("admin/acceptdeposit", {
      status: status,
      depositId,
      userId,
      money,
    });
    if (res.status || res.success) {
      toast.success(res.message);
      mutate(`admin/getuserinfo?userid=${userId}`);
    }
  }
  if (isLoading) return <Spinner />;
  if (!userProfile) return <div>Loading...</div>;

  if (isLoading) return <Spinner />;
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <>
      <Card bordered={false}>
        <Title level={4}>User Profile</Title>
        <div className="p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldDisplay label="Name" value={userProfile.name} />
            <FieldDisplay label="Password" value={userProfile.password} />
            <FieldDisplay label="Phone" value={userProfile.phone} />
            <div className="flex  md:flex-row justify-between text-sm md:text-base mb-2">
              <strong className="mr-2">Money:</strong>
              <div className="flex gap-2 items-center justify-center cursor-pointer">
                <div className="font-medium">{userProfile.money || "0"}</div>
                {!edit && (
                  <div
                    title="Edit"
                    className="text-blue-600"
                    onClick={() => setEdit(true)}
                  >
                    <CiEdit size={24} />
                  </div>
                )}
                {edit && (
                  <>
                    <input
                      type="Number"
                      value={money}
                      onChange={(e) => setMoney(e.target.value)}
                      className=" px-2 text-base max-w-[100px] border-2 border-black focus:outline-none"
                    />
                    <div
                      title="Add Funds"
                      className="text-blue-600"
                      onClick={() => {
                        updateUserMoney("add");
                        setEdit(false);
                      }}
                    >
                      <CiCirclePlus size={24} />
                    </div>
                    <div
                      title="Minus Funds"
                      className="text-red-600"
                      onClick={() => {
                        updateUserMoney("minus");
                        setEdit(false);
                      }}
                    >
                      <CiCircleMinus size={24} />
                    </div>
                  </>
                )}
              </div>
            </div>
            <FieldDisplay label="Status" value={userProfile.status} />
            <FieldDisplay label="Refer Code" value={userProfile.referCode} />
            <FieldDisplay label="Paytm UPI" value={userProfile.paytmUpi} />
            <FieldDisplay
              label="Google Pay UPI"
              value={userProfile.googleUpi}
            />
            <FieldDisplay label="PhonePe UPI" value={userProfile.phonepeUpi} />
            <FieldDisplay label="Bank Name" value={userProfile.bankName} />
            <FieldDisplay
              label="Account Number"
              value={userProfile.accountNumber}
            />
            <FieldDisplay label="IFSC Code" value={userProfile.ifsc} />
            <FieldDisplay label="Account Holder Name" value={userProfile.ahn} />
            <FieldDisplay label="Branch Address" value={userProfile.branch} />
            <FieldDisplay label="Total Winning" value={summary.totalVA} />
            <FieldDisplay label="Today Winning" value={summary.todayVA} />
            <FieldDisplay label="Total Deposit" value={summary.totalDA} />
            <FieldDisplay label="Today Deposit" value={summary.todayDA} />
            <FieldDisplay label="Total Bet" value={summary.totalBA} />
            <FieldDisplay label="Today Bet" value={summary.todayBA} />
            <FieldDisplay label="Total Withdraw" value={summary.totalWA} />
            <FieldDisplay label="Today Withdraw" value={summary.todayWA} />
          </div>
        </div>
      </Card>
      <Card bordered={false} className="mt-12">
        <Title level={4}>Player All Bets</Title>
        <SearchInput
          searchText={betSearchText}
          setSearchText={setBetSearchText}
        />
        <Table
          scroll={{ x: "max-content" }}
          columns={columns}
          dataSource={filterBets(betData, betSearchText)}
          pagination={{
            pageSizeOptions: ["25", "50", "100", "250", "500"], // Define the options for rows per page selection
            showSizeChanger: true, // Display the rows per page selector
            showQuickJumper: true, // Display quick jump to page input
            defaultPageSize: 25, // Default number of rows per page
          }}
        />
      </Card>
      <Card bordered={false} className="mt-12">
        <Title level={4}>Player All Transactions</Title>
        <SearchInput
          searchText={transectionText}
          setSearchText={setTransectionText}
        />
        <Table
          scroll={{ x: "max-content" }}
          columns={transectionColums}
          dataSource={filterTransactions(transactionData, transectionText)}
          pagination={{
            pageSizeOptions: ["25", "50", "100", "250", "500"], // Define the options for rows per page selection
            showSizeChanger: true, // Display the rows per page selector
            showQuickJumper: true, // Display quick jump to page input
            defaultPageSize: 25, // Default number of rows per page
          }}
        />
      </Card>
      {isOpen && (
        <RechargeModal
          closeModal={closeModal}
          imagePath={imagePath}
          isOpen={isOpen}
        />
      )}
    </>
  );
}

function RechargeModal({ isOpen, closeModal, imagePath }) {
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
                  Deposit Screenshot
                </Dialog.Title>
                <div>
                  <img src={`${BASE_API_URL}/${imagePath}`} />
                </div>
                <div className="mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    Close
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

const FieldDisplay = ({ label, value }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between text-sm md:text-base mb-2">
      <strong className="mr-2">{label}:</strong>
      <span>{value || "0"}</span>
    </div>
  );
};
