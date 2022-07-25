const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");
module.exports = {
    "name": "devs",
    "description": "Show a list of devs",
    async execute(interaction){
        var DevList = "";
        developers.forEach(devID => {
            DevList = DevList + `<@${devID}>\n`
        });
		const row = new ActionRowBuilder()
		.addComponents(
			new ButtonBuilder()
				.setLabel('See Staff List')
				.setStyle(ButtonStyle.Link)
				.setURL(`https://bubblez.app/staff`),
		);
        var Help = new EmbedBuilder()
            .setColor("#00cc99")
            .setTitle("Developers")
            .setDescription(DevList)
            .setFooter({ text: ver });
        interaction.reply({ embeds: [Help], ephemeral: true, components: [row] });
    }
}