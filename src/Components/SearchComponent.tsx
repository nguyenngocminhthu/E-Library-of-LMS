import React from 'react'
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import '../shared/styles/main_styles/search.scss'

interface Props{
  placeholder : string
}
export const SearchComponent: React.FC<Props> = ({placeholder}) => {
  return (
    <div className='search-bar'>
      <Input placeholder={placeholder} suffix={<SearchOutlined />} />
    </div>
  )
}

export default SearchComponent;