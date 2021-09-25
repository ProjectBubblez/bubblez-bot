const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
module.exports = {
    "name": "testcommand",
    "description": "this command will be used for many testings of things",
    "developerOnly": true,
    //"options": [
        //{
            //name: 'username',
            //description: 'The username of the user you want to check',
            //type: 'STRING',
            //required: true
        //}
    //],
    async execute(interaction){
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
