const {
    MessageEmbed
} = require("discord.js");
const fs = require('fs');
module.exports = {
    "name": "leavevc",
	"aliases": [
        'lvc'
    ],
    "description": "leave VC",
    execute(message, args){
        if(!developers.includes(message.author.id)){
            message.channel.send("You don't have enough permissions")
            return;
        }
		const channel = bot.channels.cache.get(vcid);
		channel.leave()
    }
}