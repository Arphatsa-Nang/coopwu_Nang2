import React, { useState, useEffect } from "react";
import { Button, Card, CardContent, Input, LinearProgress } from "@mui/joy";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import { useParams } from "react-router";

function EditProduct() {
  const [isReady, setIsReady] = useState(true);
  const { control, handleSubmit, setValue } = useForm();
  //   const [searchTerm, setSearchTerm] = useState("");

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/product/${id}`)
        .then((res) => {
          const product = res.data;
          setValue("Upload", product.image.url);
          setValue("Product", product.result.Product);
          setValue("Price", product.result.Price);
          setValue("Description", product.result.Description);
          setValue("Category", product.result.Category);
          setValue("stock", product.result.stock);
        })
        .catch((error) => {
          setIsReady(true);
          console.error("Error", error);
        });
    }
  }, [id, setValue]);

  const handleEditProduct = (data) => {
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        setIsReady(false);
        axios.put(`${process.env.REACT_APP_API_URL}/product/${id}`, data, {
          validateStatus: false,
        }).then((res) => {
          setIsReady(true);
          let timerInterval;
          Swal.fire({
            title: "แก้ไขสินค้าสำเร็จ",
            html: "กลับสู่หน้าหลักใน <b></b> วินาที.",
            icon: "success",
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              Swal.showLoading();
              const timer = Swal.getPopup().querySelector("b");
              timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            },
            willClose: () => {
              clearInterval(timerInterval);
            }
          }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              window.location.href = "/";
            }
          });
        });
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const Category = [
    { label: "เสื้อผ้า", id: 1 },
    { label: "ผลิตภัณฑ์", id: 2 },
    { label: "เครื่องสำอาง", id: 3 },
    { label: "ของเล่นเด็ก", id: 4 },
    { label: "เครื่องประดับ", id: 5 },
    { label: "รองเท้า", id: 6 },
    { label: "อุปกรณ์ไอที", id: 7 },
    { label: "ยานยนต์", id: 8 },
    { label: "กีฬา", id: 9 },
    { label: "เครื่องเขียนเเละหนังสือ", id: 10 },
    { label: "เครื่องใช้ในบ้าน", id: 11 },
    { label: "เครื่องใช้ไฟฟ้า", id: 12 },
    { label: "กระเป๋า", id: 13 },
    { label: "สัตว์เลี้ยง", id: 14 },
    { label: "เครื่องดื่ม", id: 15 },
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
      <div className="min-h-screen">
        <div className="flex justify-center  flex-wrap">
          <div className="lg:w-3/4 ">
            <div className="my-1 font-semibold text-lg">เพิ่มสินค้าใหม่</div>

            <Card>
              <CardContent>
                <form onSubmit={handleSubmit(handleEditProduct)}>
                  <div>ชื่อสินค้า</div>
                  <Controller
                    name="Product"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="ชื่อสินค้า" />
                    )}
                  />
                  <div>ราคา</div>
                  <Controller
                    name="Price"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="ราคา" />
                    )}
                  />
                  <div>รายละเอียดสินค้า</div>
                  <Controller
                    name="Description"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="รายละเอียดสินค้า" />
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
                    renderInput={(params) => (
                      <TextField {...params} label="หมวดหมู่สินค้า" />
                    )}
                  />
                  <div>คลังสินค้า</div>
                  <Controller
                    name="stock"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="ปริมาณ" />
                    )}
                  />
                  <div>อัพโหลดรูปภาพ</div>
                  <Controller
                    name="Upload"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} placeholder="อัพโหลด" />
                    )}
                  />
                  {/* <div>อัพโหลดรูปภาพ</div>
                    <Controller
                      name='Upload'
                      control={control}
                      render={({ field }) => (
                        <>
                          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input"></label>
                          <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />
                        </>
                      )}
                    /> */}
                  <div>
                    <Button type="submit">บันทึก</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
          <div className="lg:w-3/4">
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

export default EditProduct;
