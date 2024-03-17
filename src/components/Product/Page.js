import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DataProduct from "./DataProduct";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addToCart, setaddToCart] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getProduct();
  }, [id]);

  const renderLoadingSkeleton = () => (
    <div className="container px-0 mb-5" style={{ marginTop: "66px" }}>
      {/* Loading skeleton JSX */}
    </div>
  );

  const renderProductDetails = () => (
    <div className="container px-0 mb-5" style={{ marginTop: "66px" }}>
      <NavLink className="text-decoration-none text-dark" to={`/products`}>
        <div className="d-flex align-items-center m-3">
          <i className="fa fa-long-arrow-left"></i>
          <Button variant="contained" className="ml-1">
            &nbsp;Back
          </Button>
        </div>
      </NavLink>
      <div className="row">
        <div className="col-md-6">
          <div className="text-center p-4">
            <img id="main-image" alt="product" src={image} width="250" />
          </div>
        </div>
        <div className="col-md-6">
          <div className="border p-4">
            <span className="text-muted text-capitalize">
              {" "}
              in {category}
            </span>
            <h5 className="text-uppercase">{title}</h5>
            Rating {rating && rating.rate}
            <i className="fa fa-star text-warning"></i>
            <div className="price d-flex flex-row align-items-center">
              <big className="display-6">
                <b>${price}</b>
              </big>
            </div>
            <p className="text-muted">{description}</p>
            <div className="cart mt-4 align-items-center">
              <Button
                variant="outlined"
                className="text-uppercase mr-2 px-4"
                onClick={() => setaddToCart(true)}
              >
                Buy
              </Button>
              <Button
                variant="outlined"
                className="text-uppercase mr-2 px-4"
                onClick={() => setaddToCart(true)}
              >
                Add To Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {loading ? renderLoadingSkeleton() : renderProductDetails()}
      {addToCart && <CartModal onClose={() => setaddToCart(false)} />}
    </>
  );
};

const CartModal = ({ onClose }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      zIndex: 1000,
    }}
  >
    <Box
      sx={{
        p: 3,
        backgroundColor: "white",
        borderRadius: 8,
        textAlign: "center",
      }}
    >
      <Typography variant="h5">Feature in development</Typography>
      <Typography>
        This feature is currently in development. We appreciate your
        patience. Soon, this feature will be available to you.
      </Typography>
      <Button
        onClick={onClose}
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Close
      </Button>
    </Box>
  </Box>
);

export default Product;
