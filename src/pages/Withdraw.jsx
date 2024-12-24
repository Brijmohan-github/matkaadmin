import downloadExcel, {
  fetchData,
  formatDate,
  updateData,
} from "@/api/ClientFunction";
import { Table } from "antd";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import SearchInput from "@/components/SearchInput";
import { FaWhatsapp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
export default function Withdraw() {
  const navigate = useNavigate();
  const [withdrawData, setWithdrawData] = useState([]);
  const { data, error, isLoading } = useSWR("admin/getallwithdraw", fetchData, {
    refreshInterval: 10000,
  });

  useEffect(() => {
    if (data && data.data.allWithdraw) {
      setWithdrawData(data.data.allWithdraw);
    }
  }, [data]);
  async function handleWithdraw(status, withdrawId, userId, money) {
    const res = await updateData("admin/acceptwithdraw", {
      status: status,
      withdrawId,
      userId,
      money,
    });
    if (res.status) {
      toast.success(res.message);
      mutate("admin/getallwithdraw");
    }
  }
  const [withdrawSearch, setWithDrawSearch] = useState("");
  const columns = [
    {
      title: "User Name",
      key: "username",
      width: 200,
      className: "font-inter",
      render: (_, data) => (
        <div className="flex items-center gap-3 text-blue-500 cursor-pointer">
          <span
            className="font-500 font-inter cursor-pointer"
            onClick={() => navigate(`/userdetail/${data?.userId?._id}`)}
          >
            {data?.userId?.name || "*"}
          </span>
        </div>
      ),
    },
    {
      title: "Phone",
      width: 200,
      key: "phone",
      className: "font-inter",
      render: (_, data) => (
        <div className="flex items-center gap-2 font-500 font-inter">
          {data?.userId?.phone}
          <a
            href={`https://wa.me/+91${data?.userId?.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
          >
            <FaWhatsapp size={20} color="green" />
          </a>
        </div>
      ),
    },
    // {
    //   title: "Email",
    //   key: "email",
    //   width: 250,
    //   className: "font-inter",
    //   render: (_, data) => (
    //     <div className="font-500 font-inter">{data.userId.email || "*"}</div>
    //   ),
    // },
    {
      title: "Wallet Amount",
      key: "walletamount",
      width: 180,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-600 font-inter text-red-600">
          {data?.userId?.money || "0"}
        </div>
      ),
    },
    {
      title: "Money",
      key: "money",
      width: 150,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter text-purple-600">
          {data.money || "0"}
        </div>
      ),
    },
    {
      title: "Bank Name",
      key: "bankname",
      width: 150,
      className: "font-inter",
      render: (_, data) => (
        <div
          className="font-500 font-inter"
          onClick={() =>
            navigator.clipboard.writeText(data?.userId?.bankName || "")
          }
        >
          {data?.userId?.bankName || "*"}
        </div>
      ),
    },
    {
      title: "Account Holder Name",
      key: "ahn",
      width: 200,
      className: "font-inter",
      render: (_, data) => (
        <div
          className="font-500 font-inter"
          onClick={() => navigator.clipboard.writeText(data?.userId?.ahn || "")}
        >
          {data?.userId?.ahn || "*"}
        </div>
      ),
    },
    {
      title: "Account Number",
      key: "account",
      width: 150,
      className: "font-inter",
      render: (_, data) => (
        <div
          className="font-500 font-inter"
          onClick={() =>
            navigator.clipboard.writeText(data?.userId?.accountNumber || "")
          }
        >
          {data?.userId?.accountNumber || "*"}
        </div>
      ),
    },
    {
      title: "Ifsc Code",
      key: "ifsc",
      width: 150,
      className: "font-inter",
      render: (_, data) => (
        <div
          className="font-500 font-inter"
          onClick={() =>
            navigator.clipboard.writeText(data?.userId?.ifsc || "")
          }
        >
          {data?.userId?.ifsc || "*"}
        </div>
      ),
    },
    {
      title: "Paytm Upi",
      key: "paytmupi",
      width: 150,
      className: "font-inter",
      render: (_, data) => (
        <div
          className="font-500 font-inter"
          onClick={() =>
            navigator.clipboard.writeText(data?.userId?.paytmUpi || "")
          }
        >
          {data?.userId?.paytmUpi || "*"}
        </div>
      ),
    },
    {
      title: "Google Upi",
      key: "googleupi",
      width: 150,
      className: "font-inter",
      render: (_, data) => (
        <div
          className="font-500 font-inter"
          onClick={() =>
            navigator.clipboard.writeText(data?.userId?.googleUpi || "")
          }
        >
          {data?.userId?.googleUpi || "*"}
        </div>
      ),
    },
    {
      title: "PhonePe Upi",
      key: "phonepeupi",
      width: 150,
      className: "font-inter",
      render: (_, data) => (
        <div
          className="font-500 font-inter"
          onClick={() =>
            navigator.clipboard.writeText(data?.userId?.phonepeUpi || "")
          }
        >
          {data?.userId?.phonepeUpi || "*"}
        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      width: 150,
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
      title: "Date",
      key: "date",
      width: 200,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">{formatDate(data.createdAt)}</div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 120,
      className: "font-inter",
      render: (_, data) => (
        <>
          {data.status == "Pending" && (
            <div className=" flex items-center gap-3">
              <button
                title="Reject"
                className="font-primary text-red-600 cursor-pointer bg-transparent border border-red-600 py-2 px-4 rounded hover:bg-red-600 hover:text-white transition-colors duration-300"
                onClick={() =>
                  handleWithdraw(
                    "Rejected",
                    data._id,
                    data.userId._id,
                    data.money
                  )
                }
              >
                Reject
              </button>
              <button
                title="Approve"
                className="font-primary cursor-pointer text-blue-500 bg-transparent border border-blue-500 py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300"
                onClick={() =>
                  handleWithdraw(
                    "Approved",
                    data._id,
                    data.userId._id,
                    data.money
                  )
                }
              >
                Approve
              </button>
            </div>
          )}
        </>
      ),
    },
  ];
  if (isLoading) return <Spinner />;
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const filterData = (data, searchTerm) => {
    if (!searchTerm.trim()) {
      return data;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return data.filter((item) => {
      const formattedDate = formatDate(item?.createdAt).toLowerCase();
      return (
        item?.userId?.name?.toLowerCase().includes(lowerCaseSearchTerm) ||
        // item?.userId?.email?.toLowerCase().includes(lowerCaseSearchTerm) ||
        item?.userId?.phone
          ?.toString()
          .toLowerCase()
          .includes(lowerCaseSearchTerm) ||
        item?.money?.toString().toLowerCase().includes(lowerCaseSearchTerm) ||
        item?.utr?.toString().toLowerCase().includes(lowerCaseSearchTerm) ||
        item?.status?.toLowerCase().includes(lowerCaseSearchTerm) ||
        formattedDate.includes(lowerCaseSearchTerm) ||
        item?.userId?.bankName?.toLowerCase().includes(lowerCaseSearchTerm) ||
        item?.userId?.ahn?.toLowerCase().includes(lowerCaseSearchTerm) ||
        item?.userId?.accountNumber
          ?.toString()
          .toLowerCase()
          .includes(lowerCaseSearchTerm) ||
        item?.userId?.ifsc?.toLowerCase().includes(lowerCaseSearchTerm) ||
        item?.userId?.paytmUpi?.toLowerCase().includes(lowerCaseSearchTerm) ||
        item?.userId?.googleUpi?.toLowerCase().includes(lowerCaseSearchTerm) ||
        item?.userId?.phonepeUpi?.toLowerCase().includes(lowerCaseSearchTerm)
      );
    });
  };

  return (
    <>
      <SearchInput
        searchText={withdrawSearch}
        setSearchText={setWithDrawSearch}
      />
      <button
        onClick={() => downloadExcel(withdrawData)}
        style={{
          backgroundColor: "#228be6", // Green background
          color: "white", // White text
          padding: "10px 20px", // Padding around the text
          border: "none", // No border
          borderRadius: "5px", // Rounded corners
          cursor: "pointer", // Pointer cursor on hover
          fontSize: "16px", // Font size
          margin: "10px", // Margin around the button
        }}
      >
        Download as Excel
      </button>
      <Table
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={filterData(withdrawData, withdrawSearch)}
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
