import { fetchData, formatDate, updateData } from "@/api/ClientFunction";
import { Table } from "antd";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { TiCancelOutline } from "react-icons/ti";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import { useNavigate } from "react-router-dom";
import SearchInput from "@/components/SearchInput";
import { FaWhatsapp } from "react-icons/fa6";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { MdOutlineCancel } from "react-icons/md";

import downloadExcel from "@/api/ClientFunction";

export default function Users() {
  async function ChangeShowStatus(status, userId) {
    if (!status || !userId) {
      toast.error("userId or show not persent");
    }
    const res = await updateData(`admin/showusergame?userid=${userId}`, {
      show: status,
    });
    if (res.success || res.status) {
      toast.success(res.message);
      mutate("admin/getalluser");
    }
  }
  const columns = [
    {
      title: "User Name",
      key: "username",
      width: 200,
      className: "font-inter",
      render: (_, data) => (
        <div
          className="flex items-center gap-3  text-blue-500 cursor-pointer"
          onClick={() => navigate(`/userdetail/${data._id}`)}
        >
          <span className="font-500 font-inter">{data?.name}</span>
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
          {data?.phone}
          <a
            href={`https://wa.me/+91${data.phone}`}
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
    //   width: 300,
    //   className: "font-inter",
    //   render: (_, data) => (
    //     <div className="font-500 font-inter">{data.email}</div>
    //   ),
    // },
    {
      title: "Password",
      key: "password",
      width: 180,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">{data?.password}</div>
      ),
    },
    {
      title: "Money",
      key: "money",
      width: 180,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-600 font-inter text-purple-600">{data?.money}</div>
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
            data?.status == "Approved" ? "text-green-600" : "text-red-600"
          }`}
        >
          {data?.status}
        </div>
      ),
    },
    {
      title: "Date",
      key: "date",
      width: 200,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">{formatDate(data?.createdAt)}</div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      width: 150,
      className: "font-inter",
      render: (_, data) => (
        <div className="w-[50px] flex items-center gap-3">
          {data?.status == "Approved" && (
            <button
              className="font-primary text-red-600 cursor-pointer bg-transparent border border-red-600 py-2 px-4 rounded hover:bg-red-600 hover:text-white font-medium transition-colors duration-300"
              title="Reject"
              onClick={() => handleChangeStatus("Rejected", data._id)}
            >
              Reject
            </button>
          )}
          {data?.status == "Rejected" && (
            <button
              className="font-primary text-green-600 cursor-pointer bg-transparent border border-green-600 py-2 px-4 rounded hover:bg-green-600 hover:text-white font-medium transition-colors duration-300"
              title="Reject"
              onClick={() => handleChangeStatus("Approved", data._id)}
            >
              Approve
            </button>
          )}

          {data?.show == true && (
            <button
              className="font-primary text-purple-600 cursor-pointer bg-transparent border border-purple-600 py-2 px-4 rounded hover:bg-purple-600 hover:text-white transition-colors duration-300"
              title="Hide"
              onClick={() => ChangeShowStatus("no", data._id)}
            >
              Hide
            </button>
          )}
          {data?.show == false && (
            <button
              className="font-primary text-yellow-600 cursor-pointer bg-transparent border border-yellow-600 py-2 px-4 rounded hover:bg-yellow-600 hover:text-white transition-colors duration-300"
              title="Show"
              onClick={() => ChangeShowStatus("yes", data._id)}
            >
              Show
            </button>
          )}
        </div>
      ),
    },
  ];
  const [userData, setuserData] = useState([]);
  const navigate = useNavigate();
  const { data, error, isLoading } = useSWR("admin/getalluser", fetchData);
  useEffect(() => {
    if (data && data?.data?.allUser) {
      setuserData(data?.data?.allUser);
    }
  }, [data]);
  async function handleChangeStatus(status, id) {
    const res = await updateData("admin/changeuserstatus", {
      status: status,
      id: id,
    });
    if (res.status) {
      toast.success(res.message);
      mutate("admin/getalluser");
    } else {
      toast.error(res.message ? res.message : "Something went wrong");
    }
  }
  const [userSearch, setUserSearch] = useState("");

  if (isLoading) return <Spinner />;
  const filterUserData = (userData, searchTerm) => {
    if (!searchTerm.trim()) return userData;
    const searchLower = searchTerm.toLowerCase();
    return userData.filter((user) => {
      const moneyString = user.money.toString();
      const dateString = new Date(user.createdAt)
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
        .toLowerCase();

      return (
        user?.name?.toLowerCase().includes(searchLower) ||
        user?.phone?.toString().includes(searchLower) ||
        // user?.email?.toLowerCase().includes(searchLower) ||
        moneyString?.includes(searchLower) ||
        user?.status?.toLowerCase().includes(searchLower) ||
        dateString?.includes(searchLower)
      );
    });
  };
  return (
    <>
      <SearchInput searchText={userSearch} setSearchText={setUserSearch} />
      <button
        onClick={() => downloadExcel(userData)}
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
        dataSource={filterUserData(userData, userSearch)}
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
