const path = require("path");

const http = require("http");
const mongodb = require("mongodb");
const MongoConnect = require("./utils/database").MongoConnect;

const express = require("express");

const PageNotFound = require("./controllers/404Page");

const app = express();
const sequelize = require("./utils/database");
const Users = require("./models/Users");

app.set("views", "views");
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use('/images', express.static(path.join(__dirname,"images")));

const bodyParser = require("body-parser");

const adminRouter = require("./routes/admin");
const shopRouter = require("./routes/shop");
const authRouter = require("./routes/Auth");
const session = require("express-session");
const mongodbStore = require("connect-mongodb-session")(session);
const getdb = require("./utils/database").getDB;
const multer =require('multer');


// CSRF Imports 
// const csrf = require('csurf');
// const cookieparser = require('cookie-parser')




const URI = "mongodb://127.0.0.1:27017/sessions";


const store = new mongodbStore({
    uri: URI,
    collection: "sessions",
});

// const csrfProtection = csrf();


app.use(
    session({
        secret: "my session ",
        resave: false,
        saveUninitialized: false,
        store: store,
    })
);



// app.use(cookieparser())
const fileFilterPart=(req,file,cb)=>{
    if(file.mimetype=='image/png' || file.mimetype=='image/jpg' || file.mimetype=='image/jpeg')
    {
        cb(null,true)
    }
    else{
        cb(null,false)
    }
}

const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{  cb(null,"images")},
    filename:(req,file,cb)=>{
        
        var name=Math.round((Math.random()*1000000000)).toString()
        cb(null,name+file.originalname)}
})

app.use(multer({storage:fileStorage ,fileFilter:fileFilterPart}).single('imageUrl'))
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, resp, next) => {

    // console.log(req.session);

    if (req.session.user) {

        // console.log(req.session.user);
        const id = req.session.user._id;

        // const db = getdb()
        // db.collection('sessions')

        Users.findById(id)

        .then((user) => {
                // console.log(" username  : ", user.username);

                // console.log(" username  : ", user.email);

                // console.log(" username  : ", user.password);

                // console.log(" username  : ", user.cart);

                // console.log(" username  : ", user._id);


                let nu = new Users(user.username, user.email, user.password, user.cart, user._id);
                // console.log('====================================');
                // console.log(" nu : ", nu);
                req.user = nu;


                // console.log('====================================');


                next();
            })
            .catch((err) => {
                console.log(err);
            });
    } else {
        next();
    }
});

// app.use(csrfProtection);
app.use((req, resp, next) => {

    // resp.locals.c_token = req.csrfToken();


    next();


})
app.use("/admin", adminRouter);

// for main home page
app.use(shopRouter);





app.use(authRouter);

// for page Not
app.use(PageNotFound.pageNotFound);

MongoConnect(() => {
    // Users.findInitialUser()
    //     .then((users) => {
    //         if (users.length > 0) {
    //             //
    //         } else {
    //             const firstUser = new Users("Gulab", "test@test.com", null, null, null);
    //             firstUser.save();
    //         }
    //     })
    //     .catch((err) => {
    //         console.log("Intial user Checking error : ", err);
    //     });

    app.listen("3000");
});
// app.listen(3000)