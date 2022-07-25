const {
    EmbedBuilder
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
        let canvasEmbed = new EmbedBuilder();
        canvasEmbed.setDescription(canvastext);
        canvasEmbed.setTitle("Public Canvas");
        canvasEmbed.setColor("#00cc99");
        canvasEmbed.setFooter({ text: `${ver} | x: across the canvas, y: down the canvas` });
        interaction.reply({ embeds: [canvasEmbed] });
    }
}