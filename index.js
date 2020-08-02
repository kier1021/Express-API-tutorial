const express = require('express');
const memberRoutes = require('./routes/api/members')

const app = express()

const PORT = process.env.PORT || 5000;


//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/api/members', memberRoutes)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));