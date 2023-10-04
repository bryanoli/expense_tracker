const express = require ("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const moment = require ('moment');
const mongoose = require('mongoose');
const Client=require('./mongodb')
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })) //Need it for time format


app.get("/",cors(), (req,res)=>{

})

// app.get("/", (req,res)=>{
//   res.render("login");
// })

// app.get("/signup", (req,res)=>{
//   res.render("signup");
// })

//This post is to check if the email exist
app.post('/',async (req, res) => {
  let {email,password}=req.body
  try{
    const check=await Client.findOne({email:email})
    if(check){
      res.json("Found");
    }
    else{
      res.send("Does not exist")
    }
  }catch(e){
    res.json("Does not exist")
  }
  // Client.findOne({email,password}, (err,doc)=>{
  //   if(err){
  //     res.sendStatus(500);
  //     return;
  //   }
  //   res.sendStatus({id:doc._id})
  // });

});

// app.post('/login',async (req, res) => {
//   let {email,password}=req.body
//   try{
//     const check=await Client.findOne({email:email})
//     if(check){
//       res.json("Found");
//       res.render("home");
//     }
//     else{
//       res.send("Does not exist")
//     }
//   }catch(e){
//     res.json("Not found")
//   }
//   // Client.findOne({email,password}, (err,doc)=>{
//   //   if(err){
//   //     res.sendStatus(500);
//   //     return;
//   //   }
//   //   res.sendStatus({id:doc._id})
//   // });

// });

app.post('/signup', async(req, res) => {
  const{email,password}=req.body
  const data={
    email:email,
    password:password
  }

  try{
    const check=await Client.findOne({email:email})
    if(check){
      res.json("Found");
    }
    else{
      res.send("Does not exist")
      await Client.insertMany([data]);
    }
  }catch(e){
    res.json("Not found")
  }
  
  res.render("home");
  // let { email, password } = req.body;
  // let newClient = new Client({ email, password });
  // newClient.save((err, client)=>{
  //   res.send({message:`User created with ID: ${user._id}`})
  // });
});

app.listen(8000,()=> {
    console.log("server has started");
});



//THIS IS FOR PLAID
// const moment = require ('moment');


// const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

// const configuration = new Configuration({
//   basePath: PlaidEnvironments.sandbox,
//   baseOptions: {
//     headers: {
//         'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
//         'PLAID-SECRET': process.env.PLAID_SECRET,
//     },
//   },
// });


// const plaidClient = new PlaidApi(configuration);

// db.on('connected', () => {
//   console.log('Mongoose connected to MongoDB Atlas');
// });

// db.on('error', (error) => {
//   console.error('Mongoose connection error:', error);
// });

// db.on('disconnected', () => {
//   console.log('Mongoose disconnected from MongoDB Atlas');
// });

//First endpoint
// app.post("/hello",(request,response)=> {
//     response.json({message:"hello " + request.body.name});
// });

// app.post('/create_link_token', async function (request, response) {
//     // Get the client_user_id by searching for the current user
//     const plaidRequest = {
//       user: {
//         // This should correspond to a unique id for the current user.
//         client_user_id: 'user',
//       },
//       client_name: 'Plaid Test App',
//       products: ['auth'],
//       language: 'en',
//       redirect_uri: 'http://localhost:5173/',
//       country_codes: ['US'],
//     };
//     try {
//       const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);
//       response.json(createTokenResponse.data);
//     } catch (error) {
//         response.status(500).send("failure");
//       // handle error
//     }
//   });

//   app.post("/auth", async function(request,response){
//     try{
//         const access_token = request.body.access_token;
//         const plaidRequest = {
//             access_token: access_token,
//         };
//         const plaidResponse = await plaidClient.authGet(plaidRequest);
//         response.json(plaidResponse.data);
//     }catch (e){
//         response.status(500).send("failed");
//     }
//   });

//   app.post('/exchange_public_token', async function (
//     request,
//     response,
//     next,
//   ) {
//     const publicToken = request.body.public_token;
//     try {
//       const plaidResponse = await plaidClient.itemPublicTokenExchange({
//         public_token: publicToken,
//       });
  
//       // These values should be saved to a persistent database and
//       // associated with the currently signed-in user
//       const accessToken = plaidResponse.data.access_token;
//     //   const itemID = response.data.item_id;
  
//       response.json({ accessToken });
//     } catch (error) {
//         response.status(500).send("Failed");
//       // handle error
//     }
//   });