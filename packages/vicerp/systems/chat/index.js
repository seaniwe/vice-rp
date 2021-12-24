
mp.chat = {
	push(player, message) {
		player.call('getMessage.client', [`!{#e6e6e6} ${message}`]); //Можно использовать для чего угодно, например вывод в чат PayDay
	},

	broadcast(player, message) {
		mp.players.forEach((targer) => {
			targer.call('getMessage.client', [`!{#d1271b}${player.name} сообщил: ${message}`])
		})
	},

	playerSay(player, message) {
		mp.players.forEachInRange(player.position, 10, (target) => {
				target.call('getMessage.client', [`!{#e6e6e6} ${player.name}[${player.id}] говорит: ${message}`]);
			}
		);
	}
}

mp.events.add('playerSay.server', (player, message) => {
	mp.chat.playerSay(player, message)
})


mp.events.addCommand('gos', (player, args) => {
	mp.chat.broadcast(player, args)
})