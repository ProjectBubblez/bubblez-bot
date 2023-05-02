const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ApplicationCommandOptionType
} = require("discord.js");
const fetch = require("node-fetch");
const Dinero = require("dinero.js");
require('dotenv').config();
module.exports = {
    "name": "testcommand",
    "description": "this command will be used for many testings of things",
    //"options": [
        //{
            //name: 'username',
            //description: 'The username of the user you want to check',
            //type: ApplicationCommandOptionType.String,
            //required: true
        //}
    //],
    async execute(interaction){
        if(!developers.includes(interaction.user.id)) {
            interaction.reply({ content: "You don't have permission to run this command", ephemeral: true });
            return;
        }
        await interaction.deferReply();
        function convert(value){
            return Dinero({ amount: value, currency: 'GBP'}).toFormat()
        }
        let jsoninfo = "";
        let url = "https://api.starlingbank.com/api/v2/accounts/deada24e-8acb-4f20-9a18-12445bf5d914/balance"
        let headers = {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+process.env.BANKTOKEN
        }
        await fetch(url, {method: 'GET', headers: headers,}).then(res => res.json()).then(function(json){jsoninfo = json})
        let jsonamount = jsoninfo["amount"];
        let amountPence = jsonamount["minorUnits"];

        let jsonCurrentAmount = jsoninfo["effectiveBalance"];
        let currentAmountPence = jsonCurrentAmount["minorUnits"];

        let jsonPending = jsoninfo["pendingTransactions"];
        let pendingPence = jsonPending["minorUnits"];
        // console.log(convert(amountPence));
        let bank = new EmbedBuilder();
            // const row = new ActionRowBuilder()
			// .addComponents(
			// 	new ButtonBuilder()
			// 		.setLabel('Website')
			// 		.setStyle(ButtonStyle.Link)
            //         .setURL(`https://bubblez.app/home`),
			// );
			// userinfo.setDescription("Made with: [bubblez.js](https://www.npmjs.com/package/bubblez.js)");
            // bank.setDescription("\"Amount\" (never trust): "+convert(amountPence)+"\nCurrent Amount (what we can still spend): "+convert(currentAmountPence)+"\nPending (what still needs to go out): "+convert(pendingPence))
            bank.addFields(
                { name: "\"Amount\" `(never trust)`", value: `\`${convert(amountPence)}\``},
                { name: "Current Amount `(what we can still spend)`", value: `\`${convert(currentAmountPence)}\``},
                { name: "Pending `(what still needs to go out)`", value: `\`${convert(pendingPence)}\``}
                )
            // interaction.editReply({ embeds: [userinfo], components: [row] });
            interaction.editReply({ embeds: [bank]});
    }
}
