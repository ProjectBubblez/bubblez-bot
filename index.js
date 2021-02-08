require('dotenv').config();
const Discord = require("discord.js");
global.bot = new Discord.Client();
const colors = require('colors');
const fs = require('fs');
console.log('➤  '.gray + colors.gray("Bot Loading"));
//Version Number help | (first#) Main build - (second#) How many commands hidden or not - (third#) Just up the number before pushing to git
global.ver = "V1.5.12 DEVELOPMENT BUILD";
global.footer = "Created by the Bubblez Team";
global.config;
global.developers = [
    '200612445373464576',
    '347067975544733707',
    '476641014841475084',
    '316673724990488577'
]
global.prefix = "!";
var activitys = [
	{ msg: ver, suggest: null},
	{ msg: 'some bad music', suggest: 'DarkMatter#1708', sid: '200612445373464576'}
]

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
    if(command.aliases != undefined){
        let commandCopy = Object.assign({}, command);
        commandCopy.isAlias = true;
        command.aliases.forEach(alias => {
            console.log('➤  '.gray + `Loading command: ${command.name} under the alias ${alias}`.gray);
            bot.commands.set(alias, commandCopy);
        });
    }
})
console.log('➤  '.gray + "Finished loading commands".gray);
function setActivity() {
    setTimeout(function() {
		var knock = function() { 
		var msg = activitys[Math.floor(Math.random() * activitys.length)]
		return formatActivity(msg)
		}

		function formatActivity(msg) { 
		return [
			msg.msg + (msg.suggest == null ? "" : " - " + msg.suggest)
		].join("")
		}
		bot.user.setPresence({ activity: { name: knock(), type: "PLAYING" }, status: "online"});
        setActivity();
    }, 15e3);
}
//function setActivity2() {
//    setTimeout(function() {
//		  bot.user.setPresence({ activity: { name: "Development", type: "WATCHING" }, status: "online"});
//        bot.user.setPresence({ activity: { name: ver, type: "PLAYING" }, status: "online"});
//        setActivity1();
//    }, 15e3);
//}

bot.on("ready", function(){
	bot.user.setPresence({ activity: { name: "Loading...", type: "WATCHING" }, status: "dnd"});
	setActivity();
	console.log('✔  '.green + colors.green(`Bot Online | ${ver}`));
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
});

bot.login(process.env.DTOKEN);
