import { Select } from "antd";
import React, { useEffect, useState } from "react";
import lodash from "lodash";
const { Option } = Select;

export interface ISelect {
  value?: any;
  name?: any;
}

export interface ISelectAndLabel {
  textLabel?: any;
  defaultValue?: any;
  dataString?: Array<ISelect>;
  onChange?: any;
  placeholder?: string;
  style?: any;
  value?: any;
  className?: string;
  dropdownClassName?: string;
  name?: string;
}

export const SelectComp: React.FC<ISelectAndLabel> = (props) => {
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const onChange = (value: any) => {
    setValue(value);
    props.onChange && props.onChange(value);
  };

  return (
    <div className="selectcomp">
      <div className="select-label">{props.textLabel}</div>
      <Select
        className="select"
        onChange={onChange}
        defaultValue={props.defaultValue}
      >
        {!lodash.isEmpty(props?.dataString) &&
          props?.dataString?.map((item, index) => {
            return (
              <Option value={item.value} key={index}>
                {item?.name}
              </Option>
            );
          })}
      </Select>
    </div>
  );
};
