const mongodb = require("mongodb");
const res = require("express/lib/response");
const Product = require("../models/product");
const { cookie } = require("express/lib/response");

exports.postProduct = (req, resp, next) => {
    const title = req.body.title;
    const price = req.body.price;
    // const imageUrl = req.body.imageUrl;
   const image=req.file;
   if(image)
   {
const imageUrl=image.path
    console.log( " image ",imageUrl);
    const discription = req.body.discription.trim();
    const id = null;
    // console.log('====================================');
    // console.log("inside posing prod  descrition : ", description);
    // console.log('====================================');

    // const product = new Product(title, price, imageUrl, description, null);
    // product.save();

    // console.log(" hello :  ", req.body.title, " price : ", price, " imageUrl : ", imageUrl, " description : ", description);

    const product = new Product(title, price, imageUrl, discription);
    product.save().then((result) => {
        console.log("SuccesFully added");
    });

    resp.redirect("/");}
};

exports.getAddProduct = (req, resp, next) => {



    // if (cookie) {
    //         const loggedIn = cookie.trim().split('=')[1];
    //         resp.render("Auth/login.ejs", { title: "login", isLoggedIn: loggedIn });
    //     } else {
    //         const loggedIn = false
    //         resp.render("Auth/login.ejs", { title: "login", isLoggedIn: loggedIn });
    //     }

    // const cookie = req.get('Cookie');
    // const loggedIn = cookie.trim().split('=')[1];

    {
        /*
                 resp.sendFile(path.join(__dirname,"../","views","add-products.html"))
               resp.send('<html> <form action ="/admin/add-products" method="POST"><input type="text" name="title"><button type="submit"> Submit</button>  </form></html>')
    
                */
    }
    // const cookie = req.get('Cookie');
    // if (cookie) {
    //     const loggedIn = cookie.trim().split('=')[1];

    //     resp.render("admin/edit-product", { title: "Add Products", edit: false, isLoggedIn: loggedIn });


    // } else {
    //     resp.render("admin/edit-product", { title: "Add Products", edit: false, isLoggedIn: false });
    // }
    const cookie = req.get('Cookie');
    if (req.session.isLoggedIn) {
        const loggedIn = cookie.trim().split('=')[1];

        resp.render("admin/edit-product", { title: "Add Products", edit: false, isLoggedIn: req.session.isLoggedIn });


    } else {
        resp.render("admin/edit-product", { title: "Add Products", edit: false, isLoggedIn: false });
    }



};
exports.getEditProducts = (req, resp, next) => {
    let edit = Boolean(req.query.edit);
    let prodId = req.params.productId;
    let prodId2 = parseFloat(prodId);
    const cookie = req.get('Cookie');
    // if (cookie) {
    //     const loggedIn = cookie.trim().split('=')[1];

    //     Product.fetchProductById(prodId)
    //         .then((prod) => {
    //             console.log("Prod : ", prod);
    //             resp.render("admin/edit-product", {
    //                 title: "edit Products ",
    //                 product: prod,
    //                 edit: edit,
    //                 isLoggedIn: loggedIn
    //             });
    //         })
    //         .catch((err) => {
    //             console.log("ERROR :: ", err);
    //         });

    // } else {

    //     Product.fetchProductById(prodId)
    //         .then((prod) => {
    //             console.log("Prod : ", prod);
    //             resp.render("admin/edit-product", {
    //                 title: "edit Products ",
    //                 product: prod,
    //                 edit: edit,
    //                 isLoggedIn: false
    //             });
    //         })
    //         .catch((err) => {
    //             console.log("ERROR :: ", err);
    //         });

    // }
    if (req.session.isLoggedIn) {
        const loggedIn = cookie.trim().split('=')[1];

        Product.fetchProductById(prodId)
            .then((prod) => {
                console.log("Prod : ", prod);
                resp.render("admin/edit-product", {
                    title: "edit Products ",
                    product: prod,
                    edit: edit,
                    isLoggedIn: req.session.isLoggedIn
                });
            })
            .catch((err) => {
                console.log("ERROR :: ", err);
            });

    } else {

        Product.fetchProductById(prodId)
            .then((prod) => {
                console.log("Prod : ", prod);
                resp.render("admin/edit-product", {
                    title: "edit Products ",
                    product: prod,
                    edit: edit,
                    isLoggedIn: false
                });
            })
            .catch((err) => {
                console.log("ERROR :: ", err);
            });

    }


    // resp.render('admin/edit-product', { title: "Edit Product" })
};
exports.getAdminProducts = (req, resp, next) => {
    // resp.render('admin/products.ejs',{title:'Admin  Products'})
    const cookie = req.get('Cookie');

    // if (cookie) {

    //     const loggedIn = cookie.trim().split('=')[1];


    //     Product.fetchAll().then((prods) => {
    //         const len = prods.length;

    //         resp.render("admin/products.ejs", {
    //             Products: prods,
    //             title: "Admin Products",
    //             len: len,
    //             isLoggedIn: loggedIn
    //         });
    //     });

    // } else {
    //     Product.fetchAll().then((prods) => {
    //         const len = prods.length;

    //         resp.render("admin/products.ejs", {
    //             Products: prods,
    //             title: "Admin Products",
    //             len: len,
    //             isLoggedIn: false
    //         });
    //     });
    // }
    if (req.session.isLoggedIn) {

        const loggedIn = cookie.trim().split('=')[1];


        Product.fetchAll().then((prods) => {
            const len = prods.length;

            resp.render("admin/products.ejs", {
                Products: prods,
                title: "Admin Products",
                len: len,
                isLoggedIn: req.session.isLoggedIn
            });
        });

    } else {
        Product.fetchAll().then((prods) => {
            const len = prods.length;

            resp.render("admin/products.ejs", {
                Products: prods,
                title: "Admin Products",
                len: len,
                isLoggedIn: false
            });
        });
    }
};
exports.PostEditProduct = (req, resp, next) => {
    const product = req.body;
    console.log("Post req", product);



    const prodId = req.body.id;

    const prod = {
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        discription: product.discription,
    }
    console.log("pid : ", prodId);
    Product.updateById(prodId, prod).then((updateResult) => {
        console.log("Update Result : ", updateResult);
        resp.redirect('/admin/products')
    }).catch((err) => {
        console.log(" Update  Error ");
    })


    // resp.redirect('/')
};
exports.delete_Product_Post_Request_Handeler = (req, resp, next) => {
    console.log("Delete Function Call ");
    const requestBody = req.body;
    console.log(" Delete req  : ", requestBody);
    let id = requestBody.id;

    // Product.deleteProductWithId(id, () => {
    //     // alert("delete operation performed ")

    // resp.redirect("/");
    // });

    Product.deleteProductById(id).then((output) => {
        console.log("Product Delete Call Output : ", output);
        resp.redirect("/");
    }).catch((err) => {
        console.log("Product Delete Call Error : ", err);

    })

};