const express = require('express');
const router = express.Router();
const axios = require('axios');

// router.get('/', (req, res) => {
//     axios.get(`https://maps.googleapis.com/maps/api/js?key=${process.env.API_KEY}`)
//     .then(function(response) {
//         res.send(response.data);
//     })
//     .catch((error) =>{
//         console.log(error);   
//     })
// })

module.exports = router;