import 'mysql2'; // Force Vercel to bundle mysql2 for Sequelize
import mysql from 'mysql2/promise';
import { Sequelize } from 'sequelize';
import accountModel from '../accounts/account.model';
import refreshTokenModel from '../accounts/refresh-token.model';

const db: any = {};
export default db;

initialize();

async function initialize() {
 const host = process.env.DB_HOST || 'localhost';
 const port = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306;
 const user = process.env.DB_USER || 'root';
 const password = process.env.DB_PASSWORD || '';
 const database = process.env.DB_NAME || 'node_mysql_api';
 const connection = await mysql.createConnection({ 
     host, 
     port, 
     user, 
     password,
     ssl: { rejectUnauthorized: false } 
 });
 await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
 const sequelize = new Sequelize(database, user, password, { 
     dialect: 'mysql',
     host,
     port,
     dialectOptions: {
         ssl: {
             rejectUnauthorized: false
         }
     }
 });
 db.Account = accountModel(sequelize);
 db.RefreshToken = refreshTokenModel(sequelize);
 db.Account.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
 db.RefreshToken.belongsTo(db.Account);
 await sequelize.sync();
}
