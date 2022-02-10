import { CircularProgress, Container, Grid, Box, Menu, MenuItem, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Product from './Product';
import './AllProducts.css'

import usePagination from '@mui/material/usePagination';
import { styled } from '@mui/material/styles';

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
});





const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const size = 5;
  useEffect(() => {
    fetch(`https://shrouded-gorge-65021.herokuapp.com/products?page=${page}&&size=${size}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        const count = data.count;
        const pageNumber = Math.ceil(count / 5);
        setPageCount(pageNumber);

      })

  }, [page])



  return (

    <Container>

      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 3 }}
      >
        <h3 style={{ textAlign: "start" }}>Food Items</h3>
        <div>
          <Button
            sx={{ border: 1, borderColor: 'grey.500', backgroundColor: "white", borderRadius: "5px", color: "black", textTransform: "lowerCase", mx: 3 }}
          >
            <i class="fas fa-cloud-upload-alt" style={{ marginRight: "10px" }}></i>Export
          </Button>
          <Button variant="contained" ><i class="fas fa-plus" style={{ marginRight: "10px" }}></i> Create New</Button>
        </div>
      </Box>
      <Grid container spacing={2} sx={{ backgroundColor: "white", borderRadius: 1, py: 2, display: 'flex', justifyContent: 'space-between' }}  >
        <input style={{ width: "40%", height: '35px', marginLeft: "15px", border: "2px solid #F7F7F7", borderRadius: "5px" }} placeholder="Search" type="text" name="" id="" />
        <div>
          <Button
            sx={{ border: "2px solid #F7F7F7", borderRadius: "5px", color: "black", textTransform: "lowerCase" }}

            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <span>Catagory</span> <i class="fas fa-chevron-down" style={{ marginLeft: "10px" }}></i>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>Breakfast</MenuItem>
            <MenuItem onClick={handleClose}>Launch</MenuItem>
            <MenuItem onClick={handleClose}>Dinner</MenuItem>
          </Menu>
          <Button
            sx={{ border: "2px solid #F7F7F7", borderRadius: "5px", color: "black", textTransform: "lowerCase", mx: 3 }}
          >
            Last Added <i class="fas fa-long-arrow-alt-up"></i><i class="fas fa-long-arrow-alt-down"></i>
          </Button>
        </div>


      </Grid>
      <hr />
      <Grid container spacing={2} sx={{ backgroundColor: "white", borderRadius: 1, pl: 1 }}  >

        {
          products.length === 0 ? <div style={{ margin: "0 auto" }}><CircularProgress /></div>
            :
            products.map(product => <Product product={product} ></Product>)
        }
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

export default AllProducts;