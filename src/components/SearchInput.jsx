import React from "react";
import { Input } from "antd";
import { IoCloseCircleOutline } from "react-icons/io5";

const SearchInput = ({ searchText, setSearchText }) => {
  return (
    <div className="flex justify-end pb-6">
      <Input
        placeholder="Search By Text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        suffix={
          <IoCloseCircleOutline
            size={20}
            onClick={() => setSearchText("")}
            style={{ color: "rgba(0, 0, 0, 0.584)" }}
            className="cursor-pointer"
          />
        }
        className="border border-black max-w-[300px]"
      />
    </div>
  );
};

export default SearchInput;
