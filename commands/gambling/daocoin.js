const { MessageEmbed } = require('discord.js')
const { coins, color  } = require("../../config.json")
const db = require('quick.db')

module.exports = {
    name: "daocoin",
    alisase: ["dcoin"],
    cooldown: 1000,
    description: "Đào coin, hoặc vàng",

    async execute(client, message, args) {
        let icon = ["<:gold:855901038128005152>","<:dat:855901361438195762>","<:da:855901127954530334>","<:lucbao:855901361115365456>","<:kimcuong:855901360210182145>","<:xuong:855924819803504660>","<:than:855901460544749588> "];
        let randomIcon = icon[Math.floor(Math.random() * icon.length)];
        let amount = "";
        
        if(randomIcon == "<:gold:855901038128005152>") title = "quặng vàng"
        if(randomIcon == "<:dat:855901361438195762>") title = "cục đất"
        if(randomIcon == "<:da:855901127954530334>") title = "cục đá"
        if(randomIcon == "<:lucbao:855901361115365456>") title = "quặng lục bảo"
        if(randomIcon == "<:kimcuong:855901360210182145>") title  = "quặng kim cương"
        if(randomIcon == "<:xuong:855924819803504660>") title  = "cục xương"
        if(randomIcon == "<:than:855901460544749588>") title  = "quặng than"
        
        if(randomIcon == "<:kimcuong:855901360210182145>") amount  = "1500"
        if(randomIcon == "<:gold:855901038128005152>") amount = "1000"
        if(randomIcon == "<:lucbao:855901361115365456>") amount = "800"
        if(randomIcon == "<:than:855901460544749588>") amount  = "500"
        if(randomIcon == "<:da:855901127954530334>") amount = "200"
        if(randomIcon == "<:dat:855901361438195762>") amount = "100"
        if(randomIcon == "<:xuong:855924819803504660>") amount  = "20"


        let timeout = 3600

        let timecoin = await db.fetch(`timecoin_${message.author.id}`);

        if(timecoin !== null && timeout - (Date.now() - timecoin) > 0){
            let time = timeout - (Date.now() - timecoin)
                , seconds = parseInt((time/1000)%60)
                , minutes = parseInt((time/(1000*60))%60)
                , hours = parseInt((time/(1000*60*60))%24);

            return message.channel.send(`**${message.author.username}**, bạn đang trong thời gian chờ`)

        } else {
        
            db.add(`money_${message.author.id}`, amount);
            db.set(`timecoin_${message.author.id}`, Date.now());

            return message.channel.send(`**${message.author.username}**, bạn đã đào được ${randomIcon} **${title}** với giá **__${amount}__** ${coins}`) 

        }
    }
}