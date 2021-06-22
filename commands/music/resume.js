const { MessageEmbed } = require("discord.js");

module.exports = {
	name : "resume",
	description: "resume current Audio!",
	aliases : ["resum","rs"],
	category: "music",
	cooldown: 20000,
	async execute(client,message){
		var msg = message;
		var serverQueue = client.queue.get(msg.guild.id);
		const embed = new MessageEmbed()
		var guildvoice = client.voice.connections.get(message.guild.id);
		if(!guildvoice) return message.reply(embed.setDescription("<a:error:854851816289075260> | please letme join to room!"))
		if(guildvoice.channel.id !== msg.member.voice.channel.id) return message.send(embed.setDescription("<a:error:854851816289075260> | Dont disturb me!"))

		if (serverQueue && !serverQueue.playing) {
				serverQueue.playing = true;
				serverQueue.connection.dispatcher.resume();
				return msg.channel.send(embed.setDescription("<a:error:854851816289075260> | Resumed the music for you!"));
		}
		return msg.channel.send(embed.setDescription("<a:error:854851816289075260> | There is nothing playing."));
	}
}