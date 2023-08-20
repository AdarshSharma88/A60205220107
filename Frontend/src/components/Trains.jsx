import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TableContainer, Table, Paper, TableCell, TableRow, TableHead, TableBody, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function TrainSchedule() {
  const [trainSchedule, setTrainSchedule] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/trains')
      .then((response) => {
        setTrainSchedule(response.data.data);
        console.log(response.data.data);
      })
      .catch((error) => {
        console.error('Error while fetching train schedule:', error);
      });
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' ,border:'2px' }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom style={{ color: '#F26C22' }}>
        Here Complete Train Timings
      </Typography>
      <TableContainer component={Paper} style={{ backgroundColor: '#FFFFFF' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: '#FFFFFF', backgroundColor: 'black' }}>Train Name</TableCell>
              <TableCell align="right" style={{ color: '#FFFFFF', backgroundColor: 'black' }}>Train Number</TableCell>
              <TableCell align="right" style={{ color: '#FFFFFF', backgroundColor: 'black' }}>Departure Time</TableCell>
              <TableCell align="right" style={{ color: '#FFFFFF', backgroundColor: 'black' }}>Available Seats</TableCell>
              <TableCell align="right" style={{ color: '#FFFFFF', backgroundColor: 'black' }}>Sleeper Price</TableCell>
              <TableCell align="right" style={{ color: '#FFFFFF', backgroundColor: 'black' }}>AC Price</TableCell>
              <TableCell align="center" style={{ color: '#FFFFFF', backgroundColor: 'black' }}>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trainSchedule?.map((train) => (
              <TableRow key={train.trainNumber}>
                <TableCell>{train.trainName}</TableCell>
                <TableCell align="right">{train.trainNumber}</TableCell>
                <TableCell align="right">{train.departureTime}</TableCell>
                <TableCell align="right">{train.seatsAvailable}</TableCell>
                <TableCell align="right">{train.price.sleeper}</TableCell>
                <TableCell align="right">{train.price.AC}</TableCell>
                <TableCell align="center">
                  <Button
                    component={Link}
                    to={`/trains/${train.trainNumber}`}
                    variant="contained"
                    color="primary"
                    style={{ backgroundColor: '#3B9038' }}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TrainSchedule;
