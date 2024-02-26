import './Angry.css';

import Carousel from 'react-bootstrap/Carousel';
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

const Carousel2 = () => {
  const { id } = useParams();
  const [val, setVal] = useState({id});
  const imageBaseUrl = "http://localhost:5000/";
  const tokoId = localStorage.getItem("id_toko");
  
  useEffect(() => {
    Axios.get(`http://localhost:5000/bevs/${tokoId}/${val.id}`).then((response) => {
      //console.log(response.data);
      setVal(response.data);
    });
  }, [id]);
  return (
    <>
      <Carousel className='carousel'>
        {val.img1 && (
          <Carousel.Item>
            <img
              className="w-100 cropped-image"
              style={{ height: '480px' }}
              src={`${imageBaseUrl}${val.img1}`}
              alt="First Pic"
            />
          </Carousel.Item>
        )}

        {val.img2 && (
          <Carousel.Item>
            <img
              className="w-100 cropped-image"
              style={{ height: '480px' }}
              src={`${imageBaseUrl}${val.img2}`}
              alt="Second Pic"
            />
          </Carousel.Item>
        )}

        {val.img3 && (
          <Carousel.Item>
            <img
              className="w-100 cropped-image"
              style={{ height: '480px' }}
              src={`${imageBaseUrl}${val.img3}`}
              alt="Third Pic"
            />
          </Carousel.Item>
        )}
        {val.img4 && (
          <Carousel.Item>
            <img
              className="w-100 cropped-image"
              style={{ height: '480px' }}
              src={`${imageBaseUrl}${val.img4}`}
              alt="Fourth Pic"
            />
          </Carousel.Item>
        )}
        {val.img5 && (
          <Carousel.Item>
            <img
              className="w-100 cropped-image"
              style={{ height: '480px' }}
              src={`${imageBaseUrl}${val.img5}`}
              alt="Fifth Pic"
            />
          </Carousel.Item>
        )}
      </Carousel>
      <div className="half-circle"></div>
    </>
  );
}

export default Carousel2;