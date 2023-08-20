import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Paper, Grid, Button, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const TrainDetails = () => {
  const { trainId } = useParams();
  const [trainInfo, setTrainInfo] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/trains/${trainId}`)
      .then((response) => {
        setTrainInfo(response.data.data);
      })
      .catch((error) => {
        console.error('Error while fetching train information:', error);
      });
  }, [trainId]);

  return (
    <Container maxWidth="md" style={{ marginTop: '20px' }}>
      {trainInfo ? (
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#F0F0F0' }}>
          <Typography variant="h4" component="h1" gutterBottom style={{ color: '#F26C22' }}>
            Train Details
          </Typography>
          <div style={{ border: '1px solid #ddd' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} style={{ borderRight: '1px solid #ddd' }}>
                <Typography variant="h6" component="h2">
                  Train Name: {trainInfo.trainName}
                </Typography>
                <Typography variant="body1">Train Number: {trainInfo.trainNumber}</Typography>
                <Typography variant="body1">Departure Time: {`${trainInfo.departureTime.Hours}:${trainInfo.departureTime.Minutes} AM`}</Typography>
                <Typography variant="body1">Delay: {trainInfo.delayedBy} minutes</Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" component="h2">
                  Price Details
                </Typography>
                <Typography variant="body1">Price (Sleeper): Rs. {trainInfo.price.sleeper}</Typography>
                <Typography variant="body1">Price (AC): Rs. {trainInfo.price.AC}</Typography>
                <Typography variant="body1">Seats Available (Sleeper): {trainInfo.seatsAvailable.sleeper}</Typography>
                <Typography variant="body1">Seats Available (AC): {trainInfo.seatsAvailable.AC}</Typography>
              </Grid>
            </Grid>
          </div>
          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
            <Button component={Link} to="/all-trains" variant="contained" color="primary" style={{ marginRight: '10px', backgroundColor: '#3B9038' }}>
              Back to All Trains
            </Button>
            <Button variant="contained" color="secondary">
              Book Now
            </Button>
          </div>
        </Paper>
      ) : (
        <Typography variant="h5" component="h2" style={{ textAlign: 'center', marginTop: '50px', color: '#555' }}>
          Loading...
        </Typography>
      )}
    </Container>
  );
}

export default TrainDetails;
