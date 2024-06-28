import React, { useState } from 'react'
import { useCreateEstateMutation, useDeleteEstateMutation, useGetAllEstateQuery, useUpdateEstateMutation } from '../../redux/api/estate.js';
import { Form, Input, InputNumber, Switch, Button } from 'antd';


const CreateEstatePage = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [netM, setNetM] = useState("");
  const [brutM, setBrutM] = useState("");
  const [roomC, setRoomC] = useState("");
  const [aidat, setAidat] = useState("");
  const [furnished, setFurnished] = useState();
  const [floor, setFloor] = useState("");
  const [park, setPark] = useState();
  const [description, setDescription] = useState("");
  const [imagelink1, setImagelink1] = useState("");
  const [imagelink2, setImagelink2] = useState("");
  const [imagelink3, setImagelink3] = useState("");
  const [imagelink4, setImagelink4] = useState("");

  const [createEstate] = useCreateEstateMutation();


  const furnishedTrueOrFalse = (e) => {
    setFurnished(e)
  }

  const parkTrueOrFalse = (e) => {
    setPark(e)
  }

  const createHandler = () => {
    try {
      const urun = createEstate({ name, location, netM, brutM, roomC, aidat, furnished, floor, park, description, imagelink1, imagelink2, imagelink3, imagelink4 }).unwrap();
      console.log(urun)
      console.log("estate olusturma başarılı.")
      alert("Listeye Kayıt Edildi");
      window.location.href = "/admin"
    } catch (error) {
      console.log(error.message)
    }
  }

  const [form] = Form.useForm();

  return (
    <div>
      <Form
        form={form}
        name="apartment_form"
        layout="vertical"
        onFinish={createHandler}
        className='create-container'
      >
        <Form.Item
          label="İsim"
          name="name"
          rules={[{ required: true, message: 'Please enter the name' }]}
        >
          <Input  value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="konum"
          name="location"
          rules={[{ required: true, message: 'Please enter the location' }]}
        >
          <Input value={location} onChange={(e) => setLocation(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Net M2"
          name="netM"
          rules={[{ required: true, message: 'Please enter the net M2' }]}
        >
          <Input value={netM} onChange={(e) => setNetM(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Kira Fiyati"
          name="brutM"
          rules={[{ required: true, message: 'Please enter the brut M2' }]}
        >
          <Input value={brutM} onChange={(e) => setBrutM(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Oda Sayısı"
          name="roomC"
          rules={[{ required: true, message: 'Please enter the room count' }]}
        >
          <Input value={roomC} onChange={(e) => setRoomC(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Aidat"
          name="aidat"
          rules={[{ required: true, message: 'Please enter the aidat' }]}
        >
          <Input value={aidat} onChange={(e) => setAidat(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Eşyalı"
          name="furnished"
          valuePropName="checked"
        >
          <Switch onChange={furnishedTrueOrFalse} />
        </Form.Item>

        <Form.Item
          label="Bulunduğu Kat"
          name="floor"
          rules={[{ required: true, message: 'Please enter the floor' }]}
        >
          <Input value={floor} onChange={(e) => setFloor(e.target.value)} />
        </Form.Item>

        <Form.Item
          label="Park Alanı"
          name="park"
          valuePropName="checked"
        >
          <Switch onChange={parkTrueOrFalse} />
        </Form.Item>

        <Form.Item
          label="Açıklama"
          name="description"
          rules={[{ required: true, message: 'Please enter the description' }]}
        >
          <Input.TextArea value={description} onChange={(e) => setDescription(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="fotograf link ekle"
          name="imagelink1"
        >
          <Input value={imagelink1} onChange={(e) => setImagelink1(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="fotograf link ekle"
          name="imagelink2"
        >
          <Input value={imagelink2} onChange={(e) => setImagelink2(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="fotograf link ekle"
          name="imagelink3"
        >
          <Input value={imagelink3} onChange={(e) => setImagelink3(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="fotograf link ekle"
          name="imagelink4"
        >
          <Input value={imagelink4} onChange={(e) => setImagelink4(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            İlanı Kaydet
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateEstatePage
