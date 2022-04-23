import { Input } from "antd";
import TextArea from "antd/lib/input/TextArea";

interface IInput {
  label?: string;
  labelTextarea?: string;
  row?: number;
}

export const InputLabel: React.FC<IInput> = (props) => {
  return (
    <div className="input-label">
      <h4>{props.label || props.labelTextarea}</h4>
      {props.label && <Input />}
      {props.labelTextarea && <TextArea rows={props.row || 4} />}
    </div>
  );
};
