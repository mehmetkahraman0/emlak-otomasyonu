import React, { useState, useEffect } from 'react';
import { useGetAllEstateQuery } from '../redux/api/estate.js';
import { List, Card, Row, Col, Carousel, Input, InputNumber, Select, Button } from 'antd';
import Navbar from '../components/Navbar.jsx';
const { Option } = Select;

const EstateList = () => {
    const { data: estates, error, isLoading } = useGetAllEstateQuery();
    const [filteredEstates, setFilteredEstates] = useState([]);
    const [filters, setFilters] = useState({
        floor: '',
        roomC: '',
        furnished: '',
        park: '',
        netMCondition: 'gte',
        netMValue: '',
        brutMCondition: 'gte',
        brutMValue: ''
    });

    useEffect(() => {
        if (estates) {
            let filtered = estates;

            if (filters.floor) {
                filtered = filtered.filter(estate => estate.floor.toLowerCase().includes(filters.floor.toLowerCase()));
            }

            if (filters.roomC) {
                filtered = filtered.filter(estate => estate.roomC === filters.roomC);
            }

            if (filters.furnished !== '') {
                filtered = filtered.filter(estate => estate.furnished === (filters.furnished === 'true'));
            }

            if (filters.park !== '') {
                filtered = filtered.filter(estate => estate.park === (filters.park === 'true'));
            }

            if (filters.netMValue !== '') {
                const netMValue = parseFloat(filters.netMValue);
                if (filters.netMCondition === 'gte') {
                    filtered = filtered.filter(estate => parseFloat(estate.netM) >= netMValue);
                } else if (filters.netMCondition === 'lte') {
                    filtered = filtered.filter(estate => parseFloat(estate.netM) <= netMValue);
                }
            }
            if (filters.brutMValue !== '') {
                const brutMValue = parseFloat(filters.brutMValue);
                if (filters.brutMCondition === 'gte') {
                    filtered = filtered.filter(estate => parseFloat(estate.brutM) >= brutMValue);
                } else if (filters.brutMCondition === 'lte') {
                    filtered = filtered.filter(estate => parseFloat(estate.brutM) <= brutMValue);
                }
            }
            setFilteredEstates(filtered);
        }
    }, [estates, filters]);



    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const submitEmail = () => {
        alert("E-mail Gönderildi");
    }


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading estates.</div>;

    return (
        <div >
            <Navbar/>
            <Button onClick={() => submitEmail()} style={{ backgroundColor: "green", borderColor: 'green', color: 'white', marginBottom:"20px"}}>Oluşan Listeyi Email Olarak Gönder</Button>
            <Row gutter={16} style={{ marginBottom: 16}}>
                <Col>
                    <Input
                        placeholder="Bulunduğu Kat"
                        onChange={(e) => handleFilterChange('floor', e.target.value)}
                        style={{ width: 200 }}
                    />
                </Col>
                <Col>
                    <Input
                        placeholder="Oda Sayısı"
                        onChange={(e) => handleFilterChange('roomC', e.target.value)}
                        style={{ width: 200 }}
                    />
                </Col>
                <Col>
                    <Select
                        placeholder="Eşyalı"
                        onChange={(value) => handleFilterChange('furnished', value)}
                        style={{ width: 150 }}
                    >
                        <Option value="true">Var</Option>
                        <Option value="false">Yok</Option>
                    </Select>
                </Col>
                <Col>
                    <Select
                        placeholder="Park"
                        onChange={(value) => handleFilterChange('park', value)}
                        style={{ width: 150 }}
                    >
                        <Option value="true">Var</Option>
                        <Option value="false">Yok</Option>
                    </Select>
                </Col>
                <Col>
                    <Select
                        value={filters.netMCondition}
                        onChange={(value) => handleFilterChange('netMCondition', value)}
                        style={{ width: 100 }}
                    >
                        <Option value="gte">≥</Option>
                        <Option value="lte">≤</Option>
                    </Select>
                    <InputNumber
                        placeholder="Net M2"
                        onChange={(value) => handleFilterChange('netMValue', value)}
                        style={{ width: 150 }}
                    />
                </Col>
                <Col>
                    <Select
                        value={filters.brutMCondition}
                        onChange={(value) => handleFilterChange('brutMCondition', value)}
                        style={{ width: 100 }}
                    >
                        <Option value="gte">≥</Option>
                        <Option value="lte">≤</Option>
                    </Select>
                    <InputNumber
                        placeholder="Kira Fiyatı"
                        onChange={(value) => handleFilterChange('brutMValue', value)}
                        style={{ width: 150 }}
                    />
                </Col>
            </Row>
            <List
                className='estatelist'
                grid={{ gutter: 16, column: 2 }}
                dataSource={filteredEstates}
                renderItem={(estate) => (
                    <List.Item className='estatelistitem'>
                        <Card
                            cover={
                                <Carousel style={{ maxHeight: "auto", maxWidth: "600px", margin: "10px auto 0 auto" }}>
                                    {[estate.imagelink1, estate.imagelink2, estate.imagelink3, estate.imagelink4].filter(link => link).map((link, index) => (
                                        <div key={index} className='carousel-container'>
                                            <img className='carousel-image' alt={`Image ${index + 1}`} src={link} />
                                        </div>
                                    ))}
                                </Carousel>
                            }
                        >
                            <Card.Meta
                                title={estate.name}
                                description={(
                                    <>
                                        <p style={{color:"#222831"}}>Location : {estate.location}</p>
                                        <p style={{color:"#222831"}}>Net M2 : {estate.netM}</p>
                                        <p style={{color:"#222831"}}>Kira Fiyatı {estate.brutM}</p>
                                        <p style={{color:"#222831"}}>Room Count : {estate.roomC}</p>
                                        <p style={{color:"#222831"}}>Aidat : {estate.aidat}</p>
                                        <p style={{color:"#222831"}}>Furnished : {estate.furnished ? 'Var' : 'Yok'}</p>
                                        <p style={{color:"#222831"}}>Floor : {estate.floor}</p>
                                        <p style={{color:"#222831"}}>Park : {estate.park ? 'Var' : 'Yok'}</p>
                                        <p style={{color:"#222831"}}>Description : {estate.description}</p>
                                    </>
                                )}
                            />
                        </Card>
                    </List.Item>
                )}
            />
        </div>
    );
};

export default EstateList;