import { fetchData, postData, updateData } from "@/api/ClientFunction";
import { Fragment, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import useSWR, { mutate } from "swr";
import { BASE_API_URL } from "@/api/Constant";
import { toast } from "react-toastify";
import { Dialog, Transition } from "@headlessui/react";
export default function Slider() {
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const [images, setImages] = useState([]);
  const { data } = useSWR("admin/allsliderimage", fetchData);
  useEffect(() => {
    if (data && data.data?.image) {
      setImages(data.data.image);
    }
  }, [data]);
  const deleteImage = async (image) => {
    const res = await updateData(`admin/deletesliderimage?image=${image}`);
    if (res.status || res.success) {
      toast.success(res.message);
      mutate("admin/allsliderimage");
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 mb-6 px-4 rounded"
      >
        Add Image
      </button>
      <ImageModal isOpen={isOpen} closeModal={closeModal} />
      <div className="flex flex-wrap gap-4 p-4">
        {images.map((image) => (
          <div key={image} className="relative w-40 h-40 border shadow-lg">
            <img
              src={`${BASE_API_URL}/${image}`}
              alt={`integritygrove.tech`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => deleteImage(image)}
              className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-md hover:bg-gray-200"
            >
              <MdDelete className="w-6 h-6 text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

function ImageModal({ isOpen, closeModal }) {
  const [image, setImage] = useState(null);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!image) {
      toast.error("Please select an image to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("image", image);
    const res = await postData("/admin/setsliderimage", formData);
    if (res.status || res.success) {
      toast.success(res.message);
      mutate("admin/allsliderimage");
    }
    closeModal();
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]); // Set the selected file
  };

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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Upload Image
                </Dialog.Title>
                <form onSubmit={handleSubmit} className="mt-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                  />
                  <button
                    type="submit"
                    className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  >
                    Submit
                  </button>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
