const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
const usermodel = require("./schema");
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://anuj_1358:Sc7H56ZBksq68suM@devtown.3dsdhuu.mongodb.net/Grocery?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connection established");
  });

app.post("/register", async(req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    address,
    totalCost,
    purchased_items,
  } = req.body;


    try{
        const getspecific=await usermodel.findOne({
            email:email,
        })
        if(!getspecific){
            const user = {

                firstName: String(firstName),
                lastName: String(lastName),
                email: String(email),
                phone: Number(phone),
                address: String(address),
                purchased_items: Array(JSON.parse(purchased_items)),
                totalCost: Number(totalCost),
              
            };
            await usermodel.create(user);

            return res.status(200).json({message:"Data Saved"});
        }
        else {
          return res.status(409).json({message:"Email already exists"});
        }
    }
    catch(err){
        res.json({err:err.message});
    }
})

app.listen(5000,()=>{
    console.log("Server running");
})




