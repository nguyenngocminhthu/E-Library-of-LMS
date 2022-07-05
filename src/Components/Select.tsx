import { Select } from "antd";
import lodash from "lodash";
import React, { useEffect, useState } from "react";
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
  disabled?: boolean;
  mode?: "multiple" | "tags" | undefined;
  allowClear?: boolean;
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
        disabled={props.disabled}
        mode={props.mode}
        allowClear={props.allowClear}
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
