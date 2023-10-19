import "./Fear.css";

import React, { useState, useEffect } from "react";
import Axios from "axios";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { useParams } from "react-router-dom";

const DescryptionFoodFear = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({id});

  useEffect(() => {
    Axios.get(`http://localhost:5000/foods/${product.id}`).then((response) => {
      //console.log(response.data);
      setProduct(response.data);
    }).catch((error) => {
      console.error(error);
      console.log(error.response);
      console.log(error.message);
    });
  }, [id, product.id]);

  return (
    <div className="desc-box">
      <Card className="shadow-none desc-body">
        <Card.Body>
          <div className="mx-1">
            <Badge className="badge-custom-fear fw-normal ms-2">{product.ings}</Badge>
            <Badge className="badge-custom-fear fw-normal ms-2">Fear</Badge>
          </div>

          <h2 className="ms-2 mt-2 fw-bold">{product.name}</h2>

          <div className="ms-2">
            <span className="type">{product.highlight}</span>
          </div>

          <hr></hr>
          <p className="ms-2">{product.highlight}</p>
          <p className="ms-2">{product.desc}</p><br></br><br></br>
        </Card.Body>
      </Card>
      <div className="half-circle"></div>
    </div>
  );
}

export default DescryptionFoodFear;