const mongodb = require("mongodb");
const Product = require("../models/product");
const Users = require("../models/Users");
// const Cart = require("../models/cart.js");

exports.getProducts = (req, resp, next) => {
    {
        /*
                                    resp.sendFile(path.join(__dirname,"../","views","shops.html"));
                                    now mvc 
                                   
                                   const product= Product.fetchProducts();

                                   resp.render('shops',{title:'Shop',Products:product})
                                   
                                   */
    }
    const cookie = req.get("Cookie");

    // if (cookie) {
    //     const loggedIn = cookie.trim().split("=")[1];
    //     Product.fetchAll()
    //         .then((prods) => {
    //             resp.render("shop/product-list.ejs", {
    //                 Products: prods,
    //                 title: "Product -List ",
    //                 isLoggedIn: loggedIn,
    //             });
    //         })
    //         .catch((err) => {
    //             console.log("err: ", err);
    //         });

    //     {}
    // } else {
    //     Product.fetchAll()
    //         .then((prods) => {
    //             resp.render("shop/product-list.ejs", {
    //                 Products: prods,
    //                 title: "Product -List ",
    //                 isLoggedIn: false,
    //             });
    //         })
    //         .catch((err) => {
    //             console.log("err: ", err);
    //         });
    // }
    if (req.session.isLoggedIn) {
        const loggedIn = cookie.trim().split("=")[1];
        Product.fetchAll()
            .then((prods) => {
                resp.render("shop/product-list.ejs", {
                    Products: prods,
                    title: "Product -List ",
                    isLoggedIn: req.session.isLoggedIn,
                });
            })
            .catch((err) => {
                console.log("err: ", err);
            });

        {}
    } else {
        Product.fetchAll()
            .then((prods) => {
                resp.render("shop/product-list.ejs", {
                    Products: prods,
                    title: "Product -List ",
                    isLoggedIn: false,
                });
            })
            .catch((err) => {
                console.log("err: ", err);
            });
    }
};

exports.getIndexProducts = (req, resp) => {
    console.log(" Inside index ");
    const cookie = req.get("Cookie");



    if (req.session.isLoggedIn) {
        const loggedIn = cookie.trim().split("=")[1];
        Product.fetchAll()
            .then((prods) => {
                // console.log(" Fetch All Products  in index routes Result : ", prods);
                resp.render("shop/index.ejs", {
                    title: "Index Products",
                    Products: prods,
                    isLoggedIn: req.session.isLoggedIn,
                    // c_token: req.csrfToken()



                });
            })
            .catch((err) => {
                console.log("Error : ", err);
            });
    } else {
        Product.fetchAll()
            .then((prods) => {
                // console.log(" Fetch All Products  in index routes Result : ", prods);
                resp.render("shop/index.ejs", {
                    title: "Index Products",
                    Products: prods,
                    isLoggedIn: false,
                    // c_token: req.csrfToken()


                });
            })
            .catch((err) => {
                console.log("Error : ", err);
            });
    }
};


exports.getProductDetails = (req, resp, next) => {
    const id = req.params.productId;
    const cookie = req.get("Cookie");
    // if (cookie) {

    //     const loggedIn = cookie.trim().split('=')[1];
    //     Product.fetchProductById(id).then((prod) => {
    //         var len = Object.keys(prod).length;
    //         console.log(" len : ", len);

    //         resp.render("shop/product-details.ejs", {
    //             title: prod.title,
    //             price: prod.price,
    //             description: prod.description,
    //             id: prod.id,
    //             len: len,
    //             imageUrl: prod.imageUrl,
    //             isLoggedIn: loggedIn
    //         });
    //     });

    // } else {
    //     Product.fetchProductById(id).then((prod) => {
    //         var len = Object.keys(prod).length;
    //         console.log(" len : ", len);

    //         resp.render("shop/product-details.ejs", {
    //             title: prod.title,
    //             price: prod.price,
    //             description: prod.description,
    //             id: prod.id,
    //             len: len,
    //             imageUrl: prod.imageUrl,
    //             isLoggedIn: false
    //         });
    //     });
    // }
    if (req.session.isLoggedIn) {
        const loggedIn = cookie.trim().split("=")[1];
        Product.fetchProductById(id).then((prod) => {
            var len = Object.keys(prod).length;
            console.log(" len : ", len);

            resp.render("shop/product-details.ejs", {
                title: prod.title,
                price: prod.price,
                description: prod.description,
                id: prod.id,
                len: len,
                imageUrl: prod.imageUrl,
                isLoggedIn: req.session.isLoggedIn,
                // c_token: req.csrfToken()

            });
        });
    } else {
        Product.fetchProductById(id).then((prod) => {
            var len = Object.keys(prod).length;
            console.log(" len : ", len);

            resp.render("shop/product-details.ejs", {
                title: prod.title,
                price: prod.price,
                description: prod.description,
                id: prod.id,
                len: len,
                imageUrl: prod.imageUrl,
                isLoggedIn: false,
                c_token: req.csrfToken()

            });
        });
    }
};

exports.postCart = (req, resp, next) => {
    let id = req.body.id;
    console.log(" add to cart  post req body  : ", req.body);
    console.log(" req body :  :-> ", req.body);

    id = new mongodb.ObjectId(id);
    Product.fetchProductById(id)
        .then((product) => {
            req.user
                .addToCart(product)
                .then((result) => {
                    console.log("Final result of cart update : ", result);
                    resp.redirect("/cart");
                })
                .catch((err) => {
                    console.log("Final Error of cart update : ", err);
                });
        })
        .catch((err) => {
            console.log("Error in finding product  ///for cart ", err);
        });
};

exports.getCart = (req, resp, next) => {
    // const cookie = req.get('Cookie');

    // if (cookie) {
    //     const loggedIn = cookie.trim().split('=')[1];
    //     console.log(" user ----->", req.user);
    //     req.user
    //         .getCart()
    //         .then((prods) => {
    //             prods.forEach((element) => {
    //                 console.log(" element : ", element);
    //             });

    //             resp.render("shop/cart.ejs", {
    //                 title: "Cart  ",

    //                 products: prods,
    //                 isLoggedIn: loggedIn
    //             });
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });

    // } else {

    //     console.log(" user ----->", req.user);
    //     req.user
    //         .getCart()
    //         .then((prods) => {
    //             prods.forEach((element) => {
    //                 console.log(" element : ", element);
    //             });

    //             resp.render("shop/cart.ejs", {
    //                 title: "Cart  ",

    //                 products: prods,
    //                 isLoggedIn: false
    //             });
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }
    const cookie = req.get("Cookie");

    if (req.session.isLoggedIn) {
        // const loggedIn = cookie.trim().split("=")[1];
        console.log(" user hmm ----->", req.user);
        req.user
            .getCart()
            .then((prods) => {
                prods.forEach((element) => {
                    // console.log(" element : ", element);
                });

                resp.render("shop/cart.ejs", {
                    title: "Cart  ",

                    products: prods,
                    isLoggedIn: req.session.isLoggedIn,
                    // c_token: req.csrfToken()

                });
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        console.log(" user ----->", req.user);
        req.user
            .getCart()
            .then((prods) => {
                prods.forEach((element) => {
                    console.log(" element : ", element);
                });

                resp.render("shop/cart.ejs", {
                    title: "Cart  ",

                    products: prods,
                    isLoggedIn: false,
                    c_token: req.csrfToken()

                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
};
exports.deleteCartItem = (req, resp, next) => {
    let cartid = req.body.id;
    let userId = req.user._id;

    req.user
        .deleteCartItem(cartid, userId)
        .then((result) => {
            console.log(result);
            resp.redirect("/cart");
        })
        .catch((err) => {
            console.log(err);
        });
};
exports.PostplaceOrder = (req, resp, next) => {
    if (req.user.cart.items.length > 0) {
        req.user
            .placeOrder()
            .then((result) => {
                let products = [];
                console.log("Result");
                resp.redirect("/orders");
                // resp.render('shop/order.ejs', { title: "Orders ", products: products })

                console.log(" orders for len > 0");
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        let products = [];
        resp.redirect("/orders");
    }
};
exports.getOrders = (req, resp, next) => {
    let products = [];
    // const cookie = req.get('Cookie');

    // if (cookie) {
    //     const loggedIn = cookie.trim().split('=')[1];
    //     Users.getOrders()
    //         .then((orders) => {
    //             console.log(orders);

    //             resp.render("shop/order.ejs", { title: "Orders ", products: orders, isLoggedIn: loggedIn });
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // } else {
    //     Users.getOrders()
    //         .then((orders) => {
    //             console.log(orders);

    //             resp.render("shop/order.ejs", { title: "Orders ", products: orders, isLoggedIn: false });
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }
    const cookie = req.get("Cookie");

    if (req.session.isLoggedIn) {
        const loggedIn = cookie.trim().split("=")[1];
        req.user.getOrders(req.user._id)
            .then((orders) => {
                console.log(orders);

                resp.render("shop/order.ejs", {
                    title: "Orders ",
                    products: orders,
                    isLoggedIn: req.session.isLoggedIn,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        Users.getOrders()
            .then((orders) => {
                console.log(orders);

                resp.render("shop/order.ejs", {
                    title: "Orders ",
                    products: orders,
                    isLoggedIn: false,
                    c_token: req.csrfToken()

                });
            })
            .catch((err) => {
                console.log(err);
            });
    }
};