"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSequelizeInstance = void 0;
const sequelize_1 = require("sequelize");
let sequelizeInstance = null;
async function loadSequelize(secret) {
    const { username, password, engine, host, port, dbInstanceIdentifier } = secret;
    const newSequelizeInstance = new sequelize_1.Sequelize({
        database: dbInstanceIdentifier,
        username,
        password,
        host: host,
        port,
        dialect: engine,
        pool: {
            max: 2,
            min: 0,
            idle: 0,
            acquire: 3000,
            evict: 300000,
        },
    });
    await newSequelizeInstance.authenticate();
    return newSequelizeInstance;
}
async function getSequelizeInstance(secret) {
    if (!sequelizeInstance) {
        sequelizeInstance = await loadSequelize(secret);
    }
    else {
        sequelizeInstance.connectionManager.initPools();
        if (sequelizeInstance.connectionManager.hasOwnProperty('getConnection')) {
            delete sequelizeInstance.connectionManager.getConnection;
        }
    }
    return sequelizeInstance;
}
exports.getSequelizeInstance = getSequelizeInstance;
//# sourceMappingURL=db.js.map