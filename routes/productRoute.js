const express=require("express")
const {getProducts,getProductById,deleteProduct,addNewData,UpdateData}=require("../controllers/productController")
const router=express.Router()
router.get("/",getProducts)
router.post("/",addNewData)
router.put("/:id",UpdateData)
router.delete("/:id",deleteProduct)
router.get("/:id",getProductById)

module.exports=router