const {
    MessageEmbed
} = require("discord.js");
module.exports = {
    "name": "ping",
    "aliases": [
        'p'
    ],
    "description": "Check the ping to discord",
    execute(message, args){
        var pingEmbed = new MessageEmbed()
            .setColor("#00cc99")
            .setTitle("Ping")
            .setDescription("Pinging...")
            .setFooter(footer + " | " + ver);
        message.channel.send(pingEmbed).then(pingmsg => {
            pingEmbed.setDescription(`Pong! The message trip took ${(pingmsg.editedTimestamp || pingmsg.createdTimestamp) - (message.editedTimestamp || message.createdTimestamp)}ms. ${bot.ws.ping ? `The ping is ${Math.round(bot.ws.ping)}ms.` : ''}`);
            setTimeout(() => {
                pingmsg.edit(pingEmbed).catch();
            }, 1e3);
        });
    }
}