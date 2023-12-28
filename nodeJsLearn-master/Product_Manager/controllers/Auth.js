const Users = require("../models/Users");
const getdb = require("../utils/database").getDB;
const mongodb = require("mongodb");
const bcrypt = require("bcrypt");


exports.getAuthLogin = (req, resp, next) => {
    const cookie = req.get("Cookie");
    const session = req.session.isLoggedIn;
    console.log("Session : ", session);

    if (session) {
        // const loggedIn = cookie.trim().split('=')[1];
        resp.render("Auth/login.ejs", {
            title: "login",
            isLoggedIn: session,
            // c_token: req.csrfToken()
        });
    } else {
        const loggedIn = false;
        resp.render("Auth/login.ejs", {
            title: "login",
            isLoggedIn: loggedIn,
            // c_token: req.csrfToken()
        });
    }

    // console.log(" cookie : ", cookie);
    // console.log(" loggedIn : ", loggedIn);

    // resp.render("Auth/login.ejs", { title: "login", isLoggedIn: loggedIn });
};
exports.postAuthLogin = (req, resp, next) => {
    req.isLoggedIn = true;
    const password = req.body.password;

    // console.log("Login details : ", req.body);1
    // .find({ _id: new mongodb.ObjectId("61f7ba82b169145d6a11b84d") })

    const db = getdb();
    db.collection("Users")
        .findOne({ email: req.body.email })
        .then((user) => {
            console.log(" user : ", user);

            if (user) {
                bcrypt.compare(password, user.password).then((matched) => {
                    if (matched) {

                        req.session.user = user;
                        req.session.isLoggedIn = true;
                        resp.redirect("/");

                    } else {
                        console.log("password not matched ");


                        resp.redirect("/login");
                    }

                }).catch((err) => {
                    console.log(err);
                    resp.redirect('/');

                })
            } else {
                console.log("user not found ");

                req.session.user = user;
                req.session.isLoggedIn = false;
                resp.redirect("/login");
            }
        });

    // resp.setHeader('Set-Cookie', 'isLoggedIn=true')
};
exports.logout_user = (req, resp, next) => {
    req.session.destroy();
    resp.redirect("/");
};
exports.getSignUpPage = (req, resp, next) => {

    // console.log(" CSRF Token : ", c_token);
    // const c_token = req.csrfToken();

    // console.log("req token 1 : ", c_token);
    // console.log(" csrf  token : ", req.csrfToken());



    const session = req.session.isLoggedIn;
    if (session) {
        resp.render("Auth/signup.ejs", {
            title: "Sign Up",
            isLoggedIn: isLoggedIn,
            // c_token: req.csrfToken()



        });
    } else {
        resp.render("Auth/signup.ejs", {
            title: "Sign Up",


            isLoggedIn: req.session.isLoggedIn,
            // c_token: req.csrfToken()






        });
    }
};
exports.postSignUp = (req, resp, next) => {
    const data = req.body;
    console.log(req.body);

    const userObject = {
        username: req.body.username,
        email: req.body.email,

        cart: {
            items: [],
        },
    };
    console.log(data);
    const db = getdb();
    db.collection("Users")
        .findOne({ email: data.email })
        .then((user) => {
            if (user) {
                console.log("Already user exsist with this email id ");
                return resp.redirect("/signup");
            } else {

                return bcrypt.hash(req.body.password, 12).then((password) => {
                        console.log(" userobject : ", userObject);

                        const newUser = new Users(
                            userObject.username,
                            userObject.email,
                            password,
                            userObject.cart,
                            null
                        );
                        return newUser.save();
                    })
                    .then((rseult) => {
                        resp.redirect("/login");
                    }).catch((er) => {
                        console.log(err);
                    })
            }
        })
        .catch((err) => {
            console.log("error : ", err);
        });


};