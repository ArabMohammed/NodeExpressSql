const db=require('../models/')
const reviewModel = require('../models/reviewModel')

const Product = db.products
const Review = db.reviews

const addProduct = async (req,res) => { 

    let info = {
        title:req.body.title,
        price:req.body.price,
        description:req.body.description,
        published:req.body.published ? req.body.published : false
    }
    // create a new job instance
    const product = await Product.create(info)
    res.status(201).json({product})
    console.log(product)
}

const getAllProducts = async(req,res)=>{
    let products = await Product.findAll({
        attributes : [
            'id',
            'title',
            'price'
        ]
    })
    res.status(200).json({products,count:products.length})
}

const getProduct = async(req,res)=>{
    let id = req.params.id
    let products = await Product.findOne({where : {id:id}})
    res.status(200).json({products})
}

const updateProduct = async(req,res)=>{
    let id = req.params.id
    let product = await Product.update(
        req.body,
        {where : {id:id}}
    )
    res.status(200).json({product})
}

const deleteProduct = async(req,res)=>{
    let id = req.params.id
    await Product.destroy({where : {id:id}})
    res.status(200).json({msg:`product with id : ${id} is deleted`})
}

const getPublishedProduct= async(req,res)=>{
    const products = await Product.findAll({where:{published:true}})
}

const getProductReviews=async(req,res)=>{
    const id =req.params.id ;
    const data=await Product.findAll({
        include:[{
            model:Review,
            as:'review'
        }],
        where:{id:id}
    })
    res.status(200).json({data})
}

module.exports ={
    addProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getPublishedProduct,
    getProductReviews
}