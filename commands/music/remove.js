const { MessageEmbed } = require("discord.js");

module.exports = {
	name : "remove",
	description: "remove specific queue!",
	aliases : ["rm"],
	ussage : "[ list-index ]",
	category: "music",
	cooldown: 20000,
	async execute(client,message,args){
        if(!args[0]) return message.reply(embed.setDescription("please provide the index to remove!"));
        var num = parseInt(args[0]);
		var msg = message;
		const embed = new MessageEmbed()
		var serverQueue = client.queue.get(msg.guild.id);
		if (!msg.member.voice.channel ) return msg.channel.send(embed.setDescription("<a:error:854851816289075260> | I'm sorry but you need to be in a voice channel to play a music!"));
		var guildvoice = client.voice.connections.get(message.guild.id);
		if(!guildvoice) return message.reply(embed.setDescription("<a:error:854851816289075260> | please letme join to room!"));
		if (serverQueue) {
            if(!serverQueue.songs) return message.reply(embed.setDescription("<a:error:854851816289075260> | No songs on queue!"));
            if(num <= 0 || num > serverQueue.songs.length) return msg.reply(embed.setDescription("<a:error:854851816289075260> | Out of range!"));
            var rmm = serverQueue.songs[num];
            serverQueue.songs.splice(num,1);
            return msg.channel.send(embed.setDescription(`<a:error:854851816289075260> | Success remove \`${rmm.title}\`!`));
        }
        return msg.channel.send(embed.setDescription("<a:error:854851816289075260> | There is no queue rn"));
	}
}



