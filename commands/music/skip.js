const { MessageEmbed } = require("discord.js");

module.exports = {
	name : "skip",
	description: "Skip now playing audio!",
	aliases : ["s"],
	category: "music",
	cooldown: 20000,
	async execute(client,message){
		var msg = message;
		const embed = new MessageEmbed()
		var serverQueue = client.queue.get(msg.guild.id);
		if (!msg.member.voice.channel ) return msg.channel.send(embed.setDescription("<a:error:854851816289075260> | I'm sorry but you need to be in a voice channel to play a music!"));
		var guildvoice = client.voice.connections.get(message.guild.id);
		if(!guildvoice) return message.reply(embed.setDescription("<a:error:854851816289075260> | please letme join to room!"))
		if(guildvoice.channel.id !== msg.member.voice.channel.id) return message.send(embed.setDescription("<a:error:854851816289075260> | dont disturb me!"))
		if (!serverQueue) return msg.channel.send(embed.setDescription("<a:error:854851816289075260> | There is nothing playing that I could **`skip`** for you."));
		serverQueue.connection.dispatcher.end(embed.setDescription("<a:error:854851816289075260> | Skip command has been used!"));
		return msg.channel.send(embed.setDescription("⏭️ | Skip command has been used!"));
	}
}



