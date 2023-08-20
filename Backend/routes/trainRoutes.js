const express = require("express");
const router = express.Router();

const {getToken}=require('../Infromation/Inf')

function filterAndSortTrains(trainData) {
    const currentTime = new Date();
    const allowedTimeWindow = 30; 
    const twelveHoursLater = new Date(currentTime.getTime() + 12 * 60 * 60 * 1000);
    const filteredTrains = [];
  
    for (const train of trainData) {
      const departureTime = new Date();
      departureTime.setHours(train.departureTime.Hours);
      departureTime.setMinutes(train.departureTime.Minutes + train.delayedBy);
      departureTime.setSeconds(train.departureTime.Seconds);
  
      if (departureTime >= currentTime && departureTime <= twelveHoursLater) {
        const availableSeats = train.seatsAvailable.sleeper + train.seatsAvailable.AC;
        const ticketPrices = train.price;
  
        filteredTrains.push({
          trainName: train.trainName,
          trainNumber: train.trainNumber,
          departureTime: departureTime,
          seatsAvailable: availableSeats,
          price: ticketPrices,
        });
      }
    }
  
    filteredTrains.sort((a, b) => {
      const priceA = a.price.sleeper + a.price.AC;
      const priceB = b.price.sleeper + b.price.AC;
      if (priceA !== priceB) return priceA - priceB;
  
      const seatsA = a.seatsAvailable;
      const seatsB = b.seatsAvailable;
      const totalSeatsA = seatsA.sleeper + seatsA.AC;
      const totalSeatsB = seatsB.sleeper + seatsB.AC;
      if (totalSeatsA !== totalSeatsB) return totalSeatsB - totalSeatsA;
  
      return b.departureTime - a.departureTime;
    });
  
    return filteredTrains;
  }
  
  

router.get("/trains", async function (req, res) {
    try {
        const token_data = await getToken()
        const res_data = await fetch("http://20.244.56.144/train/trains", {
            method: 'GET',
            headers: { Authorization: `Bearer ${token_data.access_token}` }
        })
        const data = await res_data.json();
        const sortedTrains = filterAndSortTrains(data);
        res.send({ data:sortedTrains})
    }
    catch (err) {
        console.log(err.message)
        res
            .status(500)
            .send({ message: "Error", success: false });
    }
})

module.exports=router