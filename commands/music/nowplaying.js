const { MessageEmbed } = require("discord.js");
module.exports = {
	name : "nowplaying",
	description: "check Nowplaying Audio!",
	aliases : ["np"],
	cooldown: 20000,
	category: "music",

	async execute(client,message){
		var msg = message;
		const embed = new MessageEmbed()
		var serverQueue = client.queue.get(msg.guild.id);

		if (!serverQueue) return msg.channel.send(embed.setDescription("<a:error:854851816289075260> | There is nothing playing."));
		return msg.channel.send(embed.setDescription(`<a:error:854851816289075260> | Now Playing:\`${serverQueue.songs[0].title}\`**`));
	}
}