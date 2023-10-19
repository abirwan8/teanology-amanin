import React, { useState } from "react";

import { Container } from "react-bootstrap";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link } from 'react-router-dom';
import "./BottomNavbar.css";

function Breadcrumbs({ items }) {
  return (
    <Container fluid>
      <Breadcrumb role="navigation" aria-label="breadcrumb" className="breadcrumbs mt-2" style={{ boxShadow: "none" }}>
        {items.map((item, index) => (
          <Breadcrumb.Item key={index} linkAs={Link} linkProps={{ to: item.link }} active={index === items.length - 1}>
            {item.label}
          </Breadcrumb.Item>
        ))}
      </Breadcrumb>
    </Container>
  );
}

export default Breadcrumbs;