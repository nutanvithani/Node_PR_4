const express = require('express')
const connect = require('./db')
const valid = require('./middleware')
const book = require('./book.schema')

const App = express()

App.use(express.json())

App.get('/',(req,res)=>
{
    res.send("welcome to the book store")
})

App.get("/books/book/:id",async(req,res)=>{
    let data=await book.findById(req.params.id)
    if(!data){
        res.status(404).send({message:"book not found"})
    }  
    res.status(200).send(data)  
})

App.delete("/books/delete/:id",async(req,res)=>{
    let {id}=req.params
    let data=await book.findByIdAndDelete(id)
    let allbooks=await book.find()
    res.status(200).send(allbooks)
})

App.get("/books",async(req,res)=>{
    let data=await book.find()
    res.status(200).send(data)
})

App.post("/books/addbooks",valid,async(req,res)=>{
    let data = await book.create(req.body)
    res.send(data)
})

App.patch("/books/update/:id",async(req,res)=>{
    let {id}=req.params
    let data=await book.findByIdAndUpdate(id,req.body)
    let books=await book.find()
    res.status(200).send(books)
})

App.get("/books/filter" , async (req,res) =>{
    const {author , category , title , price} = req.query;
    const filter = {}

    if(author){
        filter.author = author;
    }
    else if(title){
        filter.title = title;
    }
    else if(category){
        filter.category = category;
    }

    const sortprice = {}

    if(price == "lth"){
        sortprice.price = 1
    }
    else if(price == "htl"){
        sortprice.price = -1
    }

    let data = await book.find(filter).sort(sortprice)
    res.status(200).send(data)
})


App.listen(8090,() =>
{
    console.log("server is running");
    connect()
})