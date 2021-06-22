const { MessageEmbed } = require("discord.js");

module.exports = {
	name : "volume",
	description: "change player volume",
	aliases : ["vol","v"],
	ussage : "[ Number 0 - 100 ]",
	category: "music",
	cooldown: 100,
	async execute(client,message,args){
		var msg = message;
		const embed = new MessageEmbed()
		var serverQueue = client.queue.get(msg.guild.id);
		

		if (!msg.member.voice.channel) return msg.channel.send(embed.setDescription("<a:error:854851816289075260> | I'm sorry but you need to be in a voice channel to play music!"));
		var guildvoice = client.voice.connections.get(message.guild.id);
		if(!guildvoice) return message.reply(embed.setDescription("<a:error:854851816289075260> | please letme join to room!"))
		if(guildvoice.channel.id !== msg.member.voice.channel.id) return message.reply(embed.setDescription("<a:error:854851816289075260>| Dont disturb me!"));

		if (!serverQueue) return msg.channel.send(embed.setDescription("<a:error:854851816289075260> | There is nothing playing."));
		if (!args[0]) return msg.channel.send(embed.setDescription(`<a:error:854851816289075260> | The current volume is: **\`${serverQueue.volume}%\`**`));
		if (isNaN(args[0]) || args[0] > 100) return msg.channel.send(embed.setDescription("<a:error:854851816289075260> | Volume only can be set in range **1** - **100**."));
		serverQueue.volume = args[0];
		serverQueue.connection.dispatcher.setVolume(args[0] / 100);
		return msg.channel.send(embed.setDescription(`I set the volume to: **\`${args[0]}%\`**`));
	}
}