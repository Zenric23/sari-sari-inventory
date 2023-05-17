import React, { useEffect, useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import PopModal from "./PopModal";
import Form from "react-bootstrap/Form";
import Spinner from 'react-bootstrap/Spinner';
import apiReq from "../apiReq";

const ProdMaster = () => {
  const [data, setData] = useState([])
  const [idAction, setIdAction] = useState('')
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const [prodDetails, setProdDetails] = useState()

  const handleProdDetails = (e) => {
    setProdDetails(prev => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  useEffect(()=> {
    const getProducts = async () => {
      try {
        const res = await apiReq.get('/product')
        setData(res.data)
      } catch (error) {
        window.alert(error.response.data)
      }
    }
    getProducts()
  }, [isLoading])

  const addProd = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await apiReq.post('/product', {
        product_name: prodDetails.product_name,
        sales_price: prodDetails.sales_price,
        purchase_price: prodDetails.purchase_price
      })
      setIsLoading(false)
      setShowAddModal(false)
      setProdDetails({})
      window.alert('Product added.')
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      window.alert(error.response.data)
      console.log(error)
    }
  }

  const editProd = async (e, id) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await apiReq.put(`/product/${id}`, prodDetails)
      setData(prev=> {
        const index = data.findIndex(item=> item._id === id)
        const newArr = [...prev]
        newArr[index] = res.data
        return newArr
      })
      setIsLoading(false)
      setShowAddModal(false)
      setProdDetails({})
      window.alert(`Product details was edited.`)
      setShowEditModal(false)
    } catch (error) {
      setIsLoading(false)
      window.alert(error.response.data)
      console.log(error)
    }
  }

  const deleteProd = async (id) => {
    setIsLoading(true)
    try {
      await apiReq.delete(`/product/${id}`)
      setData(data.filter(item=> item._id !== id))
      setIsLoading(false)
      setShowAddModal(false)
      setProdDetails({})
      window.alert('Product deleted.')
    } catch (error) {
      setIsLoading(false)
      window.alert(error.response.data)
      console.log(error)
    }
  }

  const columns = [
    {
      name: "Product Name",
      selector: (row) => row.product_name,
      sortable: true,
    },
    {
      name: "Sales Price",
      selector: (row) => row.sales_price,
      sortable: true,
    },
    {
      name: "Purchase Price",
      selector: (row) => row.purchase_price,
      sortable: true,
    },
    {
      name: "Actions",
      button: true,
      cell: (row) => (
        <div className="d-flex gap-2">
          <Button
            size="sm"
            onClick={(e) => {
              setShowEditModal(true)
              setProdDetails(row)
              setIdAction(row._id)
            }}
            style={{ whiteSpace: "nowrap" }}
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={(e) => deleteProd(row._id)}
            style={{ whiteSpace: "nowrap" }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  
  console.log(prodDetails)
  return (
    <>
      <Card>
        <Card.Header className="py-3">
          <div className="ms-auto" style={{ width: "fit-content" }}>
            <Button onClick={() => setShowAddModal(true)} disabled={isLoading}>
              ADD PRODUCT
            </Button>
          </div>
        </Card.Header>
        <Card.Body>
          <DataTable
            columns={columns}
            data={data}
            pagination
            title="Products"
            progressPending={isLoading}
            progressComponent={<Spinner animation="border" variant="primary" />}
          />
        </Card.Body>
      </Card>

      {/* ADD MODAL */}
      <PopModal
        title="Add Product"
        show={showAddModal}
        handleClose={() => {
          setProdDetails({})
          setShowAddModal(false)
        }}
      >
        <Form onSubmit={addProd}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" name="product_name" value={prodDetails?.product_name} onChange={handleProdDetails} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Purchase Price</Form.Label>
              <Form.Control type="number" name="purchase_price" value={prodDetails?.purchase_price} onChange={handleProdDetails} required min={1} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Sales Price</Form.Label>
              <Form.Control type="number" name="sales_price" value={prodDetails?.sales_price} onChange={handleProdDetails} required min={1} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" disabled={isLoading} >
              {isLoading ? <Spinner animation="border" variant="light" size="sm" /> : 'Submit '} 
            </Button>
          </Modal.Footer>
        </Form>
      </PopModal>

      {/* EDIT MODAL */}
      <PopModal
        title="Edit Product"
        show={showEditModal}
        handleClose={() => {
          setProdDetails({})
          setShowEditModal(false)
        }}
      >
        <Form onSubmit={(e)=> editProd(e, idAction)}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" onChange={handleProdDetails} name="product_name" value={prodDetails?.product_name} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Purchase Price</Form.Label>
              <Form.Control type="number" onChange={handleProdDetails} name="purchase_price" value={prodDetails?.purchase_price} required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Sales Price</Form.Label>
              <Form.Control type="number" onChange={handleProdDetails} name="sales_price" value={prodDetails?.sales_price} required />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? <Spinner animation="border" variant="light" size="sm" /> : 'Submit '} 
            </Button>
          </Modal.Footer>
        </Form>
      </PopModal>
    </>
  );
};

export default ProdMaster;
