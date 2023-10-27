import "../components/dashboard/dashboard.css";

import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Pagination from 'react-bootstrap/Pagination';
import Sidebar from "../components/dashboard/Sidebar.js";

const TeaMenuAdmin = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const [bevList, setBevList] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (id) => {
    const bev = bevList.find((val) => val.id === id);
    setEditId(id);
    setEditData(bev);
    setShowEdit(true);
  };
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id, name) => {
    setDeleteId(id);
    setDeleteName(name);
    setShowDelete(true);
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [ings, setIngs] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [img3, setImg3] = useState("");
  const [highlight, setHighlight] = useState("");
  const [tsp, setTsp] = useState("");
  const [tspg, setTspg] = useState("");
  const [water, setWater] = useState("");
  const [temp, setTemp] = useState("");
  const [time, setTime] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("");
  const [idUser, setIdUser] = useState("");
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");
  const [editData, setEditData] = useState({
    name: "",
    price: 0,
    ings: "",
    img1: "",
    img2: "",
    img3: "",
    highlight: "",
    tsp: "",
    tspg: "",
    water: "",
    temp: "",
    time: "",
    desc: "",
    type: "",
    userId: "",
  });

  const userId = localStorage.getItem("id");
  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("name");

  useEffect(() => {
    Axios.get("http://localhost:5000/bevs").then((response) => {
      //console.log(response.data);
      setBevList(response.data);
    });
  }, []);

  const submitBevData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("ings", ings);
      formData.append("img1", img1);
      formData.append("img2", img2);
      formData.append("img3", img3);
      formData.append("highlight", highlight);
      formData.append("tsp", tsp);
      formData.append("tspg", tspg);
      formData.append("water", water);
      formData.append("temp", temp);
      formData.append("time", time);
      formData.append("desc", desc);
      formData.append("type", type);
      formData.append("userId", userId);

      const response = await Axios.post("http://localhost:5000/bevs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    console.log("editId:", editId);
    try {
      const formData = new FormData();
      formData.append("name", editData.name);
      formData.append("price", editData.price);
      formData.append("ings", editData.ings);
      formData.append("highlight", editData.highlight);
      formData.append("tsp", editData.tsp);
      formData.append("tspg", editData.tspg);
      formData.append("water", editData.water);
      formData.append("temp", editData.temp);
      formData.append("time", editData.time);
      formData.append("desc", editData.desc);
      formData.append("type", editData.type);

      if (editData.img1) {
        formData.append("img1", editData.img1);
      }
      if (editData.img2) {
        formData.append("img2", editData.img2);
      }
      if (editData.img3) {
        formData.append("img3", editData.img3);
      }

      await Axios.put(`http://localhost:5000/bevs/${editId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      window.location.reload();
    } catch (error) {
      console.error(error);
      console.log(error.response);
      console.log(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`http://localhost:5000/bevs/${deleteId}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredItems = bevList.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.type.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  });
  
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(bevList.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const formatDate = (dateString) => {
    const updatedAt = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return updatedAt.toLocaleDateString("id-ID", options);
  };

  return (
    <Sidebar>
      <Container fluid>
        <Row  style={{ marginTop: "24px" }}>
          <Col md={7} xs={12}>
            <h3 className="topbar-dashboard fw-bold margin-topbar-dashboard">Teanology Beverage Data</h3>
            <p className="text-muted teanology-menu-update">
                Manage your beverage data on this page.
            </p>
          </Col>
          <Col md={5} xs={12} className="user-admin d-flex justify-content-end align-items-center">
            <p className="topbar-dashboard margin-admin-topbar">
              <i className="bi bi-person-circle me-2"></i>
              <span className="fw-bold">{userRole}</span> | {userName}
            </p>
          </Col>
        </Row>
      </Container>

      <Row>
        <Col md={8}>
          <Button className="add-button btn-light fw-bold text-light text-center margin-add-button" onClick={handleShowAdd}>
            <i className="bi bi-plus me-2 fs-6 fw-bold"></i>
            Add Beverage
          </Button>

          <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static" keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title>Add beverage menu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Row>
                  <Form.Group className="col-6 mb-2" controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      className="form-data"
                      type="text"
                      placeholder="Enter name"
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="col-6 mb-2" controlId="formBasicEmail">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      className="form-data"
                      type="text"
                      placeholder="Price"
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Row>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Ingredients</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="text"
                    placeholder="Ingredients"
                    onChange={(e) => {
                      setIngs(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Image1</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="file"
                    placeholder="Choose Image"
                    onChange={(e) => {
                      setImg1(e.target.files[0]);
                    }}
                  />
                </Form.Group>
                <Row>
                  <Form.Group className="col-6 mb-2" controlId="formBasicEmail">
                    <Form.Label>Image2</Form.Label>
                    <Form.Control
                      className="form-data"
                      type="file"
                      placeholder="Choose Image"
                      onChange={(e) => {
                        setImg2(e.target.files[0]);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="col-6 mb-2" controlId="formBasicEmail">
                    <Form.Label>Image3</Form.Label>
                    <Form.Control
                      className="form-data"
                      type="file"
                      placeholder="Choose Image"
                      onChange={(e) => {
                        setImg3(e.target.files[0]);
                      }}
                    />
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group className="col-5 mb-2" controlId="formBasicEmail">
                    <Form.Label>Highlight</Form.Label>
                    <Form.Control
                      className="form-data"
                      type="text"
                      placeholder="Enter highlight"
                      onChange={(e) => {
                        setHighlight(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="col-4 mb-2" controlId="formBasicEmail">
                    <Form.Label>Teaspoon</Form.Label>
                    <Form.Control
                      className="form-data"
                      type="text"
                      placeholder="Enter teaspoon"
                      onChange={(e) => {
                        setTsp(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="col-3 mb-2" controlId="formBasicEmail">
                    <Form.Label>Gram</Form.Label>
                    <Form.Control
                      className="form-data"
                      type="text"
                      placeholder="2 gram"
                      onChange={(e) => {
                        setTspg(e.target.value);
                      }}
                    />
                  </Form.Group>
                  </Row>
                  <Row>
                  <Form.Group className="col-4 mb-2" controlId="formBasicEmail">
                    <Form.Label>Water</Form.Label>
                    <Form.Control
                      className="form-data"
                      type="text"
                      placeholder="Enter water"
                      onChange={(e) => {
                        setWater(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="col-4 mb-2" controlId="formBasicEmail">
                    <Form.Label>Temp</Form.Label>
                    <Form.Control
                      className="form-data"
                      type="text"
                      placeholder="Enter temp"
                      onChange={(e) => {
                        setTemp(e.target.value);
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="col-4 mb-2" controlId="formBasicEmail">
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                      className="form-data"
                      type="text"
                      placeholder="Enter time"
                      onChange={(e) => {
                        setTime(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Row>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    style={{ borderRadius: "20px" }}
                    as="textarea"
                    rows={3}
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Type</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="text"
                    placeholder="Enter type"
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="pagination-button btn-light text-light"
                onClick={() => {
                  submitBevData(userId);
                  handleCloseAdd();
                }}
              >
                Save
              </Button>
              <Button variant="outline-secondary" style={{ borderRadius: "100px" }} onClick={handleCloseAdd}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>

        <Col md={4}>
          <Form className="d-flex margin-search" style={{ marginRight: "18%" }}>
            <InputGroup className="mb-3">
              <InputGroup.Text className="search-icon" id="basic-addon1">
                <i className="bi bi-search fs-6 text-muted"></i>
              </InputGroup.Text>
              <Form.Control 
                className="search-data" 
                type="search" 
                placeholder="Search data" 
                aria-label="Search" 
                value={searchKeyword}
                onChange={handleSearchChange}
              />
            </InputGroup>
          </Form>
        </Col>
      </Row>

      <Row className="margin-table">
        <Table responsive>
          <thead>
            <tr>
              <th scope="col" width="10%">
                Name
              </th>
              <th scope="col" width="5%">
                Price
              </th>
              <th scope="col" width="10%">
                Ingredients
              </th>
              <th scope="col" width="18%">
                Image
              </th>
              <th scope="col" width="10%">
                Highlight
              </th>
              <th scope="col" width="10%">
                Teaspoon
              </th>
              <th scope="col" width="10%">
                Water
              </th>
              <th scope="col" width="10%">
                Temp
              </th>
              <th scope="col" width="10%">
                Time
              </th>
              <th scope="col" width="12%">
                Description
              </th>
              <th scope="col" width="5%">
                Type
              </th>
              <th scope="col" width="10%">
                Last Update
              </th>
              <th scope="col" width="10%" className="text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((val) => {
              return (
                <tr key={val.id}>
                  <td>{val.name}</td>
                  <td>{val.price}</td>
                  <td>{val.ings.split(' ').slice(0, 4).join(' ')}...</td>
                  <td>
                    <td className="d-flex justify-content-start">
                      {val.img1 && <img src={`/bev-img/${val.img1}`} alt="Food1" style={{ width: "42px" }} />}
                      {val.img2 && <img src={`/bev-img/${val.img2}`} alt="Food2" className="ms-1" style={{ width: "42px" }} />}
                      {val.img3 && <img src={`/bev-img/${val.img3}`} alt="Food3" className="ms-1" style={{ width: "42px" }} />}
                    </td>
                  </td>
                  <td>{val.highlight}</td>
                  <td>{val.tsp} ({val.tspg}g)</td>
                  <td>{val.water} Ml</td>
                  <td>{val.temp} °C</td>
                  <td>{val.time} Mins</td>
                  <td>{val.desc.split(' ').slice(0, 4).join(' ')}...</td>
                  <td>{val.type}</td>
                  <td>{formatDate(val.updatedAt)}</td>
                  <td>
                    <td className="d-flex justify-content-center">
                    {/* Edit data */}
                    <Button className="bg-warning btn-light rounded-2" size="sm" onClick={() => handleShowEdit(val.id)}>
                      <i className="bi bi-pen text-light fs-5"></i>
                    </Button>
                    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static" keyboard={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit beverage menu</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Row>
                            <Form.Group className="col-6 mb-2" controlId="formBasicEmail">
                              <Form.Label>Name</Form.Label>
                              <Form.Control
                                className="form-data"
                                type="text"
                                placeholder="Enter name"
                                value={editData.name} 
                                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                              />
                            </Form.Group>
                            <Form.Group className="col-6 mb-2" controlId="formBasicEmail">
                              <Form.Label>Price</Form.Label>
                              <Form.Control
                                className="form-data"
                                type="text"
                                placeholder="Price"
                                value={editData.price}
                                onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                              />
                            </Form.Group>
                          </Row>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Ingredients</Form.Label>
                            <Form.Control
                              className="form-data"
                              type="text"
                              placeholder="Ingredients"
                              value={editData.ings}
                              onChange={(e) => setEditData({ ...editData, ings: e.target.value })}
                            />
                          </Form.Group>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Image1</Form.Label>
                            <Form.Control className="form-data" type="file" placeholder="Choose Image" 
                              onChange={(e) => 
                                setEditData({ ...editData, img1: e.target.files[0] })}
                             />
                          </Form.Group>
                          <Row>
                            <Form.Group className="col-6 mb-2" controlId="formBasicEmail">
                              <Form.Label>Image2</Form.Label>
                              <Form.Control
                                className="form-data"
                                type="file"
                                placeholder="Choose Image"
                                onChange={(e) => 
                                  setEditData({ ...editData, img2: e.target.files[0] })}
                              />
                            </Form.Group>
                            <Form.Group className="col-6 mb-2" controlId="formBasicEmail">
                              <Form.Label>Image3</Form.Label>
                              <Form.Control
                                className="form-data"
                                type="file"
                                placeholder="Choose Image"
                                onChange={(e) => 
                                  setEditData({ ...editData, img3: e.target.files[0] })}
                              />
                            </Form.Group>
                          </Row>
                          <Row>
                            <Form.Group className="col-5 mb-2" controlId="formBasicEmail">
                              <Form.Label>Highlight</Form.Label>
                              <Form.Control
                                className="form-data"
                                type="text"
                                placeholder="Enter highlight"
                                value={editData.highlight}
                                onChange={(e) => setEditData({ ...editData, highlight: e.target.value })}
                              />
                            </Form.Group>
                            <Form.Group className="col-4 mb-2" controlId="formBasicEmail">
                              <Form.Label>Teaspoon</Form.Label>
                              <Form.Control
                                className="form-data"
                                type="text"
                                placeholder="Enter teaspoon"
                                value={editData.tsp}
                                onChange={(e) => setEditData({ ...editData, tsp: e.target.value })}
                              />
                            </Form.Group>
                            <Form.Group className="col-3 mb-2" controlId="formBasicEmail">
                              <Form.Label>Gram</Form.Label>
                              <Form.Control
                                className="form-data"
                                type="text"
                                placeholder="Enter teaspoon(gram)"
                                value={editData.tspg}
                                onChange={(e) => setEditData({ ...editData, tspg: e.target.value })}
                              />
                            </Form.Group>
                            </Row>
                            <Row>
                            <Form.Group className="col-4 mb-2" controlId="formBasicEmail">
                              <Form.Label>Water</Form.Label>
                              <Form.Control
                                className="form-data"
                                type="text"
                                placeholder="Enter water"
                                value={editData.water}
                                onChange={(e) => setEditData({ ...editData, water: e.target.value })}
                              />
                            </Form.Group>
                            <Form.Group className="col-4 mb-2" controlId="formBasicEmail">
                              <Form.Label>Temp</Form.Label>
                              <Form.Control
                                className="form-data"
                                type="text"
                                placeholder="Enter temp"
                                value={editData.temp}
                                onChange={(e) => setEditData({ ...editData, temp: e.target.value })}
                              />
                            </Form.Group>
                            <Form.Group className="col-4 mb-2" controlId="formBasicEmail">
                              <Form.Label>Time</Form.Label>
                              <Form.Control
                                className="form-data"
                                type="text"
                                placeholder="Enter time"
                                value={editData.time}
                                onChange={(e) => setEditData({ ...editData, time: e.target.value })}
                              />
                            </Form.Group>
                          </Row>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              style={{ borderRadius: "20px" }}
                              as="textarea"
                              rows={3}
                              value={editData.desc}
                              onChange={(e) => setEditData({ ...editData, desc: e.target.value })}
                            />
                          </Form.Group>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Type</Form.Label>
                            <Form.Control
                              className="form-data"
                              type="text"
                              placeholder="Enter type"
                              value={editData.type}
                              onChange={(e) => setEditData({ ...editData, type: e.target.value })}
                            />
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          className="btn-warning text-light"
                          style={{ borderRadius: "100px" }}
                          onClick={() => {
                            handleEdit(val.id);
                            handleCloseEdit();
                          }}
                        >
                          Edit
                        </Button>
                        <Button variant="outline-secondary" style={{ borderRadius: "100px" }} onClick={handleCloseEdit}>
                          Cancel
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/* Delete */}
                    <Button className="bg-danger ms-2 btn-light rounded-2" size="sm" onClick={() => handleShowDelete(val.id, val.name)}>
                      <i className="bi bi-trash3 text-light fs-5"></i>
                    </Button>
                    <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static" keyboard={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Delete beverage menu</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>
                          Are you sure, want to delete beverage menu <span className="fw-bold">{deleteName}</span>?
                        </p>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button className="btn-danger text-light" style={{ borderRadius: "100px" }}
                        onClick={() => {
                          handleDelete(val.id);
                          handleCloseDelete();
                        }}>
                          Delete
                        </Button>
                        <Button variant="outline-secondary" style={{ borderRadius: "100px" }} onClick={handleCloseDelete}>
                          Cancel
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    </td>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>

      <Row className="margin-table d-flex">
        <Col md={4} xs={12} className="page-total">
          <p>Page {currentPage} from {pageNumbers.length} pages</p>
          <p style={{ marginTop: "-16px" }}>
            Total data : <span className="fw-bold">{currentItems.length}</span>
          </p>
        </Col>
        <Col md={8} xs={12}>
          <Pagination className="mt-3 pagination-sm">
            <Pagination.Prev
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                }
              }}
              disabled={currentPage === 1}
              className="page-prev"
              >
            Previous
            </Pagination.Prev>
            {pageNumbers.map((number) => (
              <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => paginate(number)}
              >
                {number}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => {
                if (currentPage < pageNumbers.length) {
                  setCurrentPage(currentPage + 1);
                }
              }}
              disabled={currentPage === pageNumbers.length}
              className="page-next"
              >
            Next
            </Pagination.Next>
          </Pagination>
        </Col>
      </Row>
    </Sidebar>
  );
};

export default TeaMenuAdmin;
