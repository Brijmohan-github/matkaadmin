import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import InputField from "@/components/InputField";
import { fetchData, postData } from "@/api/ClientFunction"; // Adjust this based on your actual implementation
import useSWR from "swr";
import Spinner from "@/components/Spinner";
// import ToggleButton from "@/components/ToggleButton";

const Bank = () => {
  const [formData, setFormData] = useState({
    // bankName: "",
    // ahn: "",
    // account: "",
    // ifsc: "",
    // paytmUpi: "",
    // googleUpi: "",
    // phonepeUpi: "",
    key: "",
    visible: 1,
  });
  const [scannerImage, setScannerImage] = useState(null);

  const { data, isLoading } = useSWR("admin/getadminbank", fetchData);

  useEffect(() => {
    if (data && data.data) {
      setFormData(data.data);
    }
  }, [data]);

  if (isLoading) return <Spinner />;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name == "scanner") {
      setScannerImage(files[0]);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (scannerImage) data.append("image", scannerImage);
    try {
      const res = await postData("admin/setadminbank", data);
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
    fields.map(({ name, label, meaning = "", type = "text" }) => (
      <div key={name} style={styles.inputGroup}>
        <label htmlFor={name} style={styles.label}>
          {label}
        </label>
        {type == "file" ? (
          <input
            type="file"
            name={name}
            onChange={handleChange}
            style={styles.inputField}
            accept="image/*" // Assuming you want to accept images only
          />
        ) : (
          <InputField
            name={name}
            value={formData[name]}
            onChange={handleChange}
            isRequired
            meaning={meaning}
            style={styles.inputField}
          />
        )}
      </div>
    ));

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        {/* <ToggleButton /> */}
        <h2 style={styles.heading}>Bank Details Form</h2>
        <form
          onSubmit={handleSubmit}
          style={styles.form}
          encType="multipart/form-data"
        >
          {renderInputFields([
            // { name: "bankName", label: "Bank Name" },
            { name: "key", label: "Upi Payment Gateway Key *" },
            // { name: "ahn", label: "Account Holder Name" },
            // { name: "account", label: "Account Number", type: "number" },
            // { name: "ifsc", label: "IFSC Code" },
            // { name: "paytmUpi", label: "Paytm UPI" },
            // { name: "googleUpi", label: "Google Pay UPI" },
            { name: "phonepeUpi", label: "UPI Id *" },
            {
              name: "visible",
              label: "Show Option *",
              meaning:
                "1 for manual payment, 2 for UPIPayment, 3 for Payment Gateway",
            },
            { name: "scanner", label: "Scanner Image", type: "file" },
            // Add other fields as necessary
          ])}
          <button type="submit" style={styles.button}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

// Reuse or adjust the styles from your Settings component
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
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
export default Bank;
