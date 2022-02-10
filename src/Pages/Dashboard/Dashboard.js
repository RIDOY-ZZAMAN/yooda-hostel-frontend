import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { styled } from '@mui/system';


import {
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom";

import './Dashboard.css'
import AddProducts from './Add products/AddProducts';
import AllProducts from './AllProducts/AllProducts';
import ProductDetails from './AllProducts/ProductDetails';
import ProductTable from './ProductTable/ProductTable';
import AddStudent from './AddStudent/AddStudent';
import StudentTable from './StudentTable/StudentTable';
import StudentDetails from './AddStudent/StudentDetails';

const drawerWidth = 200;

const StyledButton = styled(Button)`
  &:hover {
    background: blue;
    color:White
  }
`


function Dashboard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    let { path, url } = useRouteMatch();
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div className="dashboard">
            {/* Small Portion besides with header */}
            <Toolbar >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}

                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" sx={{ color: "blue" }}>
                    <i class="fas fa-tags"></i>Admin <br /> Yooda Hostel
                </Typography>

            </Toolbar>

            <Divider />

            <Box style={{ textAlign: "start" }}>
                <div className="leftColumnItems">
                    <Link to="/dashboard"><StyledButton sx={{ color: "black", marginTop: "30px", fontWeight: "bold" }}> <i style={{ margin: "0 5px" }} class="fas fa-columns"></i>   DashBoard</StyledButton></Link>
                    <Link to={`${path}/allproducts`}><StyledButton sx={{ color: "black", fontWeight: "bold" }}><i class="fas fa-archive" style={{ margin: "0 5px" }} ></i> All Products</StyledButton></Link>

                    <Link to={`${path}/addproducts`}><StyledButton sx={{ color: "black", fontWeight: "bold" }}><i class="fas fa-plus-circle" style={{ margin: "0 5px" }} ></i>Add Food</StyledButton></Link>
                    {/* <Link to={`${path}/producttable`}><StyledButton sx={{ color: "black" }}><i class="fas fa-columns" style={{ margin: "0 5px" }} ></i>Product Table</StyledButton></Link> */}
                    <Link to={`${path}/addstudent`}><StyledButton sx={{ color: "black", fontWeight: "bold" }}><i class="fas fa-plus-circle" style={{ margin: "0 5px" }} ></i>Add Student</StyledButton></Link>
                    {/* <Link to={`${path}/studenttable`}><StyledButton sx={{ color: "black" }}><i class="fas fa-columns" style={{ margin: "0 5px" }} ></i>Student Table</StyledButton></Link> */}
                </div>
            </Box>
        </div >
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', }}>
            <CssBaseline />
            {/* Header */}
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },



                }}


            >
                <Toolbar style={{ backgroundColor: "white" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/* <Typography variant="h6" noWrap component="div" >
                        admin
                    </Typography> */}

                    <Box sx={{ display: "flex", alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                            <i class="fas fa-search" style={{ color: "black" }}></i>
                            <input style={{ width: "40%", height: '35px', marginLeft: "15px", border: "none" }} placeholder="Search" type="text" name="" id="" />
                        </Box>
                        <Box sx={{ ml: 92 }}>
                            <i class="fas fa-sun" style={{ color: "black" }}></i>
                            <i class="fas fa-bell" style={{ color: "black", margin: "0 20px" }}></i>
                            <i class="fas fa-user-circle  fa-lg" style={{ color: "black" }}></i>
                            <i class="fas fa-chevron-down" style={{ color: "black", margin: "0 20px" }}></i>

                        </Box>
                    </Box>


                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },

                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },

                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, backgroundColor: "#F7F7F7" }}
            >
                <Toolbar />
                <Switch>
                    <Route exact path={`${path}/allproducts`}>
                        <AllProducts></AllProducts>
                    </Route>
                    <Route exact path={`${path}/addproducts`}>
                        <AddProducts></AddProducts>
                    </Route>
                    <Route exact path={`${path}/producttable`}>
                        <ProductTable></ProductTable>
                    </Route>
                    <Route exact path={`${path}/addstudent`}>
                        <AddStudent></AddStudent>
                    </Route>
                    <Route exact path={`${path}/studenttable`}>
                        <StudentTable></StudentTable>
                    </Route>

                    <Route path="/dashboard/allproducts/productDetails/:productId">
                        <ProductDetails></ProductDetails>
                    </Route>

                    <Route path="/dashboard/addstudent/studentDetails/:studentId">
                        <StudentDetails></StudentDetails>
                    </Route>

                </Switch>

            </Box>
        </Box>
    );
}

Dashboard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Dashboard;
