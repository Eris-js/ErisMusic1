const { MessageEmbed } = require("discord.js");
module.exports = {
	name : "loop",
	description: "loop current queue!",
	aliases : ["lp"],
	cooldown: 20000,
	category: "music",

	async execute(client,message){
		var msg = message;
		const embed = new MessageEmbed()
		var serverQueue = client.queue.get(msg.guild.id);
		if (!msg.member.voice.channel ) return msg.channel.send(embed.setDescription("<a:error:854851816289075260> | I'm sorry but you need to be in a voice channel to play a music!"));
		var guildvoice = client.voice.connections.get(message.guild.id);
		if(!guildvoice) return message.send(embed.setDescription("<a:error:854851816289075260> | please letme join to room!"));
		if (serverQueue) {
            serverQueue.loop = !serverQueue.loop;
            return msg.channel.send(embed.setDescription(`<a:error:854851816289075260> | Loop ${serverQueue.loop === true ? "enabled" : "disabled"}!`));
        }
        return msg.channel.send(embed.setDescription("<a:error:854851816289075260> | There is nothing playing."));
	}
}



