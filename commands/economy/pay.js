const db = require('quick.db');
const { MessageEmbed } = require('discord.js')
const { coins, color } = require('../../config.json')

module.exports = {
    name: "pay",
    description: "Transfer money to others",
    cooldown: 50000,
    aliases: ['pa'],
    category: 'economy',
    async execute (client, message, args) {
        let mentions = message.mentions.users.first();

        let given = await db.fetch(`money_${message.author.id}`);
        if(given === null) given = 0;
        let amount = args[1];

        if(!mentions) {
            return message.channel.send("Mention A User")
        }

        if (given < 0) {
            const embed = new MessageEmbed()
            .setColor(`${color[0].error}`)
            .setDescription("Số dư của bạn không đủ")
            return message.channel.send(embed)
        }

        if (message.content.includes('-')) {
            return message.reaply('You cant give minus mount')
        }
        const embed = new MessageEmbed()
            .setColor(`${color[0].succer}`)
            .setAuthor(`💸 | Money Deposit`)
            .setDescription(`${mentions} nhận được **${amount}** ${coins} từ **${message.author.username}**`)
        message.channel.send(embed)
        
        db.subtract(`money_${message.author.id}`, amount)
        db.add(`money_${mentions.id}`, amount)  
    }
}