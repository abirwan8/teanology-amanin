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
import Dropdown from 'react-bootstrap/Dropdown';
import Pagination from 'react-bootstrap/Pagination';
import Sidebar from "../components/dashboard/Sidebar.js";

const TeaMenuAdmin = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const [foodPairingList, setFoodPairingList] = useState([]);
  const [bevOptions, setBevOptions] = useState([]);
  const [foodOptions, setFoodOptions] = useState([]);
  const [formData, setFormData] = useState({
    bev: "",
    food: ""
  });
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteNameBev, setDeleteNameBev] = useState("");
  const [deleteNameFood, setDeleteNameFood] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (id, bevName, foodName) => {
    setEditId(id);
    setFormData({
      bev: bevName,
      food: foodName
    });
    setShowEdit(true);
  };
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id, nameBev, nameFood) => {
    setDeleteId(id);
    setDeleteNameBev(nameBev);
    setDeleteNameFood(nameFood);
    setShowDelete(true);
  };

  const [deleteId, setDeleteId] = useState(null);
  const [editId, setEditId] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // memperbarui nilai state sesuai dengan perubahan pada elemen input
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const tokoId = localStorage.getItem("id_toko");
  const userId = localStorage.getItem("id");
  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("name");

  useEffect(() => {
    Axios.get(`http://localhost:5000/bevs/${tokoId}`).then((response) => {
      setBevOptions(response.data);
    });

    Axios.get(`http://localhost:5000/foods/${tokoId}`).then((response) => {
      setFoodOptions(response.data);
    });

    Axios.get(`http://localhost:5000/foodpairings/${tokoId}`).then((response) => {
      setFoodPairingList(response.data);
    });
  }, []);

  const submitFoodPairingData = () => {
    const selectedBev = bevOptions.find((option) => option.name === formData.bev);
    const selectedFood = foodOptions.find((option) => option.name === formData.food);
    if (selectedBev && selectedFood) {
      const bevId = selectedBev.id;
      const foodId = selectedFood.id;

      // Mengirim permintaan POST ke endpoint yang ditentukan
      Axios.post("http://localhost:5000/foodpairings", { bevId, foodId, userId, tokoId })
        .then((response) => {
          console.log("Food pairing saved successfully!");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error saving food pairing:", error);
        });
      handleCloseAdd();
    } else {
      console.error("Invalid beverage or food option selected.");
    }
  };

  const handleEdit = async (id) => {
    console.log("editId:", editId);
    try {
      const selectedBev = bevOptions.find((option) => option.name === formData.bev);
      const selectedFood = foodOptions.find((option) => option.name === formData.food);
      if (selectedBev && selectedFood) {
        const bevId = selectedBev.id;
        const foodId = selectedFood.id;

        await Axios.put(`http://localhost:5000/foodpairings/${editId}`, {
          bevId: bevId,
          foodId: foodId,
          userId: userId,
        });

        console.log("Food pairing updated successfully!");
        handleCloseEdit();
        window.location.reload();
      } else {
        console.error("Invalid beverage or food option selected.");
      }
    } catch (error) {
      console.error(error);
      console.log(error.response);
      console.log(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await Axios.delete(`http://localhost:5000/foodpairings/${deleteId}`);
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
      localStorage.removeItem("id");
      localStorage.removeItem("name");
      localStorage.removeItem("role");
      // Mengarahkan pengguna ke halaman login
      navigate("/login-page");
    } catch (error) {
      console.error(error);
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredItems = foodPairingList.filter((item) => {
    return (
      item.bevName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      item.foodName.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  });

  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(foodPairingList.length / itemsPerPage); i++) {
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
            <h3 className="topbar-dashboard fw-bold margin-topbar-dashboard">Teanology Food Pairing Data</h3>
            <p className="text-muted teanology-menu-update">
                Manage your food pairing data on this page.
            </p>
          </Col>
          <Col md={5} xs={12} className="user-admin d-flex justify-content-end align-items-center">
            <Dropdown className="topbar-dashboard margin-admin-topbar">
              <Dropdown.Toggle className="button-user" variant="transparent" id="dropdown-basic">
                <i className="bi bi-person-fill me-2"></i>
                {userName}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <p className="ms-3 fw-bold fs-6 text-muted text-uppercase">{userRole}</p>
                <Dropdown.Divider style={{ marginTop: "-10px" }} />
                <Dropdown.Item href="/login-page" className="text-danger item-drop" onClick={handleLogout}><i class="bi bi-box-arrow-left me-2"></i>Keluar</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>

      <Row>
        <Col md={8}>
          <Button className="add-button btn-light fw-bold text-light text-center margin-add-button" onClick={handleShowAdd}>
            <i className="bi bi-plus me-2 fs-6 fw-bold"></i>
            Add Pairing
          </Button>

          <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static" keyboard={false} dialogClassName="modal-20w" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
              <Modal.Title>Add Food Pairing Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Beverage</Form.Label>
                  <Form.Select
                    className="form-data"
                    name="bev"
                    value={formData.bev}
                    onChange={handleInputChange}>
                    <option value="" disabled selected hidden>Select name</option>
                    {bevOptions.map((option) => (
                      <option key={option.id} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Food</Form.Label>
                  <Form.Select
                    className="form-data"
                    name="food"
                    value={formData.food}
                    onChange={handleInputChange}>
                    <option value="" disabled selected hidden>Select name</option>
                    {foodOptions.map((option) => (
                      <option key={option.id} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button className="pagination-button btn-light text-light" onClick={submitFoodPairingData} >Save</Button>
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
                Name Bev
              </th>
              <th scope="col" width="10%">
                Name Food
              </th>
              <th scope="col" width="10%">
                Nama User
              </th>
              <th scope="col" width="10%">
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
                  <td>{val.bevName}</td>
                  <td>{val.foodName}</td>
                  <td>{val.userName}</td>
                  <td>{formatDate(val.updatedAt)}</td>
                  <td className="d-flex justify-content-center">
                    {/* Edit data */}
                    <Button className="bg-warning btn-light rounded-2" size="sm" onClick={() => handleShowEdit(val.id, val.bevName, val.foodName)}>
                      <i className="bi bi-pen text-light fs-5"></i>
                    </Button>
                    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static" keyboard={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Food Pairing</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Beverage</Form.Label>
                            <Form.Select
                              className="form-data"
                              name="bev"
                              value={formData.bev}
                              onChange={handleInputChange}>
                              <option value="" disabled selected hidden>Select name</option>
                              {bevOptions.map((option) => (
                                <option key={option.id} value={option.name}>
                                  {option.name}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Food</Form.Label>
                            <Form.Select
                              className="form-data"
                              name="food"
                              value={formData.food}
                              onChange={handleInputChange}>
                              <option value="" disabled selected hidden>Select name</option>
                              {foodOptions.map((option) => (
                                <option key={option.id} value={option.name}>
                                  {option.name}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button className="btn-warning text-light" style={{ borderRadius: "100px" }}
                          onClick={() => {
                            handleEdit(val.id);
                            handleCloseEdit();
                          }}
                        >
                          Edit</Button>
                        <Button variant="outline-secondary" style={{ borderRadius: "100px" }} onClick={handleCloseEdit}>
                          Cancel
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/* Delete */}
                    <Button className="bg-danger ms-2 btn-light rounded-2" size="sm" onClick={() => handleShowDelete(val.id, val.bevName, val.foodName)}>
                      <i className="bi bi-trash3 text-light fs-5"></i>
                    </Button>
                    <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static" keyboard={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Delete Food Pairing</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>Are you sure, want to delete <span className="fw-bold">{deleteNameBev} & {deleteNameFood}</span> ?</p>
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

export default TeaMenuAdmin;