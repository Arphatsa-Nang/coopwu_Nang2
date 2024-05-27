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
import DeleteIcon from "@mui/icons-material/Delete"; // เพิ่ม DeleteIcon

export default function CartProduct() {
  const [product, setProduct] = useState([]); // Initialize as an empty array
  const [cart, setCart] = useState([]);
  const [rerender, setRerender] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/api/product").then((res) => {
      const data = res.data.rows;
      setProduct(data);
    });
  }, []);

  const handleAddToCart = (eachproduct) => {
    const updatedCart = [...cart];
    const productIndex = updatedCart.findIndex(item => item._id === eachproduct._id);

    if (productIndex > -1) {
      updatedCart[productIndex].quantity += 1;
    } else {
      updatedCart.push({ ...eachproduct, quantity: 1 });
    }

    setCart(updatedCart);
    setRerender(!rerender);
  };

  const handleRemoveFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    setRerender(!rerender);
  };

  const handleIncreaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
    setRerender(!rerender);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    } else {
      updatedCart.splice(index, 1);
    }
    setCart(updatedCart);
    setRerender(!rerender);
  };

  const handleCheckout = () => {
    // Implement your checkout logic here
    console.log("Proceed to checkout", cart);
  };

  return (
    <div className="flex flex-wrap justify-center">
      <div className="w-full p-4">
        <Typography variant="h5" className="mb-4">สินค้าในตะกร้า</Typography>
        <div>
          {cart.length > 0 ? (
            cart.map((eachproduct, index) => (
              <div key={index} className="mb-2 p-4 border rounded-lg flex justify-between items-center">
                <div>
                  <Typography>{eachproduct.Product}</Typography>
                  <Typography>จำนวน: {eachproduct.quantity}</Typography>
                </div>
                <div className="flex items-center space-x-2">
                  <Button color="green" size="sm" onClick={() => handleIncreaseQuantity(index)}>
                    +
                  </Button>
                  <Button color="red" size="sm" onClick={() => handleDecreaseQuantity(index)}>
                    -
                  </Button>
                  <Button color="red" size="sm" onClick={() => handleRemoveFromCart(index)}>
                    <DeleteIcon />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <Typography>ตะกร้าว่างเปล่า</Typography>
          )}
        </div>
        {cart.length > 0 && (
          <div className="mt-4 flex justify-center">
            <Button color="blue" size="lg" onClick={handleCheckout}>
              สั่งซื้อสินค้า
            </Button>
          </div>
        )}
      </div>
      
      <div className="w-full p-4 flex flex-wrap justify-center">
        {product.map((eachproduct) => (
          <div key={eachproduct._id} className="mt-2 m-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
            <Card className="w-full flex-col shadow-lg p-6 rounded-lg">
              <CardHeader shadow={false} floated={false} className="h-80 w-full">
                {eachproduct.Upload ? (
                  <img
                    alt={eachproduct.Upload.alt}
                    src={eachproduct.Upload.url}
                    className="justify-center w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <img
                    alt="Default Image"
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
                    className="font-medium h-20 overflow-hidden"
                  >
                    {eachproduct.Description}
                  </Typography>
                  <Typography color="" className="text-orange-700">
                    ฿ {eachproduct.Price}.00
                  </Typography>
                </div>
              </CardBody>
              <CardFooter className="pt-0">
                <div className="flex justify-around">
                  <IconButton variant="text" onClick={() => handleAddToCart(eachproduct)}>
                    <AddShoppingCartRoundedIcon />
                  </IconButton>
                  <IconButton variant="text">
                    <FavoriteBorderIcon />
                  </IconButton>
                  <Link to={`/Product/edit/${eachproduct._id}`}>
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
    </div>
  );
}
