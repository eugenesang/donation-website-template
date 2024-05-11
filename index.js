const express = require('express');
const { networkInterfaces } = require('os');
const route = require('./routes');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

const port = process.env.PORT || 5678;

app.listen(port, () => {
    const interfaces = networkInterfaces();
    let localIP;

    Object.keys(interfaces).forEach(interfaceName => {
        interfaces[interfaceName].forEach(interfaceInfo => {
            if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal && interfaceInfo.address.startsWith('192.168.')) {
                localIP = interfaceInfo.address;
            }
        });
    });

    if (!localIP) {
        console.error("Couldn't find a 192.168.x.x IP address. Defaulting to localhost.");
        localIP = 'localhost';
    }

    console.log("Server running at \n local host: http://localhost:" + port + "\n local network: http://" + localIP + ":" + port);
});

route(app);

