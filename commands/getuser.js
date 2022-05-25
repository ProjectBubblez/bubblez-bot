const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js");
module.exports = {
    "name": "getuser",
    "description": "Get info from a user on bubblez",
    "options": [
        {
            name: 'username',
            description: 'The username of the user you want to check',
            type: 'STRING',
            required: true
        }
    ],
    async execute(interaction){
        await interaction.deferReply();
        let userinfo = new MessageEmbed();
        bubblezclient.getUser(interaction.options.getString("username")).then(user => {
            const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setLabel('See profile')
					.setStyle('LINK')
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
                badges += `${rank.charAt(0).toUpperCase()}${rank.slice(1)}\n`;
            });
            if(badges == "") badges = "User";
            userinfo.setTitle("Bubblez Profile Info");
            userinfo.setDescription("Made with: [bubblez.js](https://www.npmjs.com/package/bubblez.js)");
            userinfo.setColor("#00cc99");
	        userinfo.addField("UUID", user.uuid, true);
            userinfo.addField("Username", `${user.username}`, true);
            userinfo.addField("Displayname", user.displayname, true);
			userinfo.addField("Followers", user.followers.toString(), true);
            userinfo.addField("Pronoun", pronoun, true);
            userinfo.addField("Badges", badges, true);
            userinfo.addField("Coins", user.coins, true);
            userinfo.setFooter(ver);
            let bio;
            if(user.bio && user.bio.length > 100){
                bio = user.bio.slice(0, 100) + "...";
            }else{
                bio = user.bio;
            }
            userinfo.addField("Bio", `${bio ? bio : "This user does not have a bio."}`);
            userinfo.setThumbnail(user.pfp);
            interaction.editReply({ embeds: [userinfo], components: [row] });
        }).catch(err => {
            console.log(err);
            interaction.editReply({ content: "User not found" });
            return;
        });
    }
}
