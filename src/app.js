const express = require('express');
const cors = require('cors'); // <-- Add this line
const setRoutes  = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // <-- Add this line
app.use(express.json());

// Middleware
app.use('/', setRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});