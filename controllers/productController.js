const ProductModel=require("../models/producModel")
const getProducts=async(req,res)=>{
    try{const AllProducts=await ProductModel.find({})
    res.status(200).json({data:AllProducts})}catch(err){res.status(500).json({data:{},message:err.message})}


}
const getProductById=async(req,res)=>{
    try{const {id}=req.params
   const getById=await ProductModel.findById(id)
   if(!getById){
  return  res.status(404).json({data:{},message:err.message})}
  return  res.status(200).json({data:getById})
   }catch(err){res.status(500).json({data:{},message:err.message})}
}
const deleteProduct=async(req,res)=>{
    try{const {id}=req.params
   const DeleteById=await ProductModel.findByIdAndDelete(id)
   if(!DeleteById){
    return  res.status(404).json({data:{},message:err.message})}
    return  res.status(200).json({data:DeleteById})
   }catch(err){res.status(500).json({data:{},message:err.message})}
}
const addNewData=async(req,res)=>{
    try{const NewProduct=ProductModel(req.body)
    NewProduct.save()
    return  res.status(201).json({data:NewProduct})
}catch(err){res.status(500).json({data:{},message:err.message})}

}
const UpdateData=async(req,res)=>{
    try{const {id}=req.params
   const UpdatData=await ProductModel.findByIdAndUpdate(id,
    {...req.body},
    {new:true}
   )
   if(!UpdatData){
  return  res.status(404).json({data:{},message:err.message})}
  return  res.status(200).json({data:UpdatData})
   }catch(err){res.status(500).json({data:{},message:err.message})}
}

module.exports={UpdateData,getProducts,getProductById,deleteProduct,addNewData}








































/*const ProductModel=require("../models/producModel")
const addNewData =async (req,res)=>{
    try{
    const NewProduct=ProductModel(req.body)
    await NewProduct.save()
    res.status(201).json(NewProduct)
}catch(err){    res.status(500).json({data:{},message:err.massage||"fail",status:"fail"})
}}
const updateData=async (req,res)=>{
    try{
    const {id}=req.params
    const UpdateProduct=ProductModel.findByIdAndUpdate(
        id,
        {...req.body},
        {new:true}
    )
    
    
    if(!UpdateProduct){
        res.status(404).json({data:{},message:"fail",status:"fail"})

    }
    res.status(200).json({data:UpdateProduct,message:"success",status:"success"})

    
}catch(err){    res.status(500).json({data:{},message:err.massage||"fail",status:"fail"})
}
        }
const getProductsById=async (req,res)=>{
            try{
            const {id}=req.params
            const getById=await ProductModel.findById(id)
            
            
            if(!getById){
                res.status(404).json({data:{},message:"fail",status:"fail"})
        
            }
            res.status(200).json({data:getById,message:"success",status:"success"})
        
            
        }catch(err){    res.status(500).json({data:{},message:err.massage||"fail",status:"fail"})
    }
                }
const getProducts=async (req,res)=>{
                    try{
                    const Products=await ProductModel.find({})
                    
                    
                    
                    res.status(200).json({data:Products,message:"success",status:"success"})
                
                    
                }catch(err){    res.status(500).json({data:{},message:err.massage||"fail",status:"fail"})
            }
                        }
const deleteProduct=async (req,res)=>{
                            try{
                            const {id}=req.params
                            const getByIdDelete=await ProductModel.findByIdAndDelete(id)
                            
                            if(!id){
                                res.status(404).json({data:{},message:"fail",status:"fail"})
                        
                            }
                            if(!getByIdDelete){
                                res.status(404).json({data:{},message:"fail",status:"fail"})
                        
                            }
                            res.status(200).json({data:getByIdDelete,message:"success",status:"success"})
                        
                            
                        }catch(err){    res.status(500).json({data:{},message:err.massage||"fail",status:"fail"})
                    }
                                }
module.exports={getProducts,getProductsById,deleteProduct,updateData,addNewData}
*/
















/*const ProductModel=require("../models/producModel")
const getProducts=async  (req,res)=>{
    try{
        const getAll=await ProductModel.find({})
        res.status(200).json(getAll)    
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
const getProductsById=async  (req,res) =>{
    try{
        const {id}=req.params
        const getId=await ProductModel.findById(id)
        if(!id){
            res.status(404).json("id not found")    

        }
        res.status(200).json(getId)    
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
const updateData=async  (req,res)=> {
    try{
        const {id}=req.params
        const getIdUpdate=await ProductModel.findByIdAndUpdate(
            id,
            {...req.body},
            {new:true}

        )
        if(!getIdUpdate){
            res.status(404).json("id not found")    

        }
        res.status(200).json(getIdUpdate)    
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
const addNewData=async function (req,res) {
    try{
        const addProduct=ProductModel(req.body)
        await addProduct.save() 
        res.status(201).json(addProduct)  
 
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
const deleteProduct=async  (req,res)=> {
    try{
        const {id}=req.params
        const getIdAndDelete=await ProductModel.findByIdAndDelete(id)
        if(!getIdAndDelete){
            res.status(404).json("id not found")    

        }
        res.status(200).json(getIdAndDelete)    
    }
    catch(error){
        res.status(500).json({message:error.message})
    }
}
module.exports= {getProducts,getProductsById,deleteProduct,addNewData,updateData}
*/
























/*

const ProductModel = require("../models/producModel");

const getProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ProductModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not Found" })
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await ProductModel.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: "Product not Found" })
        }
        res.status(200).json({ message: "Deleted successfully!", deleteProduct: product, })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const addNewData = async (req, res) => {
    console.log(req.body)
    try {
        const newProduct = ProductModel(req.body)
        await newProduct.save()
        res.status(201).json(newProduct)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const updateData = async (req, res) => {
    const { id } = req.params
    try {
        const updatedProduct = await ProductModel.findByIdAndUpdate(
            id,
            {
                ...req.body,
            },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "product not found!" })
        }
        res.json({
            message: "product updated successfully",
            updatedProduct: updatedProduct,
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getProducts, getProductById, deleteProduct, addNewData, updateData };
*/