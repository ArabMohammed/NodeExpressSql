module.exports=(sequelize,DataTypes)=>{

    const Review = sequelize.define("review",{
       
        rating:{
            type:DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 5
            }
        },
        description:{
            type:DataTypes.TEXT,
        }
    })

    return Review
}