const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    obj = {
        name: 'James Lev',
        age: 20,
        type: 'Developre',
        more: `Hello i am James I am fullstack developer I wand to creact a company Virtual World wich connect people virtullay but they can feel it's real but firts i want to craete a social media application which is BTS-M`
    }
    res.json(obj);
})

module.exports = router;