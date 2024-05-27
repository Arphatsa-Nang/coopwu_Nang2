import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import axios from "axios";
import _ from "lodash";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export default function CartProduct() {
  const [product, setproduct] = useState();
  const [cart, setcart] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/product").then((res) => {
      const data = res.data.rows;
      setproduct(data);
    });
    return () => {};
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {_.map(product, (eachproduct, index) => (
        <div className="mt-2 m-4">
          <Card className="w-96 flex-col shadow-lg p-6 rounded-lg">
            <CardHeader shadow={false} floated={false} className="h-80 w-80">
              {/* sx={{ height: 140 }}> */}
              {eachproduct.Upload !== undefined ? (
                <img
                  alt={eachproduct.Upload.alt}
                  src={eachproduct.Upload.url}
                  className="justify-center w-full h-full object-cover rounded-lg"
                />
                
              ) : (
                <img
                  alt="..."
                  src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
                  className="justify-center w-full h-full object-cover rounded-lg"
                />
              )}
            </CardHeader>
            
            <CardBody>
              <div className="mb-2 m-4">
                <Typography color="blue-gray" className="font-medium">
                  {eachproduct.Product}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="font-medium  h-20 overflow-hidden"
                >
                  {eachproduct.Description}
                </Typography>
                <Typography color="" className="text-orange-700">
                  ฿ {eachproduct.Price}.00
                </Typography>
                <Typography color="" className="">
                  {eachproduct.Cart}
                </Typography>
              </div>
              <Typography
                variant="small"
                color="gray"
                className="font-normal opacity-75"
              ></Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Button
                ripple={false}
                fullWidth={true}
                className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
              ></Button>

              <div className="flex justify-around w-full border-2 border-amber-50">
                <div>
                  <IconButton variant="text"
                  onClick={()=>{
                    cart.push(eachproduct)
                    setcart(cart)
                    console.log(cart)
                  }}
                   >
                    
                    <FavoriteBorderIcon />
                  </IconButton>
                </div>
                <div className="">
                  <IconButton variant="text"> 
                    <AddShoppingCartRoundedIcon />
                  </IconButton>
                </div>
                <Link to={`/Product/edit/${eachproduct?._id}`}>
                <IconButton variant="text">
                  <EditIcon />
              </IconButton>
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      ))}
    </div>
  );
}
// export default Homepage;
