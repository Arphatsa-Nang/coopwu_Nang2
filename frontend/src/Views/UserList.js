import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Input,
  LinearProgress,
  Table,
} from "@mui/joy";
import axios from "axios";
import _ from "lodash";

function CreateUser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const getAllUser = () => {
    setIsReady(false);
    axios
    
      .get(`${process.env.REACT_APP_API_URL}/user`)
      .then((res) => {
        setUsers(res?.data?.rows);
        setIsReady(true);
        console.log("User ", res?.data?.rows);
      })
      .catch((error) => {
        console.error("Error", error?.message);
      });
  };
  
  useEffect(() => {
    getAllUser();
    return () => { };
  }, []);

  const handleDeleteUser = (userId) => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/user/${userId}`)
      .then((res) => {
        getAllUser();
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
    <div>
      <div className='min-h-screen'>
        <div className='flex justify-center  flex-wrap'>
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
                    <th>ลำดับที่</th>
                    <th>คำนำหน้า</th>
                    <th>ชื่อ-นามสกุล</th>
                    <th>อายุ</th>
                    <th>เบอร์โทรศัพท์</th>
                    <th>แผนก</th>
                    <th>ที่อยู่</th>
                    <th>ดำเนินการ</th>
                  </tr>
                </thead>
                {_.map(users, (eachUser, index) => (
                  
                  <tr>
                    <td>{index + 1}</td>
                    <td>{eachUser?.prefix}</td>
                    <td>{eachUser?.name}</td>                   
                    <td>{eachUser?.age}</td>
                    <td>{eachUser?.telephone}</td>
                    <td>{eachUser?.department}</td>
                    <td>{eachUser?.address}</td>
                 
                    <td>
                      <Link to={`/detail/${eachUser?._id}`}>
                        <Button>รายละเอียด</Button>
                      </Link>
                      <Button
                        color='danger'
                        onClick={() => handleDeleteUser(eachUser?._id)}
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

export default CreateUser;
