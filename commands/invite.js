const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
module.exports = {
    "name": "invite",
    "description": "Invite link",
    async execute(interaction){
		const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
				.setLabel('Invite')
				.setStyle('LINK')
				.setURL(`https://discord.com/api/oauth2/authorize?client_id=709745787093123119&permissions=8&scope=bot`),
		);
        var Inv = new MessageEmbed()
            .setColor("#00cc99")
            .setTitle("Invite")
            .setDescription("Thank you for inviting the bot to your server.")
            .setFooter(ver);
        interaction.reply({ embeds: [Inv], ephemeral: true, components: [row] });
    }
}