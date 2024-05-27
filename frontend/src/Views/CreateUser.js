import React, { useState } from "react";
import { Button, Card, CardContent, Input, LinearProgress } from "@mui/joy";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function CreateUser() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isReady, setIsReady] = useState(true);
  const { control, handleSubmit, setValue } = useForm();
    
  
  
  const handleCreateUser = (data) => {
    console.log("data", data);
    setIsReady(false);
    axios
      .post(`${process.env.REACT_APP_API_URL}/user`, data)
      .then((res) => {
        axios.get(`${process.env.REACT_APP_API_URL}/user`).then((res) => {
          setIsReady(true);
        });
      })
      .catch((error) => {
        console.error("Error", error?.message);
      });
  };

  const prefix = [
    { label: 'นาย', id: 1 },
    { label: 'นาง', id: 2 },
    { label: 'นางสาว', id: 3 },
  ];

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
          <div className='lg:w-3/4 '>
            <div className='my-1 font-semibold text-lg'>เพิ่มพนักงานใหม่</div>
            <Card>
              <CardContent>
                <form onSubmit={handleSubmit(handleCreateUser)}>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={prefix}
                    sx={{ width: 300 }}
                    onChange={(even, newValue) => {
                    setValue("prefix", newValue ? newValue.label :"");
                  }}
                    renderInput={(params) => <TextField {...params} label="คำนำหน้าชื่อพนักงาน" />}
                  />
                  <div>ชื่อ-นามสกุล</div>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder='ชื่อ-นามกุล' />
                    )}
                  />
                  <div>อายุ</div>
                  <Controller
                    name='age'
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder='อายุ' />
                    )}
                  />
                  <div>เบอร์โทรศัพท์</div>
                  <Controller
                    name='telephone'
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder='เบอร์โทรศัพท์' />
                    )}
                  />
                  <div>แผนก</div>
                  <Controller
                    name='department'
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder='แผนก' />
                    )}
                  />
                  <div>ที่อยู่</div>
                  <Controller
                    name='address'
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder='ที่อยู่' />
                    )}
                  />
                  <div>
                    <Button type='submit'>บันทึก</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
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
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateUser;
