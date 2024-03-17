import React, { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { NavLink } from 'react-router-dom';
import { Button, Card, CardContent, Grid, Typography, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import DataProducts from './DataProducts';

function Products() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState(data);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);

    useEffect(() => {
        let componentMounted = true;
        
        const getProducts = async () => {
            setLoading(true);
            const response = await fetch('https://fakestoreapi.com/products');
            
            if (componentMounted) {
                const data = await response.json();
                setData(data);
                setFilter(data);
                setLoading(false);
            }
        };

        getProducts();

        return () => {
            componentMounted = false;
        };
    }, []);

    const filterProduct = (category) => {
        const updateList = data.filter((x) => x.category === category);
        setFilter(updateList);
    };

    const handleMenuOpen = (event, productId) => {
        setAnchorEl(event.currentTarget);
        setSelectedProductId(productId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedProductId(null);
    };

    const handleEdit = (productId) => {
        console.log(`Edit product with ID: ${productId}`);
        handleMenuClose();
    };

    const handleDelete = (productId) => {
        const updatedData = data.filter((product) => product.id !== productId);
        setData(updatedData);
        setFilter(updatedData);
        console.log(`Delete product with ID: ${productId}`);
        handleMenuClose();
    };
    if (loading) {
        return (
            <div className="container mx-auto p-4 my-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="card">
                            <Skeleton height={300} />
                            <div className="m-3 mb-0">
                                <Card key={index} className="card" style={{ borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                                    <Skeleton height={300} width={'100%'} />
                                    <CardContent>
                                        <Skeleton width={150} />
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="flex justify-between items-center m-3">
                                <div><Skeleton width={50} /></div>
                                <Skeleton width={50} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }


    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="sticky top-10">
                    <Button variant="outlined" size="small" onClick={() => setFilter(data)}>All</Button>
                    <Button variant="outlined" size="small" onClick={() => filterProduct("women's clothing")}>Women's Clothing</Button>
                    <Button variant="outlined" size="small" onClick={() => filterProduct("men's clothing")}>Men's Clothing</Button>
                    <Button variant="outlined" size="small" onClick={() => filterProduct("jewelery")}>Jewelery</Button>
                    <Button variant="outlined" size="small" onClick={() => filterProduct("electronics")}>Electronics</Button>
                </div>
                <Grid container spacing={4}>
                    {filter.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <div className="card">
                                <img src={product.image} className="m-3" style={{ height: "300px", width: "auto", objectFit: "contain" }} alt={product.title} />
                                <div className="m-3 mb-0">
                                    <small className="card-title">{product.title.substring(0, 50)}...</small>
                                </div>
                                <div className="flex justify-between items-center m-3">
                                    <div><b>${product.price}</b></div>
                                    <NavLink to={`/product/${product.id}`}>
                                        <Button variant="outlined" size="small" className="border-primary">
                                            <i className="fa fa-arrow-right text-muted"> ShowDetails</i>
                                        </Button>
                                    </NavLink>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </div>
    );
}

export default Products;
