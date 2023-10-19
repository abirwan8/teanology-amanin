import "./Surprise.css";

import Carousel from "react-bootstrap/Carousel";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";

const CarouselFoodSurprise = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({id});
  
  useEffect(() => {
    Axios.get(`http://localhost:5000/foods/${product.id}`).then((response) => {
      setProduct(response.data);
    });
  }, [id, product.id]);
  return (
    <>
      <Carousel className="carousel">
          <Carousel.Item>
            <img
              className="w-100 cropped-image"
              style={{ height: '480px' }}
              src={`/img/${product.img1}`}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img 
              className="w-100 cropped-image"
              style={{ height: '480px' }}
              src={`/img/${product.img2}`}
              alt="Second slide" 
            />
          </Carousel.Item>
          <Carousel.Item>
            <img 
              className="w-100 cropped-image"
              style={{ height: '480px' }}
              src={`/img/${product.img3}`}
              alt="Third slide"
            />
          </Carousel.Item>
      </Carousel>
      <div className="half-circle"></div>
    </>
  );
};

export default CarouselFoodSurprise;