require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const axios = require('axios');
const { authenticateToken } = require('./middleware/authMiddleware');
const { es } = require('date-fns/locale');

const app = express();
app.use(cors());

app.use(express.json({ extended: true, limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 50000 }));

async function requestLogin(req, res) {
    try {
        // Obtiene la URL del servicio HTTP desde las variables de entorno
        let httpServiceUrl = '';

        if (req.url === '/login') {
            httpServiceUrl =  `${process.env.AUTH_SERVICE_URL}/user`
        }
        else if (req.url === '/register') {
            httpServiceUrl =  `${process.env.AUTH_SERVICE_URL}/user`
        }
        else {
            httpServiceUrl =  `${process.env.AUTH_SERVICE_URL}`
        }

        console.log(`${httpServiceUrl}${req.url}`);


        const headers = { ...req.headers };
        delete headers['if-modified-since'];
        delete headers['if-none-match'];

        const response = await axios({
            url: `${httpServiceUrl}${req.url}`,
            method: req.method,
            headers: headers,
            data: req.body
        });

        console.log(response.data);

        res.status(response.status).send(response.data);
    } catch (error) {
        console.log('Error en el proxy:', error.response.data);
        res.status(502).send(error.response.data);
    }
};

async function proxyRequest(req, res) {
    try {
        // const httpServiceUrl = 'http://http-service:5002/http-service';
        const httpServiceUrl = process.env.HTTP_SERVICE_URL;
        console.log(`${httpServiceUrl}${req.url}`);

        const headers = { ...req.headers };
        delete headers['if-modified-since'];
        delete headers['if-none-match'];

        const response = await axios({
            url: `${httpServiceUrl}${req.url}`,
            method: req.method,
            headers: headers,
            data: req.body
        });

        console.log(response.data);

        res.status(response.status).send(response.data);
    } catch (error) {
        console.log('Error en el proxy:', error.response.data);
        res.status(502).send(error.response.data);
    }
};

app.use(
    '/auth-service',
    express.json(),
    requestLogin,
);

app.use(
    '/http',
    authenticateToken,
    express.json(),
    proxyRequest
);



app.get('/', (req, res) => {
    res.send('¡hello, api-gateway server connected!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`API Gateway escuchando en el puerto ${PORT}`);
});