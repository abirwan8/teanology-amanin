import "./Sad.css";

import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Axios from "axios";

const TeaMenusSad = () => {
  const [bevList, setBevList] = useState([]);
  
  useEffect(() => {
    Axios.get("http://localhost:5000/bevs").then((response) => {
      //console.log(response.data);
      setBevList(response.data);
    })
    .catch((error) => {
      console.error(error);
      console.log(error.response);
      console.log(error.message);
    });
  }, []);

  // Fungsi untuk mengelompokkan elemen berdasarkan val.type
  const groupByType = (array) => {
    return array.reduce((acc, obj) => {
      const key = obj.type;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  };

  const groupedBevList = groupByType(bevList);

  return (
    <>
      {Object.keys(groupedBevList).map((type, index) => {
        const filteredList = groupedBevList[type].filter(
          (val) => !val.isHidden
        );

        // Hanya melakukan render jika masih ada elemen yang akan ditampilkan
        if (filteredList.length > 0) {
          return (
            <Container fluid className="menu__box-sad" key={index}>
              <h3 className="type-menu-sad">{type}</h3>
              {filteredList.map((val) => (
                <Link to={`/product-details-sad/${val.id}`} key={val.id}>
                  <h4 className="dash-sad" aria-hidden="true"></h4>
                  <Row className="list-menu-sad">
                    <Col md={10} xs={8}>
                      <h5 className="code-name-sad">{val.name}</h5>
                      <small className="status">
                        <i className="bi bi-hand-thumbs-up me-2"></i>
                        {val.highlight}
                      </small>
                      <p>{val.ings}</p>
                      <p className="fw-bold">Rp{val.price}</p>
                    </Col>
                    <Col md={2} xs={4} className="mt-3">
                      <div
                        className="position-relative"
                        style={{ height: "88px" }}
                      >
                        <img
                          alt={val.name}
                          src={val.img1}
                          width={"88px"}
                          height={"88px"}
                          className="float-end"
                          style={{ borderRadius: "20px" }}
                        />
                      </div>
                    </Col>
                  </Row>
                </Link>
              ))}
            </Container>
          );
        }
        return null; // Jika tidak ada elemen yang ditampilkan, kembalikan null
      })}
    </>
  );
};

export default TeaMenusSad;