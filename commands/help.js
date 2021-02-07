const {
    MessageEmbed
} = require("discord.js");
module.exports = {
    "name": "help",
    "aliases": [
        'h'
    ],
    "description": "Show all commands",
    execute(message, args){
        var commandOrder = [
            'help',
            'support',
			'ping',
            'devs'
        ];
        var commandlist = "";
        commandOrder.forEach(commandName => {
            let command = bot.commands.get(commandName);
            commandlist = commandlist + `**${prefix}${commandName}** | **${command.aliases}** '${command.description}'\n`;
        });
        var Help = new MessageEmbed()
            .setColor("#00cc99")
            .setTitle("Help")
            .addField("Commands", commandlist)
            .setFooter(footer + " | " + ver);
        message.channel.send(Help);
    }
}