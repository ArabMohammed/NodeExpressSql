const db= require('../models')
const Review = db.reviews

const addReview = async (req,res) => { 

    let info = {
        rating:req.body.rating,
        description:req.body.description,
    }
    // create a new job instance
    const review = await Review.create(info)
    res.status(201).json({review})
}

const getAllReviews = async(req,res)=>{
    let reviews = await Review.findAll({})
    res.status(200).json({reviews,count:reviews.length})
}

const getReview = async(req,res)=>{
    let id = req.params.id
    let review = await Review.findOne({where : {id:id}})
    res.status(200).json({review})
}
const deleteReview = async(req,res)=>{
    let id = req.params.id
    await Review.destroy({where : {id:id}})
    res.status(200).json({msg:`review with id : ${id} is deleted`})
}

module.exports ={
    addReview,
    getAllReviews,
    getReview,
    deleteReview
}