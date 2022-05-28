import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import { ITopic } from "../../../../redux/reducers/topic.reducer";

export const EditTopic: React.FC<{ topic?: ITopic }> = (props) => {
  const navigate = useNavigate();
  const params = useParams<{ id: string }>();
  return (
    <div
      id="scrollableDiv"
      style={{
        height: 600,
        overflow: "auto",
        padding: "0 16px",
      }}
    >
      <div className="sub-title">
        Chủ đề: <span>{props.topic?.title}</span>
      </div>

      <Button
        type="primary"
        className="add-description"
        icon={<PlusOutlined />}
        onClick={() => {
          navigate(`/teacher/subject/addsubject/${params.id}`);
        }}
      >
        Thêm bài giảng
      </Button>
    </div>
  );
};
