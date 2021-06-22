const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
const { coins, bank, color } = require("../../config.json")

module.exports = {
    name: "balance",
    description: "bleh",
    cooldown: 1000,
    aliases: ['bal'],
    category: 'economy',
    async execute (client, message, args) {
        let user = message.mentions.users.first() || message.author;
        
        let bal = await db.fetch(`money_${user.id}`);
        
        if(bal === null) bal = 0;

        const embed = new MessageEmbed()
            .setColor(`${color[0].primary}`)
            .setAuthor(`Ví tiền của ${user.username}`, message.member.user.displayAvatarURL())
            .setDescription(`${bank} | Số tiền bạn hiện có là **__${bal.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}__** ${coins}`)
        message.channel.send(embed)
    }
}