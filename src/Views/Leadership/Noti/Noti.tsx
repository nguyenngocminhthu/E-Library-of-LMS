import { Avatar, Checkbox, Divider, List, Skeleton, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";
import "./style.scss";

const { TabPane } = Tabs;
export const Notification = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch(
      "https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo"
    )
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <div className="Noti-Page">
      <BreadcrumbComp title="Thông báo" />
      <Tabs defaultActiveKey="1" type="card" size={"small"}>
        <TabPane tab="Thông báo người dùng" key="1">
          <div
            id="scrollableDiv"
            style={{
              height: 400,
              overflow: "auto",
              padding: "0 16px",
              border: "1px solid rgba(140, 140, 140, 0.35)",
            }}
          >
            <InfiniteScroll
              dataLength={data.length}
              next={loadMoreData}
              hasMore={data.length < 50}
              loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
              endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
              scrollableTarget="scrollableDiv"
            >
              <List
                dataSource={data}
                renderItem={(item: any) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={
                        <Checkbox>
                          <Avatar src={item.picture.large} />
                        </Checkbox>
                      }
                      title={<a href="https://ant.design">{item.name.last}</a>}
                      description={item.email}
                    />
                    <div>5 phút trước</div>
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </div>
        </TabPane>
        <TabPane tab="Thông báo hệ thống" key="2">
          Thông báo hệ thống
        </TabPane>
      </Tabs>
    </div>
  );
};
