const { MessageEmbed } = require("discord.js");
module.exports = {
	name : "pause",
	description: "pause current Audio!",
	aliases : ["ps"],
	cooldown: 20000,
	category: "music",

	async execute(client,message){
		var msg = message;
		const embed = new MessageEmbed()
		var serverQueue = client.queue.get(msg.guild.id);

		var guildvoice = client.voice.connections.get(message.guild.id);
		if(!guildvoice) return message.reply(embed.setDescription("<a:error:854851816289075260> | please letme join to room!"));
		if(guildvoice.channel.id !== msg.member.voice.channel.id) return message.reply(embed.setDescription("<a:error:854851816289075260> | Dont disturb me!"))
			
		if (serverQueue && serverQueue.playing) {
				serverQueue.playing = false;
				serverQueue.connection.dispatcher.pause();
				return msg.channel.send(embed.setDescription("<a:success:854851799063461940> | Paused the music for you!"));
		}
		return msg.channel.send(embed.setDescription("<a:error:854851816289075260> | There is nothing playing."));
	}
}