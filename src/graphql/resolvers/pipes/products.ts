import { Products } from "../../../mongo";


export const productsWithFilter =  (term?: string ) => [

  {
    $project:  {
  _id: "$_id",
  goodName :"$goodName",
  offer:"$offer",
  actual:"$actual",
  shopName :"$shopName",
  link:"$link",
  category:"$category",
  prices: "$prices",
  maxPrice: {
     $filter: {
       input: "$prices",
       as: "item",
       cond: { $eq: [ "$$item.date", {$max:"$prices.date"} ] }
    }
  },
  minPrice: {
     $filter: {
       input: "$prices",
       as: "item",
       cond: { $eq: [ "$$item.date", {$min:"$prices.date"} ] }
    }
  },
  
 }
},
{
  $project:{
  _id: "$_id",
  goodName :"$goodName",
  offer:"$offer",
  actual:"$actual",
  shopName :"$shopName",
  link:"$link",
  category:"$category",
  prices: "$prices",
  sub: {
    $multiply:[
      {
        $divide:[
          {
             $subtract:[
               {$first: "$maxPrice.price"},
               {$first: "$minPrice.price"},
            ]
          },
          {$first: "$minPrice.price"}
        ]
      }
      ,100
    ]
  }
}
},
  term == undefined ? {
      $match: {
          _id : {$exists: true}
        } 
      
  } : {
        $match: Products.where({"goodName": {'$regex': new RegExp(term), $options:'i'}  }).cast(Products) 
  },

]