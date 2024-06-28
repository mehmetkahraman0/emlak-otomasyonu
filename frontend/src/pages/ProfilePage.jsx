import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useProfileMutation } from '../redux/api/users';
import { setCredentials } from '../redux/features/auth/authSlice';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/features/auth/authSlice';
import Navbar from '../components/Navbar';

const ProfilePage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username])

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (password !== confirmPassword) {
      console.log("şifreler eşleşmedi değil")
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
          isAdmin: userInfo.isAdmin
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/profile")
        console.log("değişiklikler kaydedildi.")
      } catch (error) {
        console.log(error);
      }
    }
  }
  const logoutHandle = () => {
    dispatch(logout())
    window.location = "/"
  }

  const createPageRoute = () => {
    window.location = "/admin/createestate"
  }

  const adminPageRoute = () => {
    window.location = "/admin"
  }
  return (
    <div>
      <Navbar />
      <div className="center-container">
        <div className="profile-form">
          <p style={{ color: "#00ADB5", fontSize: "24px", marginBottom: "20px" }} className='profile-header'>
            {userInfo.username} Senin Profilin
          </p>
          <Form className='profile-container' onFinish={handleSubmit}>
            <Form.Item
              label="Kullanıcı Adı"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input placeholder={username} value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input placeholder={email} value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>
            <Form.Item
              label="Şifreyi Doğrula"
              name="confirmPassword"
              rules={[{ required: true, message: 'Please confirm your password!' }]}
            >
              <Input.Password value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Item>
            <Form.Item>
              <Button style={{ backgroundColor: "green", borderColor: 'green', color: 'white' }} htmlType="submit" loading={isLoading}>
                Değişiklikleri Kaydet
              </Button>
            </Form.Item>
          </Form>
          <Button onClick={() => logoutHandle()} style={{ backgroundColor: "red", borderColor: 'red', color: 'white' }} loading={isLoading}>
            Oturumu Kapat
          </Button>
          {userInfo.isAdmin && (
            <>
              <Button onClick={() => createPageRoute()} style={{ backgroundColor: "yellow", borderColor: 'yellow', color: 'black', marginLeft: "50px" }} loading={isLoading}>
                İlan Oluştur
              </Button>
              <Button onClick={() => adminPageRoute()} style={{ backgroundColor: "yellow", borderColor: 'yellow', color: 'black', marginLeft: "50px" }} loading={isLoading}>
                Admin Sayfası
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
