const {
    MessageEmbed
} = require("discord.js");
module.exports = {
    "name": "devs",
    "aliases": [
        'd'
    ],
    "description": "Show a list of devs",
    execute(message, args){
        var commandlist = "";
        bot.commands.forEach(command => {
            if(command.hideCommand == false){
                commandlist = commandlist + `${prefix}${command.name} '${command.description}'\n`;
            }
        })
        var Help = new MessageEmbed()
            .setColor("#00cc99")
            .setTitle("Help")
            .addField("Commands", commandlist)
            .setFooter(footer + " | " + ver);
        message.channel.send(Help);
    }
}