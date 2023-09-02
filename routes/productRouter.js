const { addProduct,
    getAllProducts,
    getProduct,
    updateProduct,
    deleteProduct,
    getPublishedProduct,
    getProductReviews
} = require('../controllers/productController')
const router = require('express').Router()
/************************ */
router.route('/').post(addProduct).get(getAllProducts)
router.route('/published').get(getPublishedProduct)
router.route('/reviews/:id').get(getProductReviews)
router.route('/:id').get(getProduct).delete(deleteProduct).patch(updateProduct)

module.exports=router