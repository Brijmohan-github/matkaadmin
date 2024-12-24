// import React, { useState } from "react";

// const DeleteAccount = () => {
//   const [phone, setPhone] = useState("");
//   const [showToast, setShowToast] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Perform data deletion request here (for demonstration purposes, it's just showing a toast)
//     setShowToast(true);
//     // Assuming there would be an API call to initiate data deletion process
//     setTimeout(() => {
//       setShowToast(false);
//       // Reset phone number after submission
//       setPhone("");
//     }, 10000); // Hide toast after 10 seconds
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <div className="w-full md:w-96 p-6 bg-gray-100 rounded-lg shadow-md">
//         <h2 className="text-3xl mb-4">Delete Your Account</h2>
//         <p className="text-gray-600 mb-6">
//           We understand that sometimes you may need to delete your account and
//           remove your data from our records. Please enter your phone number
//           below to proceed with the account deletion process.
//         </p>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="tel"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="Enter phone number"
//             className="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
//             required
//           />
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white py-2 rounded-md focus:outline-none hover:bg-blue-600"
//           >
//             Submit
//           </button>
//         </form>
//       </div>

//       {showToast && (
//         <div className="fixed bottom-0 right-0 mb-4 mr-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-md">
//           <p className="text-sm">
//             Data deletion request received. Your account will be deleted in the
//             next 24 hours, and your data will be permanently removed from our
//             records.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DeleteAccount;
import React, { useState } from "react";

const DeleteAccount = () => {
  const [phone, setPhone] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      setPhone("");
    }, 10000);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full md:w-96 p-8 bg-white rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-bold text-gray-900 mb-6 text-center">
          Delete Your Account
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          We understand that sometimes you may need to delete your account and
          remove your data from our records. Please enter your phone number
          below to proceed with the account deletion process.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
            className="w-full px-4 py-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-pink-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold focus:outline-none hover:bg-pink-600 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>

      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg animate-bounce">
          <p className="text-sm">
            Data deletion request received. Your account will be deleted in the
            next 24 hours, and your data will be permanently removed from our
            records.
          </p>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;
