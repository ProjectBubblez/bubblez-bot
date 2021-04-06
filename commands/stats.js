const {
    MessageEmbed
} = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");
const cpuStat = require("cpu-stat");
module.exports = {
    "name": "stats",
    "description": "Bubblez Bot Stats",
    execute(message, args){
		cpuStat.usagePercent(function(err, percent, seconds) {
			if (err) {
				return console.log(err);
			}

			var duration = moment
				.duration(bot.uptime)
				.format(" D [days], H [hrs], m [mins], s [secs]");
			var Stats = new MessageEmbed()
				.setTitle("*** Stats ***")
				.setColor("#C0C0C0")
				.addField("• Mem Usage",`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,true)
				.addField("• Uptime ", `${duration}`, true)
				//.addField("• Discord.js", `v${version}`, true)
				//.addField("• Node", `${process.version}`, true)
				.addField("• CPU",`\`\`\`md\n${os.cpus().map(i => `${i.model}`)[0]}\`\`\``)
				.addField("• CPU usage", `\`${percent.toFixed(2)}%\``, true)
				.addField("• Arch", `\`${os.arch()}\``, true)
				.addField("• Platform", `\`\`${os.platform()}\`\``, true)
				.setFooter(ver);
			message.channel.send(Stats);
		});
		
    }
}