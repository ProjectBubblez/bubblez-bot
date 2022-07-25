const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ApplicationCommandOptionType
} = require("discord.js");
module.exports = {
    "name": "testcommand",
    "description": "this command will be used for many testings of things",
    //"options": [
        //{
            //name: 'username',
            //description: 'The username of the user you want to check',
            //type: ApplicationCommandOptionType.String,
            //required: true
        //}
    //],
    async execute(interaction){
        if(!developers.includes(interaction.user.id)) {
            interaction.reply({ content: "You don't have permission to run this command", ephemeral: true });
            return;
        }
        await interaction.deferReply();
        let userinfo = new EmbedBuilder();
            const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Website')
					.setStyle(ButtonStyle.Link)
                    .setURL(`https://bubblez.app/home`),
			);
			userinfo.setDescription("Made with: [bubblez.js](https://www.npmjs.com/package/bubblez.js)");
            interaction.editReply({ embeds: [userinfo], components: [row] });
    }
}
