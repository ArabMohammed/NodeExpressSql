const { 
    addReview,
    getAllReviews,
    getReview,
    deleteReview } = require('../controllers/reviewController.js')
const router = require('express').Router()
/************************ */
router.route('/').post(addReview).get(getAllReviews)
router.route('/:id').get(getReview).delete(deleteReview)

module.exports=router