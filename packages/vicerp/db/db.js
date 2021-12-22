const sequelize = require('./models')
const Sequelize = require('sequelize')

global.db = new Sequelize('vicedb', 'root', 'root', {"dialect": "mysql"})

// const Project = db.import(_customer2.default);

mp.events.add('packagesLoaded', async() => {
    await db.sync({force:true})
    await db.authenticate()
})