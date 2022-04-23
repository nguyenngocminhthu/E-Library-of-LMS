import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Collapse, Tooltip, Switch  } from 'antd';
import React, { useState } from 'react';
import "./style.scss"
const { Panel } = Collapse;

function NotiSetting() {
  const [ checked, setChecked ] = useState(false);

  return (
    <div>
       <h1>Bạn có thể cài đặt những thông báo sẽ nhận:</h1>
        <Collapse bordered={false} className="site-collapse-custom-collapse" expandIconPosition="right" >
          <Panel
            header="Quản lý môn học"
            key="1"
            className="site-collapse-custom-panel"
          >
            <div className='conten-childpanel'>Thông báo khi có sự thay đổi nội dung trong môn học <Switch defaultChecked onChange={() => setChecked(!checked)}/></div>
            <div className='conten-childpanel'>Thông báo khi có sự thay đổi nội dung trong môn học <Switch  onChange={() => setChecked(!checked)}/></div>
            
          </Panel>
          <Panel
            header="Tệp riêng tư"
            key="2"
            className="site-collapse-custom-panel"
          >
            <div className='conten-childpanel'>Thông báo khi bạn thêm mới, thay đổi tên, xóa các tệp riêng tư <Switch  onChange={() => setChecked(!checked)}/></div>
          </Panel>
          <Panel
            header="Ngân hàng đề thi"
            key="3"
            className="site-collapse-custom-panel"
          >
            <div className='conten-childpanel'>Thông báo khi giảng viên lưu đề thi mới vào hệ thống <Switch  onChange={() => setChecked(!checked)}/></div>
            <div className='conten-childpanel'>Thông báo khi Xác nhận hoặc Hủy đề thi <Switch  onChange={() => setChecked(!checked)}/></div>
          </Panel>
          <Panel
            header="Phân quyền"
            key="4"
            className="site-collapse-custom-panel"
          >
            <div className='conten-childpanel'>Thông báo khi có sự thay đổi trong Danh sách vai trò <Switch  onChange={() => setChecked(!checked)}/></div>
            <div className='conten-childpanel'>Thông báo khi có sự thay đổi trong Danh sách người dùng <Switch  onChange={() => setChecked(!checked)}/></div>
          </Panel>
          <Panel
            header="Tài khoản người dùng"
            key="5"
            className="site-collapse-custom-panel"        
          >
            <div className='conten-childpanel'>Thông báo khi cập nhật thông tin tài khoản <Switch  onChange={() => setChecked(!checked)}/></div>
            <div className='conten-childpanel'>Thông báo khi thay đổi mật khẩu <Switch  onChange={() => setChecked(!checked)}/></div>
          </Panel>
        </Collapse>
    </div>
  )
}

export default NotiSetting