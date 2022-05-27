const {
    MessageEmbed
} = require("discord.js");
const fs = require('fs');
module.exports = {
    "name": "privatedraw",
    "description": "Draw on your private canvas",
    "options": [
        {
            name: 'x',
            description: 'The x (across) position you want to draw at (min: 1, max: 11)',
            type: 'INTEGER',
            required: true
        },
        {
            name: 'y',
            description: 'The y (down) position you want to draw at (min: 1, max: 12)',
            type: 'INTEGER',
            required: true
        },
        {
            name: 'color',
            description: 'The color you want to use',
            type: 'STRING',
            choices: [
                {
                    name: "blue", value: "blue"
                },{
                    name: "black", value: "black"
                },{
                    name: "brown", value: "brown"
                },{
                    name: "purple", value: "purple"
                },{
                    name: "white", value: "white"
                },{
                    name: "yellow", value: "yellow"
                },{
                    name: "green", value: "green"
                },{
                    name: "orange", value: "orange"
                },{
                    name: "red", value: "red"
                },
            ],
            required: true
        }
    ],
    async execute(interaction){
        if(interaction.options.getInteger("y") > 11 || interaction.options.getInteger("y") < 1) {
            interaction.reply({ content: "The max y value is 11 and the min y value is 1", ephemeral: true });
            return;
        }
        if(interaction.options.getInteger("x") > 12 || interaction.options.getInteger("x") < 1) {
            interaction.reply({ content: "The max x value is 12 and the min x value is 1", ephemeral: true });
            return;
        }
        if(privatecanvas[interaction.user.id] == undefined){
            privatecanvas[interaction.user.id] = {};
            let canvasy = 11;
            let canvasx = 12;
            for(var y = 0; y != canvasy; y++){
                privatecanvas[interaction.user.id][y] = {};
                for(var x = 0; x != canvasx; x++){
                    privatecanvas[interaction.user.id][y][x] = ":white_circle:";
                }
            }
        }
        privatecanvas[interaction.user.id][parseInt(interaction.options.getInteger("y")) - 1][parseInt(interaction.options.getInteger("x")) - 1] = `:${interaction.options.getString("color")}_circle:`;
        let canvastext = "";
        Object.keys(privatecanvas[interaction.user.id]).forEach(y => {
            Object.keys(privatecanvas[interaction.user.id][y]).forEach(x => {
                canvastext = canvastext + `${privatecanvas[interaction.user.id][y][x]}`;
            })
            canvastext = canvastext + "\n";
        })
        let canvasEmbed = new MessageEmbed();
        canvasEmbed.setDescription(canvastext);
        canvasEmbed.setTitle("Private Canvas");
        canvasEmbed.setColor("#00cc99");
        canvasEmbed.setFooter(ver);
        interaction.reply({ embeds: [canvasEmbed], ephemeral: true });
        fs.writeFileSync('./privatecanvas.json', JSON.stringify(privatecanvas));
    }
}