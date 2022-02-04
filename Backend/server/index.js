// // server/index.js

// const express = require("express");
// const apriori = require('simple-apriori');
// const fi = require('frequent-itemset');

// const PORT = process.env.PORT || 3001;
// const app = express();

// var dataset =[
//     ["Burger","Pizza","Pulao"],
//     ["Burger","Pizza","Biryani"],
//     ["Burger","Pizza"],
//     ["Biryani,Pulao"],
// ];

// let arr=fi(
//     dataset,
//     0.4,                                             //support value
//     true)

// console.log(arr);



// // var support = 20;
// // var confidence = 20;

// // console.log(apriori.getApriori(dataset, support, confidence));


// app.get("/api", (req, res) => {
//     res.json({freqItem: arr});
//   });
  
// app.listen(PORT, () => {
//     console.log(`Server listening on ${PORT}`);
//   });