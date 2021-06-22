const db = require('quick.db');
const { MessageEmbed } = require("discord.js")
const { coins, color } = require("../../config.json")

module.exports = {
    name: "daily",
    description: "Receive a daily award of money",
    cooldown: 1000,
    aliases: ['da'],
    category: 'economy',
    async execute (client, message, args) {
        let user = message.author;
        let timeout = 43200000;
        let amount = 500;
        

        let daily = await db.fetch(`daily_${user.id}`);

        if(daily !== null && timeout - (Date.now() - daily) > 0){
            let time = timeout - (Date.now() - daily)
                , seconds = parseInt((time/1000)%60)
                , minutes = parseInt((time/(1000*60))%60)
                , hours = parseInt((time/(1000*60*60))%24);

            const embed = new MessageEmbed()
                .setColor(`${color[0].error}`)
                .setAuthor(`${user.username}, điểm danh hàng ngày`,message.member.user.displayAvatarURL())
                .setDescription(`<:w_:855310315071471667> | Bạn đã nhận được phần thưởng ngày hôm nay`)
                .setFooter(`Quay lại sau: ${hours} tiếng ${minutes} phút ${(seconds < 10 ? "0" : "")}${seconds} giây!`)

            return message.channel.send(embed)

        } else {
            db.add(`money_${user.id}`, amount);
            db.set(`daily_${user.id}`, Date.now());

            const embed = new MessageEmbed()
                .setColor(`${color[0].succer}`)
                .setAuthor(`${user.username}, điểm danh hàng ngày`, message.member.user.displayAvatarURL())
                .setDescription(`Bạn đã nhận thành công ${amount} ${coins} vào tài khoản\n\nNhập \`!bal\` để xem ví tiền`)
            message.channel.send(embed)
        }
    }
}