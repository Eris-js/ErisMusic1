const { MessageEmbed } = require('discord.js');
const { MessageButton } = require('discord-buttons');
const { color } = require("../../config.json")

module.exports = {
    name: 'ping',
    category: 'user',
    aliases: ['pi','latecy'],
    description: "Check thời gian",
    usage: "",
	cooldown: 10000,
    execute (client, message, args) {
        const button = new MessageButton()
        .setStyle('url')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=854843272043429929&permissions=4294967287&scope=bot') 
        .setLabel('Invite me!')
        //.setDisabled();

        const time = process.uptime(),
		    hours = Math.floor(time / (60 * 60)),
		    minutes = Math.floor((time % (60 * 60)) / 60),
		    seconds = Math.floor(time % 60);

	    const timeStart = Date.now();

        const embed = new MessageEmbed()
            .setColor(`${color[0].primary}`)
            .setDescription('**🏓 Pong!**')
            .addFields(
                { name: 'Ping', value: `${Math.round(client.ws.ping)}ms`},
                { name: 'Uptime:' , value: `${hours}h - ${minutes}" - ${seconds}s`}
            )
            .setTimestamp()
            .setFooter(`${client.user.username}`,`${client.user.displayAvatarURL()}`);
        message.channel.send({
            buttons: button,
            embed: embed
        }).then(msg=>msg.delete({timeout:5000}))
    }
}