
mp.events.addCommand({
    'login': (player, login, password) => {
        if(!login || !password) return
        mp.events.call('server:auth.start', login, password)
    },

    'reg': (player, _, login, password) => {
        // if(!login || !password) return
        console.log(`Логин который должен попасть в БД - ${login}`)
        mp.events.call('server:register.start', login, password)
    }
})

