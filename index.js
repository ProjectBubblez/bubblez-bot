require('dotenv').config();
const Discord = require("discord.js");
global.bot = new Discord.Client();
const colors = require('colors');
const fs = require('fs');
global.ver = "V: 04022021";
global.footer = "Created by the Bubblez Team";
global.config;
global.developers = [
    '200612445373464576',
    '347067975544733707',
    '476641014841475084'
]
global.prefix = "b!";

try{
    let rawConfig = fs.readFileSync("./config.json");
    config = JSON.parse(rawConfig);
}catch(err){
    return console.log("No config.json found")
}

console.log('➤  '.gray + "Started loading commands".gray);
bot.commands = new Discord.Collection();
let commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith('.js'));
commandFiles.forEach(commandName => {
    let command = require(`./commands/${commandName}`);
    console.log('➤  '.gray + `Loading command: ${command.name}`.gray);
    bot.commands.set(command.name, command);
})
console.log('➤  '.gray + "Finished loading commands".gray);

function setFaze2() {
        bot.user.setPresence({ activity: { name: "Loading Game...", type: "WATCHING" }, status: "idle"});
		console.log('➤  '.gray + colors.gray("Bot Faze One"));
        setActivity1();
}
function setActivity1() {
    setTimeout(function() {
        bot.user.setPresence({ activity: { name: "Development", type: "WATCHING" }, status: "online"});
        setActivity2();
    }, 15e3);
}
function setActivity2() {
    setTimeout(function() {
        bot.user.setPresence({ activity: { name: ver, type: "PLAYING" }, status: "online"});
        setActivity1();
    }, 15e3);
}

bot.on("ready", function(){
	bot.user.setPresence({ activity: { name: "Start Screen...", type: "WATCHING" }, status: "dnd"});
	setTimeout(function() {
		setFaze2()
		setTimeout(function() {
			console.log('✔  '.green + colors.green("Bot Online"));
		}, 15e3);
	}, 5e3);
	console.log('➤  '.gray + colors.gray("Bot Loading"));
});

bot.on("message", function(message){
  
    if (message.author.equals(bot.user)) return;
  
    if (message.author.bot) return;

    if (!message.guild) {
		let messageAttachment = message.attachments.size > 0 ? message.attachments.array()[0].url : null;
        var Support = new Discord.MessageEmbed()
            .setColor("#ff8c00")
            .setTitle("Support | "+message.author.username+"#"+message.author.discriminator)
            .addField("Channel:", "Direct Message")
            .addField("User:", "<@"+message.author.id+">")
            .addField("Reason:", message.content)
            .setTimestamp()
            .setFooter(footer + " | " + ver);
    	if (messageAttachment) Support.setImage(messageAttachment);
        bot.channels.cache.get(config.supportid).send(`<@&${config.staffid}>`, Support);
        message.reply("Support message sent to staff, a staff member should be with you soon.");
        return;
    };

    if(message.content == `<@${bot.user.id}>` || message.content == `<@!${bot.user.id}>`){
        message.channel.send(`The prefix is: ${prefix}`);
        return;
    }

    if (!message.content.startsWith(prefix)) return;
  
    var args = message.content.substring(prefix.length).split(" ");

    if(!bot.commands.get(args[0].toLowerCase())){
        var Default = new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("Invalid Command\nUse " +prefix+ "help For Help");
        message.channel.send(Default);
        return;
    }

    try{
        bot.commands.get(args[0].toLowerCase()).execute(message, args);
    }catch(err){
        console.log(`Command: ${args[0].toLowerCase()}, run by: ${message.author.username}#${message.author.discriminator} failed for the reason: ${err}`);
        message.channel.send("Something went wrong");
    }

    return;
  
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
            client.users.fetch(id).then(user => {
                user.send(text);
                console.log("User " + message.author.username + " used the say command on server, " + message.guild.name + " || Sent '" + text + "' to " + user.username);
            });
        }
        break;
    }
});

bot.login(process.env.DTOKEN);