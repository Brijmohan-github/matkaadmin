import downloadExcel, {
  fetchData,
  formatDate,
  updateData,
} from "@/api/ClientFunction";
import { Table } from "antd";
import { Fragment, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import { toast } from "react-toastify";
import Spinner from "@/components/Spinner";
import { Dialog, Transition } from "@headlessui/react";
import SearchInput from "@/components/SearchInput";
import { FaWhatsapp } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
export default function Recharge() {
  const navigate = useNavigate();
  const [rechargeData, setRechargeData] = useState([]);
  const { data, error, isLoading } = useSWR("admin/getalldeposit", fetchData, {
    refreshInterval: 10000,
  });
  useEffect(() => {
    if (data && data?.data?.allDeposit) {
      setRechargeData(data.data.allDeposit);
    }
  }, [data]);
  async function handleDeposit(status, depositId, userId, money) {
    const res = await updateData("admin/acceptdeposit", {
      status: status,
      depositId,
      userId,
      money,
    });
    if (res.status) {
      toast.success(res.message);
      mutate("admin/getalldeposit");
    } else {
      toast.error(res.message ? res.message : "Something went wrong");
    }
  }
  const [isOpen, setIsOpen] = useState(false);
  const [imagePath, setImagePath] = useState("");
  function closeModal() {
    setIsOpen(false);
  }
  const [reachargeSearch, SetRechargeSerach] = useState("");
  const columns = [
    {
      title: "User Name",
      key: "username",
      width: 200,
      className: "font-inter",
      render: (_, data) => (
        <div className="flex items-center gap-3 ">
          <span
            className="font-500 cursor-pointer text-blue-500 font-inter"
            onClick={() => navigate(`/userdetail/${data?.userId?._id}`)}
          >
            {data?.userId?.name}
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
    //     <div className="font-500 font-inter">{data.userId.email}</div>
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
      width: 130,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-600 font-inter  text-purple-600">
          {data?.money}
        </div>
      ),
    },
    {
      title: "UTR",
      key: "utr",
      width: 200,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">{data?.utr}</div>
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
            data.status == "Approved" || data.status == "Winning"
              ? "text-green-600"
              : data.status == "Rejected"
              ? "text-red-600"
              : "text-blue-500"
          }`}
        >
          {`${data?.status}`}
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
      className: "font-inter",
      render: (_, data) => (
        <>
          <div className="w-[50px] flex items-center gap-3">
            {data.status == "Pending" && (
              <>
                <button
                  title="Reject"
                  className="font-primary text-red-600 cursor-pointer bg-transparent border border-red-600 py-2 px-4 rounded hover:bg-red-600 hover:text-white transition-colors duration-300"
                  onClick={() =>
                    handleDeposit(
                      "Rejected",
                      data?._id,
                      data?.userId?._id,
                      data?.money
                    )
                  }
                >
                  Reject
                </button>
                <button
                  title="Approve"
                  className="font-primary cursor-pointer text-blue-500 bg-transparent border border-blue-500 py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition-colors duration-300"
                  onClick={() =>
                    handleDeposit(
                      "Approved",
                      data?._id,
                      data?.userId?._id,
                      data?.money
                    )
                  }
                >
                  Approve
                </button>
              </>
            )}
          </div>
        </>
      ),
    },
  ];
  if (isLoading) return <Spinner />;
  const filterData = (data, searchTerm) => {
    if (!searchTerm.trim()) {
      return data;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return data.filter((item) => {
      const formattedDate = new Date(item?.createdAt)
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
        .toLowerCase();

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
        formattedDate.includes(lowerCaseSearchTerm)
      );
    });
  };

  return (
    <>
      {isOpen && (
        <RechargeModal
          closeModal={closeModal}
          imagePath={imagePath}
          isOpen={isOpen}
        />
      )}
      <SearchInput
        setSearchText={SetRechargeSerach}
        searchText={reachargeSearch}
      />
      <button
        onClick={() => downloadExcel(rechargeData)}
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
        dataSource={filterData(rechargeData, reachargeSearch)}
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
                  <img src={`${imagePath}`} />
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
