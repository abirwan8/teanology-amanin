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
import { Badge } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import Sidebar from "../components/dashboard/Sidebar.js";

const LibraryAdmin = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };
  
  const [libList, setLibList] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (id) => {
    const lib = libList.find((val) => val.id === id);
    setEditId(id);
    setEditData(lib);
    setShowEdit(true);
  };
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id, title) => {
    setDeleteId(id);
    setDeleteName(title);
    setShowDelete(true);
  };

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cover, setCover] = useState("");
  const [pdfFile, setPdfFile] = useState("");
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");
  const [editData, setEditData] = useState({
    title: "",
    desc: "",
    cover: "",
    pdfFile: "",
    isHidden: false,
    userId: ""
  });
  
  const userId = localStorage.getItem("id");
  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("name");

  const handleIsHiddenChange = (event) => {
    const newIsHidden = event.target.value === 'Tidak Aktif';
    setEditData({ ...editData, isHidden: newIsHidden });
  };
  
  // CRUD
  useEffect(() => {
    Axios.get("http://localhost:5000/libs").then((response) => {
      //console.log(response.data);
      setLibList(response.data);
    });
  }, []);

  const submitLibData = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("desc", desc);
      formData.append("cover", cover);
      formData.append("pdfFile", pdfFile);
      formData.append("userId", userId);

      await Axios.post("http://localhost:5000/libs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

 const handleEdit = async (id) => {
    console.log("editId:", editId);
    try {
      const formData = new FormData();
      formData.append("title", editData.title);
      formData.append("desc", editData.desc);
      formData.append("isHidden", editData.isHidden);

      await Axios.put(`http://localhost:5000/libs/${editId}`, formData, {
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
      await Axios.delete(`http://localhost:5000/libs/${deleteId}`);
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

  // Pagination Table
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredItems = libList.filter((item) => {
    return (
      item.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  });
  
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(libList.length / itemsPerPage); i++) {
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
            <h3 className="topbar-dashboard fw-bold margin-topbar-dashboard">Teanology Library Data {localStorage.getItem("name_toko")}</h3>
            <p className="text-muted teanology-menu-update">
                Manage your library data on this page.
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
            Add Library Data
          </Button>

          <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static" keyboard={false} dialogClassName="modal-20w" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
              <Modal.Title>Add Library</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Judul</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="text"
                    placeholder="Tambahkan Judul"
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Deskripsi</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="text"
                    placeholder="Tambahkan Highlight"
                    onChange={(e) => {
                      setDesc(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>Sampul</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="file"
                    placeholder="Tambahkan sampul"
                    onChange={(e) => {
                      setCover(e.target.files[0]);
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-2" controlId="formBasicEmail">
                  <Form.Label>File PDF</Form.Label>
                  <Form.Control
                    className="form-data"
                    type="file"
                    onChange={(e) => {
                      setPdfFile(e.target.files[0]);
                    }}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="pagination-button btn-light text-light"
                onClick={() => {
                  submitLibData(userId);
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
                Judul
              </th>
              <th scope="col" width="25%">
                Deskripsi
              </th>
              <th scope="col" width="10%">
                Sampul
              </th>
              <th scope="col" width="15%">
                File PDF
              </th>
              <th scope="col" width="10%">
                Status
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
                  <td>{val.title.split(' ').slice(0, 3).join(' ')}{val.title.split(' ').length > 3 ? '...' : ''}</td>
                  <td>{val.desc.split(' ').slice(0, 5).join(' ')}{val.desc.split(' ').length > 5 ? '...' : ''}</td>
                  <td>{val.cover && <img src={val.cover} alt="cover" style={{ width: "42px" }} />}</td>
                  <td>
                    <Badge bg="secondary" className="p-2" style={{ display: "inline-block", maxWidth: "100%" }}>
                      <i class="bi fs-6 text-light me-2 bi-file-earmark-pdf"></i>
                      {val.title.split(' ').slice(0, 1).join(' ')}{val.title.split(' ').length > 1 ? '...' : ''}
                    </Badge>
                  </td>
                  <td>{val.isHidden ? (
                      <Badge bg="danger" className="p-2"><i class="bi bi-eye-slash fs-6 text-light me-2"></i>Nonaktif </Badge>
                    ) : (
                      <Badge bg="primary" className="p-2"><i class="bi bi-eye fs-6 text-light me-2"></i>Aktif </Badge>
                    )}
                  </td>
                  <td className="d-flex justify-content-center">
                    {/* Edit data */}
                    <Button className="bg-warning btn-light rounded-2" size="sm" onClick={() => handleShowEdit(val.id)}>
                      <i className="bi bi-pen text-light fs-5"></i>
                    </Button>
                    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static" keyboard={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Library Data</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Judul</Form.Label>
                            <Form.Control
                              className="form-data"
                              type="text"
                              placeholder="Judul"
                              value={editData.title}
                              onChange={(e) => {
                                setEditData({ ...editData, title: e.target.value });
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Deskripsi</Form.Label>
                            <Form.Control
                              className="form-data"
                              type="text"
                              placeholder="Deskripsi"
                              value={editData.desc}
                              onChange={(e) => {
                                setEditData({ ...editData, desc: e.target.value });
                              }}
                            />
                          </Form.Group>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>Sampul</Form.Label>
                            <Form.Control 
                              className="form-data" 
                              type="file" 
                              onChange={(e) => 
                                setEditData({ ...editData, cover: e.target.files[0] })
                              } />
                          </Form.Group>
                          <Form.Group className="mb-2" controlId="formBasicEmail">
                            <Form.Label>File PDF</Form.Label>
                            <Form.Control 
                              className="form-data" 
                              type="file" 
                              onChange={(e) => 
                                setEditData({ ...editData, pdfFile: e.target.files[0] })
                              } />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label htmlFor="isHiddenSelect">Status</Form.Label>
                            <Form.Select
                              className="form-data"
                                id="isHiddenSelect" 
                                value={editData.isHidden ? 'Tidak Aktif' : 'Aktif'} 
                                onChange={handleIsHiddenChange}
                            >
                              <option value="Tidak Aktif">Tidak Aktif</option>
                              <option value="Aktif">Aktif</option>
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
                    <Button className="bg-danger ms-2 btn-light rounded-2" size="sm" onClick={() => handleShowDelete(val.id, val.title)}>
                      <i className="bi bi-trash3 text-light fs-5"></i>
                    </Button>
                    <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static" keyboard={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Delete Library</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>
                          Are you sure, want to delete library <span className="fw-bold">{deleteName}</span>?
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

export default LibraryAdmin;