const express = require('express');
const cors = require('cors');
const data = require('./data');

// Initialize App
const app = express();
// append express with json in order to enable the use of json request bodies and responses
app.use(express.json());

// enable cors for our server requests
app.use(cors());

app.post('/', (req, res, next) => {
    // url params that defines the page and the limit of each returned result
    const page = req.query?.page;
    const limit = req.query?.limit;
    // define the start and endIndex of the current page
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    // filters received as a json object in the request body
    const filters = req.body;
    const filteredUsers = data.filter(user => {
        let isValid = true;
        // loop in the filters one by one
        for (let key in filters) {
            isValid = isValid && user[key].includes(filters[key]);
        }
        return isValid;
    });
    // slice the filtered result in order to return only one page content
    const slicedUsers = filteredUsers.slice(startIndex, endIndex);
    res.send({doctors: slicedUsers, length: filteredUsers.length});
});


app.get('/search', (req, res, next) => {
    res.send({doctors: "slicedUsers", length: "filteredUsers.length"});
});

// Start server on PORT 5000
app.listen(5000, () => {
    console.log('Server started!');
});
