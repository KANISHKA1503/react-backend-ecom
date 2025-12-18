const express=require("express")
const {postItem,deleteItem,getProducts,getProductsById}=require("../controller/productsController")
const router=express.Router();

router.get('/',getProducts)
router.get("/:id",getProductsById)
router.delete('/:id',deleteItem)

router.post('/',postItem)
module.exports=router
// router.get('/',(req,res)=>
// {
//    const products=fs.readFileSync("./data/products.json")
//    res.json(JSON.parse(products)) 
// })
// router.get("/:id",(req,res)=>
// {
//     const products=fs.readFileSync("data/products.json")
//     const productsJson=JSON.parse(products)
//     const product=productsJson.find((p)=>
//     {
//          return p.id===parseInt(req.params.id)
         
//     })
//     if(product)
//     {
//         res.json(product)
//     }
//     else{
//         res.status(404).json({error:"Product Not found"})
//     }


// })
// router.delete('/:id',(req,res)=>
// {
//     const products=fs.readFileSync("data/products.json")
//     const updateProducts=JSON.parse(products).filter((p)=>
//     {
//         return p.id !==parseInt(req.params.id)
//     })
//    fs.writeFileSync("data/products.json",JSON.stringify(updateProducts,null,2));
//    res.status(200).json({message:"Product Deleted successfully"}) 
// })

// router.post('/',(req,res)=>
// {
//     const product=JSON.parse(fs.readFileSync("data/products.json"))
//     const newProduct={
//         id:product[product.length-1].id+1,
//         name:req.body.name,
//         imageurl:req.body.imageurl,
//         sellingPrice:req.body.sellingPrice,
//         originalPrice:req.body.originalPrice,
//         category:req.body.category
//     }
//     const updateProduct=[...product,newProduct]
//     fs.writeFileSync('data/products.json',JSON.stringify(updateProduct,null,2));
//     res.status(201).json({message:"Product added Successfully"})
// })
