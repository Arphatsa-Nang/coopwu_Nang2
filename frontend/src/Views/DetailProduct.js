import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  // Card,
  CardContent,
  Input,
  LinearProgress,
  Table,
} from "@mui/joy";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

import axios from "axios";
import _ from "lodash";

function  CreateProduct() {
  const [searchTerm, setSearchTerm] = useState("");
  const [Product, setUsers] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    getAllProduct();
    return () => { };
  }, []);

  const getAllProduct = () => {
    setIsReady(false);
    axios
    
      .get(`${process.env.REACT_APP_API_URL}/Product`)
      .then((res) => {
        setUsers(res?.data?.rows);
        setIsReady(true);
        console.log("Product ", res?.data?.rows);
      })
      .catch((error) => {
        console.error("Error", error?.message);
      });
  };
  

  const handleDeleteProduct = (ProductId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/Product/${ProductId}`)
      .then((res) => {
        getAllProduct();
      })
      .catch((error) => {
        alert(error?.message);
        console.error("Error", error?.message);

      });
  };

  if (!isReady) {
    return (
      <div>
        <LinearProgress />
      </div>
    );
  }

  return (
    // <Grid container spacing={"1px"}>
    //     {Product.map((product,index)=>) }
    <div>
      <div className='min-h-screen'>
        <div className='flex justify-center flex-wrap'>
          <div className='lg:w-3/4'>
            <Card>
              <CardContent>



                <div>Search Box</div>
                <Input
                  placeholder='Input Some Search Word'
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div>
                  You Search <span className='text-blue-500'>{searchTerm}</span>
                </div>
              </CardContent>
            </Card>
            <div>
              <h3 className='font-bold'>User List</h3>
              <Table>
                <thead>
                  <tr>
                    <th>ชื่อสินค้า</th>
                    <th>ราคา</th>
                    <th>รายละเอียดสินค้า</th>
                    <th>หมวดหมู่</th>
                    <th>คลังสินค้า</th>
                  </tr>
                </thead>
                {_.map(Product, (eachUser, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{eachUser?.Product}</td>
                    <td>{eachUser?.Price}</td>                   
                    <td>{eachUser?.Description}</td>
                    <td>{eachUser?.Category}</td>
                    <td>{eachUser?.stock}</td>
                 
                    <td>
                      <Link to={`/detail/${eachUser?._id}`}>
                        <Button>บันทึก</Button>
                      </Link>
                      <Button
                        color='danger'
                        onClick={() => handleDeleteProduct(eachUser?._id)}
                      >
                        ลบ
                      </Button>
                    </td>
                  </tr>
                ))}
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProduct;
