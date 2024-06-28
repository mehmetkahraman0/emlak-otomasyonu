import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../redux/api/users';
import { Form, Input, Button } from 'antd';
import { setCredentials } from '../redux/features/auth/authSlice';
import Navbar from '../components/Navbar';


const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      console.log("kullanıcı girişi başarılı");
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      console.error(error.data.message);
    }
  }

  const handleRegister = () => {
    window.location = "/register"
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ color: '#222831', marginBottom: '20px' }}>Oturum Aç</h2>
        <Form onFinish={handleSubmit} style={{ maxWidth: '300px', margin: '0 auto' }}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input style={{ width: 180 }} value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password style={{ width: 150 }} value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button style={{ backgroundColor: 'green', borderColor: 'green', color: '#EEEEEE' }} type="primary" htmlType="submit" loading={isLoading}>
              Oturum Aç
            </Button>
          </Form.Item>
        </Form>
        <Button onClick={() => handleRegister()} style={{ backgroundColor: '#222831', borderColor: '#222831', color: '#EEEEEE', marginTop: '10px' }}>Kayıt Ol</Button>
      </div>
    </div>
  )
}

export default LoginPage;
