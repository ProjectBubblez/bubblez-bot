const {
    MessageEmbed
} = require("discord.js");
module.exports = {
    "name": "invite",
    "aliases": [
        'inv'
    ],
    "description": "Invite link",
    execute(message, args){
        var Inv = new MessageEmbed()
            .setColor("#00cc99")
            .setTitle("Invite")
            .setDescription("[Invite Link](https://discord.com/api/oauth2/authorize?client_id=709745787093123119&permissions=8&scope=bot)")
            .setFooter(ver);
        message.channel.send(Inv);
    }
}