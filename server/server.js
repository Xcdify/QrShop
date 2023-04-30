const express = require('express');

const server = express();
const PORT = 8000;
const helmet = require('helmet')
const cors = require('cors')
const db = require('./dbConfig')
const uuid = require('uuid')
const session = require('express-session')
const store = new session.MemoryStore()
const cookieParser = require("cookie-parser")

server.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    store,
    cookie: {
        maxAge: 1000 * 60 * 60 *24
    }
}))
server.use(cors())
server.use(helmet())
server.use(express.json())
server.use(cookieParser())



server.get('/', (req, res) => {
    res.send('Landing page for default server')
})

server.get('/getCat', async (req, res) => {
    // Get all categories
    try {
        const cats = await db('categories')

        for (var i = 0; i < cats.length; i++) {
            cats[i]['products'] = []
            const products = await db('products').where({ 'prodCat': cats[i].catName })
            for (var z = 0; z < products.length; z++) {
                cats[i]['products'].push(products[z].id)
            }

        }
        res.json(cats)
    } catch (err) {
        console.log(err)
    }
})

server.get('/getOrder', async (req, res) => {
    // Get all orders
    try {
        const orders = await db('orders')
        res.json(orders)
    } catch (err) {
        console.log(err)
    }
})


server.get('/getCat/:id', async (req, res) => {
    // Get product by id
    const { id } = req.params
    try {
        const singleCat = await db('categories').where({ id })
        if (singleCat.length === 0) {
            res.status(404).json({ server: 'Product with id: ' + id + ' not found' })
        } else {
            res.status(200).json(singleCat)
        }

    } catch (err) {
        console.log(err)
    }
})

server.get('/getProd/:id', async (req, res) => {
    // Get product by id
    const { id } = req.params
    try {
        const singleProd = await db('products').where({ id })
        if (singleProd.length === 0) {
            res.status(404).json({ server: 'Product with id: ' + id + ' not found' })
        } else {
            res.status(200).json(singleProd)
        }

    } catch (err) {
        console.log(err)
    }
})


server.get('/getProd', async (req, res) => {
    // Get all products
    try {
        const products = await db('products')
        res.status(200).json(products)


    } catch (err) {
        console.log(err)
    }
})

server.get('/getProdCat/:catName', async (req, res) => {
    // Get all products in a cat
    const { catName } = req.params
    try {
        const PordforCat = await db('products').where({ 'prodCat': catName })
        if (PordforCat.length === 0) {
            res.status(404).json({ server: 'Product with id: ' + catName + ' not found' })
        } else {
            res.status(200).json(PordforCat)
        }

    } catch (err) {
        console.log(err)
    }
})

server.post('/postCat', async (req, res) => {
    // Post categories
    const { catName, catDesc, color } = req.body;
    try {

        const addCat = {
            catName: catName,
            catDesc: catDesc,
            color: color
        }
        await db('categories').insert(addCat)
        res.json({ server: 'Category successfully stored' })
    } catch (err) {
        console.log(err)
    }
})
server.post('/postOrder', async (req, res) => {
    // Post Order
    const { name, code, adress, email, number,products } = req.body;
    try {

        const addOrder = {
            name: name,
            code: code,
            adress: adress,
            number: number,
            email: email,
            products: products,

        }
        console.log(addOrder)
        await db('orders').insert(addOrder)
        res.json({ server: 'Order successfully stored' })
    } catch (err) {
        console.log(err)
    }
})
server.put('/updateProdInventory/:id', async (req, res) => {
    const { inventory } = req.body;
    try {
        const oldProd = await db('products').where({ id: req.params.id })

        const specificProd = await db('products').where({ id: req.params.id }).update({
            inventory: inventory
        })

        console.log(oldProd)

        specificProd === 0 ? res.status(404).json({ server: 'Product not found' }) : res.status(200).json({ server: 'Product successfully updated' })
    } catch (err) {
        console.log(err)
    }
})

server.post('/postProd', async (req, res) => {
    // Post product
    const { prodName, prodDesc, price, prodImg, prodCat } = req.body;
    try {

        const addProd = {
            prodName: prodName,
            prodDesc: prodDesc,
            price: price,
            prodImg: prodImg,
            prodCat: prodCat
        }
        await db('products').insert(addProd)
        res.json({ server: 'Product successfully stored' })
    } catch (err) {
        console.log(err)
    }

})

server.put('/updateCat/:id', async (req, res) => {
    // Update a categorie

    const { catName, catDesc, color } = req.body;
    try {
        const oldCat = await db('categories').where({ id: req.params.id })

        const specificCat = await db('categories').where({ id: req.params.id }).update({
            catName: catName,
            catDesc: catDesc,
            color: color
        })

        console.log(oldCat)
        const catProds = await db('products').where({ prodCat: oldCat[0].catName }).update({
            prodCat: catName
        })

        specificCat === 0 ? res.status(404).json({ server: 'Category not found' }) : res.status(200).json({ server: 'Category successfully updated' })
    } catch (err) {
        console.log(err)
    }
})

server.put('/updateProdImg/:id', async (req, res) => {
    // Update a product 
    const { prodName, prodDesc, price, prodImg, prodCat } = req.body;
    try {

        const specificProd = await db('products').where({ id: req.params.id }).update({
            prodName: prodName,
            prodDesc: prodDesc,
            price: price,
            prodImg: prodImg,
            prodCat: prodCat
        })
        specificProd === 0 ? res.status(404).json({ server: 'Category not found' }) : res.status(200).json({ server: 'Product successfully updated' })
    } catch (err) {
        console.log(err)
    }
})

server.put('/updateProdNoImg/:id', async (req, res) => {
    // Update a product 
    const { prodName, prodDesc, price, prodCat } = req.body;
    try {

        const specificProd = await db('products').where({ id: req.params.id }).update({
            prodName: prodName,
            prodDesc: prodDesc,
            price: price,
            prodCat: prodCat
        })
        specificProd === 0 ? res.status(404).json({ server: 'Category not found' }) : res.status(200).json({ server: 'Product successfully updated' })
    } catch (err) {
        console.log(err)
    }
})

server.delete('/deleteCat/:id', async (req, res) => {
    // Delete a category
    const { id } = req.params
    try {

        await db('categories').where({ id }).del()
        res.status(200).json({ server: 'Category successfully deleted' })
    } catch (err) {
        console.log(err)
    }
})

server.delete('/deleteProd/:id', async (req, res) => {
    // Delete a products
    const { id } = req.params
    try {

        await db('products').where({ id }).del()
        res.status(200).json({ server: 'Product successfully deleted' })
    } catch (err) {
        console.log(err)
    }
})

server.get('/getCart', async (req, res) => {
    // Get all carts
    try {
        const carts = await db('carts')
        res.status(200).json(carts)
    } catch (err) {
        console.log(err)
    }
})

server.get('/cart/:id', async (req, res) => {
    const { id } = req.params
    try {
        const cart = await db('carts').where({ id }).first()
        const cartProducts = await db('cart_products').where({ 'cartId': cart.id })
        cart.products = await Promise.all(cartProducts.map( async (product) => {
            const productInfo = await db('products').where({ id: product.productId }).first()
            return {
                cartId: product.cartId,
                productId: product.productId,
                price: product.price,
                quantity: product.quantity,
                prodName: productInfo.prodName,
                prodDesc: productInfo.prodDesc,
                prodImg: productInfo.prodImg,
                inventory: productInfo.inventory,
            }
        }))
        res.status(200).json(cart)
    } catch (err) {
        console.log(err)
    }
})

server.post('/postCart', async (req, res) => {
    // Post cart
    const { products, subtotal } = req.body;
    let cartId = null;
    try {
        const addCart = {
            subtotal: subtotal
        }
        const newCart = await db('carts').insert(addCart)
        if(newCart.length != 0){
            cartId = newCart[0];
            products.forEach(async(product)=> {
                const addCartProduct = {
                    cartId: cartId,
                    productId: product.productId,
                    price: product.price,
                    quantity: product.quantity
                }
                await db('cart_products').insert(addCartProduct)
            })
        }
        console.log(cartId)
        if(cartId != null){
            res.status(200).json({ cartId: cartId, server: 'Cart successfully added' })
        }else{
            res.error({ server: 'Cart not added' })
        }
    } catch (err) {
        console.log(err)
    }
})

server.put('/cart/:id', async (req, res) => {
    // Update a cart 
    const { products, subtotal } = req.body;
    try {
        products.forEach(async(product)=> {
            const cartProducts = await db('cart_products').where({ cartId: req.params.id, productId: product.productId })
            if(cartProducts.length > 0){
                const specificCartProducts = await db('cart_products').where({ cartId: req.params.id, productId: product.productId }).update({
                    quantity: product.quantity
                })
            }else{
                const addCartProduct = {
                    cartId: req.params.id,
                    productId: product.productId,
                    price: product.price,
                    quantity: product.quantity
                }
                await db('cart_products').insert(addCartProduct)
            }
        })
        const specificCart = await db('carts').where({ id: req.params.id }).update({
            subtotal: subtotal
        })
        specificCart === 0 ? res.status(404).json({ server: 'Cart not found' }) : res.status(200).json({ server: 'Cart successfully updated' })
    } catch (err) {
        console.log(err)
    }
})

server.delete('/cart/:cartId/product/:productId', async (req, res) => {
    const { cartId, productId } = req.params
    try {
        await db('cart_products').where({ productId: productId }).del()
        const cartProducts = await db('cart_products').where({ cartId: cartId })
        const subtotal = cartProducts.reduce(function(_this, val) {
            return _this + val.quantity*+val.price
        }, 0);
        await db('carts').where({ id: cartId }).update({
            subtotal: subtotal
        })
        if(cartProducts.length == 0 ){
            await db('carts').where({ id: cartId }).del()
        }
        res.status(200).json({ server: 'Cart successfully deleted' })
    } catch (err) {
        console.log(err)
    }
})


server.listen(PORT, () => console.log('server is running at port: ' + PORT))