import React from 'react'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../shared/styles/main_styles/search.scss'


export const SearchComponent = () => {
  return (
    <div className='search-bar'>
      <Input placeholder="Tìm kết quả theo tên, lớp, môn học,..." suffix={<SearchOutlined />} />
    </div>
  )
}

export default SearchComponent;