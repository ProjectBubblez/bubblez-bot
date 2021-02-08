const {
    MessageEmbed
} = require("discord.js");
module.exports = {
    "name": "devs",
    "aliases": [
		'dev',
        'd'
    ],
    "description": "Show a list of devs",
    execute(message, args){
        var DevList = "";
        developers.forEach(devID => {
            DevList = DevList + `<@${devID}>\n`
        });
        var Help = new MessageEmbed()
            .setColor("#00cc99")
            .setTitle("Developers")
            .setDescription(DevList)
            .setFooter(footer + " | " + ver);
        message.channel.send(Help);
    }
}