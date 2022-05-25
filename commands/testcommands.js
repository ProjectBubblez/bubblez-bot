const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
module.exports = {
    "name": "testcommand",
    "description": "this command will be used for many testings of things",
    //"options": [
        //{
            //name: 'username',
            //description: 'The username of the user you want to check',
            //type: 'STRING',
            //required: true
        //}
    //],
    async execute(interaction){
        if(!developers.includes(interaction.user.id)) {
            interaction.reply({ content: "You don't have permission to run this command", ephemeral: true });
            return;
        }
        await interaction.deferReply();
        let userinfo = new MessageEmbed();
            const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('Website')
					.setStyle('LINK')
                    .setURL(`https://bubblez.app/home`),
			);
			userinfo.setDescription("Made with: [bubblez.js](https://www.npmjs.com/package/bubblez.js)");
            interaction.editReply({ embeds: [userinfo], components: [row] });
    }
}
