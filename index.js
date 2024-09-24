import express from 'express';
import admin from 'firebase-admin';
import bcrypt from 'bcrypt';
import path from 'path';
import nodemailer from 'nodemailer';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url';
import aws from 'aws-sdk';
import productsRouter from './public/routes/productsRoutes.js';
import dotenv from 'dotenv';
import fs from 'fs';
import userRoutes from './public/routes/userRoutes.js'

// Read the JSON file with fs.readFileSync
const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf-8'));

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

const db = admin.firestore();

// Firebase admin setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('__dirname:', __dirname); // For debugging

// Initialize Express.js
const app = express();

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/users', userRoutes);

// Define route to get products
app.get('/api/products/get-products', (req, res) => {
    const productId = req.query.id; 

    // Find product in the array
    const product = productos.find(p => p.id === productId);

    if (product) {
        res.json(product); // Send product as JSON response
    } else {
        res.status(404).json({ message: 'Product not found' }); // Send 404 error if product doesn't exist
    }
});

// Serve static files from 'public' folder
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

// Route to serve index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'pages/index.html'));
});

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};

connectDB();

// AWS config
dotenv.config();

const region = "region";
const bucketName = "bucket name";
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

aws.config.update({
    region,
    accessKeyId,
    secretAccessKey
});

const s3 = new aws.S3();

// Generate image upload link
async function generateUrl() {
    const date = new Date();
    const id = Math.floor(Math.random() * 10000000000);
    const imageName = `${id}${date.getTime()}.jpg`;

    const params = {
        Bucket: bucketName,
        Key: imageName,
        Expires: 300, // 300 seconds
        ContentType: 'image/jpeg'
    };
    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
    return uploadUrl;
}

// Routes
app.get('/test-firebase', async (req, res) => {
    try {
        const snapshot = await db.collection('products').get();
        const products = snapshot.docs.map(doc => {
            const product = doc.data();
            product.id = doc.id; // Assign the document ID to the 'id' property
            return product;
        });
        res.json(products);
    } catch (error) {
        console.error("Error connecting to Firestore:", error);
        res.status(500).json({ error: "Failed to connect to Firestore" });
    }
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(publicPath, "pages/signup.html"));
});

app.post('/signup', (req, res) => {
    const { name, email, password, number, tac, notification } = req.body;

    if (name.length < 3) {
        return res.json({ 'alert': 'Name must be at least 3 characters long' });
    } else if (!email.length) {
        return res.json({ 'alert': 'Enter your email' });
    } else if (password.length < 8) {
        return res.json({ 'alert': 'Password must be at least 8 characters long' });
    } else if (!number.length) {
        return res.json({ 'alert': 'Enter your phone number' });
    } else if (!Number(number) || number.length < 10) {
        return res.json({ 'alert': 'Invalid number, please enter a valid one' });
    } else if (!tac) {
        return res.json({ 'alert': 'You must agree to our terms and conditions' });
    }

    db.collection('users').doc(email).get()
        .then(user => {
            if (user.exists) {
                return res.json({ 'alert': 'Email already exists' });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        req.body.password = hash;
                        db.collection('users').doc(email).set(req.body)
                            .then(() => {
                                res.json({
                                    name: req.body.name,
                                    email: req.body.email,
                                    seller: req.body.seller,
                                });
                            });
                    });
                });
            }
        });
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(staticPath, "pages/login.html"));
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ message: 'Please fill in all fields' });
    }

    try {
        const userDoc = await db.collection('users').doc(email).get();

        if (!userDoc.exists) {
            return res.json({ message: 'Email is not registered' });
        }

        const userData = userDoc.data();

        bcrypt.compare(password, userData.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Password comparison error' });
            }

            if (isMatch) {
                return res.json({
                    name: userData.name,
                    email: userData.email,
                    seller: userData.seller,
                    message: 'Login successful'
                });
            } else {
                return res.json({ message: 'Incorrect password' });
            }
        });
    } catch (error) {
        console.error('Error finding user:', error);
        return res.status(500).json({ message: 'Login error, please try again' });
    }
});

app.get('/seller', (req, res) => {
    res.sendFile(path.join(staticPath, "pages/seller.html"));
});

app.post('/seller', (req, res) => {
    const { name, about, address, number, tac, legit, email } = req.body;

    if (!name.length || !address.length || !about.length || number.length < 10 || !Number(number)) {
        return res.json({ 'alert': 'Some information is invalid' });
    } else if (!tac || !legit) {
        return res.json({ 'alert': 'You must agree to our terms and conditions' });
    } else {
        db.collection('sellers').doc(email).set(req.body)
            .then(() => {
                db.collection('users').doc(email).update({
                    seller: true
                }).then(() => {
                    res.json(true);
                });
            });
    }
});

app.get('/add-product', (req, res) => {
    res.sendFile(path.join(staticPath, "pages/addProduct.html"));
});

app.get('/add-product/:id', (req, res) => {
    res.sendFile(path.join(staticPath, "pages/addProduct.html"));
});

app.get('/s3url', (req, res) => {
    generateUrl().then(url => res.json(url));
});

app.post('/add-product', (req, res) => {
    const { name, shortDes, des, images, sizes, actualPrice, discount, sellPrice, stock, tags, tac, email, draft, id } = req.body;

    console.log(name, shortDes, des, images, sizes, actualPrice, discount, sellPrice, stock, tags);

    if (!name || !name.length) {
        return res.json({ 'alert': 'Enter product name' });
    } else if (shortDes.length > 100 || shortDes.length < 10) {
        return res.json({ 'alert': 'Short description must be between 10 and 100 characters long' });
    } else if (!des || !des.length) {
        return res.json({ 'alert': 'Enter detailed description about the product' });
    } else if (!images || !images.length) {
        return res.json({ 'alert': 'Upload at least one product image' });
    } else if (!sizes || !sizes.length) {
        return res.json({ 'alert': 'Select at least one size' });
    } else if (
        actualPrice === undefined || 
        discount === undefined || 
        sellPrice === undefined ||
        typeof actualPrice !== 'number' || 
        typeof discount !== 'number' || 
        typeof sellPrice !== 'number'
    ) {
        return res.json({ 'alert': 'You must add pricing' });
    } else if (stock < 20) {
        return res.json({ 'alert': 'You should have at least 20 items in stock' });
    } else if (!tags || !tags.length) {
        return res.json({ 'alert': 'Enter some tags to help rank your product in search' });
    } else if (!tac) {
        return res.json({ 'alert': 'You must agree to our terms and conditions' });
    }

    const docName = id == undefined ? `${name.toLowerCase()}-${Math.floor(Math.random() * 5000)}` : id;

    db.collection('products').doc(docName).set(req.body)
        .then(() => {
            res.json({ 'product': name });
        })
        .catch((err) => {
            console.error('Error uploading product:', err);
            res.status(500).json({ 'alert': 'Error uploading product, try again' });
        });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});