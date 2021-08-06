require('dotenv').config();
const discord = require("discord.js");
const bubblez = require("bubblez.js");
bubblezclient = new bubblez.Client({
    default: {
        from: "Bubblez Bot"
    }
});
const fs = require("fs");
const colors = require('colors');
client = new discord.Client({ intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES] });

global.ver = `V2.${fs.readdirSync("./commands/").length}.28`;
global.footer = "Created by the Bubblez Team";
global.developers = [
    '200612445373464576',
    '347067975544733707',
    '476641014841475084',
    '316673724990488577'
];
var activities = [
	{ msg: ver, suggest: '709745787093123119', type: 'WATCHING' },
	{ msg: 'Live', suggest: '709745787093123119', type: 'PLAYING' },
	{ msg: 'some bad music', suggest: '200612445373464576', type: 'LISTENING' },
    	{ msg: 'show cool messages', suggest: '476641014841475084', type: 'PLAYING' },
	{ msg: 'with some catgirls', suggest: '476641014841475084', type: 'PLAYING' },
	{ msg: 'trombone porn', suggest: '430520245288173568', type: 'WATCHING' }
]

setInterval(() => {
    var msg = activities[Math.floor(Math.random() * activities.length)]
    var activity = msg.msg;
    if(msg.suggest != 709745787093123119) {
	  client.users.fetch(msg.suggest).then(i => {var activity = `${activity} - ${i.username}"#"${i.discriminator}`});
    }
    client.user.setPresence({ activities: [{ name: activity, type: msg.type }], status: 'online'});
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

console.log('➤  '.gray + "Started loading commands".gray);
client.commands = new discord.Collection();
let commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith('.js'));
commandFiles.forEach(commandName => {
    let command = require(`./commands/${commandName}`);
    console.log('➤  '.gray + `Loading command: ${command.name}`.gray);
    client.commands.set(command.name, command);
})
console.log('➤  '.gray + "Finished loading commands".gray);

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
            let savedcommand = await (client.guilds.cache.get('806672125602824232') ?? await client.guilds.fetch('806672125602824232')).commands.create(data);
            if(command.developerOnly == true){
                let permissions = [];
                developers.forEach(developer => {
                    permissions.push({
                        id: developer,
                        type: 'USER',
                        permission: true
                    });
                });
                savedcommand.permissions.set({ permissions });
            }
            console.log(`Saved ${command.name}`);
        });
    }else{
        console.log("false");
    }
	console.log('✔  '.green + colors.green(`Bot is ready | ${ver}`));
});

bubblezclient.once('ready', async (user) => {
    console.log(`Logged in as: ${user.username}`);
});

client.on('interactionCreate', async (interaction) => {
	if (!interaction.isCommand()) return;
	try{
        await client.commands.get(interaction.commandName).execute(interaction);
    }catch(err){
        console.log(`Command: ${interaction.commandName}, run by: ${interaction.user.username}#${interaction.user.discriminator} failed for the reason: ${err}`);
        await interaction.reply({ content: "Something went wrong", ephemeral: true });
    }
});

client.login(process.env.DTOKEN);
bubblezclient.login(process.env.BTOKEN);
