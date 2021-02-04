require('dotenv').config();
const Discord = require("discord.js");
var bot = new Discord.Client();
const colors = require('colors');
const fs = require('fs');
const ver = "V: 03022021";
const footer = "Created by the Bubblez Team";
var config;

try{
    let rawConfig = fs.readFileSync("./config.json");
    config = JSON.parse(rawConfig);
}catch(err){
    return console.log("No config.json found")
}

function setActivity1() {
    setTimeout(function() {
        bot.user.setPresence({ activity: { name: "Development", type: "WATCHING" }, status: "dnd"});
        setActivity2();
    }, 15e3);
}
function setActivity2() {
    setTimeout(function() {
        bot.user.setPresence({ activity: { name: ver, type: "PLAYING" }, status: "dnd"});
        setActivity1();
    }, 15e3);
}

bot.on("ready", function(){
	bot.user.setPresence({ activity: { name: "Loading Screen...", type: "WATCHING" }, status: "dnd"});
	setActivity1()
	console.log('➤  '.gray + colors.gray("Bot online"));
});

bot.on("message", function(message){
  
    if (message.author.equals(bot.user)) return;
  
    if (message.author.bot) return;

    let prefix = "b!"

    if (!message.content.startsWith(prefix)) return;
  
    var args = message.content.substring(prefix.length).split(" ");
  
    if (!message.guild) {
		let messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null;
        var Support = new Discord.MessageEmbed()
            .setColor("#ff8c00")
            .setTitle("Support | "+message.author.username+"#"+message.author.discriminator)
            .addField("Channel:", "Direct Message")
            .addField("User:", "<@"+message.author.id+">")
            .setTimestamp()
            .setFooter(footer + " | " + ver);
        if (!args[1]){
            var reason = "No reason given.";
        }else{
            var reason = args.slice(1).join(" ");
        }
        Support.addField("Reason:", reason);
    	if (messageAttachment) Support.setImage(messageAttachment);
        bot.channels.cache.get(config.supportid).send(`<@&${config.staffid}>`, Support);
        message.reply("Support message sent to staff, a staff member should be with you soon.");
        return;
    };
  
    switch (args[0].toLowerCase()) {
        default:
            var Default = new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("Invalid Command\nUse " +prefix+ "help For Help");
            message.channel.send(Default);
            break;
        case "help":
            var Help = new Discord.MessageEmbed()
                .setColor("#00cc99")
                .setTitle("Help")
                .addField("Commands", "b!support 'send a report request'")
                .setFooter(footer + " | " + ver);
            console.log("User " + message.author.username + " used the help command on server " + message.guild.id + ", " + message.guild.name+ "\n")
            message.channel.send(Help)
            break;
        case "support":
            if(!args[1]){
                var reason = "No reason given.";
            }else{
                var reason = args.slice(1).join(" ");
            }
            var Support = new Discord.MessageEmbed()
                .setColor("#ff8c00")
                .setTitle("Support | "+message.author.username+"#"+message.author.discriminator)
                .addField("Channel:", "<#"+message.channel.id+">")
                .addField("User:", "<@"+message.author.id+">")
                .addField("Reason:", reason)
                .setTimestamp()
                .setFooter(footer + " | " + ver);
            
            bot.channels.cache.get(config.supportid).send(`<@&${config.staffid}>`, Support);
            message.reply("Support message sent to staff, a staff member should be with you soon.")
            break;
        case "say":
            if (message.author.id !== "200612445373464576") {
            var Default = new Discord.MessageEmbed()
                .setColor("RED")
                .setAuthor("Bubblez", bot.user.avatarURL)
                .setDescription("Only The Owners Can Use This Command");
            message.channel.send(Default);
            console.log("user " + message.author.username + " tried to use the Say command");
        } else {
            var id = args[1];
            var text = args.slice(2).join(" ");
            var client = message.channel.client;
		    message.delete();
            var user = client.users.fetch(id).then(user => {
            user.send(text);
            console.log("User " + message.author.username + " used the say command on server, " + message.guild.name + " || Sent '" + text + "' to " + user.username);
        });
      }
      break;
    }
});


bot.login(process.env.DTOKEN);