const {
    EmbedBuilder,
    ApplicationCommandOptionType
} = require("discord.js");
module.exports = {
    "name": "privatecanvas",
    "description": "Show your own or someone else's canvas",
    "options": [
        {
            name: 'user',
            description: 'The user you want to see the canvas of',
            type: ApplicationCommandOptionType.User,
        }
    ],
    async execute(interaction){
        let userid;
        if(interaction.options.getUser("user")){
            if(!Object.keys(privatecanvas).includes(interaction.options.getUser("user").id)){
                interaction.reply({ content: "This user doesn't have a canvas", ephemeral: true });
                return;
            }else{
                userid = interaction.options.getUser("user").id;
            }
        }else{
            if(!Object.keys(privatecanvas).includes(interaction.user.id)){
                interaction.reply({ content: "You don't have a canvas", ephemeral: true });
                return;
            }else{
                userid = interaction.user.id;
            }

        }
        let canvastext = "";
        Object.keys(privatecanvas[userid]).forEach(y => {
            Object.keys(privatecanvas[userid][y]).forEach(x => {
                canvastext = canvastext + `${privatecanvas[userid][y][x]}`;
            })
            canvastext = canvastext + "\n";
        })
        client.users.fetch(userid).then(user => {
            let canvasEmbed = new EmbedBuilder();
            canvasEmbed.setDescription(canvastext);
            canvasEmbed.setTitle(`Private Canvas | ${user.username}`);
            canvasEmbed.setColor("#00cc99");
            canvasEmbed.setFooter({ text: `${ver} | x: across the canvas, y: down the canvas` });
            interaction.reply({ embeds: [canvasEmbed], ephemeral: true });
        });
    }
}