import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, InputNumber, Button, Select, notification } from 'antd';
import axios from 'axios';
import StudentTable from './StudentsTable';

const { RangePicker } = DatePicker;
const { Option } = Select;

const API_BASE_URL = 'http://localhost:8181/api/v1';
const HEADERS = token => ({
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  }
});
const CourseForm = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [trainerNameOptions, setTrainerNameOptions] = useState([]);
  const [selectedTrainerEmails, setSelectedTrainerEmails] = useState({});
  const [numTrainers, setNumTrainers] = useState(1);
  const [selectedTrainerIDs, setSelectedTrainerIDs] = useState([]);
  const [studentsData, setStudentsData] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [schoolOptions, setSchoolOptions] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const token = localStorage.getItem('jwtToken');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trainerResponse, branchResponse, departmentResponse, schoolResponse] = await Promise.all([
          axios.get('http://localhost:8181/api/v1/trainer/', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          axios.get('http://localhost:8181/api/v1/branch/', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          axios.get('http://localhost:8181/api/v1/department/', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          axios.get('http://localhost:8181/api/v1/school/', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        if (trainerResponse.data.status) {
          setTrainerNameOptions(trainerResponse.data.trainerList);
        }
        if (branchResponse.data.status) {
          console.log("🚀 ~ file: CourseForm.jsx:50 ~ fetchData ~ branchResponse.data:", branchResponse.data)
          setBranchOptions(branchResponse.data.branchList);
        }
        if (departmentResponse.data.status) {
          console.log("🚀 ~ file: CourseForm.jsx:54 ~ fetchData ~ departmentResponse.data:", departmentResponse.data)
          setDepartmentOptions(departmentResponse.data.departmentList);
        }
        if (schoolResponse.data.status) {
          setSchoolOptions(schoolResponse.data.schoolList);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);
  // Initial students data
  useEffect(() => {
    axios.get('http://localhost:8181/api/v1/student/', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.data.status) {
          console.log("🚀 ~ file: CourseForm.jsx:42 ~ useEffect ~ response.data:", response.data)
          const apiResponse = response.data.studentList
          const convertedData = apiResponse.map((student, index) => ({
            key: (index + 1).toString(),
            name: student.name,
            gmail: student.email,
            batch: '2021', // This is hard-coded as it's not available in the API response
            campus: 'coimbatore', // This is hard-coded as it's not available in the API response
            phoneNumber: '3456789', // This is hard-coded as it's not available in the API response
            id: student.id
          }));

          setStudentsData(convertedData);
        }
      })
      .catch(error => {
        console.error("Error fetching trainers:", error);
      });
  }, []);
  const handleTrainerNameChange = (value, index) => {
    const trainer = trainerNameOptions.find(t => t.id === value);
    setSelectedTrainerEmails(prevState => ({ ...prevState, [index]: trainer ? trainer.email : '' }));
    // Update the list of selected trainer IDs
    setSelectedTrainerIDs(prevState => {
      const newState = [...prevState];
      newState[index] = trainer ? trainer.name : '';
      return newState;
    });
  };

  const renderTrainerFields = () => {
    const fields = [];
    for (let i = 0; i < numTrainers; i++) {
      fields.push(
        <div className='t-flex t-gap-6 t-items-center' key={i}>
          <Form.Item label={`Trainer ${i + 1} Name`} className='t-basis-[20%]' name={`trainerName${i}`} required>
            <Select size="large" placeholder="Select Trainer Name" onChange={(value) => handleTrainerNameChange(value, i)}>
              {trainerNameOptions.filter(trainer => !selectedTrainerIDs.includes(trainer.id)).map((trainer) => (
                <Option key={trainer.id} value={trainer.id}>
                  {trainer.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Input style={{ pointerEvents: "none" }} className='t-h-[42px] t-mt-[7px] t-basis-[30%]' size="large" value={selectedTrainerEmails[i]} />
        </div>
      );
    }
    return fields;
  };
  const transformToCourseCreate = (formValue, studentValue) => {
    console.log("🚀 ~ file: CourseForm.jsx:112 ~ transformToCourseCreate ~ formValue:", formValue)
    const User = JSON.parse(localStorage.getItem('User'));

    const trainerIds = Object.values(formValue)
      .filter(value => value && value.toString().includes('-'));  // Filtering UUIDs
    console.log("🚀 ~ file: CourseForm.jsx:132 ~ transformToCourseCreate ~ trainerIds:", trainerIds)

    const studentIds = studentValue.map(student => student.id);
    console.log("🚀 ~ file: CourseForm.jsx:134 ~ transformToCourseCreate ~ studentIds:", studentIds)
    const startDate = formValue.dateRange[0].format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    const endDate = formValue.dateRange[1].format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    return {
      id: User.id,
      orderId: formValue.orderId,
      branchId: formValue.branch,
      departmentId: formValue.department,
      schoolId: formValue.school,
      courseName: formValue.courseName,
      startDate: startDate,
      endDate: endDate,
      trainerId: trainerIds,
      studentId: studentIds
    };
  };

  // Clear all data
  const handleCourseCreation = () => {
    const values = form.getFieldsValue();

    console.log("🚀 ~ file: CourseForm.jsx:91 ~ handleCourseCreation ~ values:", values)
    console.log("🚀 ~ file: AdminSide.jsx:126 ~ handleCourseCreation ~ studentsData:", selectedStudents)
    // Sample usage:
    const courseCreate = transformToCourseCreate(values, selectedStudents);
    console.log("🚀 ~ file: CourseForm.jsx:139 ~ handleCourseCreation ~ courseCreate:", courseCreate)

    const token = localStorage.getItem('jwtToken');
    axios.post('http://localhost:8181/api/v1/course/create', courseCreate, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        // if (response.data.status) {
        notification.success({
          message: 'Success',
          description: response.data.message
        });
        // }
      })
      .catch(error => {
        console.error("Error fetching trainers:", error);
      });

  };
  const handleStudentsSelected = (students) => {
    setSelectedStudents(students);
    console.log("Selected students:", students);
  };
  return (
    <>
      <div className='t-text-big t-font-bold lg:t-text-xl ng-star-inserted t-text-black'>
        Course Creation
      </div>
      <div className='t-mt-14 t-text-neutral-3 t-text-small ty:t-text-default lg:t-text-medium t-border-solid t-border-b t-border-b-neutral-1/10 t-w-full t-pb-20'>
        Create course details here
      </div>
      <div className='t-mt-10'>
        <div>
          <Form form={form} onFinish={onSubmit} layout="vertical">
            <div className='t-flex t-gap-10'>
              <div className='t-basis-[30%]'>
                <Form.Item label="Order ID" name="orderId" required>
                  <Input size="large" />
                </Form.Item>
              </div>
              <div className='t-basis-[30%]'>
                <Form.Item label="Course Name" name="courseName" required>
                  <Input size="large" />
                </Form.Item>
              </div>
            </div>
            <div className='t-flex t-gap-10'>
              <div className='t-basis-[30%]'>
                <Form.Item label="Branch" name="branch" required>
                  <Select size="large" placeholder="Select Branch">
                    {branchOptions && branchOptions.map(branch => (
                      <Option key={branch.id} value={branch.id}>
                        {branch.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className='t-basis-[30%]'>
                <Form.Item label="Department" name="department" required>
                  <Select size="large" placeholder="Select Department">
                    {departmentOptions && departmentOptions.map(department => (
                      <Option key={department.id} value={department.id}>
                        {department.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
              <div className='t-basis-[30%]'>
                <Form.Item label="School" name="school" required>
                  <Select size="large" placeholder="Select School">
                    {schoolOptions && schoolOptions.map(school => (
                      <Option key={school.id} value={school.id}>
                        {school.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className='t-flex t-basis-[30%]'>
              <Form.Item label="Date Range" name="dateRange">
                <RangePicker size="large" showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
              </Form.Item>
            </div>
            <Form.Item label="Number of Trainers" name="numTrainers" required>
              <InputNumber size="large" min={1} defaultValue={1} onChange={(value) => setNumTrainers(value)} />
            </Form.Item>
            {renderTrainerFields()}
            <div>
              <StudentTable data={studentsData} onStudentsSelected={handleStudentsSelected} />
            </div>
            <div className='t-flex t-mt-10'>
              <Button type="primary" onClick={handleCourseCreation}>
                Course creation
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CourseForm;
