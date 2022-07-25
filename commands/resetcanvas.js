const {
    EmbedBuilder
} = require("discord.js");
const fs = require('fs');
module.exports = {
    "name": "resetcanvas",
    "description": "Reset your private canvas",
    async execute(interaction){
        privatecanvas[interaction.user.id] = {};
        let canvasy = 11;
        let canvasx = 12;
        for(var y = 0; y != canvasy; y++){
            privatecanvas[interaction.user.id][y] = {};
            for(var x = 0; x != canvasx; x++){
                privatecanvas[interaction.user.id][y][x] = ":white_circle:";
            }
        }
        interaction.reply({ content: "Private canvas has been reset", ephemeral: true });
    }
}