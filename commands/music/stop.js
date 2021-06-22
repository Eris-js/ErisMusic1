const { MessageEmbed } = require("discord.js");

module.exports = {
	name : "stop",
	description: "stop nowplaying audio",
	aliases : ["st","disconnect","dc"],
	category: "music",
	cooldown: 20000,
	async execute(client,message){
		var msg = message;
		const embed = new MessageEmbed()
		var serverQueue = client.queue.get(msg.guild.id);
		
		if (!msg.member.voice.channel) return msg.channel.send(embed.setDescription("<a:error:854851816289075260> | I'm sorry but you need to be in a voice channel to play music!"));
		var guildvoice = client.voice.connections.get(message.guild.id);
		if(!guildvoice) return message.send(embed.setDescription("<a:error:854851816289075260> | Please letme join to room!"))
		if(guildvoice.channel.id !== msg.member.voice.channel.id) return message.reply(embed.setDescription("<a:error:854851816289075260> | Dont disturb me!"))
		if (!serverQueue) return msg.channel.send(embed.setDescription("<a:error:854851816289075260> | There is nothing playing that I could **`stop`** for you."));
		serverQueue.songs = [];
		serverQueue.connection.dispatcher.end(embed.setDescription("<a:error:854851816289075260> | Stop command has been used!"));
		return msg.channel.send(embed.setDescription("⏹️ | Stop command has been used!"));
	}
}