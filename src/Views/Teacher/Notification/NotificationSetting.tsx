import { Collapse, Switch } from "antd";
import { useState } from "react";
import "./Notification.style.scss";

function NotificationSetting() {
  const { Panel } = Collapse;
  const [checked, setChecked] = useState(false);

  return (
    <div className="setting-noti-page">
      <h1>Bạn có thể cài đặt những thông báo sẽ nhận:</h1>
      <Collapse
        bordered={false}
        className="site-collapse-custom-collapse"
        expandIconPosition="right"
      >
        <Panel
          header="Môn giảng dạy"
          key="1"
          className="site-collapse-custom-panel"
        >
          <div className="conten-childpanel">
            Thông báo khi bạn thêm tài liệu, cập nhật tài liệu môn học và phân
            công tài liệu vào lớp giảng dạy.
            <Switch defaultChecked onChange={() => setChecked(!checked)} />
          </div>
          <div className="conten-childpanel">
            Thông báo khi có người đặt câu hỏi trong môn học, yêu cầu trả lời,
            thích câu hỏi, câu trả lời của bạn.
            <Switch onChange={() => setChecked(!checked)} />
          </div>
        </Panel>
        <Panel
          header="Bài giảng và tài nguyên"
          key="2"
          className="site-collapse-custom-panel"
        >
          <div className="conten-childpanel">
            Thông báo khi bạn thêm tài liệu, cập nhật tài liệu môn học và phân
            công tài liệu vào lớp giảng dạy.
            <Switch onChange={() => setChecked(!checked)} />
          </div>
          <div className="conten-childpanel">
            Thông báo khi có người đặt câu hỏi trong môn học, yêu cầu trả lời,
            thích câu hỏi, câu trả lời của bạn.
            <Switch onChange={() => setChecked(!checked)} />
          </div>
        </Panel>
        <Panel
          header="Đề thi & kiểm tra"
          key="3"
          className="site-collapse-custom-panel"
        >
          <div className="conten-childpanel">
            Thông báo khi bạn tải lên hoặc tạo mới đề thi.
            <Switch onChange={() => setChecked(!checked)} />
          </div>
          <div className="conten-childpanel">
            Thông báo khi bạn cập nhật ngân hàng đề thi gồm: tải lên, tạo mới,
            chỉnh sửa và xóa.
            <Switch onChange={() => setChecked(!checked)} />
          </div>
        </Panel>
        <Panel
          header="Tài khoản người dùng"
          key="4"
          className="site-collapse-custom-panel"
        >
          <div className="conten-childpanel">
            Thông báo khi cập nhật thông tin tài khoản.
            <Switch onChange={() => setChecked(!checked)} />
          </div>
          <div className="conten-childpanel">
            Thông báo khi thay đổi mật khẩu.
            <Switch onChange={() => setChecked(!checked)} />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}

export default NotificationSetting;
