import express from 'express';
import bodyParser from 'body-parser';
import {PORT} from "./config/config.js";
import {mongoDbConnection} from "./mongodb/mongodb.js";
import cors from "cors"
import userRegistrationRoute from "./routes/userRegistrationRoute.js";
import userAddressRoute from "./routes/userAddressRoute.js";
import productsRoutes from "./routes/productsRoutes.js";
import wishListRoutes from "./routes/wishListRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";


const app = express();



app.use(bodyParser.json({limit: '20mb'}))
app.use(cors())




app.get("/", (req, res) => {
    res.send('server working on '+ PORT)
})

app.use('/users',userRegistrationRoute);
app.use('/usersAddress',userAddressRoute);
app.use('/products',productsRoutes);
app.use('/wishList',wishListRoutes);
app.use('/userCart', cartRoutes);



app.listen(PORT,async (err) => {
    if (err) {
        console.error('Failed to start server:', err);
    } else {
       await mongoDbConnection()
        console.log(`Server is running on http://localhost:${PORT}`);
    }
})