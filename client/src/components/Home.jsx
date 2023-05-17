import React, { useEffect, useMemo, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { Button, Col, Row } from "react-bootstrap";
import apiReq from "../apiReq";
import Spinner from "react-bootstrap/Spinner";



const columns = [
  {
    name: "Product Name",
    selector: (row) => row._id?.product_name,
    sortable: true,
  },
  {
    name: "Remaining",
    selector: (row) => row.remainingQty,
    sortable: true,
  },
];

const Home = () => {
  const [statData, setStatData] = useState([]);
  const [prods, setProds] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false)

  useEffect(() => {
    const getStat = async () => {
      setIsLoading(true);
      try {
        const res = await apiReq.get("/stat");
        setIsLoading(false);
        setStatData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    const getProd = async () => {
      setTableLoading(true)
      try {
        const res = await apiReq.get('/stat/product-qty')
        setTableLoading(false)
        setProds(res.data)
      } catch (error) {
        console.log(error)
        setTableLoading(false)
      }
    }
    getProd()
    getStat();
  }, []);

  return (
    <>
      <Row className="gap-4 justify-content-center">
        {statData?.stat?.map((item, i) => (
          <>
            <Col lg={3} className="border border-3 text-center p-3">
              <h4 className="fw-bold">TOTAL SALES</h4>
              <span className="fs-4">₱{item.totalSales[0].total}</span>
            </Col>
            <Col lg={3} className="border border-3 text-center p-3">
              <h4 className="fw-bold">TOTAL PURCHASED</h4>
              <span className="fs-4">₱{item.totalPurchase[0].total}</span>
            </Col>
          </>
        ))}
        {statData?.totalInventory && (
          <Col lg={3} className="border border-3 text-center p-3">
            <h4 className="fw-bold">INVENTORY QTY</h4>
            <span className="fs-4">{statData && statData.totalInventory}</span>
          </Col>
        )}
      </Row>
      {
        !tableLoading && (
          <div className="container p-4 border border-2 mt-5">
            <DataTable
              columns={columns}
              data={prods}
              pagination
              title="Products"
              progressPending={isLoading}
              progressComponent={<Spinner animation="border" variant="primary" />}
            />
          </div>
        )
      }
      {isLoading && (
        <div className="mx-auto" style={{ width: "fit-content" }}>
          <Spinner
            animation="border"
            variant="primary"
            size="lg"
            className="mx-auto"
          />
        </div>
      )}
    </>
  );
};

export default Home;
