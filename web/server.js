const express = require('express');
const app = express();

const port = 3000;
const base = `${__dirname}/pages`;

app.use(express.static('pages'));

app.get('/', function(req, res) {
    res.sendFile(`${base}/main.html`);
});

app.get('/add-device', function(req, res) {
    res.sendFile(`${base}/add-device.html`);
});

app.get('/light', function(req, res) {
    res.sendFile(`${base}/light.html`);
});

app.get('/air-conditioning', function(req, res) {
    res.sendFile(`${base}/airConditioning.html`);
});

app.get('/security', function(req, res) {
    res.sendFile(`${base}/security.html`);
});

app.get('/show-devices', function(req, res) {
    res.sendFile(`${base}/show-devices.html`);
});

app.get('/delete-device', function(req, res) {
    res.sendFile(`${base}/delete-device.html`);
});

app.get('/high-chart', function(req, res) {
    res.sendFile(`${base}/highchart.html`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});