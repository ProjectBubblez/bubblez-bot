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
            userinfo.setTitle("Bubblez Profile Info");
            userinfo.setDescription("Made with: [bubblez.js](https://www.npmjs.com/package/bubblez.js)");
            userinfo.setColor("#00cc99");
	    userinfo.addField("UUID", user.UUID, true);
            userinfo.addField("Username", `[${user.username}](https://bubblez.app/p?${user.username})`, true);
            userinfo.addField("Displayname", user.displayname, true);
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
