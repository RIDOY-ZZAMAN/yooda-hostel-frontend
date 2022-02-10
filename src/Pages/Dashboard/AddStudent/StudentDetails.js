import { Button, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const StudentDetails = () => {
    const [studentDetails, setStudentDetails] = useState([]);
    const [singleStudent, setSingleStudent] = useState({})
    const studentNameRef = useRef();
    const studentRollRef = useRef();
    const studentAgeRef = useRef();
    const studentHallNameRef = useRef();
    const { studentId } = useParams();
    useEffect(() => {
        fetch('http://localhost:5000/students')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setStudentDetails(data.students)
            })
    }, [])

    useEffect(() => {
        const foundStudent = studentDetails.find((student) => student._id === studentId);
        setSingleStudent(foundStudent)
    }, [studentDetails, studentId]);

    const handleProductDetailsChange = (e, id) => {
        e.preventDefault();
        const studentName = studentNameRef.current.value;
        const studentRoll = studentRollRef.current.value;
        const studentAge = studentAgeRef.current.value;
        const studentHallName = studentHallNameRef.current.value;
        const detailsChanging = { studentName, studentRoll, studentAge, studentHallName };
        console.log(detailsChanging, id);
        const url = `http://localhost:5000/students/${id}`;
        const newDetails = studentDetails.find(student => student._id === id);
        newDetails.FullName = studentName;
        newDetails.Roll = studentRoll;
        newDetails.Age = studentAge;
        newDetails.HallName = studentHallName;
        const approved = window.confirm("Are You want to Change Student Details? ");

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
                        alert("Student Details Changed Successfully");

                    }
                })
        }



    }
    return (
        <Container>
            <h2 > Edit  Details of  <span >{singleStudent?.FullName}</span></h2>
            <Grid container spacing={2} sx={{ backgroundColor: "white", borderRadius: "5px", pl: 7, pt: 5 }}>
                <Grid item xs={12} md={6} >
                    <Card sx={{ maxWidth: 345 }}>
                        <CardActionArea>
                            <CardContent sx={{ textAlign: "left" }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    Student Name:   {singleStudent?.FullName}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    Student Roll:  {singleStudent?.Roll}
                                </Typography>
                                <Typography gutterBottom variant="h5" component="div">
                                    Student Age:  ${singleStudent?.Age}
                                </Typography>

                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <form className="productorder" style={{ marginTop: "-30px", textAlign: "left" }}>
                        <Typography sx={{ mt: 3, fontWeight: "bold" }}>Student Name</Typography>
                        <input style={{ width: "85%", height: '30px', marginBottom: "15px", border: "2px solid gray", borderRadius: "5px" }} type="text" ref={studentNameRef} name="" id="" />
                        <Typography sx={{ fontWeight: "bold" }}>Student Roll</Typography>
                        <input style={{ width: "85%", height: '30px', marginBottom: "15px", border: "2px solid gray", borderRadius: "5px" }} type="text" ref={studentRollRef} name="" id="" />

                        <Typography sx={{ fontWeight: "bold" }}>Student Age</Typography>
                        <input style={{ width: "85%", height: '30px', marginBottom: "15px", border: "2px solid gray", borderRadius: "5px" }} type="text" ref={studentAgeRef} name="" id="" />

                        <Typography sx={{ fontWeight: "bold" }}>Student Hall</Typography>
                        <input style={{ width: "85%", height: '30px', marginBottom: "15px", border: "2px solid gray", borderRadius: "5px" }} type="text" ref={studentHallNameRef} name="" id="" />

                        <Button onClick={(e) => handleProductDetailsChange(e, singleStudent?._id)} sx={{ mb: 4 }} type="submit" variant="contained">Save Changes</Button>
                    </form>

                </Grid>
            </Grid>
        </Container>

    );
};

export default StudentDetails;