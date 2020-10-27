const express = require('express');
const app = express();

app.use(express.static(__dirname + '/bundle'));

app.get('/', (req, res) => res.sendFile(__dirname + '/bundle/index.html'));
app.listen(process.env.PORT || 3000);