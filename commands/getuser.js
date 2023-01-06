const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ApplicationCommandOptionType
} = require("discord.js");
module.exports = {
    "name": "getuser",
    "description": "Get info from a user on bubblez",
    async execute(interaction){
        let shutdownembed = new EmbedBuilder();
        shutdownembed.setTitle("Bubblez Legacy Shutdown");
        shutdownembed.setDescription("Bubblez Legacy was shutdown on the 7th of January 2023.\nFor more information about the shutdown [click here](https://discord.com/channels/408750138526269451/467179137283522562/1059653074735603775).");
        shutdownembed.setColor("#FF0000");
        shutdownembed.setFooter({ text: ver });
        interaction.reply({embeds: [shutdownembed]});
    }
}