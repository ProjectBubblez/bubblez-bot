const {
    MessageEmbed
} = require("discord.js");
const fs = require('fs');
module.exports = {
    "name": "privatedraw",
    "aliases": [
        'pdraw',
        'prdraw',
        'prd'
    ],
    "description": "Draw on your private canvas",
    execute(message, args){
        if(message.guild){
            message.channel.send("This command is dm only");
            return;
        }
        if(args[1] == "reset") {
            privatecanvas[message.author.id] = undefined;
        }else{
            if(args[1] == undefined || args[2] == undefined || args[3] == undefined){
                message.channel.send("Invalid command usage: -privatedraw (y) (x) (color)\ny is 1 on the top left and 11 on the bottom left.\nx is 1 on the top left and 12 on the top right.");
                return;
            }
            if(args[1] > 11 || args[1] < 1) {
                message.channel.send("The max y value is 11 and the min y value is 1");
                return;
            }
            if(args[2] > 12 || args[2] < 1) {
                message.channel.send("The max x value is 12 and the min x value is 1");
                return;
            }
            let validcolors = [
                'blue',
                'black',
                'brown',
                'purple',
                'white',
                'yellow',
                'green',
                'orange',
                'red'
            ];
            if(validcolors.includes(args[3]) == false){
                message.channel.send("This is not a valid color");
                return;
            }    
        }
        if(privatecanvas[message.author.id] == undefined){
            privatecanvas[message.author.id] = {};
            let canvasy = 11;
            let canvasx = 12;
            for(var y = 0; y != canvasy; y++){
                privatecanvas[message.author.id][y] = {};
                for(var x = 0; x != canvasx; x++){
                    privatecanvas[message.author.id][y][x] = ":white_circle:";
                }
            }
        }
        if(args[1] != "reset"){
            privatecanvas[message.author.id][parseInt(args[1]) - 1][parseInt(args[2]) - 1] = `:${args[3]}_circle:`;
        }
        let canvastext = "";
        Object.keys(privatecanvas[message.author.id]).forEach(y => {
            Object.keys(privatecanvas[message.author.id][y]).forEach(x => {
                canvastext = canvastext + `${privatecanvas[message.author.id][y][x]}`;
            })
            canvastext = canvastext + "\n";
        })
        let canvasEmbed = new MessageEmbed();
        canvasEmbed.setDescription(canvastext);
        canvasEmbed.setTitle("Private Canvas");
        canvasEmbed.setColor("#00cc99");
        canvasEmbed.setFooter(ver);
        message.channel.send(canvasEmbed);
        fs.writeFileSync('./privatecanvas.json', JSON.stringify(privatecanvas));
    }
}