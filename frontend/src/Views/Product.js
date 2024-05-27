import React, {useState} from "react";
import {Button, Card, CardContent, Input, LinearProgress} from "@mui/joy";
import axios from "axios";
import {useForm, Controller} from "react-hook-form";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function CreateProduct() {
//   const [searchTerm, setSearchTerm] = useState("");
    const [isReady, setIsReady] = useState(true);
    const {control, handleSubmit, setValue} = useForm();

    const handleCreateProduct = (data) => {
        console.log("data", data);
        setIsReady(false);
        axios
            .post(`${process.env.REACT_APP_API_URL}/product`, data)
            .then((res) => {
                axios.get(`${process.env.REACT_APP_API_URL}/product`).then((res) => {
                    setIsReady(true);
                });
            })
            .catch((error) => {
                console.error("Error", error?.message);
            });
    };

    const Category = [
        {label: 'เสื้อผ้า', id: 1},
        {label: 'ผลิตภัณฑ์', id: 2},
        {label: 'เครื่องสำอาง', id: 3},
        {label: 'ของเล่นเด็ก', id: 4},
        {label: 'เครื่องประดับ', id: 5},
        {label: 'รองเท้า', id: 6},
        {label: 'อุปกรณ์ไอที', id: 7},
        {label: 'ยานยนต์', id: 8},
        {label: 'กีฬา', id: 9},
        {label: 'เครื่องเขียนเเละหนังสือ', id: 10},
        {label: 'เครื่องใช้ในบ้าน', id: 11},
        {label: 'เครื่องใช้ไฟฟ้า', id: 12},
        {label: 'กระเป๋า', id: 13},
        {label: 'สัตว์เลี้ยง', id: 14},
        {label: 'เครื่องดื่ม', id: 15},
    ];

    if (!isReady) {
        return (
            <div>
                <LinearProgress/>
            </div>
        );
    }

    return (
        <div>
            <div className='min-h-screen'>

                <div className='flex justify-center  flex-wrap'>
                    <div className='lg:w-3/4 '>
                        <div className='my-1 font-semibold text-lg'>เพิ่มสินค้าใหม่</div>

                        <Card>
                            <CardContent>
                                <form onSubmit={handleSubmit(handleCreateProduct)}>
                                    <div>ชื่อสินค้า</div>
                                    <Controller
                                        name='Product'
                                        control={control}
                                        render={({field}) => (
                                            <Input {...field} placeholder='ชื่อสินค้า' require/>
                                        )}
                                    />
                                    <div>ราคา</div>
                                    <Controller
                                        name='Price'
                                        control={control}
                                        render={({field}) => (
                                            <Input {...field} placeholder='ราคา' require/>
                                        )}
                                    />
                                    <div>รายละเอียดสินค้า</div>
                                    <Controller
                                        name='Description'
                                        control={control}
                                        render={({field}) => (
                                            <Input {...field} placeholder='รายละเอียดสินค้า' require/>
                                        )}
                                    />
                                    <div>หมวดหมู่</div>
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={Category}
                                        onChange={(event, newValue) => {
                                            setValue("Category", newValue ? newValue.label : "");
                                        }}
                                        renderInput={(params) => <TextField {...params} label="หมวดหมู่สินค้า"
                                                                            require/>}
                                    />
                                    <div>คลังสินค้า</div>
                                    <Controller
                                        name='stock'
                                        control={control}
                                        render={({field}) => (
                                            <Input {...field} placeholder='ปริมาณ' require/>
                                        )}
                                    />
                                    <div>อัพโหลดรูปภาพ</div>
                                    <Controller
                                        name='Upload'
                                        control={control}
                                        render={({field}) => (
                                            <Input {...field} placeholder='อัพโหลดรูปภาพ' require/>

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
                        {/* <Card>
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
            </Card> */}
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateProduct;
