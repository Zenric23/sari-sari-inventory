import React, { useEffect, useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import { Button, Col, Spinner } from "react-bootstrap";
import PopModal from "./PopModal";
import apiReq from "../apiReq";

const data = [
  {
    product: "Beetlejuice",
    type: "Sales",
    qty: 4,
    price: 40,
    amount: 160,
    date: "17-jul-2023",
  },
  {
    product: "Ghostbusters",
    type: "Sales",
    qty: 4,
    price: 40,
    amount: 160,
    date: "17-jul-2023",
  },
];

const Transaction = () => {
  const [products, setProducts] = useState([]);
  const [selectedProd, setSelectedProd] = useState({})

  const [transType, setTransType] = useState()
  const [prodPrice, setProdPrice] = useState(0)

  const [data, setData] = useState([]);
  const [idAction, setIdAction] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prodLoading, setProdLoading] = useState(false);

  const [transDetails, setTransDetails] = useState({});
  console.log(transDetails)

  const handleTransDetails = (e) => {
    setTransDetails((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const res = await apiReq.get("/transaction");
        setData(res.data);
      } catch (error) {
        window.alert(error.response.data);
      }
    };
    getTransactions();
  }, [isLoading]);

  useEffect(()=> {
    const getProducts = async () => {
      setProdLoading(true);
      try {
        const res = await apiReq.get("/product");
        setProducts(res.data);
        setProdLoading(false);
      } catch (error) {
        window.alert(error.response.data);
        setProdLoading(false);
      }
    };
    getProducts();
  }, [])

  const addTransaction = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiReq.post("/transaction", {
       ...transDetails,
       price: prodPrice
      });
      setIsLoading(false);
      setShowAddModal(false);
      setProdDetails({});
      window.alert("Product added.");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      console.log(error);
    }
  };

  const editTransaction = async (e, id) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await apiReq.put(`/transaction/${id}`, transDetails);
      setData((prev) => {
        const index = data.findIndex((item) => item._id === id);
        const newArr = [...prev];
        newArr[index] = res.data;
        return newArr;
      });
      setIsLoading(false);
      setShowAddModal(false);
      setProdDetails({});
      window.alert(`Product details was edited.`);
      setShowEditModal(false);
    } catch (error) {
      setIsLoading(false);
      window.alert(error.response.data);
      console.log(error);
    }
  };

  const deleteTransaction = async (id) => {
    setIsLoading(true);
    try {
      await apiReq.delete(`/transaction/${id}`);
      setData(data.filter((item) => item._id !== id));
      setIsLoading(false);
      setShowAddModal(false);
      setProdDetails({});
      window.alert("Product deleted.");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };


  const columns = useMemo(
    () => [
      {
        name: "Product Name",
        selector: (row) => row.product_id.product_name,
        sortable: true,
      },
      {
        name: "Type",
        selector: (row) => row.type,
        sortable: true,
      },
      {
        name: "Qty",
        selector: (row) => row.qty,
        sortable: true,
      },
      {
        name: "Price",
        selector: (row) => row.price,
        sortable: true,
      },
      {
        name: "Amount",
        selector: (row) => row.amount,
        sortable: true,
      },
      {
        name: "Date",
        selector: (row) => new Date(row.createdAt).toLocaleDateString(),
        sortable: true,
      },
      {
        name: "Actions",
        button: true,
        cell: (row) => (
          <div className="d-flex gap-2">
            {/* <Button
              size="sm"
              style={{ whiteSpace: "nowrap" }}
              onClick={() => {
                setShowEditModal(true)
                setTransDetails(row)
                setIdAction(row._id)
                setSelectedProd(row)
              }}
            >
              Edit
            </Button> */}
            <Button
              size="sm"
              variant="danger"
              style={{ whiteSpace: "nowrap" }}
              onClick={() => deleteTransaction(row._id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );
    console.log(transType, prodPrice)
  return (
    <>
      <Card>
        <Card.Header className="px-4 py-3">
          <div className="d-flex justify-content-between align-items-center">
            {/* <Form className="d-flex gap-3">
              <Form.Check
                type="radio"
                name="trans-type"
                label="Sales"
                id="type-1"
                className="fw-bold"
              />
              <Form.Check
                type="radio"
                name="trans-type"
                label="Purchase"
                id="type-2"
                className="fw-bold"
              />
              <Form.Check
                type="radio"
                name="trans-type"
                label="All"
                id="type-2"
                className="fw-bold"
              />
            </Form> */}
            <div className="ms-auto" style={{ width: "fit-content" }}>
              <Button onClick={() => setShowAddModal(true)}>
                ADD TRANSACTION
              </Button>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <DataTable
            columns={columns}
            data={data}
            pagination
            title="Transaction"
            progressPending={isLoading}
            progressComponent={<Spinner animation="border" variant="primary" />}
          />
        </Card.Body>
      </Card>

      {/* ADD MODAL */}
      <PopModal
        title="Add Transaction"
        show={showAddModal}
        handleClose={() => {
          setTransDetails({})
          setShowAddModal(false)
        }}
      >
        <Form onSubmit={addTransaction}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Product Name</Form.Label>
              {!prodLoading ? (
                <Form.Select aria-label="Default select example" name="product_id" value={transDetails?.product_id} required onChange={(e)=> {
                  const prodId = e.target.value
                  const product = products.find(item=> item._id === prodId)

                  setSelectedProd(product)
                  setProdPrice(()=> {
                    if(transType === 'sale') {
                      return selectedProd.sales_price
                    }
                    return selectedProd.purchase_price
                  })

                  handleTransDetails(e)
                }}>
                  <option>--Select--</option>
                  {products?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.product_name}
                    </option>
                  ))}
                </Form.Select>
              ) : (
                <div>
                  <Spinner animation="border" variant="primary" />
                </div>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Transaction Type</Form.Label>
              <Form.Select aria-label="Default select example" name="type" value={transDetails?.type} required onChange={(e)=> {
                const type = e.target.value
                setTransType(type)
                if(type === 'sale') {
                  setProdPrice(selectedProd.sales_price)
                } else if(type === 'purchase') {
                  setProdPrice(selectedProd.purchase_price)
                } else {
                  setProdPrice(0)
                }

                handleTransDetails(e)
              }
              }>
                <option>--Select--</option>
                <option value="sale">Sale</option>
                <option value="purchase">Purchase</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Qty</Form.Label>
              <Form.Control type="number" name="qty" value={transDetails?.qty} onChange={handleTransDetails} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" disabled value={prodPrice} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? (
                <Spinner animation="border" variant="light" size="sm" />
              ) : (
                "Submit"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </PopModal>

      {/* EDIT MODAL */}
      <PopModal
        title="Edit Transaction"
        show={showEditModal}
        handleClose={() => {
          setTransDetails({})
          setShowEditModal(false)
        }}
      >
        <Form onSubmit={editTransaction}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Product Name</Form.Label>
              {!prodLoading ? (
                <Form.Select aria-label="Default select example" required name="product_id" onChange={(e)=> {
                  const prodId = e.target.value
                  const product = products.find(item=> item._id === prodId)

                  setSelectedProd(product)
                  setProdPrice(()=> {
                    if(transType === 'sale') {
                      return selectedProd.sales_price
                    }
                    return selectedProd.purchase_price
                  })

                  handleTransDetails(e)
                }}>
                  {products?.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.product_name}
                    </option>
                  ))}
                </Form.Select>
              ) : (
                <Spinner animation="border" size="sm" variant="primary" />
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Transaction Type</Form.Label>
              <Form.Select  
                name="type" 
                value={transDetails?.type}
                required onChange={(e)=>{
                  const type = e.target.value
                  console.log(selectedProd)
                  setTransType(type)
                  if(type === 'sale') {
                    setProdPrice(selectedProd.sales_price)
                  } else if(type === 'purchase') {
                    setProdPrice(selectedProd.purchase_price)
                  } else {
                    setProdPrice(0)
                  }
                  handleTransDetails(e)
                }} 
              >
                <option value="purchase">Purchase</option>
                <option value="sale">Sale</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Qty</Form.Label>
              <Form.Control type="number" required name="qty" onChange={handleTransDetails} value={transDetails?.qty} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" disabled value={prodPrice} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? (
                <Spinner animation="border" variant="light" size="sm" />
              ) : (
                "Submit"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </PopModal>
    </>
  );
};

export default Transaction;
