import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

interface IBread {
  title: string | undefined;
  prevFirstPage?: string;
  prevSecondPage?: string;
  prevFirstPageTitle?: string;
  prevSecondPageTitle?: string;
}

export const BreadcrumbComp: React.FC<IBread> = (props) => {
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
       {props.prevFirstPageTitle && (
        <Breadcrumb.Item>
          <Link to={`/${props.prevFirstPage}`}>{props.prevFirstPageTitle}</Link>
        </Breadcrumb.Item>
      )}
      {props.prevSecondPageTitle && (
        <Breadcrumb.Item>
          <Link to={`/${props.prevSecondPage}`}>{props.prevSecondPageTitle}</Link>
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
