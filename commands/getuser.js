const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ApplicationCommandOptionType
} = require("discord.js");
module.exports = {
    "name": "getuser",
    "description": "Get info from a user on bubblez",
    "options": [
        {
            name: 'username',
            description: 'The username of the user you want to check',
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    async execute(interaction){
        await interaction.deferReply();
        let userinfo = new EmbedBuilder();
        bubblezclient.getUser(interaction.options.getString("username")).then(user => {
            const row = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setLabel('See profile')
					.setStyle(ButtonStyle.Link)
                    .setURL(`https://bubblez.app/p?${user.username}`),
			);
            let pronoun;
            if(user.pronoun == "aeaer") pronoun = "Ae/Aer";
            if(user.pronoun == "any") pronoun = "Any";
            if(user.pronoun == "eem") pronoun = "E/Em";
            if(user.pronoun == "faefaer") pronoun = "Fae/Faer";
            if(user.pronoun == "hehim") pronoun = "He/Him";
            if(user.pronoun == "heshe") pronoun = "He/She";
            if(user.pronoun == "hethem") pronoun = "He/Them";
            if(user.pronoun == "itits") pronoun = "It/Its";
            if(user.pronoun == "other") pronoun = "Other";
            if(user.pronoun == "perper") pronoun = "Per/Per";
            if(user.pronoun == "sheher") pronoun = "She/Her";
            if(user.pronoun == "shethem") pronoun = "She/They";
            if(user.pronoun == "theythem") pronoun = "They/Them";
            if(user.pronoun == "vever") pronoun = "Ve/Ver";
            if(user.pronoun == "xexem") pronoun = "Xe/Xem";
            if(user.pronoun == "ziehir") pronoun = "Zie/Hir";
            if(user.pronoun == "none") pronoun = "None";
            var badges = "";
            JSON.parse(user.rank).forEach(rank => {
                // badges += `${rank.charAt(0).toUpperCase()}${rank.slice(1)}\n`;
                switch(rank){
                    default:
                    break;
                    case "founder":
                        badges += `<:FounderBadge:1051251248084553808> `;
                    break;
                    case "admin":
                        badges += `<:DevBadge:1051251246834655242> `;
                    break;
                    case "mod":
                        badges += `<:StaffBadge:1051251252798947488> `;
                    break;
                    case "verified":
                        badges += `<:VerifiedBadge:1051251244326457374> `;
                    break;
                    case "pro":
                        badges += `<:ProBadge:1051251250278174760> `;
                    break;
                    case "partner":
                        badges += `<:PartnerBadge:1051251251532283944> `;
                    break;
                    case "news":
                        badges += `<:NewsBadge:1051251249162485800> `;
                    break;
                    case "bot":
                        badges += `<:BotBadge:1051251245505069137> `;
                    break;
                }
            });
            if(badges == "") badges = "None";
            userinfo.setTitle("Bubblez Profile Info");
            userinfo.setDescription("Made with: [bubblez.js](https://www.npmjs.com/package/bubblez.js)");
            userinfo.setColor("#00cc99");
	        // userinfo.addField("UUID", user.uuid, true);
            // userinfo.addField("Username", `${user.username}`, true);
            // userinfo.addField("Displayname", user.displayname, true);
			// userinfo.addField("Followers", user.followers.toString(), true);
            // userinfo.addField("Pronoun", pronoun, true);
            // userinfo.addField("Badges", badges, true);
            // userinfo.addField("Coins", user.coins, true);
            userinfo.addFields([
                { name: "UUID", value: user.uuid, inline: true },
                { name: "Username", value: `${user.username}`, inline: true },
                { name: "Displayname", value: user.displayname, inline: true },
                { name: "Followers", value: user.followers.toString(), inline: true },
                { name: "Pronoun", value: pronoun, inline: true },
                { name: "Badges", value: badges, inline: true },
                { name: "Coins", value: user.coins, inline: true },
            ])
            userinfo.setFooter({ text: ver });
            let bio;
            if(user.bio && user.bio.length > 100){
                bio = user.bio.slice(0, 100) + "...";
            }else{
                bio = user.bio;
            }
            // userinfo.addField("Bio", `${bio ? bio : "This user does not have a bio."}`);
            userinfo.addFields([
                { name: "Bio", value: `${bio ? bio : "This user does not have a bio."}`, inline: true },
            ])
            userinfo.setThumbnail(user.pfp);
            interaction.editReply({ embeds: [userinfo], components: [row] });
        }).catch(err => {
            console.log(err);
            interaction.editReply({ content: "User not found" });
            return;
        });
    }
}
