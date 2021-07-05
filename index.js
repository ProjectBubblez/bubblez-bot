require('dotenv').config();
const Discord = require("discord.js");
global.bot = new Discord.Client();
const colors = require('colors');
const fs = require('fs');
const bubblez = require("bubblez.js");
const fetch = require('node-fetch');
global.BubblezClient = new bubblez.client();
console.log('➤  '.gray + colors.gray("Bot Loading"));
//Version Number help | (first#) Main build - (second#) How many commands hidden or not - (third#) Just up the number before pushing to git
global.ver = "V1.14.27";
global.footer = "Created by the Bubblez Team";
global.config;
global.bap;
global.developers = [
    '200612445373464576',
    '347067975544733707',
    '476641014841475084',
    '316673724990488577'
]
global.prefix = "!";
var activitys = [
	{ msg: ver, suggest: '709745787093123119', type: 'WATCHING' },
	{ msg: 'Live', suggest: '709745787093123119', type: 'PLAYING' },
	{ msg: 'some bad music', suggest: '200612445373464576', type: 'LISTENING' },
    { msg: 'show cool messages', suggest: '476641014841475084', type: 'PLAYING' },
    { msg: 'with some catgirls', suggest: '476641014841475084', type: 'PLAYING' },
	{ msg: 'trombone porn', suggest: '430520245288173568', type: 'WATCHING' }
]

if(fs.existsSync("./publiccanvas.json")){
    global.canvas = JSON.parse(fs.readFileSync("./publiccanvas.json"));
}else{
    global.canvas = {};
    let canvasy = 11;
    let canvasx = 12;
    for(var y = 0; y != canvasy; y++){
        canvas[y] = {};
        for(var x = 0; x != canvasx; x++){
            canvas[y][x] = ":white_circle:";
        }
    }
}

if(fs.existsSync("./privatecanvas.json")){
    global.privatecanvas = JSON.parse(fs.readFileSync("./privatecanvas.json"));
}else{
    global.privatecanvas = {};
}

try{
    let rawConfig = fs.readFileSync("./config.json");
    config = JSON.parse(rawConfig);
}catch(err){
    return console.log("No config.json found")
}

bap = JSON.parse(fs.readFileSync("bap.json"));

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
		
		var msg = activitys[Math.floor(Math.random() * activitys.length)]
		
		bot.users.fetch(msg.suggest).then(i => {
		if(i.username == "Bubblez"){
			var activityss = msg.msg;
		}else{
			var activityss = msg.msg + " - " + i.username + "#" + i.discriminator;
		}
		bot.user.setPresence({ activity: { name: activityss, type: msg.type }, status: 'online'});
		});
		
        setActivity();
    }, 15e3);
}

function startCheckingGiveaways(){
    setInterval(() => {
        let giveaways = JSON.parse(fs.readFileSync("./giveaways.json"));
        let time = new Date();
        Object.keys(giveaways).forEach(giveawayNumber => {
            let giveaway = giveaways[giveawayNumber];
            if(giveaway.winner != 0) return;
            if(giveaway.endtime < time.getTime()){
                bot.guilds.cache.get(giveaway.guildid).channels.cache.get(giveaway.channelid).messages.fetch(giveaway.messageid).then(message => {
                    let title = message.embeds[0].title;
                    message.reactions.cache.get("🎉").users.fetch().then(users => {
                        delete users[bot.user.id];
                        let newUsers = new Array;
                        users.map(u => {
                            if(u.id != bot.user.id){
                                newUsers.push(u.id);
                            }
                        });
                        let user = newUsers[Math.floor(Math.random() * newUsers.length)];
                        
                        if(user){
                            bot.guilds.cache.get(giveaway.guildid).channels.cache.get(giveaway.channelid).send(`<@${user}> won ${title}!!! 🎉🎉🎉`);
                            giveaways[giveawayNumber].winner = user;
                            bot.users.fetch(user).then((userObject) => {
                                GiveawayEmbed = new Discord.MessageEmbed();
                                GiveawayEmbed.setFooter(ver);
                                GiveawayEmbed.setTitle(giveaway.prize);
                                let GiveawayEndTime = new Date(giveaway.endtime);
                                GiveawayEmbed.setDescription(`Giveaway ended!\nWinner: <@${userObject.id}>`);
                                GiveawayEmbed.setColor("#cc0000");
                                GiveawayEmbed.setTimestamp(GiveawayEndTime);
                                message.edit(GiveawayEmbed);
                                BubblezClient.send(`${userObject.username} won: ${title}!!! 🎉🎉🎉`, { from: "Giveaways" });
							    console.log('✔  '.green + colors.green(`${userObject.username} is the winner of a giveaway.`));
                            })
                        }else{
                            bot.guilds.cache.get(giveaway.guildid).channels.cache.get(giveaway.channelid).send(`No-one won ${title}`);
                            giveaways[giveawayNumber].winner = 1;
                            GiveawayEmbed = new Discord.MessageEmbed();
                            GiveawayEmbed.setFooter(ver);
                            GiveawayEmbed.setTitle(giveaway.prize);
                            let GiveawayEndTime = new Date(giveaway.endtime);
                            GiveawayEmbed.setDescription(`Giveaway ended!\nNo-one won :(`);
                            GiveawayEmbed.setColor("#cc0000");
                            GiveawayEmbed.setTimestamp(GiveawayEndTime);
                            message.edit(GiveawayEmbed);
							console.log(`None won the giveaway`);
                        }
                        fs.writeFileSync("./giveaways.json", JSON.stringify(giveaways));
                    })
                }).catch(() => {
                    return;
                });
            }else{
                bot.guilds.cache.get(giveaway.guildid).channels.cache.get(giveaway.channelid).messages.fetch(giveaway.messageid).then(message => {
                    GiveawayEmbed = new Discord.MessageEmbed();
                    GiveawayEmbed.setFooter(ver);
                    GiveawayEmbed.setTitle(giveaway.prize);
                    let GiveawayEndTime = new Date(giveaway.endtime);
                    let endtimeinms = GiveawayEndTime.getTime() - time.getTime();
                    let timeRemaining = "";
                    if(endtimeinms > 86400000){
                        timeRemaining = timeRemaining + Math.floor(endtimeinms / 86400000) + " days "
                        endtimeinms = endtimeinms - (Math.floor(endtimeinms / 86400000) * 86400000);
                    }
                    if(endtimeinms > 3600000){
                        timeRemaining = timeRemaining + Math.floor(endtimeinms / 3600000) + " hours "
                        endtimeinms = endtimeinms - (Math.floor(endtimeinms / 3600000) * 3600000);
                    }
                    if(endtimeinms > 60000){
                        timeRemaining = timeRemaining + Math.floor(endtimeinms / 60000) + " minutes "
                        endtimeinms = endtimeinms - (Math.floor(endtimeinms / 60000) * 60000);
                    }
                    timeRemaining = timeRemaining + Math.floor(endtimeinms / 1000) + " seconds "
                    endtimeinms = endtimeinms - (Math.floor(endtimeinms / 1000) * 1000);
                    GiveawayEmbed.setDescription(`:partying_face: Giveaway!\nParticipate by pressing :tada:\nTime remaining: **${timeRemaining}**`);
                    GiveawayEmbed.setColor("#00cc99");
                    message.edit(GiveawayEmbed);
                });
            }
        })
    }, 3e4)
}

function checkBoostsAndPatreon(){
    setInterval(() => {

    }, 60e4);
    bot.guilds.cache.get(config.guildid).members.cache.forEach(member => {
        if(!bap[member.id]) bap[member.id] = [];
        if((member.roles.cache.has(config.patreonid1) || member.roles.cache.has(config.patreonid2)) && !bap[member.id].includes("patreon")) {
            let params = new URLSearchParams();
            params.append('token', process.env.STOKEN);
            params.append('patreon', true);
            params.append('uuid', member.id);
            fetch(`https://bubblez.app/api/v1/secure/patreon`, {
                method: 'POST',
                body: params,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            bap[member.id].push("patreon");
        }
        if(member.roles.cache.has(config.boosterid) && !bap[member.id].includes("booster")) {
            let params = new URLSearchParams();
            params.append('token', process.env.STOKEN);
            params.append('boost', true);
            params.append('uuid', member.id);
            fetch(`https://bubblez.app/api/v1/secure/boost`, {
                method: 'POST',
                body: params,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            bap[member.id].push("booster");
        }
        if(!member.roles.cache.has(config.patreonid1) && !member.roles.cache.has(config.patreonid2) && bap[member.id].includes("patreon")) {
            let params = new URLSearchParams();
            params.append('token', process.env.STOKEN);
            params.append('patreon', false);
            params.append('uuid', member.id);
            fetch(`https://bubblez.app/api/v1/secure/patreon`, {
                method: 'POST',
                body: params,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            bap[member.id] = bap[member.id].slice(bap[member.id].indexOf("patreon"), 1);
        }
        if(!member.roles.cache.has(config.boosterid) && bap[member.id].includes("booster")) {
            let params = new URLSearchParams();
            params.append('token', process.env.STOKEN);
            params.append('boost', false);
            params.append('uuid', member.id);
            fetch(`https://bubblez.app/api/v1/secure/boost`, {
                method: 'POST',
                body: params,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            bap[member.id] = bap[member.id].slice(bap[member.id].indexOf("booster"), 1);
        }
    });
    setTimeout(() => {
        fs.writeFileSync("bap.json", JSON.stringify(bap));
    }, 5000);
}

BubblezClient.once('ready', user => {
    console.log('✔  '.green + colors.green(`Logged into bubblez as: ${user.username}`));
});

bot.on("ready", function(){
	bot.user.setPresence({ activity: { name: "Loading...", type: "WATCHING" }, status: "dnd"});
    setActivity();
    startCheckingGiveaways();
    checkBoostsAndPatreon();
    console.log('✔  '.green + colors.green(`Bot Online | ${ver}`));
});

bot.on('guildCreate', async function(guild){
    const welcomeembed = new Discord.MessageEmbed()
        .setTitle("Joined a server")
        .setColor("#00cc99")
        .addField(`Server name:`, `${guild.name}`)
        .setThumbnail(`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`)
        .setFooter(ver);
    bot.channels.cache.get("831238583221485568").send(welcomeembed)
});

bot.on('guildDelete', async function(guild){
    const byeembed = new Discord.MessageEmbed()
        .setTitle("Left a server")
        .setColor("#cc0000")
        .addField(`Server name:`, `${guild.name}`)
        .setThumbnail(`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`)
        .setFooter(ver);
    bot.channels.cache.get("831238583221485568").send(byeembed)
});

bot.on("message", function(message){
  
    if (message.author.equals(bot.user)) return;
  
    if (message.author.bot) return;

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
BubblezClient.login(process.env.BTOKEN);
