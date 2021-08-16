const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
module.exports = {
    "name": "devs",
    "description": "Show a list of devs",
    async execute(interaction){
        var DevList = "";
        developers.forEach(devID => {
            DevList = DevList + `<@${devID}>\n`
        });
		const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setLabel('See Staff List')
				.setStyle('LINK')
				.setURL(`https://bubblez.app/staff`),
		);
        var Help = new MessageEmbed()
            .setColor("#00cc99")
            .setTitle("Developers")
            .setDescription(DevList)
            .setFooter(ver);
        interaction.reply({ embeds: [Help], ephemeral: true, components: [row] });
    }
}