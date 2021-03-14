const {
    MessageEmbed
} = require("discord.js");
const fs = require('fs');
const ms = require('ms');
let cooldown = {};
module.exports = {
    "name": "draw",
    "aliases": [
        'publicdraw',
        'pudraw',
        'pud'
    ],
    "description": "Draw on the public canvas",
    execute(message, args){
        if(!message.guild){
            message.channel.send("This command is guild only");
            return;
        }
        let time = new Date();
        if(cooldown[message.author.id] == undefined){
            cooldown[message.author.id] = time.getTime() + 6e4;
        }else{
            if(cooldown[message.author.id] > time.getTime()){
                message.channel.send("This command is currently on cooldown. Try again in: " + ms(cooldown[message.author.id] - time.getTime())).then(cooldownmessage => {
                    setTimeout(() => {
                        cooldownmessage.delete()
                    }, 5e3);
                });
                return;
            }else{
                cooldown[message.author.id] = time.getTime() + 6e4;
            }
        }
        if(args[1] == undefined || args[2] == undefined || args[3] == undefined){
            message.channel.send("Invalid command usage: -publicdraw (y) (x) (color)\ny is 1 on the top left and 11 on the bottom left.\nx is 1 on the top left and 12 on the top right.");
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
        canvas[parseInt(args[1]) - 1][parseInt(args[2]) - 1] = `:${args[3]}_circle:`;
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
        canvasEmbed.setColor(0x00EEFF);
        canvasEmbed.setFooter(ver);
        message.channel.send(canvasEmbed);
        fs.writeFileSync('./publiccanvas.json', JSON.stringify(canvas));
    }
}