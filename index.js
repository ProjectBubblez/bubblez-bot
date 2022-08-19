require('dotenv').config();
const bubblez = require("bubblez.js");
bubblezclient = new bubblez.Client({
    default: {
        from: "Bubblez Bot"
    },
	verbose: true
});
const fs = require("fs");
const colors = require('colors');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, SlashCommandBuilder, ActivityType, EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType, InteractionType, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection } = require("discord.js");
client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

global.ver = `V3.${fs.readdirSync("./commands/").length}.41`;
global.footer = "Created by the Bubblez Team";
global.developers = [
    '200612445373464576',
    '347067975544733707',
    '476641014841475084'
];
global.devservers = [
    '806672125602824232',
    '408750138526269451',
    '869931517772693555',
    '477610391023779841',
    '829789629519626260'
];


// client.on('ready', () => {
//     console.log(`${client.user.tag} is online!`.green);
//     console.log(`${client.guilds.cache.size} servers!`.green);
//     console.log(`${client.users.cache.size} users!`.green);
//     console.log(`${client.channels.cache.size} channels!`.green);
//     console.log(`${client.guilds.cache.filter(g => g.available).size} servers are available!`.green);
//     console.log(`${client.guilds.cache.filter(g => !g.available).size} servers are unavailable!`.green);
// });

try{
    let rawConfig = fs.readFileSync("./config.json");
    global.config = JSON.parse(rawConfig);
}catch(err){
    return console.log("No config.json found")
}


var activities = [
	{ msg: ver, suggest: '709745787093123119', type: ActivityType.Watching },
	{ msg: 'Bubblez Next', suggest: '709745787093123119', type: ActivityType.Playing },
	{ msg: 'some bad music', suggest: '200612445373464576', type: ActivityType.Listening },
    { msg: 'some cool messages', suggest: '476641014841475084', type: ActivityType.Watching },
	{ msg: 'with some catgirls', suggest: '476641014841475084', type: ActivityType.Playing },
	{ msg: 'trombone porn', suggest: '430520245288173568', type: ActivityType.Watching },
    { msg: 'Bubblez Champs', suggest: '709745787093123119', type: ActivityType.Competing },
]

// setInterval(() => {
//     var msg = activities[Math.floor(Math.random() * activities.length)]
//     var activity = msg.msg;
//     if(msg.suggest != 709745787093123119) {
// 	  client.users.fetch(msg.suggest).then(i => {var activity = `${activity} - ${i.username}"#"${i.discriminator}`});
//     }
//     client.user.setPresence({ activities: [{ name: activity, type: msg.type }], status: 'online'});
// }, 15e3);

setInterval(() => {
    var msg = activities[Math.floor(Math.random() * activities.length)]
    client.users.fetch(msg.suggest).then(i => {
    
        var activity = msg.msg;
    
        if(msg.suggest != 709745787093123119) {
	        var activity = `${activity} - ${i.username}#${i.discriminator}`;
        }else{
            var activity = activity;
        }
        
        client.user.setPresence({ activities: [{ name: activity, type: msg.type }], status: 'online' });
        // console.log(`${activity}`.green + ` - ${i.username}#${i.discriminator}`.cyan + ` - ${msg.type}`.yellow);

    });
}, 15e3);

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

if(fs.existsSync("./giveaways.json")){
    global.giveaways = JSON.parse(fs.readFileSync("./giveaways.json"));
}else{
    global.giveaways = {};
}

console.log('➤  '.gray + "Started loading commands".gray);
client.commands = new Collection();
let commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith('.js'));
commandFiles.forEach(commandName => {
    let command = require(`./commands/${commandName}`);
    console.log('➤  '.gray + `Loading command: ${command.name}`.gray);
    client.commands.set(command.name, command);
})
console.log('➤  '.gray + "Finished loading commands".gray);

async function refreshSlashCommands(){
    function setStandardOptions(baseoption, optiondata){
        baseoption.setName(optiondata.name);
        baseoption.setDescription(optiondata.description);
        baseoption.setRequired(optiondata.required ?? false);
        return baseoption;
    }
    const slashcollection = [];
    client.commands.forEach(command => {
        const slashcommand = new SlashCommandBuilder()
            .setName(command.name)
            .setDescription(command.description ?? utility.getText("english", command.name, "commandDescription"));
        if(command.options) command.options.forEach(option => {
            if(option.type == ApplicationCommandOptionType.User){
                slashcommand.addUserOption(useroption => {
                    return setStandardOptions(useroption, option);
                });
            }else if(option.type == ApplicationCommandOptionType.String){
                slashcommand.addStringOption(stringoption => {
                    return setStandardOptions(stringoption, option);
                });
            }else if(option.type == ApplicationCommandOptionType.Channel){
                slashcommand.addChannelOption(channeloption => {
                    return setStandardOptions(channeloption, option);
                });
            }else if(option.type == ApplicationCommandOptionType.Integer){
                slashcommand.addIntegerOption(integeroption => {
                    return setStandardOptions(integeroption, option);
                });
            }else if(option.type == ApplicationCommandOptionType.Role){
                slashcommand.addRoleOption(roleoption => {
                    return setStandardOptions(roleoption, option);
                });
            }else if(option.type == ApplicationCommandOptionType.Subcommand){
                return slashcommand.addSubcommand(subcommand => {
                    subcommand.setName(option.name);
                    subcommand.setDescription(option.description);
                    option.options.forEach(option => {
                        if(option.type == ApplicationCommandOptionType.User){
                            subcommand.addUserOption(useroption => {
                                return setStandardOptions(useroption, option);
                            });
                        }else if(option.type == ApplicationCommandOptionType.String){
                            subcommand.addStringOption(stringoption => {
                                return setStandardOptions(stringoption, option);
                            });
                        }else if(option.type == ApplicationCommandOptionType.Channel){
                            subcommand.addChannelOption(channeloption => {
                                return setStandardOptions(channeloption, option);
                            });
                        }else if(option.type == ApplicationCommandOptionType.Integer){
                            subcommand.addIntegerOption(integeroption => {
                                return setStandardOptions(integeroption, option);
                            });
                        }else if(option.type == ApplicationCommandOptionType.Role){
                            subcommand.addRoleOption(roleoption => {
                                return setStandardOptions(roleoption, option);
                            });
                        }
                    });
                    return subcommand;
                });
            }else if(option.type == ApplicationCommandOptionType.SubcommandGroup){
                return slashcommand.addSubcommandGroup(subcommandgroup => {
                    subcommandgroup.setName(option.name);
                    subcommandgroup.setDescription(option.description);
                    option.options.forEach(option => {
                        return subcommandgroup.addSubcommand(subcommand => {
                            subcommand.setName(option.name);
                            subcommand.setDescription(option.description);
                            option.options.forEach(option => {
                                if(option.type == ApplicationCommandOptionType.User){
                                    subcommand.addUserOption(useroption => {
                                        return setStandardOptions(useroption, option);
                                    });
                                }else if(option.type == ApplicationCommandOptionType.String){
                                    subcommand.addStringOption(stringoption => {
                                        return setStandardOptions(stringoption, option);
                                    });
                                }else if(option.type == ApplicationCommandOptionType.Channel){
                                    subcommand.addChannelOption(channeloption => {
                                        return setStandardOptions(channeloption, option);
                                    });
                                }else if(option.type == ApplicationCommandOptionType.Integer){
                                    subcommand.addIntegerOption(integeroption => {
                                        return setStandardOptions(integeroption, option);
                                    });
                                }else if(option.type == ApplicationCommandOptionType.Role){
                                    subcommand.addRoleOption(roleoption => {
                                        return setStandardOptions(roleoption, option);
                                    });
                                }
                            });
                            return subcommand;
                        });
                    });
                    return subcommandgroup;
                });
            }
        });
        slashcollection.push(slashcommand);
    });
    const rest = new REST({ version: '9' }).setToken(process.env.DTOKEN);
    console.log("Refreshing slash commands");
    await rest.put(
        Routes.applicationCommands(client.user.id),
        { body: slashcollection },
    );
    console.log("Refreshed slash commands");
};

client.once('ready', async () => {
    if (!client.application?.owner) await client.application?.fetch();
    if(process.env.DEBUG == "true"){
        client.commands.forEach(async (command) => {
            if(!command.options) command.options = [];
            if(!command.developerOnly) command.developerOnly = false;
            let data = {
                name: command.name,
                description: command.description,
                options: command.options,
                defaultPermission: !command.developerOnly
            };
            await (client.guilds.cache.get('806672125602824232') ?? await client.guilds.fetch('806672125602824232')).commands.create(data);
        });
    }else{
        refreshSlashCommands();
    }
    console.log('✔  '.green + colors.green(`Bot is ready | ${ver}`));
});

bubblezclient.once('ready', async (user) => {
    console.log(`Logged in as: ${user.username}`);
    startCheckingGiveaways();
});

bubblezclient.on('devlog', (post) => {
    // console.log(post);
    const row = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setLabel('View Post')
            .setStyle(ButtonStyle.Link)
            .setURL(`https://bubblez.app/devlog`)
    );
    var DevLog = new EmbedBuilder()
        .setColor(`#00CC99`)
        .setTitle(`New Devlog`)
        // .setAuthor(post.blogposter_displayname, post.blogposter_pfp)
        .setAuthor({name: post.blogposter_displayname, iconURL: post.blogposter_pfp})
        .setTimestamp()
        .setFooter({ text: ver });
        let blogcontent;
        if(post.blogcontent && post.blogcontent.length >= 4096){
            blogcontentnoembed = post.blogcontent;
        }else{
            DevLog.setDescription(post.blogcontent);
        }
        if(post.blogimage){
            DevLog.setImage(post.blogimage);
        }
        if(post.blogtag){
            DevLog.setFields([{name: `Tag`, value: post.blogtag}]);
        }
        client.channels.cache.get(config.devlogid).send({ content: `<@&${config.updatepingid}>\n${blogcontentnoembed}`, embeds: [DevLog], components: [row] }).then(message => message.react("❤️"));

})

client.on('interactionCreate', async (interaction) => {
	if (interaction.type !== InteractionType.ApplicationCommand && interaction.type !== InteractionType.ModalSubmit) return;
	if (interaction.type === InteractionType.ApplicationCommand) {
        try{
            await client.commands.get(interaction.commandName).execute(interaction);
        }catch(err){
            console.log(`Command: ${interaction.commandName}, run by: ${interaction.user.username}#${interaction.user.discriminator} failed for the reason:`);
            console.log(err);
            await interaction.reply({ content: "Something went wrong", ephemeral: true });
        }
    } else if (interaction.type === InteractionType.ModalSubmit) {
        try{
            const row = new ActionRowBuilder()
		    .addComponents(
			new ButtonBuilder()
				.setLabel('Server Invite')
				.setStyle(ButtonStyle.Link)
				.setURL(`https://discord.gg/Bubblez`),
		    );
            var Support = new EmbedBuilder()
                .setColor("#ff8c00")
                .setTitle("Support | " + interaction.user.username + "#" + interaction.user.discriminator)
                // .addField("User:", "<@" + interaction.user.id + ">")
                // .addField("Reason:", interaction.options.getString("message"))
                .addFields([
                    { name: "User:", value: `<@${interaction.user.id}>` },
                    { name: "Reason:", value: interaction.fields.getTextInputValue("support-message") },
                ])
                .setTimestamp()
                .setFooter({ text: ver });
            // Support.addField("Channel:", "<#" + interaction.channel.id + ">");
            Support.addFields([
                { name: "Channel:", value: `<#${interaction.channel.id}>` },
                { name: "Server:", value: `${interaction.guild.name}` },
            ])
            client.channels.cache.get(config.supportid).send({ content: `<@&${config.staffid}>`, embeds: [Support] });
            interaction.reply({ content: "Message sent to support team", ephemeral: true, components: [row] });
        }catch(err){
            console.log(`Command: Modal, run by: ${interaction.user.username}#${interaction.user.discriminator} failed for the reason:`);
            console.log(err);
            await interaction.reply({ content: "Something went wrong", ephemeral: true });
        }
    }
});

function startCheckingGiveaways(){
    setInterval(() => {
        let giveaways = JSON.parse(fs.readFileSync("./giveaways.json"));
        let time = new Date();
        Object.keys(giveaways).forEach(giveawayNumber => {
            let giveaway = giveaways[giveawayNumber];
            if(giveaway.winner != 0) return;
            if(giveaway.endtime < time.getTime()){
                client.guilds.cache.get(giveaway.guildid).channels.cache.get(giveaway.channelid).messages.fetch(giveaway.messageid).then(message => {
                    let title = message.embeds[0].title;
                    message.reactions.cache.get("🎉").users.fetch().then(users => {
                        delete users[client.user.id];
                        let newUsers = new Array;
                        users.map(u => {
                            if(u.id != client.user.id){
                                newUsers.push(u.id);
                            }
                        });
                        let user = newUsers[Math.floor(Math.random() * newUsers.length)];
                        
                        if(user){
                            client.guilds.cache.get(giveaway.guildid).channels.cache.get(giveaway.channelid).send(`<@${user}> won ${title}!!! 🎉🎉🎉`);
                            giveaways[giveawayNumber].winner = user;
                            client.users.fetch(user).then((userObject) => {
                                GiveawayEmbed = new EmbedBuilder();
                                GiveawayEmbed.setFooter({ text: ver });
                                GiveawayEmbed.setTitle(giveaway.prize);
                                let GiveawayEndTime = new Date(giveaway.endtime);
                                GiveawayEmbed.setDescription(`Giveaway ended!\nWinner: <@${userObject.id}>`);
                                GiveawayEmbed.setColor("#cc0000");
                                GiveawayEmbed.setTimestamp(GiveawayEndTime);
                                message.edit({ embeds: [GiveawayEmbed] });
                                bubblezclient.send(`${userObject.username} won: ${title}!!! 🎉🎉🎉`, { from: "Giveaways", locked: true });
							    console.log('✔  '.green + colors.green(`${userObject.username} is the winner of a giveaway.`));
                            })
                        }else{
                            client.guilds.cache.get(giveaway.guildid).channels.cache.get(giveaway.channelid).send(`No-one won ${title}`);
                            giveaways[giveawayNumber].winner = 1;
                            GiveawayEmbed = new EmbedBuilder();
                            GiveawayEmbed.setFooter({ text: ver });
                            GiveawayEmbed.setTitle(giveaway.prize);
                            let GiveawayEndTime = new Date(giveaway.endtime);
                            GiveawayEmbed.setDescription(`Giveaway ended!\nNo-one won :(`);
                            GiveawayEmbed.setColor("#cc0000");
                            GiveawayEmbed.setTimestamp(GiveawayEndTime);
                            message.edit({ embeds: [GiveawayEmbed] });
							console.log(`None won the giveaway`);
                        }
                        fs.writeFileSync("./giveaways.json", JSON.stringify(giveaways));
                    })
                }).catch(() => {
                    return;
                });
            }else{
                client.guilds.cache.get(giveaway.guildid).channels.cache.get(giveaway.channelid).messages.fetch(giveaway.messageid).then(message => {
                    GiveawayEmbed = new EmbedBuilder();
                    GiveawayEmbed.setFooter({ text: ver });
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
                    message.edit({ embeds: [GiveawayEmbed] });
                });
            }
        })
    }, 15e3)
}

client.login(process.env.DTOKEN);
bubblezclient.login(process.env.BTOKEN);
