let sqlite3 = require('sqlite3').verbose();
const DBSOURCE = "db.sqlite";

let db = new sqlite3.Database(DBSOURCE)

const setup = async()=>{
    db.serialize(() => {
        console.log('Connected to the SQLite database.');
        db.run(`CREATE TABLE IF NOT EXISTS Users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            Username text UNIQUE NOT NULL,
            Password text NOT NULL
        )`,(err)=>{
            if(err){
                console.log(err);
            }
        });
        db.run(`CREATE TABLE IF NOT EXISTS Jobs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            Name text NOT NULL,
            Fee text NOT NULL,
            Userid Number NOT NULL
        )`,(err)=>{
            if(err){
                console.log(err);
            }
        });
    });
}

class database {
    static setupDbForDev(){
        setup();
    }

    static all(stmt, params) {
        return new Promise((res, rej) => {
            db.all(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        });
    }
    static get(stmt, params) {
        return new Promise((res, rej) => {
            db.get(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        });
    }

    static run(stmt, params) {
        return new Promise((res, rej) => {
            db.run(stmt, params, (error, result) => {
                if (error) {
                    return rej(error.message);
                }
                return res(result);
            });
        });
    }

    static release(){
        db.serialize(async() => {
            db.run(`DROP table IF EXISTS Users`);
            db.run(`DROP table IF EXISTS Jobs`);
            await setup();
        });
    }
}

       
    

module.exports = database;
