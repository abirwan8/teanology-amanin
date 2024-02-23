import './Library.css';

import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Axios from "axios";

const LibraryList = () => {
  const [libList, setLibList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:5000/libs").then((response) => {
      //console.log(response.data);
      setLibList(response.data);
    });
  }, []);

  return (
    <Container fluid className="menu__box-lib mt-4">
      {libList.map((val) => {
        if (!val.isHidden) {
          return (
            <React.Fragment key={val.id}>
              <Link to={`/details-library/${val.id}`}>
                <Row className="list-menu-lib">
                  <Col md={1} xs={3} className="mt-3">
                    <div className="position-relative" style={{ height: "100px" }}>
                      <img
                        alt="cover"
                        src={val.cover}
                        width={"100px"}
                        height={"100px"}
                        className='float-start'
                        style={{ borderRadius: "20px" }}
                      ></img>
                    </div>
                  </Col>
                  <Col md={11} xs={9}>
                    <div className='body-lib'>
                      <h4 className="lib-title pt-1">{val.title}</h4>
                      <p className='lib-highlight'>{val.desc}</p>
                      {/* <a href='/details-library/${val.id}' className="read-more">Baca Selengkapnya</a> */}
                    </div>
                  </Col>
                </Row>
              </Link>
              <h4 className="lib-dash"></h4>
              <div className="half-circle"></div>
            </React.Fragment>
          );
        }
        return null;
      })}
    </Container>
  );
};

export default LibraryList;