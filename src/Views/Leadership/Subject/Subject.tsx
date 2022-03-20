import SearchComponent from "../../../Components/SearchComponent";
import { Row, Col } from 'antd';
import { SelectComp } from "../../../Components/Select";

const subject = [
  {
    name: "hương mại điện tử",
    value: "TMDT",
  },
  {
    name: "Nguyên lý kế toán",
    value: "NLKT",
  },
  {
    name: "Hệ thống thông tin",
    value: "HTTT",
  },
  {
    name: "Luật thương mại",
    value: "LTM",
  },
  {
    name: "Ngân hàng ",
    value: "NG",
  },
];
const teacher = [
  {
    name: "Nguyễn Văn A",
    value: "NVA",
  },
];
const status = [
  {
    name: "Đã phê duyệt",
    value: "DPD",
  },
  {
    name: "Chờ phê duyệt",
    value: "CPD",
  },
];
export const Subject = () => {
  return <div>
    <Row>
      <Col span={16}>
          <SelectComp
              style={{ display: 'block'}}
              textLabel="Môn học"
              defaultValue="Tất cả môn học"
              dataString={subject}  
            />  
            <SelectComp
            style={{ display: 'block'}}
            textLabel="Giảng viên"
            defaultValue="Tất cả giảng viên"
            dataString={teacher}
          />
          <SelectComp
              style={{ display: 'block'}}
              textLabel="Tình trạng tài liệu"
              defaultValue="Tất cả tình trạng"
              dataString={status}
            />
        </Col>
      <Col span={8}><SearchComponent/></Col>
    </Row>
    
  </div>;
};
