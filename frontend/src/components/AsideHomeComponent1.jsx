import React from 'react'
import { Carousel } from 'antd';
import img1 from "../assets/img1.avif"
import img3 from "../assets/img3.avif"
import img4 from "../assets/img4.avif"

const AsideHomeComponent2 = () => {
    return (
        <div className='asidehomecomponent-container'>
            <div className='aside-text-1'>
                <p className='aside-text-p'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas at possimus voluptatum temporibus harum eius ipsum amet architecto beatae corporis sapiente, sed a! Possimus rem quo eos non fuga maxime magnam tempore inventore ea asperiores nihil quaerat vel ipsam perferendis architecto expedita, eius labore. Voluptate quis quidem ducimus, quos excepturi voluptatem corporis ea officia. Ipsam voluptatibus labore quam suscipit ea porro id molestiae. Tenetur cum minus sequi nostrum ipsum sint dolores cupiditate assumenda alias ipsam ipsa laborum exercitationem, nisi excepturi mollitia repellat, provident quisquam perspiciatis incidunt ut repellendus? Voluptate, qui.</p>
            </div>
            <div className='home-slider'>
                <Carousel className='carousel' dotPosition="top">
                    {[img4, img1, img3].filter(link => link).map((link, index) => (
                        <div key={index} className='carousel-container'>
                            <img className='carousel-image' alt={`Image ${index + 1}`} src={link} />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default AsideHomeComponent2
