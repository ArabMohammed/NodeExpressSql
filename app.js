require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const indexDb= require('./models/index')
/***************import routes******** */
const productRouter=require('./routes/productRouter.js')
const reviewRouter = require('./routes/reviewRouter')
/***********middlewares********* */

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))

/*********routes************************* */

app.get('/',(req,res)=>{
    res.json({message:"welcome "})
})
app.use('/api/v1/products',productRouter)
app.use('/api/v1/reviews',reviewRouter)
/**************************** */

const port = process.env.PORT || 3000;
app.listen(port, () =>
console.log(`Server is listening on port ${port}...`)
);

