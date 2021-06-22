const { MessageEmbed } = require("discord.js");
module.exports = {
	name : "queue",
	description: "check current queue!",
	aliases : ["q"],
	category: "music",
	cooldown: 20000,
	async execute(client,message){
		var msg = message;
		var utils = client.util;
		const embed = new MessageEmbed()
		var serverQueue = client.queue.get(msg.guild.id);

		if (!serverQueue) return msg.channel.send(embed.setDescription("<a:error:854851816289075260> | There is nothing playing."));
		var songs = [...serverQueue.songs];
		songs.shift();
		return msg.channel.send(`
__**Song Queue**__
${songs.map((song,i) => `**\`${utils.addZero(i+1)}\`** ${song.title}`).join("\n")}
**Now Playing: \`${serverQueue.songs[0].title}\`**
		`);
	}
}

