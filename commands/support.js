const {
    MessageEmbed
} = require("discord.js");
module.exports = {
    "name": "support",
    "description": "Send a request to support",
    "hideCommand": false,
    execute(message, args){
        if(!args[1]){
            var reason = "No reason given.";
        }else{
            var reason = args.slice(1).join(" ");
        }

        var Support = new MessageEmbed()
            .setColor("#ff8c00")
            .setTitle("Support | " + message.author.username + "#" + message.author.discriminator)
            .addField("Channel:", "<#" + message.channel.id + ">")
            .addField("User:", "<@" + message.author.id + ">")
            .addField("Reason:", reason)
            .setTimestamp()
            .setFooter(footer + " | " + ver);
        
        bot.channels.cache.get(config.supportid).send(`<@&${config.staffid}>`, Support);
        message.reply("Support message sent to staff, a staff member should be with you soon.")
    }
}