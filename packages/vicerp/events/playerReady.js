mp.world.weather = 'XMAS'
mp.world.time.hour = 22

mp.events.add('player.joined', (player) => {
    player.dimension = player.id + 10000
    player.call('mp.player.init')
})