
var fs = require('fs')

mp.events.addCommand('sptxt', (player, desc) => {
    let pos = player.position;
    fs.appendFileSync("savepos.txt", `x: ${pos.x.toFixed(4)}, y: ${pos.y.toFixed(4)}, z: ${pos.z.toFixed(4)} heading:${player.heading}\n`);
})