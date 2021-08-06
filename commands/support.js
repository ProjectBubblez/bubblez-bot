const {
    MessageEmbed
} = require("discord.js");
module.exports = {
    "name": "support",
    "description": "Send a request to support",
    async execute(interaction){
        if(!args[1]){
            var reason = "No reason given.";
        }else{
            var reason = args.slice(1).join(" ");
        }
        let messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null;
        var Support = new MessageEmbed()
            .setColor("#ff8c00")
            .setTitle("Support | " + message.author.username + "#" + message.author.discriminator)
            .addField("User:", "<@" + message.author.id + ">")
            .addField("Reason:", reason)
            .setTimestamp()
            .setFooter(ver);
        if(message.channel.type == "dm"){
            Support.addField("Channel:", "Direct message");
        }else{
            Support.addField("Channel:", "<#" + message.channel.id + ">");
        }
        if (messageAttachment) Support.setImage(messageAttachment);
        bot.channels.cache.get(config.supportid).send(`<@&${config.staffid}>`, Support);
        message.reply("Support message sent to staff, a staff member should be with you soon.")
    }
}