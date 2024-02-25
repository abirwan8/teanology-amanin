import "../components/dashboard/dashboard.css";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Pagination from 'react-bootstrap/Pagination';
import Dropdown from 'react-bootstrap/Dropdown';
import Sidebar from "../components/dashboard/Sidebar.js";

const TokoAdmin = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  
  const [staffList, setStaffList] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);


  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (id) => {
    const toko = staffList.find((val) => val.id === id);
    setEditId(id);
    setEditData(toko);
    setShowEdit(true);
  };
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id, name) => {
    setDeleteId(id);
    setDeleteName(name);
    setShowDelete(true);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const tokoRole = localStorage.getItem("role_toko");
  const tokoName = localStorage.getItem("name_toko");

  // CRUD
  useEffect(() => {
    Axios.get("http://localhost:5000/toko").then((response) => {
      //console.log(response.data);
      setStaffList(response.data);
    });
  }, []);

  const submitStaffData = async () => {
    try {
      const response = await Axios.post("http://localhost:5000/toko", {
        name: name,
        email: email,
        password: password,
        role: role,
      });
      // alert("Berhasil Insert");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      await Axios.put(`http://localhost:5000/toko/${editId}`, {
        name: editData.name,
        email: editData.email,
        password: password,
        role: editData.role,
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
      await Axios.delete(`http://localhost:5000/toko/${deleteId}`);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  // Log Out 
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Menghapus token dari localStorage
      localStorage.removeItem("id_toko");
      localStorage.removeItem("name_toko");
      localStorage.removeItem("role_toko");
      // Mengarahkan pengguna ke halaman login
      navigate("/login-toko");
    } catch (error) {
      console.error(error);
    }
  };

  // Pagination Table
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredItems = staffList.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.email.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.role.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  });
  
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(staffList.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Format Tanggal
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
            <h3 className="topbar-dashboard fw-bold margin-topbar-dashboard">Teanology Store Data</h3>
            <p className="text-muted teanology-menu-update">
                Manage your store data on this page.
            </p>
          </Col>
          <Col md={5} xs={12} className="user-admin d-flex justify-content-end align-items-center">

            <Dropdown className="topbar-dashboard margin-admin-topbar">
              <Dropdown.Toggle className="button-user" variant="transparent" id="dropdown-basic">
                <i className="bi bi-person-fill me-2"></i>
                {tokoName}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <p className="ms-3 fw-bold fs-6 text-muted text-uppercase">{tokoRole}</p>
                <Dropdown.Divider style={{ marginTop: "-10px" }} />
                <Dropdown.Item href="/login-toko" className="text-danger item-drop" onClick={handleLogout}><i class="bi bi-box-arrow-left me-2"></i>Keluar</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>

      <Row>
        <Col md={8}>
          <Button className="add-button btn-light fw-bold text-light text-center margin-add-button" onClick={handleShowAdd}>
            <i className="bi bi-plus me-2 fs-6 fw-bold"></i>
            Add Store Data
          </Button>

          <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static" keyboard={false} dialogClassName="modal-20w" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
              <Modal.Title>Add Store</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="text"
                    placeholder="Toko name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="email"
                    placeholder="example@mail.com"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="password"
                    placeholder="Enter password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Role</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) => {
                      setRole(e.target.value);
                    }}
                  >
                    <option disabled selected hidden>
                      Select Role
                    </option>
                    <option value="AdminToko">AdminToko</option>
                    <option value="Toko">Toko</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="pagination-button btn-light text-light"
                onClick={() => {
                  submitStaffData();
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
              <th scope="col" width="15%">
                Name
              </th>
              <th scope="col" width="20%">
                Email
              </th>
              <th scope="col" width="10%">
                Role
              </th>
              <th scope="col" width="15%">
                Created At
              </th>
              <th scope="col" width="15%">
                Last Updated
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
                  <td>{val.email}</td>
                  <td>{val.role}</td>
                  <td>{formatDate(val.createdAt)}</td>
                  <td>{formatDate(val.updatedAt)}</td>
                  <td className="d-flex justify-content-center">
                    {/* Edit data */}
                    <Button className="bg-warning btn-light rounded-2" size="sm" onClick={() => handleShowEdit(val.id)}>
                      <i className="bi bi-pen text-light fs-5"></i>
                    </Button>
                    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static" keyboard={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Toko Data</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                              className="form-data"
                              type="text"
                              placeholder="Toko name"
                              value={editData.name}
                              onChange={(e) => {
                                setEditData({ ...editData, name: e.target.value });
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              className="form-data"
                              type="email"
                              placeholder="example@mail.com"
                              value={editData.email}
                              onChange={(e) => {
                                setEditData({ ...editData, email: e.target.value });
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                              className="form-data"
                              type="password"
                              placeholder="Enter password"
                              onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Role</Form.Label>
                            <Form.Select
                              aria-label="Default select example"
                              value={editData.role}
                              onChange={(e) => {
                                setEditData({ ...editData, role: e.target.value });
                              }}
                            >
                              <option disabled selected hidden>
                                Select Role
                              </option>
                              <option value="AdminToko">AdminToko</option>
                              <option value="Toko">Toko</option>
                            </Form.Select>
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
                        <Modal.Title>Delete Toko</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>
                          Are you sure, want to delete toko <span className="fw-bold">{deleteName}</span>?
                        </p>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button
                          className="btn-danger text-light"
                          style={{ borderRadius: "100px" }}
                          onClick={() => {
                            handleDelete(val.id);
                            handleCloseDelete();
                          }}
                        >
                          Delete
                        </Button>
                        <Button variant="outline-secondary" style={{ borderRadius: "100px" }} onClick={handleCloseDelete}>
                          Cancel
                        </Button>
                      </Modal.Footer>
                    </Modal>
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

export default TokoAdmin;