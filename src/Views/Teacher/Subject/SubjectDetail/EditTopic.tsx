import { FileFilled, PlusOutlined } from "@ant-design/icons";
import { Button, Collapse } from "antd";
import { useNavigate } from "react-router";
import { ILesson } from "../../../../redux/reducers/lesson.reducer";
import { ITopic } from "../../../../redux/reducers/topic.reducer";

export const EditTopic: React.FC<{ topic?: ITopic }> = (props) => {
  const navigate = useNavigate();
  const { Panel } = Collapse;

  console.debug(props.topic);

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
      <Collapse bordered={false} className="site-collapse-custom-collapse">
        {props.topic?.lesson.map((vl: ILesson, index: number) => (
          <Panel
            header={vl.title}
            key={index}
            className="site-collapse-custom-panel"
          >
            <video
              src={vl.video}
              style={{ width: "100%", height: "50vh" }}
              controls
            ></video>
            <hr />
            <h3>Tài nguyên</h3>
            {vl.file.map((item: string, index: number) => {
              const vid = item.split("/");
              const fileType = vid[vid.length - 1].split("?")[0];
              const fileName = fileType.split("%2F")[1];

              return (
                <a href={item} target="_blank" className="d-flex f-direction">
                  <FileFilled />
                  <h4>
                    {index + 1}. {fileName}
                  </h4>

                  <br />
                </a>
              );
            })}
          </Panel>
        ))}
      </Collapse>
      <Button
        type="primary"
        className="add-description"
        icon={<PlusOutlined />}
        onClick={() => {
          navigate(`/teacher/subject/addsubject/${props.topic?.id}`);
        }}
      >
        Thêm bài giảng
      </Button>
    </div>
  );
};
