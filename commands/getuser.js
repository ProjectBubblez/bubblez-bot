const {
    MessageEmbed
} = require("discord.js");
module.exports = {
    "name": "getuser",
    "aliases": [
        'gu'
    ],
    "description": "Get info from a user on bubblez",
    execute(message, args){
        if(!args[1]) {
            message.channel.send("You didn't specify a bubblez user");
            return;
        }
        let userinfo = new MessageEmbed();
        BubblezClient.getUser(args[1]).then(user => {
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
            if(user.pronoun == "brobro") pronoun = "Bro/Bro";
            if(user.pronoun == "none") pronoun = "None";
            userinfo.setTitle("Bubblez Profile Info");
            userinfo.setDescription("Made with: [bubblez.js](https://www.npmjs.com/package/bubblez.js)");
            userinfo.setColor("#00cc99");
	        userinfo.addField("UUID", user.UUID, true);
            userinfo.addField("Username", `[${user.username}](https://bubblez.app/p?${user.username})`, true);
            userinfo.addField("Displayname", user.displayname, true);
            userinfo.addField("Pronoun", pronoun, true);
            userinfo.addField("Rank", `${user.rank ? user.rank : "user"}`, true);
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
            message.channel.send(userinfo);
        }).catch(err => {
            message.channel.send("User not found");
            return;
        });
    }
}
