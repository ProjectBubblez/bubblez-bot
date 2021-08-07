const {
    MessageEmbed
} = require("discord.js");
module.exports = {
    "name": "support",
    "description": "Send a request to support",
    "options": [
        {
            name: 'message',
            description: 'The message you want to send to support',
            type: 'STRING',
            required: true
        }
    ],
    async execute(interaction){
        var Support = new MessageEmbed()
            .setColor("#ff8c00")
            .setTitle("Support | " + interaction.user.username + "#" + interaction.user.discriminator)
            .addField("User:", "<@" + interaction.user.id + ">")
            .addField("Reason:", interaction.options.getString("message"))
            .setTimestamp()
            .setFooter(ver);
        Support.addField("Channel:", "<#" + interaction.channel.id + ">");
        client.channels.cache.get(config.supportid).send({ content: `<@&${config.staffid}>`, embeds: [Support] });
        interaction.reply({ content: "Message sent to support", ephemeral: true });
    }
}