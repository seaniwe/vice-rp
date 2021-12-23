const { Account } = require('../db/models')
var hash = require('md5')
global.Account = Account
// function test(login) {
//     Account.create({
//         login,
//         password: 'seaniwe'
//     })
// }

// test('seaniwe')

var authorization = {
    auth: async (player, login, password) => {
        if (player.online == true) return
        var account = await Account.findOne({
            where: {
                login: login,
                password: hash(password),
                socialClub: player.socialClub
            }
        })

        if(account.login != login) return console.log('Неверный логин')
        if(account.password != hash(password)) return console.log('Неверный password')

        player.call('client:auth.register-result')
        player.position = new mp.Vector3(-425.517, 1123.620, 325.8544)
        player.online = true
    },

    register: async (player, login, email, password) => {
        console.log(player.serial)
        var account = await Account.findOne({ where: { login: login, email: email, socialClub: player.socialClub } });
        if (account) {
            if (account.login == login) {
                return console.log('Логин заннят')
            }
            if (account.socialClub == player.socialClub) {
                return console.log('Ваш сошиал уже зареган')
            }
            if (account.email == email) {
                return console.log('Почта зарезестрирована на другой аккаунт')
            }
        }
        player.account = Account.create({
            login: login,
            password: hash(password),
            email: email,
            socialClub: player.socialClub,
            serial: player.serial,
            regIp: player.ip,
            lastIp: player.ip,
        })

        player.call('client:auth.register-result')
        player.position = new mp.Vector3(-425.517, 1123.620, 325.8544)
        player.online = true
    }
}

mp.events.add({
    'server:auth.login': (player, login, password) => {
        authorization.auth(player, login, password)
    },

    'server:auth.register': (player, login, email, password) => {
        authorization.register(player, login, email, password)
    }
})

