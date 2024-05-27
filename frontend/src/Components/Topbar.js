import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button, Card, CardContent, Input, LinearProgress } from "@mui/joy";


export default function Topbar({ subtitle }) {
  
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
                    <th>ชื่อ</th>
                    <th>แผนก</th>
                    <th>ดำเนินการ</th>
                  </tr>
                </thead>
                {_.map(users, (eachUser, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{eachUser?.name}</td>
                    <td>{eachUser?.department}</td>
                    <td>
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

