import React from 'react';
import { Badge, Calendar } from 'antd';

const getListData = (value, studentsData) => {
  const valueFormatted = value.format("YYYY-MM-DD");
  const matchingStudents = studentsData.filter(student => {
    const dateFormatted = new Date(student.startDate).toISOString().split('T')[0];
    return valueFormatted === dateFormatted;
  });

  // Transform matching students into the desired list data format
  return matchingStudents.map(student => ({
    courseName: student.name,
    courseTopic: student.phoneNumber,
  }));
};

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

const CalendarPanel = ({ data }) => {
  const monthCellRender = (value) => {
    const num = getMonthData(value);
    if (!num) return null;

    return (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    );
  };

  const dateCellRender = (value) => {
    const listData = getListData(value, data);
    return (
      <ul className="events ">
      {listData.map((item, index) => (
        <li key={index} className='t-flex t-flex-col t-gap-10 t-whitespace-nowrap'>
          <div className=" t-flex t-gap-6 t-flex-col">
            <strong>Course Name:</strong><span>{item.courseName}</span> 
          </div>
          <div className="t-flex t-gap-6">
            <strong>Course Topic:</strong><span>{item.courseTopic}</span> 
          </div>
        </li>
      ))}
    </ul>
    );
  };

  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    if (info.type === 'month') return monthCellRender(current);
    return info.originNode;
  };

  return <Calendar cellRender={cellRender} />;
};

export default CalendarPanel;
