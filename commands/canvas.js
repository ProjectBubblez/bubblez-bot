const {
    MessageEmbed
} = require("discord.js");
module.exports = {
    "name": "canvas",
    "description": "Show the current canvas",
    async execute(interaction){
        let canvastext = "";
        Object.keys(canvas).forEach(y => {
            Object.keys(canvas[y]).forEach(x => {
                canvastext = canvastext + `${canvas[y][x]}`;
            })
            canvastext = canvastext + "\n";
        })
        let canvasEmbed = new MessageEmbed();
        canvasEmbed.setDescription(canvastext);
        canvasEmbed.setTitle("Public Canvas");
        canvasEmbed.setColor("#00cc99");
        canvasEmbed.setFooter(ver);
        interaction.reply({ embeds: [canvasEmbed] });
    }
}