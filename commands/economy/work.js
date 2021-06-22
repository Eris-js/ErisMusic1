const db = require('quick.db');
const { MessageEmbed } = require('discord.js')
const { coins, color } = require('../../config.json')

module.exports = {
    name: "work",
    description: "Work your a** off",
    cooldown: 50000,
    aliases: ['w'],
    category: 'economy',
    async execute (client, message, args) {
        const embed = new MessageEmbed();
        let user = message.author;
        let timeout = 1200000;
        let author = await db.fetch(`worked_${user.id}`);
        let works = [
            "đi câu cá",
            "đi bán vé số",
            "đi sửa xe",
            "đi lái taxi",
            "chơi yasuo gánh team",
            "gangbang"
        ]
        const workr = works[Math.floor(Math.random() * works.length)];

        if(author !== null && timeout - (Date.now() - author) > 0) {
            let time = timeout - (Date.now() - author);
                minutes = Math.floor(time / 60000),
                seconds = ((time % 60000) / 1000).toFixed(0);
            const embed = new MessageEmbed()
                .setColor(`${color[0].error}`)
                .setDescription(`<:w_:855310315071471667> | Bạn đang trong thời gian chờ`)
                .setFooter(`Vui lòng thử lại sau: ${minutes} phút ${(seconds < 10 ? "0" : "")}${seconds} giây!`)
                .setTimestamp()
            return message.channel.send(embed);
        } else {
            let amount = Math.floor(Math.random() * 80) + 1;
            db.add(`money_${user.id}`, amount)
            db.set(`worked__${user.id}`, Date.now())
            const embed = new MessageEmbed()
                .setColor(`${color[0].succer}`)
                .setDescription(`<:w_:855310315071471667> | ${user.username}, bạn ${workr} nhận được \`${amount}\` ${coins}\n\nNhập \`!bal\` để xem ví tiền`)

            message.channel.send(embed)
        }
    }
}