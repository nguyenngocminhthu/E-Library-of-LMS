import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import "../shared/styles/main_styles/search.scss";

interface Props {
  placeholder: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}
export const SearchComponent: React.FC<Props> = ({ placeholder, onChange }) => {
  return (
    <div className="search-bar">
      <Input
        placeholder={placeholder}
        suffix={<SearchOutlined />}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchComponent;
