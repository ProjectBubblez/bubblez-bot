const {
    MessageEmbed
} = require("discord.js");
const fs = require('fs');
module.exports = {
    "name": "joinvc",
	"aliases": [
        'jvc'
    ],
    "description": "Join VC",
    execute(message, args){
        if(!developers.includes(message.author.id)){
            message.channel.send("You don't have enough permissions")
            return;
        }
		const id = args[1];
		global.vcid = id;
		const channel = bot.channels.cache.get(id);
		if (!channel) return message.channel.send("The channel does not exist!");
		channel.join().then(connection => {
			// Yay, it worked!
			message.channel.send("Successfully connected.");
		}).catch(e => {

			// Oh no, it errored! Let's log it to console :)
			console.error(e);
		});
    }
}