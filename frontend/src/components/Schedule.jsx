import React, { useState, useEffect } from 'react';
import { Table, Select } from 'antd';

const { Option } = Select;

const Schedule = () => {
//   const [userData, setUserData] = useState(dataUser);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('User')));

  const handleStatusChange = (value, key) => {
    // Update the local state or make an API call to update the status
    // For example, to update the local state:
    const updatedData = data.map(item => {
      if (item.key === key) {
        return { ...item, status: value };
      }
      return item;
    });
    // Set the updated data (assuming you have a state for it)
    // setData(updatedData);
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const data = [
    {
        key: "1",
        date: "19-sep-23",
        day: "Day 1",
        courseName: "Data Structures and Algorithms",
        topic: "Graphs",
        subTopic: "Graph Representations, Depth First Search, Breadth First Search",
        assessment: "Na",
        status: "NA",
        completion_status: "Complete"
    },
    {
        key: "2",
        date: "20-sep-23",
        day: "Day 2",
        courseName: "Data Structures and Algorithms",
        topic: "Time Complexity",
        subTopic: "Mathematical Analysis of Recursive and Non-Recursive algorithms",
        assessment: "Na",
        status: "NA",
        completion_status: "pending",
    },
    {
        key: "3",
        date: "21-sep-23",
        day: "Day 3",
        courseName: "Data Structures and Algorithms",
        topic: "Searching",
        subTopic: "Linear, Binary search",
        assessment: "Na",
        status: "NA",
        completion_status: "pending",
    },
    {
        key: "4",
        date: "22-sep-23",
        day: "Day 4",
        courseName: "Data Structures and Algorithms",
        topic: "Sorting 1",
        subTopic: "Bubble sort, Insertion sort, Selection sort",
        assessment: "Na",
        status: "NA",
        completion_status: "pending",
    },
    {
        key: "5",
        date: "23-sep-23",
        day: "Day 5",
        courseName: "---",
        topic: "Buffer Day",
        subTopic: "Buffer Day",
        assessment: "CC1",
        status: "CC1",
        completion_status: "leave",
    },
    {
        key: "6",
        date: "24-sep-23",
        day: "Day 6",
        courseName: "---",
        topic: "Buffer Day",
        subTopic: "Buffer Day",
        assessment: "Na",
        status: "NA",
        completion_status: "leave",
    },
    {
        key: "7",
        date: "25-sep-23",
        day: "Day 7",
        courseName: "Data Structures and Algorithms",
        topic: "Stack and Queues",
        subTopic: "Introduction to Stack, Operations on Stack, Introduction to Queue, Types of Queue",
        assessment: "Na",
        status: "NA",
        completion_status: "pending",
    },
];

  const getUniqueFilterValues = (data, dataIndex) => {
    const uniqueValues = [...new Set(data.map(item => item[dataIndex]))];
    return uniqueValues.map(value => ({ text: value, value }));
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      filters: getUniqueFilterValues(data, 'date'),
      onFilter: (value, record) => record.date.indexOf(value) === 0,
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sortDirections: ['descend'],
    },
    {
      title: 'Day',
      dataIndex: 'day',
    },
    {
      title: 'Course Name',
      dataIndex: 'courseName',
    },
    {
      title: 'Topic',
      dataIndex: 'topic',
      filters: getUniqueFilterValues(data, 'topic'),
      onFilter: (value, record) => record.topic.indexOf(value) === 0,
    },
    {
      title: 'Sub Topic',
      dataIndex: 'subTopic',
      width: '25%',
    },
    {
      title: 'Assessment',
      dataIndex: 'assessment',
    },
    {
      title: 'Status',
      dataIndex: 'completion_status',
      render: (text, record) => {
        if (userData?.role === 'STUDENT') {
          return text; // Display status as plain text for students
        }
        return (
          <Select
            defaultValue={text}
            style={{ width: 120 }}
            onChange={value => handleStatusChange(value, record.key)}
          >
            <Option value="In-progress">In-progress</Option>
            <Option value="Pending">Pending</Option>
            <Option value="Complete">Complete</Option>
          </Select>
        );
      },
    },
  ];

  useEffect(() => {
    setUserData(JSON.parse(localStorage.getItem('User')));  }, []);

  return <Table columns={columns} dataSource={data} onChange={onChange} />;
};

export default Schedule;
