const express = require("express");
const {addToCart,getCart}= require("../controller/cartController");
const router = express.Router();

router.get("/",getCart)
router.post('/',addToCart)
module.exports = router;

// router.get('/',(req,res)=>
// {
//    const products=fs.readFileSync("./data/cart.json")
//    res.json(JSON.parse(products)) 
// })


// router.get("/:id",(req,res)=>
// {
//     const products=fs.readFileSync("data/cart.json")
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
//     const products=fs.readFileSync("data/cart.json")
//     const updateProducts=JSON.parse(products).filter((p)=>
//     {
//         return p.id !==parseInt(req.params.id)
//     })
//    fs.writeFileSync("data/cart.json",JSON.stringify(updateProducts,null,2));
//    res.status(200).json({message:"Product Deleted successfully"}) 
// })


// router.patch('/:id',(req,res)=>
// {
//   const products=fs.readFileSync("data/cart.json")
//     const productsJson=JSON.parse(products)
//     const productIndex=productsJson.findIndex((p)=>
//     {
//          return p.id===parseInt(req.params.id)
         
//     })
//     if(productIndex!==-1)
//     {const updatedProduct = {
//       ...productsJson[productIndex],
//       ...req.body
//     };
//     productsJson[productIndex] = updatedProduct;
//     fs.writeFileSync("data/cart.json", JSON.stringify(productsJson, null, 2));
//     res.status(200).json(updatedProduct);
// }
// else
// {
//     res.status(404).json({ message: "Product Not found" })
// }
// })


// router.post('/',(req,res)=>
// {
//     const product=JSON.parse(fs.readFileSync("data/cart.json"))
//     const newProduct={
//         id:req.body.id,
//         name:req.body.name,
//         imageurl:req.body.imageurl,
//         sellingPrice:req.body.sellingPrice,
//         originalPrice:req.body.originalPrice,
//         category:req.body.category,
//         quantity:req.body.quantity
//     }
//     const updateProduct=[...product,newProduct]
//     fs.writeFileSync('data/cart.json',JSON.stringify(updateProduct,null,2));
//     res.status(201).json({message:"Product added Successfully"})
// })
