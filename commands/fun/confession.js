const { MessageEmbed } = require('discord.js')
const { color } = require('../../config.json')
const { readFileSync, writeFileSync } = require('fs');
const picExt = [".webp", ".png", ".jpg", ".jpeg", ".gif"];
const videoExt = [".mp4", ".webm", ".mov"]

module.exports = {
    name: "confession",
    alases: ["cfs"],
    cooldown: 1000,
    async execute (client, message, args) {
        let embed = new MessageEmbed()
        if (message.content.length > 1024) {
            embed.setDescription('Confession chỉ được dưới 1024 kí tự')
            return message.channel.send(embed)
        } else {
            await message.react('👍');
            message.channel.send('Đã gửi confession thành công');
            let count = JSON.parse(readFileSync('../../count.json')).count;
            count++;
            const cfsChannel = client.channel.cache.get("822137702186221620");
            if(!cfsChannel) return;

            embed.setDescription(`${message.content}\nTừ người ẩn danh số: ${count}`);
            if (message.attachment.array().length > 0) {
                let attachment = message.attachment.array()[0];
                if (!attachment)
                picExt.forEach(ext => {
                    if (attachment.name.endsWith(ext)) embed.setImage(attachment.attachment);
                });
                videoExt.forEach(ext => {
                    if (attachment.name.endsWith(ext)) embed.setImage(attachment.attachment);
                });
            }
            
            cfsChannel.send(embed)
            writeFileSync('../../count.json', JSON.stringify({ count: coint}));
        }
    }
}