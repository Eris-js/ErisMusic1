const { MessageEmbed } = require('discord.js');
const { color } = require("../../config.json")

module.exports = {
    name : 'clear',
    aliases : ['cle'],
    cooldown: 1000,
    async execute(client, message, args){
        const embed = new MessageEmbed()
        if(!args[0]) return message.channel.send(embed.setColor(`${color[0].error}`).setDescription('<a:error:854851816289075260> | Please specify a number of messages to delete ranging from 1 - 99'))
        if(isNaN(args[0])) return message.channel.send(embed.setColor(`${color[0].error}`).setDescription('<a:error:854851816289075260> | Numbers are only allowed'))
        if(parseInt(args[0]) > 99) return message.channel.send(embed.setColor(`${color[0].error}`).setDescription('<a:error:854851816289075260> | The max amount of messages that I can delete is 99'))
        await message.channel.bulkDelete(parseInt(args[0]) + 1)
            .catch(err => console.log(err))
        message.channel.send(embed.setColor(`${color[0].succer}`).setDescription('<a:success:854851799063461940> | Deleted ' + args[0]  + " messages."))
    }
}