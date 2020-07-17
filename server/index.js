const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.json({
        v: '0.1',
    });
});

app.get('/gamedata', (req, res) => {
    res.json({
        v: "0.1",
    });
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});