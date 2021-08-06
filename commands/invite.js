const {
    MessageEmbed
} = require("discord.js");
module.exports = {
    "name": "invite",
    "description": "Invite link",
    async execute(interaction){
        var Inv = new MessageEmbed()
            .setColor("#00cc99")
            .setTitle("Invite")
            .setDescription("[Invite Link](https://discord.com/api/oauth2/authorize?client_id=709745787093123119&permissions=8&scope=bot)")
            .setFooter(ver);
        interaction.reply({ embeds: [Inv], ephemeral: true });
    }
}