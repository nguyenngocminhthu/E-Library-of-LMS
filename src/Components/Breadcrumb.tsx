import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

interface IBread {
  title: string | undefined;
  prevPage?: string;
  prevPageTitle?: string;
}

export const BreadcrumbComp: React.FC<IBread> = (props) => {
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {props.prevPageTitle && (
        <Breadcrumb.Item>
          <Link to={`/${props.prevPage}`}>{props.prevPageTitle}</Link>
        </Breadcrumb.Item>
      )}
      <Breadcrumb.Item>
        <h1
          style={{ fontSize: "2.2rem", fontWeight: "700", display: "inherit" }}
        >
          {props.title}
        </h1>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};
