const {
    MessageEmbed
} = require("discord.js");
module.exports = {
    "name": "help",
    "description": "Show all commands",
    async execute(interaction){
        var commandOrder = [
            'help',
            'support',
            'invite',
            'getuser',
            'canvas',
            // 'publicdraw',
            'privatecanvas',
            'privatedraw',
			'ping',
            'devs'
        ];
        var commandlist = "";
        commandOrder.forEach(commandName => {
            let command = client.commands.get(commandName);
            commandlist = commandlist + `**/${commandName}** | '${command.description}'\n`;
        });
        var Help = new MessageEmbed()
            .setColor("#00cc99")
            .setTitle("Help")
            .addField("Commands", commandlist)
            .setFooter(ver);
        interaction.reply({ embeds: [Help], ephemeral: true });
    }
}