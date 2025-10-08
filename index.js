

   import express from 'express';
    
   import mongoose from 'mongoose';

   const app= express();

   app.use(express.json());

   
const todoSchema=new mongoose.Schema({
    id:Number,
    title:String,
    completed:Boolean,
    createdAt:String,
    updatedAt:String


   


})

const todo=mongoose.model("todo",todoSchema);

app.post("/todo",(req,res)=>{
    const reqBody=req.body;

    const saveData=new todo(reqBody);
    saveData.save();

    res.json({reqBody, message:"data stored succefully"});
}),

 app.get("/todo",async(req,res)=>{
    const data=await todo.find()
    res.json(data)
}),

app.delete('/todo/:id',async(req,res)=>{
    const id =  req.params.id;
    await todo.deleteOne({ _id:id})
    res.json({"message": "Delete Successfully"});
})
app.put("/todo/:id",async(req,res)=>{
     const id=req.params.id;
     await todo.findByIdAndUpdate({_id: id},req.body)
     res.json(req.body);
})

app.listen(3000,()=>{

    mongoose.connect("mongodb://localhost:27017/TODO")
    .then(()=>console.log("DB connected"))
    .catch(err=>console.log(err));


    console.log("Sever is running on http://localhost:3000");
});




 