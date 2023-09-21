import { CalendarOutlined, FieldTimeOutlined, MessageOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import React, { useEffect, useState } from 'react';
import LogoutButton from '../LogoutButton';
import AdminSchedule from './AdminSchedule';
import CourseForm from './CourseForm';
import IconBox from './IconBox';
import UserProfile from './UserProfile';
const AdminSide = () => {
    const [courseData, setCourseData] = useState([]);
    const [studentsData, setStudentsData] = useState([]);
    const [activeComponent, setActiveComponent] = useState('Course Creation'); // Default can be 'Calendar' if you want
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('User')));
    useEffect(() => {
        setStudentsData([
            {
                key: '1',
                name: 'John Doe',
                gmail: 'sarah@yopmail.com',
                batch: '2021',
                campus: 'coimbatore',
                phoneNumber: '3456789',
            },
            {
                key: '2',
                name: 'John Doe',
                gmail: 'sarah@yopmail.com',
                batch: '2021',
                campus: 'coimbatore',
                phoneNumber: '3456789',
            },
            // ... add more data if needed
        ]);
    }, []);

    // Handle course submission
    const handleCourseSubmit = (course) => {
        setCourseData([course, ...courseData]);
    };

    // // Clear all data
    // const handleCourseCreation = () => {
    //   console.log("🚀 ~ file: AdminSide.jsx:126 ~ handleCourseCreation ~ studentsData:", studentsData)
    //   notification.success({
    //     message: 'Success',
    //     description: 'Course created successfully!'
    // });
    //   // const token = localStorage.getItem('jwtToken');
    //   // axios.get('http://localhost:8181/api/v1/course/create/', {
    //   //   headers: {
    //   //     'Authorization': `Bearer ${token}`
    //   //   }
    //   // })
    //   // .then(response => {
    //   //   if (response.data.status) {
    //   //     setTrainerNameOptions(response.data.trainerList);
    //   //   }
    //   // })
    //   // .catch(error => {
    //   //   console.error("Error fetching trainers:", error);
    //   // });
    // };
    return (
        <div className='t-relative t-overflow-y-auto t-overflow-x-hidden t-max-w-[100vw] t-min-h-[100vh] t-px-10 lg:t-px-10 xl:t-px-0'>
            <div className='t-h-50 t-w-full t-bg-primary t-bg-opacity-10 t-fixed t-flex t-justify-center t-items-center'>
                <div className='t-flex t-justify-around t-items-center t-w-full'>
                    <span className='t-text-neutral-500 t-font-medium t-text-[24px]'>Admin</span>
                    <LogoutButton />
                </div>
            </div>
            <div className='t-mt-30 lg:t-mx-auto t-h-[calc(100vh-6.8rem)] t-flex t-gap-16 t-p-30'>
                <div className='t-border t-rounded-md t-p-20 t-min-w-[306px]'>
                    <UserProfile userData={userData} />
                    <div className="t-flex t-flex-wrap t-justify-center t-items-center t-mt-[110px]">
                        <IconBox IconComponent={CalendarOutlined} label="Course Creation" onClick={() => setActiveComponent('Course Creation')} />
                        <IconBox IconComponent={FieldTimeOutlined} label="Schedule" onClick={() => setActiveComponent('Schedule')} />
                        <IconBox IconComponent={MessageOutlined} label="Feedback" onClick={() => setActiveComponent('Feedback')} />
                        <IconBox className='t-invisible' IconComponent={() => null} label="invisible" />
                    </div>
                </div>
                <div className={`t-bg-white trans-scroll t-overflow-y-auto t-text-black t-border t-rounded-md t-p-20 t-w-full t-shadow-[0_8px_30px_rgb(0,0,0,0.12)] ${studentsData.length ? '' : 't-flex t-justify-center t-items-center'}`}>
                    {activeComponent === 'Course Creation' && <CourseForm />}
                    {activeComponent === 'Schedule' && <AdminSchedule />}

                </div>
            </div>
        </div>
    );
}

export default AdminSide;
