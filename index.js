const { Collection } = require('discord.js')
const BotClient = require("./structures/BotClient.js");

const { readdirSync } = require('fs')
const ms = require('ms')

const client = new BotClient();
require('discord-buttons')(client);

const config = require('./config.json');
const token = config.token
client.config = config;
module.exports = client;
client.commands = new Collection();
client.aliases = new Collection();


client.categories = readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("warn", console.warn);
client.on("error", console.error);

client.on("voiceStateUpdate", (mold, mnew) => {
	if( !mold.channelID) return;
	if( !mnew.channelID && client.user.id == mold.id ) {
		 const serverQueue = client.queue.get(mold.guild.id);
		 if(serverQueue)  client.queue.delete(mold.guild.id);
	} ;
})

client.login(token)