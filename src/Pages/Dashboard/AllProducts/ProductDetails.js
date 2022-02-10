import { Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
    const { productId } = useParams();
    const [productDetails, setProductDetails] = useState([]);
    const [singleProduct, setSingleProduct] = useState({});
    const productNameRef = useRef();
    const priceRef = useRef();
    const descriptionRef = useRef();

    useEffect(() => {
        fetch('https://shrouded-gorge-65021.herokuapp.com/products')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setProductDetails(data.products)
            })
    }, [])

    useEffect(() => {
        const foundProduct = productDetails.find((product) => product._id === productId);
        setSingleProduct(foundProduct)
    }, [productDetails, productId]);

    const handleProductDetailsChange = (e, id) => {
        e.preventDefault();
        const productName = productNameRef.current.value;
        const price = priceRef.current.value;
        const description = descriptionRef.current.value;
        const detailsChanging = { productName, price, description };
        console.log(detailsChanging, id);
        const url = `https://shrouded-gorge-65021.herokuapp.com/products/${id}`;
        const newDetails = productDetails.find(product => product._id === id);
        newDetails.ProductName = productName;
        newDetails.Price = price;
        newDetails.description = description;
        const approved = window.confirm("Are You want to Change Product Details? ");

        if (approved) {
            fetch(url, {
                method: "PUT",
                headers: {
                    'content-type': "application/json",
                },
                body: JSON.stringify(newDetails),

            })
                .then(res => res.json())
                .then(data => {
                    if (data.modifiedCount > 0) {
                        window.location.reload(true);
                        alert("Details Changed Successfully");

                    }
                })
        }


    }


    return (
        <div>
            <Container>
                <h2 > Edit  Details of  <span >{singleProduct?.ProductName}</span></h2>
                <Grid container spacing={2} sx={{ backgroundColor: "white", borderRadius: "5px", pl: 7, pt: 5 }}>
                    <Grid item xs={12} md={6} >
                        <Card sx={{ maxWidth: 345 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"

                                    image={singleProduct?.imgUrl}
                                    alt="Picture of a Product"
                                />
                                <CardContent sx={{ textAlign: "left" }}>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Name:  {singleProduct?.ProductName}
                                    </Typography>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Price:  ${singleProduct?.Price}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Descripton: {singleProduct?.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <form className="productorder" style={{ marginTop: "-30px", textAlign: "left" }}>
                            <Typography sx={{ mt: 3, fontWeight: "bold" }}>Product Name</Typography>
                            <input style={{ width: "85%", height: '30px', marginBottom: "15px", border: "2px solid gray", borderRadius: "5px" }} type="text" ref={productNameRef} name="" id="" />
                            <Typography sx={{ fontWeight: "bold" }}>Price</Typography>
                            <input style={{ width: "85%", height: '30px', marginBottom: "15px", border: "2px solid gray", borderRadius: "5px" }} type="text" ref={priceRef} name="" id="" />
                            <Typography sx={{ fontWeight: "bold" }}>Product Description</Typography>
                            <textarea style={{ width: "85%", marginBottom: "15px", border: "2px solid gray", borderRadius: "5px" }} ref={descriptionRef} name="" id="" cols="30" rows="10" ></textarea>



                            <Button onClick={(e) => handleProductDetailsChange(e, singleProduct?._id)} sx={{ mb: 4 }} type="submit" variant="contained">Save Changes</Button>
                        </form>

                    </Grid>

                </Grid>
            </Container>
        </div>
    );
};

export default ProductDetails;