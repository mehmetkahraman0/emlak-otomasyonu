import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../redux/api/users';
import { setCredentials } from '../redux/features/auth/authSlice';
import { Form, Input, Button } from 'antd';

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  //const { search } = useLocation();
  //const sp = new useSearchParams(search);
  //const redirect = sp.get("redirect") || "/";


  // useEffect(() => {
  //   if (userInfo) {
  //     navigate(redirect);
  //   }
  // }, [navigate, redirect, userInfo]);

  const handleSubmit = async (e) => {
    // e.preventDefault();

    if (confirmPassword !== password) {
      console.error("the password is not match")
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        console.log("kullanıcı kayıdı başarılı");
        navigate("/login");
        console.success("kayıt başarılı.");
      } catch (error) {
        console.error(error);
        console.error(error.data.message);
      }
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
      <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ color: '#222831', marginBottom: '20px' }}>Kayıt Ol</h2>
        <Form onFinish={handleSubmit} style={{ maxWidth: '300px', margin: '0 auto' }}>
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[{ required: true, message: 'Please confirm your password!' }]}
          >
            <Input.Password value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </Form.Item>
          <Form.Item>
            <Button style={{ backgroundColor: 'green', borderColor: 'green', color: '#EEEEEE' }} type="primary" htmlType="submit" loading={isLoading}>
              Kayıt Ol
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default RegisterPage
