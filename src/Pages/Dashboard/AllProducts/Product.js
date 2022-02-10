import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Paper } from '@mui/material';
import { Switch, useHistory } from 'react-router-dom';
import { Box } from '@mui/system';


const Product = ({ product }) => {
    const { imgUrl, ProductName, Price, _id } = product;
    const history = useHistory();
    const handleClick = () => {
        history.push(`/dashboard/allproducts/productDetails/${_id}`);

    }



    return (
        <div style={{ marginTop: "10px" }}>
            <Paper elevation={3} sx={{ py: 5, height: "330px", width: "194px", m: 1, border: 1, borderColor: 'grey.500' }} >
                <img src={imgUrl} height='50%' width="90%" alt="" />
                <Typography variant="h6" gutterBottom component="div">
                    {ProductName}
                </Typography>
                <Typography variant="h5" display="block" gutterBottom>
                    ${Price}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }} >
                    <Button sx={{ px: 1, py: 0 }} variant="outlined" onClick={handleClick}><i class="fas fa-pen" style={{ color: "green", marginRight: "4px" }}></i> Edit</Button>

                    <Button sx={{ px: 1 }} variant="outlined"><i class="fas fa-trash-alt" style={{ color: "green", marginRight: "4px" }}></i> Delete</Button>
                </Box>


            </Paper>
            <Switch>

            </Switch>
        </div >
    );
};

export default Product;