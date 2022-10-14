//set a reference to the request module
let request = require('request'),
    postData = {},
    postConfig = {},
    postSuccessHandler = null;

//create a search object to send as POST data
postData = {
    city:'Berlin',
    area_of_expertise:'Allergy and ImmunologyAllergy and Immunology',
};

//the config for our HTTP POST request
postConfig = {
    url:'http://localhost:5000/search',
    form: postData
};

//the HTTP POST request success handler
postSuccessHandler = function (err, httpResponse, body) {
    //look for this message in your JS console:
    console.log('JSON response from the server: ' + body);
};

//make the POST request
request.post(postConfig, postSuccessHandler);
