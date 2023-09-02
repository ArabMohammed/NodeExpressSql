module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("user", {
       username :{
         type:DataTypes.STRING,
         allowNull:false,
         unique:true
       },
       hashedPassword : {
        type:DataTypes.STRING
       }
      
    })

    return User
}