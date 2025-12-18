const Product=require("../models/Product")
const getProducts=async(req,res)=>
{
    const products=await Product.find()
    if(products)
    {
        res.json(products)
    }
    else{
        res.status(404).json({error:"Products not Found"})
    }
}
const getProductsById=async(req,res)=>
{
    const products=await Product.find()
    const product=products.find((p)=>
    {
         return p.id===parseInt(req.params.id)
         
    })
    if(product)
    {
        res.json(product)
    }
    else{
        res.status(404).json({error:"Product Not found"})
    }
}

const deleteItem=async (req, res) => {
  const id = Number(req.params.id);
  try {
    const deleted = await Product.findOneAndDelete({ id });
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const postItem=async(req,res)=>
{   
    try
    {const{name,imageurl,originalPrice,sellingPrice,category}=req.body
    const product=await Product.create({name,imageurl,originalPrice,sellingPrice,category})
    res.status(201).json({message:"Product Added Successfully !!"})}
    catch(err)
    {
        res.status(400).json({error:err.message})
    }
}

module.exports={postItem,deleteItem,getProducts,getProductsById}