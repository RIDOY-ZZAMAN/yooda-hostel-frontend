import { Container, Grid, Button, Typography, TextField, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useHistory } from 'react-router-dom';

const AddStudent = () => {
    const [student, setStudent] = useState({});
    const [students, setStudents] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(1);
    const [selectedID, setSelectedID] = useState([])


    const size = 5;


    const history = useHistory();
    const handleClick = (_id) => {
        history.push(`/dashboard/addstudent/studentDetails/${_id}`);

    }


    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    useEffect(() => {
        fetch(`http://localhost:5000/students?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setStudents(data.students);
                const count = data.count;
                const pageNumber = Math.ceil(count / 5);
                setPageCount(pageNumber);

            })

    }, [page])

    const handleStudentSubmit = (e) => {
        e.preventDefault();
        console.log("This new Student", student)
        fetch('http://localhost:5000/students', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(student)

        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert("Student Data Inserted Successfully");
                    e.target.reset();
                }
            })


    }
    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newStudentData = { ...student };
        newStudentData[field] = value;
        setStudent(newStudentData);

    }

    const handleDelete = (id) => {
        const url = `http://localhost:5000/students/${id}`;
        const proceed = window.confirm("Are You Sure, You want to Delete this Student?")
        if (proceed) {
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        const remainingStudents = students.filter(student => student._id !== id);
                        setStudents(remainingStudents);
                        alert("Student Deleted Successfully");
                    }
                })

        }

    }
    const handleChange = (e, id) => {
        let isChecked = e.target.checked;
        console.log(isChecked, id);
        const newAddedSID = { ...selectedID };
        newAddedSID[id] = id;
        setSelectedID(newAddedSID)
    }
    console.log("Selected SID", selectedID)


    return (
        <Container>
            <h3 style={{ textAlign: "start" }}>Add Student</h3>
            <Grid container spacing={2} sx={{ backgroundColor: "white", borderRadius: "5px", pl: 5, pt: 2, display: "flex" }}>
                <Grid item xs={12} md={5} >
                    <Typography sx={{ textAlign: "start", fontWeight: "bold" }}>
                        1.General Info
                    </Typography>

                </Grid>
                <Grid item xs={12} md={7} sx={{ textAlign: "start", }} >

                    <form onSubmit={handleStudentSubmit}>
                        <TextField
                            sx={{
                                width: '75%',
                                m: 1
                            }}
                            id="standard-basic"
                            label="Full Name"
                            name="FullName"
                            onBlur={handleOnBlur}
                            variant="standard"
                        />
                        <TextField
                            sx={{
                                width: '75%',
                                m: 1
                            }}
                            id="standard-basic"
                            label="Roll"
                            name="Roll"
                            onBlur={handleOnBlur}
                            variant="standard"
                        />
                        <TextField
                            sx={{
                                width: '75%',
                                m: 1
                            }}
                            id="standard-basic"
                            label="Age"
                            name="Age"
                            onBlur={handleOnBlur}
                            variant="standard"
                        />
                        <TextField
                            sx={{
                                width: '75%',
                                m: 1
                            }}
                            id="standard-basic"
                            label="Hall Name"
                            name="HallName"
                            onBlur={handleOnBlur}
                            variant="standard"
                        />
                        <TextField
                            sx={{
                                width: '75%',
                                m: 1
                            }}
                            id="standard-basic"
                            label="Status"
                            name="Status"
                            value="active"
                            onBlur={handleOnBlur}
                            variant="standard"
                        />
                        <br />


                        <Button sx={{
                            width: '75%',
                            m: 1
                        }} variant="contained" type='submit'>Add New Student</Button>



                    </form>

                </Grid>
            </Grid>
            <h3><u>Student Table</u></h3>
            <Grid sx={{ mt: 1 }} container spacing={2}>
                <Grid item xs={12} md={12}>
                    <TableContainer component={Paper}>
                        <Table sx={{}} aria-label="Appoinments table">
                            <TableHead>
                                <TableRow >

                                    <TableCell sx={{ fontWeight: 600 }} align="left">FUll Name</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }} align="center">Roll</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }} align="center">Status</TableCell>
                                    <TableCell sx={{ fontWeight: 600 }} align="center">Action</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {students.length === 0 ? <div style={{ margin: "0 auto" }}><CircularProgress /></div>
                                    :
                                    students.map((std) => (
                                        <TableRow
                                            key={std._id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}

                                        >

                                            <TableCell component="th" scope="row" align="left" >
                                                <Checkbox
                                                    onClick={(e) => handleChange(e, std._id)}
                                                    {...label} />
                                                {std.FullName}
                                            </TableCell>
                                            <TableCell align="center">{std.Roll}</TableCell>
                                            <TableCell align="center">{std.Status}</TableCell>

                                            <TableCell align="center">
                                                <Button sx={{ px: 1 }} variant="outlined" onClick={() => handleClick(std._id)}><i class="fas fa-pen" style={{ color: "green", marginRight: "4px" }}></i> Edit</Button>

                                                <Button onClick={() => handleDelete(std._id)} sx={{ px: 1, mx: 2 }} variant="outlined"><i class="fas fa-trash-alt" style={{ color: "green", marginRight: "4px" }}></i> Delete</Button>



                                            </TableCell>
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

export default AddStudent;