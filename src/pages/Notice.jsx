import {
  deleteData,
  fetchData,
  formatDate,
  postData,
} from "@/api/ClientFunction";
import { Table } from "antd";
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MdDelete } from "react-icons/md";
import useSWR, { mutate } from "swr";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
async function deleteGame(data) {
  toast.dismiss();
  const id = data._id;
  if (!id) return;
  const res = await deleteData(`admin/deletenotice?id=${id}`);
  if (res.success || res.status) {
    toast.success(res.message);
    mutate("admin/getallnotices");
  } else {
    toast.error(res.err ? res.err : "Something went wrong");
  }
}

export default function Notice() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const [gameData, setGameData] = useState([]);
  const { data, error, isLoading } = useSWR("admin/getallnotices", fetchData);

  useEffect(() => {
    if (data && data.data) {
      setGameData(data.data);
    }
  }, [data]);
  if (isLoading) return <Spinner />;
  const columns = [
    {
      title: "Notice Title",
      width: 200,
      className: "font-inter",
      render: (_, data) => (
        <div className="flex items-center gap-3 text-blue-500">
          <span className="font-500 font-inter">{data.title}</span>
        </div>
      ),
    },

    {
      title: "Notice Description",
      width: 800,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter capitalize  text-red-500">
          {data.description}
        </div>
      ),
    },
    {
      title: "Date",
      width: 150,
      className: "font-inter",
      render: (_, data) => (
        <div className="flex items-center gap-3 ">
          <span className="font-500 font-inter">
            {formatDate(data.createdAt)}
          </span>
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, data) => (
        <div className="w-[50px] flex items-center gap-3">
          <span
            className="font-medium font-primary deleteUrl text-red-500 cursor-pointer"
            onClick={() => deleteGame(data)}
          >
            <MdDelete size={20} />
          </span>
        </div>
      ),
    },
  ];
  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 mb-6 px-4 rounded"
      >
        Create Notice
      </button>
      <NoticeModal isOpen={isOpen} closeModal={closeModal} />
      <Table
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={gameData}
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

function NoticeModal({ isOpen, closeModal }) {
  const titleRef = useRef();
  const descriptionRef = useRef();
  async function sendRequest() {
    closeModal();
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    if (!title || !description) {
      return toast.error("Please Fill Up All Input Fields");
    }
    const data = {
      title,
      description,
    };
    const res = await postData("admin/createnotice", data);
    if (res.success || res.status) {
      toast.success(res.message);
      mutate("admin/getallnotices");
    } else {
      toast.error(res.err ? res.err : "Something went wrong");
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
                  className="text-xl font-medium  leading-6 text-gray-900 text-center"
                >
                  Create New Notice
                </Dialog.Title>
                <div className="mt-6">
                  <label className="text-lg px-[2px]  font-medium  leading-6 text-gray-900 text-center">
                    Notice Title
                  </label>
                  <input
                    className="appearance-none border mt-2  rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Enter Notice Title"
                    required
                    ref={titleRef}
                  />
                </div>
                <div className="mt-6">
                  <label className="text-lg px-[2px]  font-medium  leading-6 text-gray-900 text-center">
                    Notice Description
                  </label>
                  <input
                    className="appearance-none border mt-2  rounded w-full py-2 px-3 text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="Enter Notice Description"
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
                    Create Notice
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
