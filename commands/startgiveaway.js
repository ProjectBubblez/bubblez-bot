const {
    MessageEmbed
} = require("discord.js");
const fs = require('fs');
module.exports = {
    "name": "startgiveaway",
    "description": "Start a giveaway",
    "developerOnly": true,
    "options": [
        {
            name: 'channel',
            description: 'The channel the giveaway needs to be started in',
            type: 'CHANNEL',
            required: true
        },{
            name: 'prize',
            description: 'The prize you are giving away',
            type: 'STRING',
            required: true
        },{
            name: 'length',
            description: 'How long will the giveaway take (Example: 30d 20h 15m)',
            type: 'STRING',
            required: true
        },
    ],
    async execute(interaction){
        if(interaction.options.getChannel('channel').type != "GUILD_TEXT"){
            interaction.reply({ content: "This channel is not a text channel", ephemeral: true });
            return;
        }
        function endsWithAny(string, endArray){
            if(string == undefined) return false;
            let answer = false;
            endArray.forEach(end => {
                if(string.endsWith(end)){
                    answer = true;
                }
            });
            return answer;
        }
        let time = new Date;
        let giveawayEnd, giveawayDays, giveawayHours, giveawayMinutes, endTimeCalculation;
        let giveawayArgs = interaction.options.getString('length').split(" ");
        if(endsWithAny(giveawayArgs[0], ['d', 'h', 'm'])){
            giveawayEnd = time.getTime();
            timeArgs = endsWithAny(giveawayArgs[0], ['d', 'h', 'm']) + endsWithAny(giveawayArgs[1], ['h', 'm']) + endsWithAny(giveawayArgs[2], ['m']);
            if(timeArgs >= 1){
                if(giveawayArgs[0].endsWith("d")){
                    giveawayDays = giveawayArgs[0].slice(0, -1);
                    if(isNaN(giveawayDays)){
                        giveawayDays = undefined;
                        endTimeCalculation = true;
                    }
                }else if(giveawayArgs[0].endsWith("h")){
                    giveawayHours = giveawayArgs[0].slice(0, -1);
                    if(isNaN(giveawayHours)){
                        giveawayHours = undefined;
                        endTimeCalculation = true;
                    }
                }else{
                    giveawayMinutes = giveawayArgs[0].slice(0, -1);
                    if(isNaN(giveawayMinutes)){
                        giveawayMinutes = undefined;
                        endTimeCalculation = true;
                    }
                }
            }
            if(timeArgs >= 2 && endTimeCalculation != true){
                if(giveawayArgs[1].endsWith("h")){
                    if(giveawayHours == undefined){
                        giveawayHours = giveawayArgs[1].slice(0, -1);
                        if(isNaN(giveawayHours)){
                            giveawayHours = undefined;
                            endTimeCalculation = true;
                        }
                    }
                }else{
                    if(giveawayMinutes == undefined){
                        giveawayMinutes = giveawayArgs[1].slice(0, -1);
                        if(isNaN(giveawayMinutes)){
                            giveawayMinutes = undefined;
                            endTimeCalculation = true;
                        }
                    }
                }
            }
            if(timeArgs >= 3 && endTimeCalculation != true){
                if(giveawayMinutes == undefined){
                    giveawayMinutes = giveawayArgs[2].slice(0, -1);
                    if(isNaN(giveawayMinutes)){
                        giveawayMinutes = undefined;
                        endTimeCalculation = true;
                    }
                }
            }
            if(!isNaN(giveawayDays)){
                giveawayEnd = giveawayEnd + (giveawayDays * 24 * 60 * 60 * 1000);
            }
            if(!isNaN(giveawayHours)){
                giveawayEnd = giveawayEnd + (giveawayHours * 60 * 60 * 1000);
            }
            if(!isNaN(giveawayMinutes)){
                giveawayEnd = giveawayEnd + (giveawayMinutes * 60 * 1000);
            }
            timeArgs = !isNaN(giveawayDays) + !isNaN(giveawayHours) + !isNaN(giveawayMinutes)
            if(isNaN(giveawayDays) && isNaN(giveawayHours) && isNaN(giveawayMinutes)){
                message.channel.send("You gave me a wrong format, example: 30d 15h 20m");
                return;
            }
            GiveawayEmbed = new MessageEmbed();
            GiveawayEmbed.setFooter(ver);
            GiveawayEmbed.setTitle(interaction.options.getString('prize'));
            let GiveawayEndTime = new Date(giveawayEnd);
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
            interaction.options.getChannel('channel').send({ embeds: [GiveawayEmbed] }).then(message => {
                message.react("🎉");
                let Giveaways = JSON.parse(fs.readFileSync(__dirname + "/../giveaways.json"));
                Giveaways[Object.keys(Giveaways).length] = {
                    "guildid": interaction.guild.id,
                    "channelid": interaction.options.getChannel('channel').id,
                    "messageid": message.id,
                    "prize": interaction.options.getString('prize'),
                    "endtime": giveawayEnd,
                    "winner": 0
                };
                fs.writeFileSync(__dirname + "/../giveaways.json", JSON.stringify(Giveaways));
				bubblezclient.send(`New giveaway started\nPrize ${interaction.options.getString('prize')}\nhttps://discord.gg/Agg8huj in channel #giveaways`, { from: "Giveaways" });
                interaction.reply({ content: "Giveaway started", ephemeral: true });
            });
        }
    }
}
