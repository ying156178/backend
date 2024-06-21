// import pool from "../database/database.connection"
// class UsersModel {
//     // constructor(){
//     //     this.database = new pool();
//     // }
//     async getAllUsers() {
//         const connection = await pool.getConnection();
//         const [rows,fields] = await connection.query('SELECT * FROM `user`')
//         connection.release();
//         return rows;
//     }
//     async createUser(user){
//         try{
//             const connection = await pool.getConnection();
//             const query = `Insert into user (name, email, password, gender, age) 
//             values(?,?,?,?,?);`;
//             const {name, email, password, gender, age} =user;
//             const value=[name, email, password, gender, age]
//             await connection.query(query,value)
//             return true
//         } catch(error){
//             throw error
//         }
//     }
//     async updateUser(userId, user){
//         try {
//             const connection = await pool.getConnection();
//             const query = `UPDATE user SET name = ?, email = ?, password = ?`
//         } catch(error){
//             //
//         }
//     }
// }
// export default new UsersModel();

import pool from "../config/database.config"
class UsersModel {
    /* 
    //nếu không khởi tạo đối tượng bên export thì phải thêm constructor
    constructor(){
        this.database = new pool();
    }
    */

    async getUsers() {
        const connection = await pool.getConnection();
        const [rows,fields] = await connection.query('SELECT * FROM users')
        connection.release();
        return rows;
    }

    async getDetailUser(userId){
        try{
            const connection = await pool.getConnection();
            const query = `SELECT * FROM users WHERE UserID = ?`; //? avoid sql injection
            const value = [userId];
            const [rows,fields] = await connection.query(query, value);
            connection.release();
            return rows[0];
        }catch(error){
            throw error;
        }
    }

    async createUser(user){
        try{
            const connection = await pool.getConnection();
            const query = `INSERT INTO users (Email, Pwd, Gender, Age) VALUES (?, ?, ?, ?);`; //? để chống sql injection
            const {Email, Pwd, Gender, Age} = user;
            const value = [Email, Pwd, Gender, Age];
            await connection.query(query, value);
            return true;
        }catch(error){
            throw error;
        }
    }

    async updateUser(userId, user){
        try{
            const connection = await pool.getConnection();
            const query = `UPDATE users SET Email = ?, Pwd = ?, Gender = ?, Age = ? WHERE UserID = ?`; //? để chống sql injection
            const {Email, Pwd, Gender, Age} = user;
            const value = [Email, Pwd, Gender, Age, userId];
            await connection.query(query, value);
            return true;
        }catch(error){
            throw error;
        }
    }

    async deleteUser(userId){
        try{
            const connection = await pool.getConnection();
            const query = `DELETE FROM users WHERE UserID = ?`; //? để chống sql injection
            const value = [userId];
            await connection.query(query, value);
            return true;
        }catch(error){
            throw error;
        }
    }
}

export default new UsersModel();