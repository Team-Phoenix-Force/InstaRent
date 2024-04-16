const express = require('express');
const cors = require('cors');
const app = express();
const body = require('body-parser');
const mysql = require('mysql');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const { Server } = require("socket.io");
const http = require("http");

const db = mysql.createConnection(
    {
        host: "localhost",
        port: 3410,
        user: "root",
        password: "Ramesh208#!",
        database: "rent360"
    }
);

app.use(cors(
    {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
        credentials: true
    }
));
app.use(cookieParser());
app.use(body.json());
app.use(body.urlencoded({ extended: true }));
app.use(express.json());

const httpServer = app.listen(7000, 'localhost', () => {
    console.log("Server is running on http://localhost:7000/");
});

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});


const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({Message: "we need token please provide it."})
    }
    else {
        jwt.verify(token, "our-secret-key", (err, decode) => {
            if (err) {
            return res.json({Message: "Authentication error"})
            }
            else {
                req.name = decode.name;
                req.userid = decode.userid;
                next();
            }
        })
    }
} 

app.get('/', verifyUser, (req, res) => {
    return res.json({status: true, name: req.name, userid:req.userid})
})

app.post('/register', (req, res) => {
    const sqlCheck = 'SELECT * FROM users WHERE userid = ? or email = ?';
    const valuesCheck = [req.body.userid, req.body.email];

    db.query(sqlCheck, valuesCheck, (err, data) => {
        if (err) {
            console.error(err);
            return res.json({ message: "Error creating user. Try later", status: false });
        }

        if (data.length > 0) {
            return res.json({ message: "Username or email already exists!", status: false, data });
        } else {
            const sql = 'INSERT INTO users (userid, name, email, password, phone) VALUES (?,?,?,?,?)';
            const values = [
                req.body.userid,
                req.body.name,
                req.body.email,
                req.body.password,
                req.body.phone
            ];

            db.query(sql, values, (insertErr, insertData) => {
                if (insertErr) {
                    console.error(insertErr);
                    return res.json({ message: "Error creating user. Try later", status: false });
                }

                console.log(insertData);
                return res.json({ message: "User created!", status: true, data: insertData });
            });
        }
    });
});


app.post('/login', (req, res) => {
    const sqlCheck = 'SELECT * FROM users WHERE userid = ? and password = ?';
    const valuesCheck = [req.body.userid, req.body.password];

    db.query(sqlCheck, valuesCheck, (err, data) => {
        if (err) {
            console.error(err);
            return res.json({ message: "Error logging in. Try later", status: false });
        }

        if (data.length > 0) {
            const name = data[0].name;
            const userid = data[0].userid;
            const token = jwt.sign({ name,userid }, "our-secret-key", { expiresIn: "1d" });
            res.cookie('token', token);
            return res.json({ message: "logging in..", status: true, name:name, userid:userid});
        } else {
            return res.json({ message: 'Bad credentials', status: false, data });
        }
    });
});


app.get("/logout", (req, res) => {
    res.clearCookie('token');
    return res.json({ status: true });
})

app.post("/products", (req, res) => {
    const sqlCheck = "SELECT * FROM product";
    db.query(sqlCheck, (err, data) => {
     if (err) {
            console.error(err);
            return res.json({ message: "Error getting products in. Try later", status: false });
        }
     else {
         return res.json(data);
        }
    })
})

app.post("/addProduct", (req, res) => {
    const sqlCheck = "INSERT INTO product (title, description, price, seller_mobile_number, product_image_url, address, userid) VALUES (?,?,?,?,?,?,?)";
    const price = Number(req.body.price)
    const valuesCheck = [req.body.title, req.body.description, price, req.body.seller_mobile_number, req.body.product_image_url, req.body.address, req.body.userid];
    db.query(sqlCheck, valuesCheck, (insertErr, insertData) => {
                if (insertErr) {
                    console.error(insertErr);
                    return res.json({ message: "Error creating ad. Try later", status: false });
                }

                console.log(insertData);
                return res.json({ message: "Product posted!", status: true, data: insertData });
            });
})

app.post("/products/product", (req, res) => {
    const sqlCheck = "SELECT * FROM product where id=?";
    const valuesCheck = req.body.id;

    db.query(sqlCheck, valuesCheck, (err, data) => {
        if (err) {
            console.error(err);
            return res.json({ message: "Error getting products in. Try later", status: false });
        }

        if (data.length > 0) {
            console.log(data);
            return res.json({ data });
        } else {
            data = []
            return res.json({ data });
        }
    });
})

app.post("/filteredproducts", (req, res) => {
    const sqlCheck = "SELECT * FROM product WHERE title LIKE ? OR title LIKE ? OR title LIKE ? OR description LIKE ? OR description LIKE ? OR description LIKE ?";
    const valuesCheck = [
        `%${req.body.category}%`,
        `%${req.body.category}`,
        `${req.body.category}%`,
        `%${req.body.category}%`,
        `%${req.body.category}`,
        `${req.body.category}%`
    ];

    db.query(sqlCheck, valuesCheck, (err, data) => {
        if (err) {
            console.error(err);
            return res.json({ message: "Error getting products. Try later", status: false });
        }

        if (data.length > 0) {
            console.log(data);
            console.log('yes');
            return res.json( data );
        } else {
            data = [];
            return res.json({ data });
        }
    });
});

app.post("/showMyProducts", (req, res) => {
    const sqlCheck = "SELECT * FROM product WHERE userid=?";
    const valuesCheck = [
        req.body.userid
    ];

    db.query(sqlCheck, valuesCheck, (err, data) => {
        if (err) {
            console.error(err);
            return res.json({ message: "Error getting products. Try later", status: false });
        }

        if (data.length > 0) {
            console.log(data);
            console.log('yes');
            return res.json( data );
        } else {
            data = [];
            return res.json({ data });
        }
    });
});


app.post("/showWishlist", (req, res) => {
    const sqlCheck = "SELECT * FROM wishlist where userid=?";
    const valuesCheck = [
        req.body.userid
    ];

    db.query(sqlCheck, valuesCheck, (err, data) => {
        if (err) {
            console.error(err);
            return res.json({ message: "Error getting products. Try later", status: false });
        }

        if (data.length > 0) {
            let a = [];
            let i = 0;
            while (i < data.length) {
                a.push(data[i].id)
                i+=1;
            }
            const sqlCheck2 = "SELECT * FROM product WHERE id IN (?)"
            const valuesCheck2 = [a]
            db.query(sqlCheck2, valuesCheck2, (err, data2) => {
                return res.json(data2);
            });
            
        } else {
            data = [];
            return res.json({ data });
        }
    });
});

app.post('/addWish', (req, res) => {
    const sqlCheck = "INSERT INTO wishlist (userid, id) VALUES (?,?)";
    const valuesCheck = [req.body.userid, req.body.id];
    const sqlCheck2 = "SELECT * FROM wishlist where userid=? and id=?";
    const valuesCheck2 = [req.body.userid, req.body.id];
    let object = false;
    db.query(sqlCheck2, valuesCheck2, (err, data) => {
        if (err) {
            console.error(err);
            return res.json({ message: "Error getting products details. Try later", status: false });
        }

        if (data.length > 0) {
            object = true;
        }

        db.query(sqlCheck, valuesCheck, (insertErr, insertData) => {
            if (insertErr) {
                console.log(insertErr);
                return res.json({ message: "Error adding product to wishlist", status: false });
            }

            if (object) {
                const sqlDelete = "DELETE FROM wishlist WHERE userid = ? AND id = ?";
                const valuesDelete = [req.body.userid, req.body.id];
                db.query(sqlDelete, valuesDelete, (deleteErr, deleteData) => {
                    if (deleteErr) {
                        console.log(deleteErr);
                        return res.json({ message: "Error removing product from wishlist", status: false });
                    }
                    return res.json({ message: "Product removed from wishlist", status: false });
                });
            } else {
                return res.json({ message: "Product added to wishlist!", status: true, data: insertData });
            }
        });
    });
});

app.post('/checkWish', (req, res) => {
    const sqlCheck = 'SELECT * FROM wishlist WHERE userid=? and id=?';
    const valuesCheck = [req.body.userid, req.body.id];
    db.query(sqlCheck, valuesCheck, (err, data) => {
        if (err) {
            console.error(err);
            return res.json({ message: "Error getting products details. Try later", status: false });
        }

        if (data.length > 0) {
            return res.json( {status:true, data} );
        } else {
            return res.json({status:false, data} );
        }
    });
})


