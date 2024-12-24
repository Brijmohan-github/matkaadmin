import { deleteData, fetchData } from "@/api/ClientFunction";
import { Table } from "antd";
import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import useSWR, { mutate } from "swr";
import Spinner from "@/components/Spinner";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
async function deleteGame(data) {
  toast.dismiss();
  const id = data._id;
  if (!id) return;
  const res = await deleteData(`game/deletegame?gameid=${id}`);
  if (res.success || res.status) {
    toast.success(res.message);
    mutate("game/getallgames");
  } else {
    toast.error(res.err ? res.err : "Something went wrong");
  }
}

export default function MarketGame() {
  const columns = [
    {
      title: "Game Name",
      width: 200,
      className: "font-inter",
      render: (_, data) => (
        <div
          onClick={() => navigate(`/gamecontrol/${data._id}`)}
          className="flex items-center gap-3 "
        >
          <span
            className="font-500 font-inter text-blue-500 uppercase cursor-pointer"
            data-gameId={data._id}
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
          {data.openResult == 5000 ? "Not Define" : data.openResult}
        </div>
      ),
    },

    {
      title: "Jodi Result",
      width: 150,
      className: "font-inter",
      render: (_, data) => (
        <div className="font-500 font-inter">
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
          {data.closeResult == 5000 ? "Not Define" : data.closeResult}
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
      render: (_, data) => (
        <div className="w-[50px] flex items-center gap-3">
          <span
            className="font-medium font-primary text-blue-500 cursor-pointer"
            title="View"
            onClick={() => navigate(`/gamecontrol/${data._id}`)}
          >
            <IoEyeOutline size={22} />
          </span>
          <span
            className="font-medium font-primary deleteUrl text-red-600 cursor-pointer"
            title="Delete"
            onClick={() => deleteGame(data)}
          >
            <MdDelete size={20} />
          </span>
        </div>
      ),
    },
  ];
  let navigate = useNavigate();
  const [gameData, setGameData] = useState([]);
  const { data, error, isLoading } = useSWR("game/getallgames", fetchData);
  useEffect(() => {
    if (data && data.data) {
      const filteredData = data.data.filter((game) => game.category == "m");
      setGameData(filteredData);
    }
  }, [data]);
  if (isLoading) return <Spinner />;
  return (
    <div>
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
    </div>
  );
}
