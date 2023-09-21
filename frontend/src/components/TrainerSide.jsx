import { Scheduler } from '@aldabil/react-scheduler';
import { CalendarOutlined, FieldTimeOutlined, MessageOutlined, QrcodeOutlined } from '@ant-design/icons';
import { Input, Spin } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LogoutButton from '../LogoutButton';
import ChatBox from './ChatBox';
import IconBox from './IconBox';
import Schedule from './Schedule';
import UserProfile from './UserProfile';
import { EVENTS } from "./event";
import SchoolIcon from '@mui/icons-material/School';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import Attendance from './Attendance';
const { Search } = Input;

const TrainerSide = () => {
    const [studentsData, setStudentsData] = useState([]);
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('User')));
    console.log("🚀 ~ file: TrainerSide.jsx:34 ~ TrainerSide ~ userData:", userData)
    const title = userData.role === 'STUDENT' ? 'Trainee' : 'Trainer';
    // const UserName = userData.name;
    // const UserEmail = userData.email;
    const token = localStorage.getItem('jwtToken');
    const [activeComponent, setActiveComponent] = useState('Calendar'); // Default can be 'Calendar' if you want
    console.log("🚀 ~ file: TrainerSide.jsx:32 ~ TrainerSide ~ activeComponent:", activeComponent)
    let adjusted_EVENTS = [...EVENTS];
    adjusted_EVENTS = adjusted_EVENTS.filter(event => event.admin_id === 1).map(event => ({
        ...event,
        editable: false,
        deletable: false
    }));
    console.log("🚀 ~ file: TrainerSide.jsx:28 ~ TrainerSide ~ event.start:adjusted_EVENTS", adjusted_EVENTS[0].start)
    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem('User')));
        // const userRole = userData.role;
        axios.get('http://localhost:8181/api/v1/student/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const { name, email, id } = response.data.studentList[0];
                const currentDate = new Date();
                const twoDaysLater = new Date(currentDate);
                twoDaysLater.setDate(currentDate.getDate() + 2);
                const convertedData = [{
                    key: 1,
                    name,
                    gmail: email,
                    batch: '2021',
                    campus: 'coimbatore',
                    phoneNumber: '3456789',
                    id,
                    startDate: currentDate,
                }, {
                    key: 2,
                    name,
                    gmail: email,
                    batch: '2021',
                    campus: 'chennai',
                    phoneNumber: '78549',
                    id,
                    startDate: twoDaysLater,
                }];

                console.log("🚀 ~ file: TrainerSide.jsx:62 ~ useEffect ~ convertedData:", convertedData)
                setStudentsData(convertedData);
            })
            .catch(error => {
                console.error("Error fetching trainers:", error);
            });
    }, []);

    return (
        <div className='t-relative t-overflow-y-auto t-overflow-x-hidden t-max-w-[100vw] t-min-h-[100vh] t-px-10 lg:t-px-10 xl:t-px-0'>
            <div className='t-h-50 t-w-full t-bg-primary t-bg-opacity-10 t-fixed t-flex t-justify-center t-items-center'>
                <div className='t-flex t-justify-around t-items-center t-w-full'>
                    <span className='t-text-neutral-500 t-font-medium t-text-[24px]'>{title}</span>
                    <Search placeholder="input search text" onSearch={(value, _e, info) => console.log(info?.source, value)} style={{ width: 200 }} />
                    <LogoutButton />
                </div>
            </div>
            <div className='t-mt-30 lg:t-mx-auto t-h-[calc(100vh-6.8rem)] t-flex t-gap-16 t-p-30'>
                <div className='t-border t-rounded-md t-p-20 t-min-w-[306px]'>
                    <UserProfile userData={userData} />
                    <div className="t-flex t-flex-wrap t-justify-center t-items-center t-mt-[110px]">
                        <IconBox IconComponent={CalendarOutlined} label="Calendar" onClick={() => setActiveComponent('Calendar')} />
                        <IconBox IconComponent={FieldTimeOutlined} label="Schedule" onClick={() => setActiveComponent('Schedule')} />
                        <IconBox IconComponent={QrcodeOutlined} label="Attendance" onClick={() => setActiveComponent('Attendance')} />
                        <IconBox IconComponent={MessageOutlined} label="Feedback" onClick={() => setActiveComponent('Feedback')} />
                        <IconBox className='t-invisible' IconComponent={() => null} label="invisible" />
                    </div>
                </div>
                <div className={`t-bg-white t-text-black t-border trans-scroll t-rounded-md t-p-20 t-w-full t-shadow-[0_8px_30px_rgb(0,0,0,0.12)] ${studentsData.length ? '' : 't-flex t-justify-center t-items-center'}`}>
                    {
                        activeComponent === 'Calendar' && (
                            studentsData.length && studentsData.every(student => student.startDate !== null)
                                ? <Scheduler
                                    events={adjusted_EVENTS} eventRenderer={({ event }) => {
                                        if(event.admin_id == 1){
                                            return (
                                                <div className={`t-flex t-flex-col t-gap-10 t-border-[3px] t-bg-opacity-75 t-border-solid t-text-black t-p-10 t-h-full  ${event.completion_status == "Complete" ? "t-border-success" : event.completion_status == "pending" ? 't-border-secondary' : 't-border-primary'}`}>
                                                    <div className='t-flex t-gap-4'>
                                                        <div className='t-flex t-gap-2'><SchoolIcon /></div><span>{event.title}</span>
                                                    </div>
                                                    <div className='t-flex t-gap-4'>
                                                        <div className='t-flex t-gap-2'><PersonPinCircleIcon /></div><span>SKG</span>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }} />
                                : <Spin tip="Loading" size="large">
                                    <div className="content" />
                                </Spin>
                        )}
                    {activeComponent === 'Schedule' && <Schedule />}
                    {activeComponent === 'Attendance' && <div className="t-h-screen t-w-full">
                        <Attendance userData={userData}/> </div>}
                    {activeComponent === 'Feedback' && <div className="t-h-screen t-w-full">
                        <ChatBox /> </div>}

                </div>
            </div>
        </div>
    );
}

export default TrainerSide;
