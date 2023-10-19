import './Neutral.css';

import Carousel from 'react-bootstrap/Carousel';
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

const Carousel2 = () => {
  const { id } = useParams();
  const [val, setVal] = useState({id});
  
  useEffect(() => {
    Axios.get(`http://localhost:5000/bevs/${val.id}`).then((response) => {
      //console.log(response.data);
      setVal(response.data);
    });
  }, [id]);
  return (
    <>
    <Carousel className='carousel'>
      <Carousel.Item>
        <img
          className="w-100 cropped-image"
          style={{ height: '480px' }}
          src={`/bev-img/${val.img1}`}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="w-100 cropped-image"
          style={{ height: '480px' }}
          src={`/bev-img/${val.img2}`}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="w-100 cropped-image"
          style={{ height: '480px' }}
          src={`/bev-img/${val.img3}`}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    <div className="half-circle"></div>
    </>
  );
}

export default Carousel2;