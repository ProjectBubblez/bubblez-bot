const {
    EmbedBuilder,
    ApplicationCommandOptionType
} = require("discord.js");
const fs = require('fs');
const ms = require('ms');
let cooldown = {};
module.exports = {
    "name": "draw",
    "description": "Draw on the public canvas",
    "options": [
        {
            name: 'x',
            description: 'The x (across) position you want to draw at (min: 1, max: 11)',
            type: ApplicationCommandOptionType.Integer,
            choices: [
                { name: "1", value: 1 },
                { name: "2", value: 2 },
                { name: "3", value: 3 },
                { name: "4", value: 4 },
                { name: "5", value: 5 },
                { name: "6", value: 6 },
                { name: "7", value: 7 },
                { name: "8", value: 8 },
                { name: "9", value: 9 },
                { name: "10", value: 10 },
                { name: "11", value: 11 },
            ],
            required: true
        },
        {
            name: 'y',
            description: 'The y (down) position you want to draw at (min: 1, max: 12)',
            type: ApplicationCommandOptionType.Integer,
            choices: [
                { name: "1", value: 1 },
                { name: "2", value: 2 },
                { name: "3", value: 3 },
                { name: "4", value: 4 },
                { name: "5", value: 5 },
                { name: "6", value: 6 },
                { name: "7", value: 7 },
                { name: "8", value: 8 },
                { name: "9", value: 9 },
                { name: "10", value: 10 },
                { name: "11", value: 11 },
                { name: "12", value: 12 },
            ],
            required: true
        },
        {
            name: 'color',
            description: 'The color you want to use',
            type: ApplicationCommandOptionType.String,
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
        let time = new Date();
        if(cooldown[interaction.user.id] == undefined){
            cooldown[interaction.user.id] = time.getTime() + 6e4;
        }else{
            if(cooldown[interaction.user.id] > time.getTime()){
                interaction.reply({ content: "This command is currently on cooldown. Try again in: " + ms(cooldown[interaction.user.id] - time.getTime()), ephemeral: true });
                return;
            }else{
                cooldown[interaction.user.id] = time.getTime() + 6e4;
            }
        }
        if(interaction.options.getInteger("y") > 11 || interaction.options.getInteger("y") < 1) {
            interaction.reply({ content: "The max y value is 11 and the min y value is 1", ephemeral: true });
            return;
        }
        if(interaction.options.getInteger("x") > 12 || interaction.options.getInteger("x") < 1) {
            interaction.reply({ content: "The max x value is 12 and the min x value is 1", ephemeral: true });
            return;
        }
        canvas[parseInt(interaction.options.getInteger("y")) - 1][parseInt(interaction.options.getInteger("x")) - 1] = `:${interaction.options.getString("color")}_circle:`;
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
        canvasEmbed.setFooter({ text: ver });
        interaction.reply({ embeds:[canvasEmbed] });
        fs.writeFileSync('./publiccanvas.json', JSON.stringify(canvas));
    }
}