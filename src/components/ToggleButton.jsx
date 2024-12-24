import { fetchData, updateData } from "@/api/ClientFunction";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

export default function ToggleButton() {
  const [isOn, setIsOn] = useState(false);
  const toggleSwitch = async () => {
    setIsOn(!isOn);
    const value = !isOn;
    if (value) {
      const res = await updateData("admin/showgame", { show: "yes" });
      if (res.status || res.success) {
        toast.success(res.message);
      }
    } else {
      const res = await updateData("admin/showgame", { show: "no" });
      if (res.status || res.success) {
        toast.success(res.message);
      }
    }
  };
  const { data } = useSWR("admin/getadminbank", fetchData);

  useEffect(() => {
    if (data && data.data) {
      setIsOn(data.data.show);
    }
  }, [data]);

  const switchStyles = {
    width: "50px",
    height: "25px",
    backgroundColor: isOn ? "#1594dd" : "#ccc",
    borderRadius: "25px",
    position: "relative",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };
  const knobStyles = {
    width: "20px",
    height: "20px",
    backgroundColor: "white",
    borderRadius: "50%",
    position: "absolute",
    top: "2.5px",
    left: isOn ? "27.5px" : "2.5px",
    transition: "left 0.3s",
  };
  return (
    <div style={switchStyles} onClick={toggleSwitch}>
      <div style={knobStyles}></div>
    </div>
  );
}
