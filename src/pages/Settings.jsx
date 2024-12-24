import { useEffect, useState } from "react";
import { fetchData, postData } from "@/api/ClientFunction";
import { toast } from "react-toastify";
import InputField from "@/components/InputField";
import useSWR from "swr";
import Spinner from "@/components/Spinner";
import { AutoComplete } from "antd";
import { times } from "./../utils/times.js";
import AutoCompleteField from "@/components/AutoCompleteField.jsx";
const Settings = () => {
  const [options, setOptions] = useState(
    times.map((time) => ({ value: time }))
  );
  const [formData, setFormData] = useState({
    sd: "",
    jd: "",
    sp: "",
    dp: "",
    tp: "",
    hs: "",
    fs: "",
    dsd: "",
    djd: "",
    nrb: "",
    minwl: "",
    maxwl: "",
    minda: "",
    maxda: "",
    minba: "",
    maxba: "",
    mint: "",
    maxt: "",
    withdrawOpen: "",
    withdrawClose: "",
    phone: "",
    email: "",
    whatsapp: "",
    telegram: "",
    liveresult: "",
    ssd: "",
    ssp: "",
    sdp: "",
    stp: "",
  });

  const handleSearch = (searchText) => {
    setOptions(() => {
      if (!searchText) {
        return times.map((time) => ({ value: time }));
      }
      const filteredTimes = times
        .filter((time) =>
          time.toLowerCase().startsWith(searchText.toLowerCase())
        )
        .map((time) => ({ value: time }));
      return filteredTimes.length
        ? filteredTimes
        : times.map((time) => ({ value: time }));
    });
  };
  const selectTime = (state, value) => {
    if (state == "withdrawOpen") {
      setFormData((prevState) => ({
        ...prevState,
        ["withdrawOpen"]: value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        ["withdrawClose"]: value,
      }));
    }
    setOptions(times.map((time) => ({ value: time })));
  };

  const { data, error, isLoading } = useSWR("game/alldistribution", fetchData);
  useEffect(() => {
    if (data && data?.data) {
      setFormData(data.data);
    }
  }, [data]);
  if (isLoading) return <Spinner />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: parseFloat(value) || value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await postData("game/setdistribution", formData);
      if (res.status) {
        toast.success(res.message);
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Network error");
    }
  };

  const renderInputFields = (fields) =>
    fields.map(({ name, label }) => {
      if (name == "withdrawOpen" || name == "withdrawClose") {
        return (
          <div key={name} style={styles.inputGroup}>
            <label htmlFor={name} style={styles.label}>
              {label}
            </label>
            <AutoCompleteField
              name={name}
              value={formData[name]}
              options={options}
              onSelect={(value) => selectTime(name, value)}
              onSearch={handleSearch}
              className="block mt-1 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
              popupClassName="block mt-1 appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        );
      } else {
        return (
          <div key={name} style={styles.inputGroup}>
            <label htmlFor={name} style={styles.label}>
              {label}
            </label>
            <InputField
              name={name}
              value={formData[name]}
              onChange={handleChange}
              isRequired
              style={styles.inputField}
            />
          </div>
        );
      }
    });

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Set Distribution Settings</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>Distribution Settings</legend>
            {renderInputFields([
              { name: "sd", label: "Single Digit" },
              { name: "jd", label: "Jodi Digit" },
              { name: "sp", label: "Single Panna" },
              { name: "dp", label: "Double Panna" },
              { name: "tp", label: "Triple Panna" },
              { name: "hs", label: "Half Sangam" },
              { name: "fs", label: "Full Sangam" },
              { name: "dsd", label: "Left Right (Delhi Games)" },
              { name: "djd", label: "Jodi (Delhi Games)" },
              { name: "ssd", label: "Starline Single Digit" },
              { name: "ssp", label: "Starline Single Pana" },
              { name: "sdp", label: "Starline Double Pana" },
              { name: "stp", label: "Starline Triple Pana" },
            ])}
          </fieldset>
          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>Game Settings</legend>
            {renderInputFields([
              { name: "nrb", label: "User Bonus" },
              { name: "minwl", label: "Minimum Withdrawal Limit" },
              { name: "maxwl", label: "Maximum Withdrawal Limit" },
              { name: "minda", label: "Minimum Deposit Amount" },
              { name: "maxda", label: "Maximum Deposit Amount" },
              { name: "minba", label: "Minimum Bet Amount" },
              { name: "maxba", label: "Maximum Bet Amount" },
              { name: "mint", label: "Minimum Transfer Amount" },
              { name: "maxt", label: "Maximum Transfer Amount" },
              { name: "withdrawOpen", label: "Withdraw Open Time" },
              { name: "withdrawClose", label: "Withdraw Close Time" },
            ])}
          </fieldset>
          <fieldset style={styles.fieldset}>
            <legend style={styles.legend}>Admin Contact Details</legend>
            {renderInputFields([
              { name: "telegram", label: "Telegram" },
              { name: "phone", label: "Phone" },
              { name: "liveresult", label: "Live Result Website" },
              { name: "whatsapp", label: "WhatsApp Number" },
              { name: "email", label: "Email Address" },
            ])}
          </fieldset>
          <button type="submit" style={styles.button}>
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f5f5f5",
  },
  formContainer: {
    width: "90%",
    maxWidth: "600px",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  heading: {
    fontSize: "24px",
    color: "#333",
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  fieldset: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    marginBottom: "20px",
    padding: "10px 20px",
  },
  legend: {
    fontWeight: "bold",
    // color: "#555",
    color: "red",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "#666",
  },
  inputField: {
    width: "100%",
    padding: "8px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    background: "#007bff",
    color: "#ffffff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "18px",
  },
};

export default Settings;
