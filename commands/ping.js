const {
    EmbedBuilder
} = require("discord.js");
module.exports = {
    "name": "ping",
    "description": "Check the ping to discord",
    async execute(interaction){
        var pingEmbed = new EmbedBuilder()
            .setColor("#00cc99")
            .setTitle("Ping")
            .setDescription(`Pong! ${client.ws.ping ? `The ping is ${Math.round(client.ws.ping)}ms.` : ''}`)
            .setFooter({ text: ver });
        interaction.reply({ embeds: [pingEmbed], ephemeral: true });
    }
}