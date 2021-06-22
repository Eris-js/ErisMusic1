
const { ownerID, color, coins } = require('../../config.json')
const { MessageEmbed } = require('discord.js')
const db = require("quick.db")
module.exports = {
    name: "bank",
    cooldown: 100,
    description: "Thay đổi số tiền của thành viên",
    aliases: ['rb'],
    category: 'dev',
    async execute(client, message, args) {

        if( message.author.id !== ownerID) return;
        let user = message.mentions.users.first();
        let amount = args[2];
        switch(args[0]) {
            case "add":
                if(isNaN(amount)) {
                    const embed = new MessageEmbed()
                        .setColor(`${color[0].error}`)
                        .setTitle(`🏦 | Banking Services`)
                        .setDescription('Số tiền bạn nhập vào không phải là số')
                    return message.channel.send(embed)
                }
                if (args[1] == "me") {
                    const embed = new MessageEmbed()
                        .setColor(`${color[0].primary}`)
                        .setTitle(`🏦 | Banking Services`)
                        .setDescription(`Ngân hàng đã chuyển cho bạn **${amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}** ${coins} `)
                message.channel.send(embed)
                db.add(`money_${message.author.id}`, amount)
                } else {
                    const embed = new MessageEmbed()
                    .setColor(`${color[0].primary}`)
                    .setTitle(`🏦 | Banking Services`)
                    .setDescription(`${user}, bạn nhận được **${amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}** ${coins} từ ngân hàng`)
                message.channel.send(embed)
                db.add(`money_${user.id}`, amount)
                }
            break;
            case "move":
                if (args[1] == "me") {
                    if(isNaN(amount)) {
                        const embed = new MessageEmbed()
                            .setColor(`${color[0].error}`)
                            .setTitle(`🏦 | Banking Services`)
                            .setDescription('Số tiền bạn nhập vào không phải là số')
                        return message.channel.send(embed)
                    }
                    const embed = new MessageEmbed()
                        .setColor(`${color[0].primary}`)
                        .setTitle(`🏦 | Banking Services`)
                        .setDescription(`Vì thua nhập bất trình ngân hàng tịch thu **${amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}** ${coins} của bạn `)
                message.channel.send(embed)
                db.subtract(`money_${message.author.id}`, amount)
                } 
                if (args[1] == "all") {
                    let user =  message.mentions.users.first() || message.author;
                    let given = await db.fetch(`money_${user.id}`);
                    const embed = new MessageEmbed()
                    .setColor(`${color[0].primary}`)
                    .setTitle(`🏦 | Banking Services`)
                    .setDescription(`${user}, vì thua nhập bất trình ngân hàng tịch thu toàn bộ ${coins} của bạn`)
                message.channel.send(embed)
                db.subtract(`money_${user.id}`, given)
                } else {
                    if(isNaN(amount)) {
                        const embed = new MessageEmbed()
                            .setColor(`${color[0].error}`)
                            .setTitle(`🏦 | Banking Services`)
                            .setDescription('Số tiền bạn nhập vào không phải là số')
                        return message.channel.send(embed)
                    }
                    const embed = new MessageEmbed()
                    .setColor(`${color[0].primary}`)
                    .setTitle(`🏦 | Banking Services`)
                    .setDescription(`${user}, vì thua nhập bất trình ngân hàng tịch thu **${amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}** ${coins} của bạn`)
                message.channel.send(embed)
                db.subtract(`money_${user.id}`, amount)
                }
            break;
        }
    }
}