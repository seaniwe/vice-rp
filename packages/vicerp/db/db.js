const {sequelize} = require('./models')
const Sequelize = require('sequelize')

global.db = new Sequelize('vicedb', 'root', 'root', {"dialect": "mysql"})


mp.events.add('packagesLoaded', async() => {
    await db.authenticate().then(result  => {
        console.log(`[Sequelize] connected`)
    }).catch(e => {
        console.log(e)
    })
    sequelize.sync({ alter: true })
})