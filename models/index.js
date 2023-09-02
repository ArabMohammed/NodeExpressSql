const dbConfig=require('../config/dbConfig.js')

const {Sequelize,DataTypes} = require('sequelize');

const sequelize = new Sequelize(
        dbConfig.DB,
        dbConfig.USER,
        dbConfig.PASSWORD,{
            host:dbConfig.HOST,
            dialect:dbConfig.dialect,
            operatorsAliases:false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire:dbConfig.pool.acquire,
            idle:dbConfig.pool.idle   
        }
    }

)
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully to postresDB.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
// model synchronisation 
/*

User.sync() // create table if 
not exist and does nothing if exist

User.sync({ force: true })// This creates the 
table,dropping it first if it already existed

User.sync({ alter: true })//This checks what 
is the current state of the table in the 
database (which columns it has, 
what are their data types, etc), 
and then performs the necessary changes 
in the table to make it match the model

*/
const db={}
    db.Sequelize=Sequelize
    db.sequelize=sequelize
    db.products=require('./productModel.js')(sequelize,DataTypes)
    db.reviews=require('./reviewModel.js')(sequelize,DataTypes)

    db.sequelize.sync({ alter: true }).then(()=>{
        console.log('yes re-sync done !')
    })

// 1 to many relationship

db.products.hasMany(db.reviews,{
     foreignKey :{
        name :  'productId',
     }
})

db.reviews.belongsTo(db.products,{
    foreignKey: {
        name: 'productId'
    }
})

module.exports=db