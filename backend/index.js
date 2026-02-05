const express=require('express');
const cors=require('cors'); 
const {Sequelize, DataTypes}=require('sequelize');

const app=express();
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended: true}));
const sequelize=new Sequelize('test','root','',{
    host:'localhost',
    dialect:'mysql',
    logging:false 
});
const User=sequelize.define('User',{
    username:{
        type:DataTypes.STRING,
        allowNull:false
    },
    mail:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }

});
sequelize.sync()
    .then(()=>console.log("MySQL connected: Table ready!"))
    .catch(err=>console.log("Sync Error:"+err));
app.post('/signup',async(req,res)=>{
    try{
        const userCount=await User.count();
        console.log(`Current Count:${userCount}`);
        if (userCount>=5){
            return res.status(400).json({ 
                success:false, 
                message:"Storage Full! Sirf 5 users ki limit hai." 
            });
        }

        const {username,mail,password}=req.body;
        const newUser=await User.create({username,mail,password });

        res.json({ 
            success:true, 
            message:"User successfully registered in MySQL!",
            user:newUser 
        });
    } catch(error){
        console.error("Signup Error:",error);
        res.status(500).json({success:false,message:"Server error occurred" });
    }
});

const PORT=3000;
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});