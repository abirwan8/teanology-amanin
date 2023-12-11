import './Angry.css';

import Carousel from 'react-bootstrap/Carousel';
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

const CarouselFoodAngry = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({id});
  const imageBaseUrl = "http://localhost:5000/";
  
  useEffect(() => {
    Axios.get(`http://localhost:5000/foods/${product.id}`).then((response) => {
      //console.log(response.data);
      setProduct(response.data);
    });
  }, [id]);
  return (
    <>
      <Carousel className='carousel'>
        {product.img1 && (
          <Carousel.Item>
            <img
              className="w-100 cropped-image"
              style={{ height: '480px' }}
              src={`${imageBaseUrl}${product.img1}`}
              alt="First Pic"
            />
          </Carousel.Item>
        )}

        {product.img2 && (
          <Carousel.Item>
            <img
              className="w-100 cropped-image"
              style={{ height: '480px' }}
              src={`${imageBaseUrl}${product.img2}`}
              alt="Second Pic"
            />
          </Carousel.Item>
        )}

        {product.img3 && (
          <Carousel.Item>
            <img
              className="w-100 cropped-image"
              style={{ height: '480px' }}
              src={`${imageBaseUrl}${product.img3}`}
              alt="Third Pic"
            />
          </Carousel.Item>
        )}
        {product.img4 && (
          <Carousel.Item>
            <img
              className="w-100 cropped-image"
              style={{ height: '480px' }}
              src={`${imageBaseUrl}${product.img4}`}
              alt="Fourth Pic"
            />
          </Carousel.Item>
        )}
        {product.img5 && (
          <Carousel.Item>
            <img
              className="w-100 cropped-image"
              style={{ height: '480px' }}
              src={`${imageBaseUrl}${product.img5}`}
              alt="Fifth Pic"
            />
          </Carousel.Item>
        )}
      </Carousel>
      <div className="half-circle"></div>
    </>
  );
}

export default CarouselFoodAngry;