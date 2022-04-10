import {
  CaretRightOutlined,
  DownloadOutlined,
  LinkOutlined,
} from "@ant-design/icons";
import { Row, Col, Collapse, Tooltip, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { BreadcrumbComp } from "../../../Components/Breadcrumb";

const { Panel } = Collapse;

export const SubjectDetail = () => {
  const params = useParams<{ idSub: string }>();
  const navigate = useNavigate();
  return (
    <div className="subDetail">
      <BreadcrumbComp
        title={params.idSub}
        prevPageTitle="Danh sách môn học"
        prevPage="subjects"
      />
      <div className="overview">
        <h1>Tổng quan</h1>
        <Row>
          <Col span={6}>
            <Row>
              <Col span={8}>Mã môn học:</Col>
              <Col span={16}>2020-6A1</Col>
              <Col span={8}>Môn học:</Col>
              <Col span={16}>Thương mại điện tử</Col>
            </Row>
          </Col>
          <Col span={17} offset={1}>
            <Row>
              <Col span={3}>Giảng viên:</Col>
              <Col span={21}>Hoa Hoa</Col>
              <Col span={3}>Mô tả:</Col>
              <Col span={21}>
                Thương mại điện tử, hay còn gọi là e-commerce, e-comm hay EC, là
                sự mua bán sản phẩm hay dịch vụ trên các hệ thống điện tử như
                Internet và các mạng máy tính.
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div>
        <h1>Danh sách chủ đề</h1>
        <Collapse bordered={false} className="site-collapse-custom-collapse">
          <Panel
            header="Giới thiệu chung về Thương mại Điện tử"
            key="1"
            className="site-collapse-custom-panel"
          >
            <div className="accor-video">
              <Tooltip title="Play">
                <Button
                  size="large"
                  shape="circle"
                  icon={<CaretRightOutlined />}
                  onClick={() => navigate(`/viewsubject/${params.idSub}`)}
                />
              </Tooltip>
            </div>
            <h4>Tài nguyên</h4>
            <hr />
            <div className="download-file">
              <div className="file-name">
                <LinkOutlined />
                HTKL_KT4SP_10A1.doc
              </div>
              <Button>
                <DownloadOutlined />
                Tải xuống
              </Button>
            </div>
            <div className="download-file">
              <div className="file-name">
                <LinkOutlined />
                HTKL_KT4SP_10A1.doc
              </div>
              <Button>
                <DownloadOutlined />
                Tải xuống
              </Button>
            </div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            <hr />
            <Collapse
              bordered={false}
              className="site-collapse-custom-collapse"
            >
              <Collapse
                bordered={false}
                className="site-collapse-custom-collapse"
              >
                <Panel
                  header="Thương mại điện tử đã thay đổi sự phát triển của nền kinh tế thế giới"
                  key="1"
                  className="site-collapse-custom-panel collapse-inside"
                >
                  <h3>1. Quá trình</h3>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a piece of classical Latin literature
                  from 45 BC, making it over 2000 years old. Richard McClintock,
                  a Latin professor at Hampden-Sydney College in Virginia,
                  looked up one of the more obscure Latin words, consectetur,
                  from a Lorem Ipsum passage, and going through the cites of the
                  word in classical literature, discovered the undoubtable
                  source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of
                  "de Finibus Bonorum et Malorum" (The Extremes of Good and
                  Evil) by Cicero, written in 45 BC. This book is a treatise on
                  the theory of ethics, very popular during the Renaissance. The
                  first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..",
                  comes from a line in section 1.10.32. <br />
                  <br />
                  The standard chunk of Lorem Ipsum used since the 1500s is
                  reproduced below for those interested. Sections 1.10.32 and
                  1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are
                  also reproduced in their exact original form, accompanied by
                  English versions from the 1914 translation by H. Rackham.{" "}
                  <br />
                  <br />
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.
                  The point of using Lorem Ipsum is that it has a more-or-less
                  normal distribution of letters, as opposed to using 'Content
                  here, content here', making it look like readable English.
                  Many desktop publishing packages and web page editors now use
                  Lorem Ipsum as their default model text, and a search for
                  'lorem ipsum' will uncover many web sites still in their
                  infancy. Various versions have evolved over the years,
                  sometimes by accident, sometimes on purpose (injected humour
                  and the like). There are many variations of passages of Lorem
                  Ipsum available, but the majority have suffered alteration in
                  some form, by injected humour, or randomised words which don't
                  look even slightly believable. If you are going to use a
                  passage of Lorem Ipsum, you need to be sure there isn't
                  anything embarrassing hidden in the middle of text. All the
                  Lorem Ipsum generators on the Internet tend to repeat
                  predefined chunks as necessary, making this the first true
                  generator on the Internet. It uses a dictionary of over 200
                  Latin words, combined with a handful of model sentence
                  structures, to generate Lorem Ipsum which looks reasonable.
                  The generated Lorem Ipsum is therefore always free from
                  repetition, injected humour, or non-characteristic words etc.
                </Panel>
              </Collapse>
            </Collapse>
          </Panel>
          <Panel
            header="Thương mại điện tử"
            key="2"
            className="site-collapse-custom-panel"
          >
            hehe
          </Panel>
          <Panel
            header="Thương mại điện tử"
            key="3"
            className="site-collapse-custom-panel"
          >
            hehe
          </Panel>
        </Collapse>
      </div>
    </div>
  );
};
