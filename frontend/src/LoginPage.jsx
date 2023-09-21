import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: '',
    password: '',
    role: 'admin',
  };

  const handleLogin = async (values) => {
    try {
      const { email, password } = values;
      const response = await axios.post('http://localhost:8181/api/v1/auth/login', {
        email,
        password
      });
      const token = response.data.token;
      const user = response.data.user;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('User', JSON.stringify(user));
      if(user.role === 'ADMIN'){
        navigate('/admin');
      }else if(user.role === 'STUDENT'){
        navigate('/trainee');
      }else{
        navigate('/trainer');
      }
    } catch (error) {
      console.error("Authentication error:", error);
    }
  }

  return (
    <div className="t-min-h-screen t-flex t-items-center t-justify-center t-bg-gray-200">
      <div className="t-bg-white t-p-8 t-shadow-lg t-min-w-[450px] t-rounded-md">
        <h2 className="t-text-2xl t-font-bold t-mb-4 t-text-primary t-text-center">User Log In</h2>
        <Form onFinish={handleLogin} initialValues={initialValues}>
          <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
            <div className="t-flex t-border t-rounded t-p-2 t-mb-4">
              <UserOutlined className="t-mr-2 t-text-gray-500" />
              <Input className="t-border-none t-outline-none t-w-full" placeholder="Email" />
            </div>
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
            <div className="t-flex t-border t-rounded t-p-2 t-mb-4">
              <LockOutlined className="t-mr-2 t-text-gray-500" />
              <Input className="t-border-none t-outline-none t-w-full" type="password" placeholder="Password" />
            </div>
          </Form.Item>
          <Form.Item>
            <Button className="t-w-full t-bg-blue-500 t-text-white t-py-2 t-rounded" type="primary" htmlType="submit">
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
