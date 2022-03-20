import { Breadcrumb } from "antd";

interface IBread {
  title: string;
}

export const BreadcrumbComp: React.FC<IBread> = (props) => {
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      <Breadcrumb.Item>
        <h1 style={{ fontSize: "2.2rem", fontWeight: "700" }}>{props.title}</h1>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};
