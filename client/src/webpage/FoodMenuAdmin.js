import "../components/dashboard/dashboard.css";

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Pagination from 'react-bootstrap/Pagination';
import Alert from 'react-bootstrap/Alert';
import Dropdown from 'react-bootstrap/Dropdown';
import { Badge } from 'react-bootstrap';
import Sidebar from "../components/dashboard/Sidebar.js";

const FoodMenuAdmin = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const [foodList, setFoodList] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseAdd = () => setShowAdd(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseEdit = () => setShowEdit(false);
  const handleShowEdit = (id) => {
    const food = foodList.find((val) => val.id === id);
    setEditId(id);
    setEditData(food);
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
  const [desc, setDesc] = useState("");
  const [isHidden, setIsHidden] = useState(false);
  const [idUser, setIdUser] = useState("");
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteName, setDeleteName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [editData, setEditData] = useState({
    name: "",
    price: 0,
    ings: "",
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    img5: "",
    desc: "",
    isHidden: false,
    userId: "",
    tokoId: "",
  });

  const tokoId = localStorage.getItem("id_toko");
  const userId = localStorage.getItem("id");
  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("name");

  const handleIsHiddenChange = (event) => {
    const newIsHidden = event.target.value === 'Tidak Aktif';
    setEditData({ ...editData, isHidden: newIsHidden });
  };

  useEffect(() => {
    Axios.get(`http://localhost:5000/foods/${tokoId}`).then((response) => {
      //console.log(response.data);
      setFoodList(response.data);
    });
  }, []);

  const submitFoodData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("ings", ings);
      formData.append("tokoId", tokoId);
      formData.append("img1", files[0]);
      formData.append("img2", files[1]);
      formData.append("img3", files[2]);
      formData.append("img4", files[3]);
      formData.append("img5", files[4]);
      formData.append("desc", desc);
      formData.append("userId", userId);

      await Axios.post("http://localhost:5000/foods", formData, {
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
      formData.append("desc", editData.desc);
      formData.append("isHidden", editData.isHidden);

      await Axios.put(`http://localhost:5000/foods/${editId}`, formData, {
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
      await Axios.delete(`http://localhost:5000/foods/${deleteId}`);
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
  const filteredItems = foodList.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  });
  
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(foodList.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const formatDate = (dateString) => {
    const updatedAt = new Date(dateString);
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return updatedAt.toLocaleDateString("id-ID", options);
  };

  // Bagian Gambar
  const [files, setFile] = useState([]);
  const [message, setMessage] = useState();
  const [showValid, setShowValid] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (e) => {
    setMessage("");
    let file = e.target.files;

    for (let i = 0; i < file.length; i++) {
      const fileType = file[i]["type"];
      const fileSize = file[i].size; // Mendapatkan ukuran file dalam byte
      const maxSize = 5 * 1024 * 1024;
      const validImageTypes = ["image/jfif", "image/jpeg", "image/png"];

      if (validImageTypes.includes(fileType) && fileSize <= maxSize) {
        setFile([...files, file[i]]);
      } else {
        let errorMessage = "File tidak valid.";
        if (!validImageTypes.includes(fileType)) {
          errorMessage = "File tidak valid.";
        } else if (fileSize > maxSize) {
          errorMessage = "Ukuran file melebihi 5MB.";
        }
  
        setMessage(errorMessage);
        setShowValid(true);
      }
    }
  };

  const removeImage = (i) => {
    setFile(files.filter((x) => x.name !== i));
  };

  function selectFiles(){
    fileInputRef.current.click();
  }
  return (
    <Sidebar>
      <Container fluid>
        <Row  style={{ marginTop: "24px" }}>
          <Col md={7} xs={12}>
            <h3 className="topbar-dashboard fw-bold margin-topbar-dashboard">Teanology Food Data {localStorage.getItem("name_toko")}</h3>
            <p className="text-muted teanology-menu-update">
                Manage your foods data on this page.
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
                <Dropdown.Item href="/login-page" className="text-danger item-drop" onClick={handleLogout}><i className="bi bi-box-arrow-left me-2"></i>Keluar</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>

      <Row>
        <Col md={8}>
          <Button className="add-button btn-light fw-bold text-light text-center margin-add-button" onClick={handleShowAdd}>
            <i className="bi bi-plus me-2 fs-6 fw-bold"></i>
            Add Food Data
          </Button>

          <Modal show={showAdd} onHide={handleCloseAdd} backdrop="static" keyboard={false} dialogClassName="modal-80w" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title>Tambahkan Menu Makanan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Container>
                <Form>
                  <Row>
                    <Col xs={12} md={8}>
                      <Row className="mb-3">
                        <Form.Group className="col-md-6">
                          <Form.Label>Nama Makanan</Form.Label>
                          <Form.Control 
                              type="text" 
                              className="form-data" 
                              placeholder="Masukkan Nama" 
                              onChange={(e) => {
                                setName(e.target.value);
                              }} 
                          />
                        </Form.Group>

                        <Form.Group className="col-md-6">
                          <Form.Label>Harga</Form.Label>
                          <Form.Control 
                              type="text" 
                              className="form-data" 
                              placeholder="Masukkan Harga"
                              onChange={(e) => {
                                setPrice(e.target.value);
                              }}
                          />
                        </Form.Group>
                      </Row>

                      <Row className="mb-3">
                        <Form.Group className="col-md-12">
                          <Form.Label>Komposisi</Form.Label>
                          <Form.Control 
                              type="text" 
                              className="form-data" 
                              placeholder="Masukkan Komposisi"
                              onChange={(e) => {
                                setIngs(e.target.value);
                              }} 
                              />
                        </Form.Group>
                      </Row>
                      
                      <Row className="mb-3">
                        <Form.Group className="col-md-12">
                          <Form.Label>Deskripsi</Form.Label>
                          <Form.Control 
                              style={{ borderRadius: "20px" }}
                              as="textarea" 
                              className="form-data" 
                              rows={6}
                              onChange={(e) => {
                                setDesc(e.target.value);
                              }} 
                              />
                        </Form.Group>
                      </Row>
                    </Col>

                    <Col xs={12} md={4}>
                      <Row>
                        <p>Gambar Produk</p>
                        <div className="col-md-12">
                          <Card className="card-upload-foto" role="button" onClick={selectFiles}>
                            <Card.Body>
                              <div className="d-flex justify-content-center">
                                <i className="bi bi-image fs-1 text-muted"></i>
                              </div>
                              <Card.Text className="text-center text-muted pb-2 upload-validation">
                                  Silahkan pilih foto
                                <br></br>
                                <small className="fst-italic upload-validation">Pilih maksimal 5 foto dengan ukuran maksimal 5MB </small>
                                <Form.Control type="file" className="form-data" onChange={handleFile} name="files[]" multiple ref={fileInputRef} style={{ display: "none" }} />
                              </Card.Text>
                            </Card.Body>
                          </Card>

                          <Alert show={showValid} variant="danger" className="mt-2" onClose={() => setShowValid(false)} dismissible>
                            {message}
                          </Alert>
                        </div>
                        
                        <div className="d-flex mt-2 gap-1 flex-wrap">
                          {files.map((file, key) => {
                            return (
                              <div key={key} className="position-relative">
                                <i
                                  onClick={() => {
                                    removeImage(file.name);
                                  }}
                                  className="bi bi-x-circle-fill position-absolute text-danger x-preview"
                                  style={{ cursor: "pointer" }}
                                ></i>
                                <img className="preview-img" src={URL.createObjectURL(file)} />
                              </div>
                            );
                          })}
                        </div>

                        <div className="mt-2 d-grid gap-2">
                          <Button size="md" className="pagination-button btn-light text-light"
                            onClick={() => {
                              submitFoodData(userId, tokoId);
                              handleCloseAdd();
                            }}
                            >
                            Tambahkan
                          </Button>
                          <Button variant="outline-secondary" style={{ borderRadius: "100px" }} onClick={handleCloseAdd}>
                            Batal
                          </Button>
                        </div>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </Container>
            </Modal.Body>
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
              <th scope="col" width="20%">
                Ingredients
              </th>
              <th scope="col" width="20%">
                Image
              </th>
              <th scope="col" width="20%">
                Descryption
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
                  <td>{val.name}</td>
                  <td>{val.price}</td>
                  <td>{val.ings.split(' ').slice(0, 4).join(' ')}{val.ings.split(' ').length > 4 ? '...' : ''}</td>
                  <td>
                    <td className="d-flex justify-content-start">
                      {val.img1 && <img src={val.img1} alt="Food1" className="rounded" style={{ width: "40px" }} />}
                      {val.img2 && <img src={val.img2} alt="Food2" className="ms-1 rounded" style={{ width: "40px" }} />}
                      {val.img3 && <img src={val.img3} alt="Food3" className="ms-1 rounded" style={{ width: "40px" }} />}
                      {val.img4 && <img src={val.img4} alt="Food4" className="ms-1 rounded" style={{ width: "40px" }} />}
                      {val.img5 && <img src={val.img5} alt="Food5" className="ms-1 rounded" style={{ width: "40px" }} />}
                    </td>
                  </td>
                  <td>{val.desc.split(' ').slice(0, 4).join(' ')}{val.desc.split(' ').length > 4 ? '...' : ''}</td>
                  <td>{val.isHidden ? (
                      <Badge bg="danger" className="p-2"><i class="bi bi-eye-slash fs-6 text-light me-2"></i>Nonaktif</Badge>
                    ) : (
                      <Badge bg="primary" className="p-2"><i class="bi bi-eye fs-6 text-light me-2"></i>Aktif</Badge>
                    )}
                  </td>
                  <td>
                    <td className="d-flex justify-content-center">
                    {/* Edit data */}
                    <Button className="bg-warning ms-1 btn-light rounded-2" size="sm" onClick={() => handleShowEdit(val.id)}>
                      <i className="bi bi-pen text-light fs-5"></i>
                    </Button>

                    <Modal show={showEdit} onHide={handleCloseEdit} backdrop="static" keyboard={false} dialogClassName="modal-80w" aria-labelledby="contained-modal-title-vcenter" centered>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Menu Makanan</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                          <Container>
                            <Form>
                              <Row>
                                <Col xs={12} md={8}>
                                  <Row className="mb-3">
                                    <Form.Group className="col-md-6">
                                      <Form.Label>Nama Makanan</Form.Label>
                                      <Form.Control 
                                          type="text" 
                                          className="form-data" 
                                          placeholder="Masukkan Nama" 
                                          value={editData.name} 
                                          onChange={(e) => setEditData(
                                            { ...editData, name: e.target.value }
                                          )}
                                      />
                                    </Form.Group>

                                    <Form.Group className="col-md-6">
                                      <Form.Label>Harga</Form.Label>
                                      <Form.Control 
                                          type="text" 
                                          className="form-data" 
                                          placeholder="Masukkan Harga"
                                          value={editData.price} 
                                          onChange={(e) => setEditData(
                                            { ...editData, price: e.target.value }
                                          )}
                                      />
                                    </Form.Group>
                                  </Row>

                                  <Row className="mb-3">
                                    <Form.Group className="col-md-12">
                                      <Form.Label>Komposisi</Form.Label>
                                      <Form.Control 
                                          type="text" 
                                          className="form-data" 
                                          placeholder="Masukkan Komposisi"
                                          value={editData.ings} 
                                          onChange={(e) => setEditData(
                                            { ...editData, ings: e.target.value }
                                          )}
                                      />
                                    </Form.Group>
                                  </Row>
                                  
                                  <Row className="mb-3">
                                    <Form.Group className="col-md-12">
                                      <Form.Label>Deskripsi</Form.Label>
                                      <Form.Control 
                                          style={{ borderRadius: "20px" }}
                                          as="textarea" 
                                          className="form-data" 
                                          rows={4}
                                          value={editData.desc} 
                                          onChange={(e) => setEditData(
                                            { ...editData, desc: e.target.value }
                                          )}
                                      />
                                    </Form.Group>
                                  </Row>
                                  <Row>
                                    <Form.Group className="col-md-12">
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
                                  </Row>
                                </Col>

                                <Col xs={12} md={4}>
                                  <Row>
                                    <p>Gambar Produk</p>
                                    <div className="col-md-12">
                                      <Card className="card-upload-foto" role="button" onClick={selectFiles}>
                                        <Card.Body>
                                          <div className="d-flex justify-content-center">
                                            <i className="bi bi-image fs-1 text-muted"></i>
                                          </div>
                                          <Card.Text className="text-center text-muted pb-2 upload-validation">
                                              Silahkan pilih foto
                                            <br></br>
                                            <small className="fst-italic upload-validation">Pilih maksimal 5 foto dengan ukuran maksimal 5MB </small>
                                            <Form.Control type="file" className="form-data" onChange={handleFile} name="files[]" multiple ref={fileInputRef} style={{ display: "none" }} />
                                          </Card.Text>
                                        </Card.Body>
                                      </Card>

                                      <Alert show={showValid} variant="danger" className="mt-2" onClose={() => setShowValid(false)} dismissible>
                                        {message}
                                      </Alert>
                                    </div>
                                    
                                    <div className="d-flex mt-2 gap-1 flex-wrap">
                                      {files.map((file, key) => {
                                        return (
                                          <div key={key} className="position-relative">
                                            <i
                                              onClick={() => {
                                                removeImage(file.name);
                                              }}
                                              className="bi bi-x-circle-fill position-absolute text-danger x-preview"
                                              style={{ cursor: "pointer" }}
                                            ></i>
                                            <img className="preview-img" src={URL.createObjectURL(file)} />
                                          </div>
                                        );
                                      })}
                                    </div>

                                    <div className="mt-2 d-grid gap-2">
                                      <Button size="md" className="btn-warning text-light" style={{ borderRadius: "100px" }}
                                        onClick={() => {
                                          handleEdit(userId, tokoId);
                                          handleCloseAdd();
                                        }}
                                        >
                                        Edit
                                      </Button>
                                      <Button variant="outline-secondary" style={{ borderRadius: "100px" }} onClick={handleCloseAdd}>
                                        Batal
                                      </Button>
                                    </div>
                                  </Row>
                                </Col>
                              </Row>
                            </Form>
                          </Container>
                        </Modal.Body>
                    </Modal>

                    {/* Delete */}
                    <Button className="bg-danger ms-1 btn-light rounded-2" size="sm" onClick={() => handleShowDelete(val.id, val.name)}>
                      <i className="bi bi-trash3 text-light fs-5"></i>
                    </Button>
                    <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static" keyboard={false}>
                      <Modal.Header closeButton>
                        <Modal.Title>Delete food menu</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>
                          Are you sure, want to delete food menu <span className="fw-bold">{deleteName}</span>?
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

export default FoodMenuAdmin;