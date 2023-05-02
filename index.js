require('dotenv').config();
const fs = require("fs");
const colors = require('colors');
const fetch = require('node-fetch');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { Client, SlashCommandBuilder, ActivityType, EmbedBuilder, PermissionsBitField, ApplicationCommandOptionType, InteractionType, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, Collection } = require("discord.js");
client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

global.ver = `V3.${fs.readdirSync("./commands/").length}.54`;
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
	// { msg: ver, suggest: '709745787093123119', type: ActivityType.Watching },
	// { msg: 'Bubblez Next', suggest: '709745787093123119', type: ActivityType.Playing },
	// { msg: 'some bad music', suggest: '200612445373464576', type: ActivityType.Listening },
    // { msg: 'some cool messages', suggest: '476641014841475084', type: ActivityType.Watching },
	// { msg: 'with some catgirls', suggest: '476641014841475084', type: ActivityType.Playing },
	// { msg: 'trombone porn', suggest: '430520245288173568', type: ActivityType.Watching },
    // { msg: 'Bubblez Champs', suggest: '709745787093123119', type: ActivityType.Competing },
    { msg: 'Bubblez Next', suggest: '709745787093123119', type: ActivityType.Watching}
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
        
        client.user.setPresence({ activities: [{ name: activity, type: msg.type }] });
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
    console.log('✔  '.green + colors.green(`bot online | ${ver}`));
    startUpdatingChannels();
    startUpdatingChannelsDev();
});

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

function startUpdatingChannels(){
    let statusChannelName;
    let Harroled;
    setInterval(async () => {
        // let response = await fetch('https://bubblez.app/api/v1/health');
        let response = await fetch('https://api.bubblez.app/v1/health').then(async res => {
            let statusCode = res.status;
            let json = await res.json();
            // console.log(json)
            return { statusCode, json };
          }).catch(console.error);
        const data = response.statusCode;
        if(data == 200){
            statusChannelName = "🟢";
            client.user.setStatus('online');
        }else if(data == 503){
            statusChannelName = "🟠";
            client.user.setStatus('idle');
        }else{
            statusChannelName = "🔴";
            client.user.setStatus('dnd');
        }
        // console.log(`what is Harroled: ${Harroled}`);
        if(Harroled == statusChannelName){
            console.log("channel name has not changed");
        }else{
            Harroled = statusChannelName;
            client.guilds.cache.get(config.guildid).channels.cache.get(config.statuschannelid).setName("Status:『"+statusChannelName+"』")
            .then(newChannel => {
                const row = new ActionRowBuilder()
		        .addComponents(
			    new ButtonBuilder()
				    .setLabel('Status Page')
				    .setStyle(ButtonStyle.Link)
				    .setURL(`https://status.bubblez.app/`),
		        );
                var Status = new EmbedBuilder()
                    .setTitle("Current Status:『"+statusChannelName+"』")
                    .setDescription("```json\n"+JSON.stringify(response.json, null, 2)+"```")
                    .setTimestamp()
                    .setFooter({ text: ver });
                if(data == 200){
                    Status.setColor("#75ad57");
                }else if(data == 503){
                    Status.setColor("#ef8d0c");
                }else{
                    Status.setColor("#d92d43");
                }
                // client.guilds.cache.get(config.guildid).channels.cache.get(config.statuschannelid).send({ embeds: [Status], components: [row]  }).then(function (message){
                //     var d = new Date(message.createdTimestamp);
                //     let yyyy = d.getFullYear();
                //     let mm = d.getMonth() + 1;
                //     let dd = d.getDate();

                //     if (dd < 10) dd = '0' + dd;
                //     if (mm < 10) mm = '0' + mm;

                //     let formattedD = dd + '/' + mm + '/' + yyyy;

                //     message.startThread({
                //         name: `Status:『${statusChannelName}』『${formattedD}』`,
                //         autoArchiveDuration: 10080,
                //     });
                // });
                console.log(`Channel's new name is ${newChannel.name}`);
            }).catch(console.error);
        }
    }, 60e3)
}

function startUpdatingChannelsDev(){
    let statusChannelNameDev;
    let HarroledDev;
    setInterval(async () => {
        // https://api.bubblez.app/v2/health
        let response = await fetch('https://api.bubblez.app/v2/health').then(async res => {
            let statusCode = res.status;
            let json = await res.json();
            // console.log(json)
            return { statusCode, json };
          }).catch(console.error);
        const data = response.statusCode;
        if(data == 200){
            statusChannelNameDev = "🟢";
            // client.user.setStatus('online');
        }else if(data == 503){
            statusChannelNameDev = "🟠";
            // client.user.setStatus('idle');
        }else{
            statusChannelNameDev = "🔴";
            // client.user.setStatus('dnd');
        }
        // console.log(`what is Harroled: ${HarroledDev}`);
        if(HarroledDev == statusChannelNameDev){
            console.log("[Dev] channel name has not changed");
        }else{
            HarroledDev = statusChannelNameDev;
            client.guilds.cache.get(config.guildiddev).channels.cache.get(config.statuschanneliddev).setName("Status:『"+statusChannelNameDev+"』")
            .then(newChannel => {
                // console.log(response)
                const row = new ActionRowBuilder()
		        .addComponents(
			    new ButtonBuilder()
				    .setLabel('Status Page')
				    .setStyle(ButtonStyle.Link)
				    .setURL(`https://status.bubblez.app/`),
		        );
                var Status = new EmbedBuilder()
                    .setTitle("Current Status:『"+statusChannelNameDev+"』")
                    .setDescription("```json\n"+JSON.stringify(response.json, null, 2)+"```")
                    .setTimestamp()
                    .setFooter({ text: ver });
                if(data == 200){
                    Status.setColor("#75ad57");
                }else if(data == 503){
                    Status.setColor("#ef8d0c");
                }else{
                    Status.setColor("#d92d43");
                }
                client.guilds.cache.get(config.guildiddev).channels.cache.get(config.statuschanneliddev).send({ embeds: [Status], components: [row]  }).then(function (message){
                    var d = new Date(message.createdTimestamp);
                    let yyyy = d.getFullYear();
                    let mm = d.getMonth() + 1;
                    let dd = d.getDate();

                    if (dd < 10) dd = '0' + dd;
                    if (mm < 10) mm = '0' + mm;

                    let formattedD = dd + '/' + mm + '/' + yyyy;

                    message.startThread({
                        name: `Status:『${statusChannelNameDev}』『${formattedD}』`,
                        autoArchiveDuration: 10080,
                    });
                });
                console.log(`[Dev] Channel's new name is ${newChannel.name}`);
            }).catch(console.error);
        }
    }, 60e3)
}

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
