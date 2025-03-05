require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routerApi = require('./routes');
// const { connect } = require('./libs/sequelize');
const connectionMg = require('./libs/mongoose');

const app = express();
app.use(cors());

app.use(express.json({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ extended: true, limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));
app.use(bodyParser.raw({ type: 'application/x-xz', limit: '50mb' }));

connectionMg();
routerApi(app);

app.use('/app', express.static('public'));

const PORT = process.env.PORT || 5001;

app.get('/', (req, res) => {
    res.send('¡hello, auth-service server connected!');
});

app.listen(PORT, () => {
    console.log(`Auth Service running on port ${PORT}`);
});
