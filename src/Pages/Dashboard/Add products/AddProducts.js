import { Container, Grid, Typography, Button, TextField, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import React, { useState, useEffect } from 'react';

const AddProducts = () => {
    const [product, setProduct] = useState({});
    const [products, setProducts] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);

    const size = 5;
    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                const count = data.count;
                const pageNumber = Math.ceil(count / 5);
                setPageCount(pageNumber);

            })

    }, [page])
    const handleProductSubmit = (e) => {
        e.preventDefault();
        console.log("This is the New Products", product)
        fetch('http://localhost:5000/products', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(product)

        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert("Food Item Inserted Successfully");
                    e.target.reset();
                }
            })


    }
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newProductData = { ...product };
        newProductData[field] = value;
        setProduct(newProductData);

    }
    const handleDeleteProduct = (id) => {
        const url = `http://localhost:5000/products/${id}`;
        const proceed = window.confirm("Are You Sure, You want to Delete this Product?")
        if (proceed) {
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remainingProducts = products.filter(product => product._id !== id);
                        setProducts(remainingProducts);
                        alert("Product Deleted Successfully");
                    }
                })

        }

    }
    return (
        <Container>
            <h3 style={{ textAlign: "start" }}>Add Products</h3>
            <Grid container spacing={2} sx={{ backgroundColor: "white", borderRadius: "5px", pl: 5, pt: 2, display: "flex" }}>
                <Grid item xs={12} md={5} >
                    <Typography sx={{ textAlign: "start", fontWeight: "bold" }}>
                        1.General Info
                    </Typography>

                </Grid>
                <Grid item xs={12} md={7} sx={{ textAlign: "start", }} >

                    <form onSubmit={handleProductSubmit}>
                        <TextField
                            sx={{
                                width: '75%',
                                m: 1
                            }}
                            id="standard-basic"
                            label="Food Image"
                            name="imgUrl"
                            onBlur={handleOnBlur}
                            variant="standard"
                        />
                        <TextField
                            sx={{
                                width: '75%',
                                m: 1
                            }}
                            id="standard-basic"
                            label="Food Name"
                            name="ProductName"
                            onBlur={handleOnBlur}
                            variant="standard"
                        />
                        <TextField
                            sx={{
                                width: '75%',
                                m: 1
                            }}
                            id="standard-basic"
                            label="Food Price$"
                            name="Price"
                            onBlur={handleOnBlur}
                            variant="standard"
                        /> <br />


                        <Button sx={{
                            width: '75%',
                            m: 1,
                            my: 3
                        }} variant="contained" type='submit'>Add Product</Button>



                    </form>

                </Grid>
            </Grid>
            <h3><u>Food Items Table</u></h3>
            <Grid sx={{ mt: 1 }} container spacing={2}>
                <Grid item xs={12} md={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{}} aria-label="Appoinments table">
                            <TableHead>
                                <TableRow >

                                    <TableCell sx={{ fontWeight: 600 }} align="center">Food Name</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }} align="center">Food Price</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }} align="center">Action</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.length === 0 ? <div style={{ margin: "0 auto" }}><CircularProgress /></div>
                                    :
                                    products.map((pd) => (
                                        <TableRow
                                            key={pd._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

                                        >

                                            <TableCell component="th" scope="row" align="center" >
                                                {pd.ProductName}
                                            </TableCell>
                                            <TableCell align="center">{pd.Price}</TableCell>
                                            <TableCell align="center"><Button onClick={() => handleDeleteProduct(pd._id)} sx={{ px: 1 }} variant="outlined"><i class="fas fa-trash-alt" style={{ color: "green", marginRight: "4px" }}></i> Delete</Button></TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </Grid>
            </Grid>

            <div className="pagination">
                {
                    [...Array(pageCount).keys()]
                        .map(number => <button
                            className={number === page ? 'selected' : ''}
                            key={number}
                            onClick={() => setPage(number)}
                        >{number + 1}</button>)
                }
            </div>

        </Container>
    );
};

export default AddProducts;