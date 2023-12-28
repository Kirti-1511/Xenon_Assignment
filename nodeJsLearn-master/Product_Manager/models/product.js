{
    /*
    const { error } = require("console");
const Cart = require('./cart')


const fs = require("fs");
const { dirname } = require("path");
const path = require("path");

var product = [];

module.exports = class Product {
    constructor(title, price, imageUrl, description, id) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.id = id;
    }
    save() {

        //  if the current id is not  null i.e ( threre is some exsisiting id ) then only we will create the new product 
        if (this.id) {
            const p = path.join(path.dirname(process.mainModule.filename),
                'data',
                'products.json'
            )

            fs.readFile(p, (err, fileContent) => {
                let products = [];


                if (err) {
                    console.log(err);

                } else {
                    products = JSON.parse(fileContent)
                }
                const exsistingFileIndex = products.findIndex((element) => {
                    return this.id === element.id
                })
                products[exsistingFileIndex] = this;
                fs.writeFile(p, JSON.stringify(products), (writingError) => {
                    console.log("Error inside Writing file  for exsisting Product :: ", writingError);
                })


            })


        }
        //  product is  created for the first time  
        else {
            this.id = (Math.random() * 10000000000000000).toString();


            const p = path.join(
                path.dirname(process.mainModule.filename),
                "data",

                "products.json"
            );

            fs.readFile(p, (err, fileContent) => {
                // console.log(err);
                let products = [];

                if (!err) {
                    console.log(fileContent);
                    products = JSON.parse(fileContent);
                }

                products.push(this);

                fs.writeFile(p, JSON.stringify(products), (error) => {
                    console.log(error);
                });
            });
        }
    }
    static fetchProducts(cb) {
        let p = path.join(
            path.dirname(process.mainModule.filename),
            "data",
            "products.json"
        );
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb([]);
            }
            cb(JSON.parse(fileContent));
        });

        {
           
                        }
                    }
                    static getDetails(id, cb) {
                        let products = [];
                
                        const p = path.join(
                            path.dirname(process.mainModule.filename),
                            "data",
                            "products.json"
                        );
                        fs.readFile(p, (err, fileContent) => {
                            if (err) {
                                return cb({});
                            } else {
                                products = JSON.parse(fileContent);
                                let productDetails = products.find((element) => element.id === id);
                                cb(productDetails);
                            }
                        });
                    }
                    static getProductFromId(id, cb) {
                        let products = [];
                        let p = path.join(path.dirname(process.mainModule.filename),
                            "data",
                            "products.json"
                        )
                        fs.readFile(p, (err, fileContent) => {
                            if (err) {
                                products = [];
                
                
                            } else {
                                products = JSON.parse(fileContent);
                                // console.log(" checking  all prod ", products);
                                const required = products.find((ele) => {
                                    return ele.id === id
                
                                })
                
                                cb(required)
                
                            }
                
                        })
                
                
                    }
                    static deleteProductWithId(id, cb) {
                        const p = path.join(path.dirname(process.mainModule.filename),
                            'data',
                            'products.json'
                        )
                
                        let products = [];
                
                        fs.readFile(p, (error, fileContent) => {
                
                            if (!error) {
                                products = JSON.parse(fileContent);
                
                            } else {
                                console.log("Error while reading File and deleting it :: ", error);
                            }
                            let prod = products.find((element) => {
                                return element.id === id
                
                            });
                            const price = prod.price;
                
                
                            Cart.deleteProductFromCartWithId(id, price);
                
                
                            const updatedProducts = products.filter((element) => {
                
                                return element.id !== id
                            })
                            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                                if (err) {
                                    console.log("Error while deleting  writing the products ,,which is result we get after  deleting  the element ::->", err);
                                } else {
                                    cb()
                
                                }
                
                            })
                        })
                    }
                    static getProductFromIdForCart(productsInCart, totalPrice, cb) {
                        let products = [];
                        let p = path.join(path.dirname(process.mainModule.filename),
                            "data",
                            "products.json"
                        )
                        console.log("products in Cart :: ", productsInCart);
                
                        let CartProducts = [];
                
                        fs.readFile(p, (err, fileContent) => {
                            if (err) {
                                console.log("error occured while getting cart details ");
                                cb();
                            } else {
                                products = [...JSON.parse(fileContent)];
                                console.log(" all Prod :: ", products);
                
                
                                for (const prod in productsInCart) {
                
                                    let currentProd = productsInCart[prod];
                
                                    const prodId = currentProd.id;
                                    console.log("current prod  : : ", currentProd, " prodId : ", prodId);
                
                                    const req = products.find((ele) => parseFloat(ele.id) === prodId);
                                    console.log("found : : ", req);
                                    CartProducts.push(req)
                
                
                                }
                                console.log("ALL DETAILS OF CART PROD :: ", CartProducts);
                                cb(CartProducts, totalPrice);
                
                
                
                            }
                        })
                
                
                    }
                };
    */
}
const MongoDb = require("mongodb");
const mongodb = require("mongodb");
const getDB = require("../utils/database").getDB;

module.exports = class Product {
    constructor(title, price, imageUrl, discription) {
        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.discription = discription;
    }
    save() {
        // db.collections('products').insertOne(this).
        const db = getDB();
        return db
            .collection("products")
            .insertOne(this)
            .then((result) => {
                console.log(" RESULT : ", result);
            })
            .catch((err) => {
                console.log("error : ", err);
            });
    }
    static fetchAll() {
        const db = getDB();
        return db
            .collection("products")
            .find()
            .toArray()
            .then((prods) => {
                // console.log(" Fetch All Products Result : ", prods);
                return prods;
            })
            .catch((err) => {
                console.log(err);
            });
    }
    static fetchProductById(id) {
        const db = getDB();
        // console.log(" call");
        // console.log(" Id for fetching ", id);

        return db
            .collection("products")
            .find({ _id: new MongoDb.ObjectId(id) })
            .next()
            .then((prod) => {
                console.log(" Products for cart :", prod);
                return prod;
            })
            .catch((err) => {
                console.log("error  ---->: ", err);
            });
    }
    static updateById(prodId, prod) {
        const db = getDB();
        console.log(" new prod : ", prod);
        // const result = db.collection("products")
        //     .updateOne({ _id: new MongoDb.ObjectId(prodId) }, { $set: prod });
        // return result;
        // return db.collection("products").updateOne({ _id: new MongoDb.ObjectId(prodId) }, {  { $set: prod } })
        return db
            .collection("products")
            .updateOne({ _id: new MongoDb.ObjectId(prodId) }, { $set: prod })
            .then((result) => {
                console.log(" update Query result :  ", result);
            })
            .catch((err) => {
                console.log("Quesry err :: ", err);
            });
    }
    static deleteProductById(id) {
        const prodId = new mongodb.ObjectId(id);
        // db.collection('User')
        const db = getDB();
        return db
            .collection("products")
            .deleteOne({ _id: prodId })
            .then((result) => {
                console.log("Delete Result : ", result);
            })
            .catch((err) => {
                console.log("Delete Query Error : ", err);
            });
    }


};