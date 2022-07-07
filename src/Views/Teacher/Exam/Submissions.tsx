import { List, Avatar, Badge, Tag } from "antd";
import { useState, useEffect } from "react";
import VirtualList from "rc-virtual-list";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { getBank } from "../../../redux/reducers/banks.reducer";
import { UserState } from "../../../redux/reducers/user.reducer";
import { EditOutlined } from "@ant-design/icons";

export interface ISubmit {
  user: UserState;
  score: number;
  submit: { ans: number[]; correct: number[]; id: string; _id: string };
  _id: string;
  correctNum: number;
}

export const Submissions = () => {
  const [data, setData] = useState<ISubmit[]>([]);
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id) {
      dispatch(getBank(params.id))
        .unwrap()
        .then((rs) => {
          console.debug(rs);
          setData(rs.submissions);
        });
    }
  }, [params.id]);

  return (
    <div>
      <List>
        <VirtualList data={data} height={400} itemHeight={47} itemKey="id">
          {(item: ISubmit) => (
            <List.Item key={item._id}>
              <List.Item.Meta
                avatar={<Avatar src={item.user.avt} />}
                title={<a href="https://ant.design">{item.user.userName}</a>}
                description={
                  <>
                    Điểm:
                    <Tag color="#cd201f">{item.score}</Tag>
                    Số câu đúng:
                    <Tag color="#87d068">
                      {item.correctNum}/{data.length}
                    </Tag>
                  </>
                }
              />
              <div>
                <EditOutlined
                  onClick={() =>
                    navigate({
                      pathname: "/teacher/exams/submissions/detail",
                      search: `id=${params.id}?submitId=${item._id}`,
                    })
                  }
                  className="c-pointer"
                />
              </div>
            </List.Item>
          )}
        </VirtualList>
      </List>
    </div>
  );
};
