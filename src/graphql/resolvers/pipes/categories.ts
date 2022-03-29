export const categories = [
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
		$subtract:[
               {$first: "$maxPrice.price"},
               {$first: "$minPrice.price"},
		]  
  }
}
},
	{
		$project: {
			prices: {
				  $size: "$prices"
			},
      startPrice: "$startPrice",
      endPrice: "$endPrice",
      category: "$category",
      sub: "$sub",
      _id : "$_id"
		}	
	},{
		$group:{
		 	_id:"$category" ,
			totalValueChanges : {
				$sum : "$sub"
			},
			totalCountChanges: {
				$sum: "$prices"
			},
			totalStartValue: {
			  $sum: "$startPrice"
			},
			totalEndValue: {
			  $sum: "$endPrice"
			},
	    totalProducts: {
	      $sum: 1
	    }
		}
	}
]