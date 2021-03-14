const {
    MessageEmbed
} = require("discord.js");
module.exports = {
    "name": "canvas",
    "aliases": [
        'c'
    ],
    "description": "Show the current canvas",
    execute(message, args){
        let canvastext = "";
        Object.keys(canvas).forEach(y => {
            Object.keys(canvas[y]).forEach(x => {
                canvastext = canvastext + `${canvas[y][x]}`;
            })
            canvastext = canvastext + "\n";
        })
        let canvasEmbed = new MessageEmbed();
        canvasEmbed.setDescription(canvastext);
        canvasEmbed.setTitle("Public Canvas");
        canvasEmbed.setColor(0x00EEFF);
        canvasEmbed.setFooter(ver);
        message.channel.send(canvasEmbed);
    }
}