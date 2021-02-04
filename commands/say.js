const {
    MessageEmbed
} = require("discord.js");
module.exports = {
    "name": "say",
    "description": "Say something",
    "hideCommand": true,
    execute(message, args){
        if (!developers.includes(message.author.id)) {
            var Default = new MessageEmbed()
                .setColor("RED")
                .setAuthor("Bubblez", bot.user.avatarURL)
                .setDescription("Only The Owners Can Use This Command");
            message.channel.send(Default);
            console.log(`User ${message.author.username}#${message.author.discriminator} tried to use the Say command`);
        } else {
            var id = args[1];
            var text = args.slice(2).join(" ");
            var client = message.channel.client;
		    message.delete();
            client.users.fetch(id).then(user => {
                user.send(text);
                console.log("User " + message.author.username + " used the say command on server, " + message.guild.name + " || Sent '" + text + "' to " + user.username);
            });
        }
    }
}