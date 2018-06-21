const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res)=> {
    res.sendfile('./view/index.html');
});

require('./controllers/authController')(app);
require('./controllers/projectController')(app);

app.listen(3000);



