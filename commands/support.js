const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ApplicationCommandOptionType,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} = require("discord.js");
module.exports = {
    "name": "support",
    "description": "Send a request to support (this will open a modal)",
    // "options": [
    //     {
    //         name: 'message',
    //         description: 'The message you want to send to support',
    //         type: ApplicationCommandOptionType.String,
    //         required: false
    //     }
    // ],
    async execute(interaction){
		
        const modal = new ModalBuilder()
            .setCustomId(`support`)
            .setTitle(`Bubblez Support`);
        const textInput = new TextInputBuilder()
            .setCustomId(`support-message`)
            .setLabel(`What is your issue?`)
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true)
            .setMaxLength(1000)
            .setMinLength(10);
        const Text = new ActionRowBuilder().addComponents(textInput);
        modal.addComponents(Text);
        await interaction.showModal(modal);        
        
        
        // const row = new ActionRowBuilder()
		// .addComponents(
		// 	new ButtonBuilder()
		// 		.setLabel('Server Invite')
		// 		.setStyle(ButtonStyle.Link)
		// 		.setURL(`https://discord.gg/Bubblez`),
		// );
        // var Support = new EmbedBuilder()
        //     .setColor("#ff8c00")
        //     .setTitle("Support | " + interaction.user.username + "#" + interaction.user.discriminator)
        //     // .addField("User:", "<@" + interaction.user.id + ">")
        //     // .addField("Reason:", interaction.options.getString("message"))
        //     .addFields([
        //         { name: "User:", value: `<@${interaction.user.id}>` },
        //         { name: "Reason:", value: interaction.options.getString("message") },
        //     ])
        //     .setTimestamp()
        //     .setFooter({ text: ver });
        // // Support.addField("Channel:", "<#" + interaction.channel.id + ">");
        // Support.addFields([
        //     { name: "Channel:", value: `<#${interaction.channel.id}>` },
        //     { name: "Server:", value: `${interaction.guild.name}` },
        // ])
        // client.channels.cache.get(config.supportid).send({ content: `<@&${config.staffid}>`, embeds: [Support] });
        // interaction.reply({ content: "Message sent to support", ephemeral: true, components: [row] });
    }
}