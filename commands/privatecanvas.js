const {
    MessageEmbed
} = require("discord.js");
module.exports = {
    "name": "privatecanvas",
    "aliases": [
        'pcanvas',
    ],
    "description": "Show your own or someone else's canvas",
    execute(message, args){
        let userid;
        if(args[1]){
            if(!Object.keys(privatecanvas).includes(args[1].replace(/[<]|[@]|[!]|[>]/g, ""))){
                message.channel.send("This user doesn't have a canvas");
                return;
            }else{
                userid = args[1].replace(/[<]|[@]|[!]|[>]/g, "");
            }
        }else{
            userid = message.author.id;
        }
        let canvastext = "";
        Object.keys(privatecanvas[userid]).forEach(y => {
            Object.keys(privatecanvas[userid][y]).forEach(x => {
                canvastext = canvastext + `${privatecanvas[userid][y][x]}`;
            })
            canvastext = canvastext + "\n";
        })
        bot.users.fetch(userid).then(user => {
            let canvasEmbed = new MessageEmbed();
            canvasEmbed.setDescription(canvastext);
            canvasEmbed.setTitle(`Private Canvas | ${user.username}`);
            canvasEmbed.setColor(0x00EEFF);
            canvasEmbed.setFooter(ver);
            message.channel.send(canvasEmbed);
        });
    }
}