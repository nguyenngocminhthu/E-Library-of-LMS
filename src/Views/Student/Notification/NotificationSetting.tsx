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
        <Panel header="Hỏi đáp" key="1" className="site-collapse-custom-panel">
          <div className="conten-childpanel">
            Thông báo khi giảng viên đặt câu hỏi trong môn học
            <Switch defaultChecked onChange={() => setChecked(!checked)} />
          </div>
          <div className="conten-childpanel">
            Thông báo khi có người tương tác với câu hỏi - câu trả lời của bạn
            <Switch onChange={() => setChecked(!checked)} />
          </div>
        </Panel>
        <Panel
          header="Thông báo môn học"
          key="2"
          className="site-collapse-custom-panel"
        >
          <div className="conten-childpanel">
            Thông báo khi giảng viên tạo thông báo môn học
            <Switch onChange={() => setChecked(!checked)} />
          </div>
          <div className="conten-childpanel">
            Thông báo khi có người có người bình luận
            <Switch onChange={() => setChecked(!checked)} />
          </div>
        </Panel>
        <Panel
          header="Tài khoản người dùng"
          key="3"
          className="site-collapse-custom-panel"
        >
          <div className="conten-childpanel">
            Thông báo khi cập nhật thông tin tài khoản
            <Switch onChange={() => setChecked(!checked)} />
          </div>
          <div className="conten-childpanel">
            Thông báo khi thay đổi mật khẩu
            <Switch onChange={() => setChecked(!checked)} />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
}

export default NotificationSetting;
