import React from 'react';
import { Space, Table, Tag } from 'antd';
const { Column, ColumnGroup } = Table;
const StudentTable = ({ data, onStudentsSelected }) => {
  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Gmail', dataIndex: 'gmail', key: 'gmail' },
    { title: 'Batch', dataIndex: 'batch', key: 'batch' },
    { title: 'Campus', dataIndex: 'campus', key: 'campus' },
    { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      onStudentsSelected(selectedRows);
      console.log(`Selected RowKeys: ${selectedRowKeys}`, 'Selected Rows: ', selectedRows);
    },
  };

  return <Table rowSelection={rowSelection} dataSource={data} columns={columns} />;
};

export default StudentTable;
