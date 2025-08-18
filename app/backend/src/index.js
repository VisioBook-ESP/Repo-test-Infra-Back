const express = require('express');
const {PrismaClient} = require('@prisma/client');
const createAuthRoutes = require('./routes/auth.routes').default;

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get ("health", async (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/auth', createAuthRoutes({ prisma }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});