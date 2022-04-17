import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Collapse, Tooltip } from 'antd';
import React from 'react';
import "./style.scss"
const { Panel } = Collapse;

function NotiSetting() {
  return (
    <div>
       <h1>Bạn có thể cài đặt những thông báo sẽ nhận:</h1>
        <Collapse bordered={false} className="site-collapse-custom-collapse" expandIconPosition="right" >
          <Panel
            header="Quản lý môn học"
            key="1"
            className="site-collapse-custom-panel"
          >
            <div>Thông báo khi có sự thay đổi nội dung trong môn học</div>
            <div>Thông báo khi có sự thay đổi nội dung trong môn học</div>
            
          </Panel>
          <Panel
            header="Tệp riêng tư"
            key="2"
            className="site-collapse-custom-panel"
          >
            <div>Thông báo khi bạn thêm mới, thay đổi tên, xóa các tệp riêng tư</div>
          </Panel>
          <Panel
            header="Ngân hàng đề thi"
            key="3"
            className="site-collapse-custom-panel"
          >
            <div>Thông báo khi giảng viên lưu đề thi mới vào hệ thống</div>
            <div>Thông báo khi Xác nhận hoặc Hủy đề thi</div>
          </Panel>
          <Panel
            header="Phân quyền "
            key="4"
            className="site-collapse-custom-panel"
          >
            <div>Thông báo khi có sự thay đổi trong Danh sách vai trò</div>
            <div>Thông báo khi có sự thay đổi trong Danh sách người dùng</div>
          </Panel>
          <Panel
            header="Tài khoản người dùng"
            key="5"
            className="site-collapse-custom-panel"        
          >
            <div>Thông báo khi cập nhật thông tin tài khoản</div>
            <div>Thông báo khi thay đổi mật khẩu</div>
          </Panel>
        </Collapse>
    </div>
  )
}

export default NotiSetting