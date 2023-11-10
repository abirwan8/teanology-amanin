import './Library.css';

import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Axios from "axios";

const LibraryList = () => {
  return (
    <Container fluid className="menu__box-lib">
      <Link to={`/product-details-catalogue`}>
        <Row className="list-menu-lib">
            <Col md={2} xs={4} className="mt-3">
                <div className="position-relative" style={{ height: "88px" }}>
                    <img alt="lib"
                        src="https://cdn1-production-images-kly.akamaized.net/DRZzRRkpsrIIMTV0ERrtO19XcLI=/973x0:4142x3169/1200x1200/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/2981642/original/004479000_1575020680-peppermint-tea-on-teacup-1417945.jpg" 
                        width={"140px"} height={"140px"} style={{ borderRadius: "20px" }}>
                    </img>
                </div>
            </Col>
            <Col md={10} xs={8}>
                <h4 className="lib-title">Basic Tea Education</h4>
                <p className="lib-highlight">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <a href='product-details-catalogue' className='read-more'>Baca Selengkapnya</a>
            </Col>
        </Row>
      </Link>
      <h4 className="lib-dash" aria-hidden="true"></h4>
    </Container>
  );
};

export default LibraryList;