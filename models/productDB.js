import mysql2 from 'mysql2'
import {config} from 'dotenv'
import {pool} from '../config/config.js'
config()

const getProducts = async()=>{
    const[result] = await pool.query(`
    SELECT * FROM
    products
    `)
    return result
}
const getProduct = async(prodID) =>{
    const [result] = await pool.query(`
    SELECT *
    FROM products
    WHERE prodID = ?
    `,[prodID])
    return result
}

const addProduct = async(name,description,price,image)=>{
    await pool.query(`
    INSERT INTO products (name,description,price,image) VALUES (?,?,?,?)
    `,[name,description,price,image])
}

const editProduct = async(name, description, price,prodID)=>{
    const [item] = await pool.query(`
        UPDATE products
        SET name=?,description=?,price=?
        WHERE prodID = ?
    `,[name, description, price, prodID])
    return item
}
const deleteProduct = async(id) => { // pool helps connect to the database
    const [result] = await pool.query(` 
        DELETE FROM products WHERE (prodID) = (?)
    `,[id])
    return result
}


export {getProducts,getProduct,addProduct,editProduct,deleteProduct}