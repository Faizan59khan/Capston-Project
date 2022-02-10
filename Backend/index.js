const express = require("express");
const aprioriAlgo = require("node-apriori");
var cors = require('cors')

//firebase
var admin = require("firebase-admin");
var serviceAccount = require("./service_document/serviceAccount.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore(); 

//firebase

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());

var frequentItemsets; 


// get collection
const items = db.collection('itemlist');
var itemlist=[];

 async function firestorDB(){
  const snapshot= await items.get();
  const list=snapshot.docs.map((doc)=>doc.data());

  list.forEach((item)=>{                    //settting firebase collection into array of arrays
    let arr=Object.values(item);
    let res=[];
    arr.forEach((val)=>{
     // console.log(val)
      if(val==="Biryani"||val==="Pulao"||val==="Pizza"||val==="Burger"){
          res.push(val);
      }
    })
    itemlist.push(res);
  
   // console.log(arr);
  })
  
 // Execute Apriori with a minimum support of 40%.
var apriori = new aprioriAlgo.Apriori(.4);
console.log(`Executing Apriori...`);

// Returns itemsets 'as soon as possible' through events.
apriori.on('data', function (itemset) {
    // Do something with the frequent itemset.
    var support = itemset.support;
    var items = itemset.items;
    console.log(`Itemset { ${items.join(',')} } is frequent and have a support of ${support}`);
});

// Execute Apriori on a given set of transactions.
apriori.exec(itemlist)
    .then(function (result) {
      // Returns both the collection of frequent itemsets and execution time in millisecond.
       frequentItemsets = result.itemsets;
      var executionTime = result.executionTime;
      console.log(frequentItemsets)
      console.log(`Finished executing Apriori. ${frequentItemsets.length} frequent itemsets were found in ${executionTime}ms.`);
  });
  
}

firestorDB();


  
app.get("/api", async (req, res) => {
    res.json({freqItem: frequentItemsets});
  });

  app.get("/", async (req, res) => {
    res.json({});
  });

  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });