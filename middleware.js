const express=require('express');
const app=express();
const checkPassword=(req,res,next)=>{
      const userPassword=req.query.password;
      if(userPassword=='123'){
        next();
      }
      else{
        res.send("wrong password:");
      }

}

app.get('/dashboard', checkPassword, (req, res) => {
  res.send("Welcome to your Dashboard!");
});
app.listen(3000, () => console.log("Server chal raha hai 3000 par"));
