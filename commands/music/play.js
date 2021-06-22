const { MessageEmbed } = require("discord.js");

module.exports = {
	name : "play",
	description: "Play Music from Yt or given Url",
	aliases : ["p","music"],
	ussage : "[Song Title | Url]",
	category: "music",
	cooldown: 100,
	async execute(client,message,args){
		const embed = new MessageEmbed()
		if(!args[0]) return message.send(embed.setDescription("<a:error:854851816289075260> | Please provide url or search query!"));
		var msg = message;
		const voiceChannel = msg.member.voice.channel;
		const youtube = client.youtube;
		const colors = client.colors;
		const type = "YT";

		const url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
		const searchString = args.join(" ");

		if (!voiceChannel) return msg.channel.send(embed.setDescription("<a:error:854851816289075260> | I'm sorry but you need to be in a voice channel to play a music!"));
		const permissions = voiceChannel.permissionsFor(msg.client.user);
		if (!permissions.has("CONNECT")) {
				return msg.channel.send(embed.setDescription("<a:error:854851816289075260> | Sorry, but I need **`CONNECT`** permissions to proceed!"));
		}
		if (!permissions.has("SPEAK")) {
				return msg.channel.send(embed.setDescription("<a:error:854851816289075260> | Sorry, but I need **`SPEAK`** permissions to proceed!"));
		}

		// handling f args is YT Uri with playlist
		if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
			const playlist = await youtube.getPlaylist(url);
			const videos = await playlist.getVideos();
			for (const video of Object.values(videos)) {
					const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
					await client.players.handleVideo(client,video2, msg, voiceChannel, true, type); // eslint-disable-line no-await-in-loop
			}
			return msg.channel.send(embed.setDescription(`<a:success:854851799063461940> | Playlist: **\`${playlist.title}\`** has been added to the queue!`));
		} else {
			// else try execute the youtube from given url
			try {
				var video = await youtube.getVideo(url);
			} catch (error) {
				try {
					// try to search Youtube form given query
					var videos = await youtube.searchVideos(searchString, 10);
					var video = await youtube.getVideoByID(videos[0].id);
					if (!video) return msg.channel.send(embed.setDescription("<a:error:854851816289075260> |  I could not obtain any search results."));
				} catch (err) {
					console.error(err);
					return msg.channel.send(embed.setDescription("<a:error:854851816289075260> | I could not obtain any search results."));
				}
			}
			return client.players.handleVideo(client,video, msg, voiceChannel, false, type);
		}
	}
}