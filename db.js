const Sequelize = require("sequelize");
const sequelize = new Sequelize(
   'node',
   'node',
   'node',
    {
      host: 'localhost',
      dialect: 'postgres'
    }
  );
  /****
   * dialect: ‘mysql’, ‘mariadb’, ‘postgres’, ‘mssql’.
  */
  sequelize.authenticate().then(() => {
      console.log('Connection has been established successfully to postresDB.');
   }).catch((error) => {
      console.error('Unable to connect to the database: ', error);
   });

module.exports=sequelize