const { getAudioUrl } = require('google-tts-api');
const { MessageEmbed } = require("discord.js")
const { color } = require("../../config.json")

module.exports = {
    name: 'speak',
    aliases: ['sp', 'talk'],
    category: 'fun',
    description: "Chuyển đổi văn bản thành voice",
    usage: "[Văn bản]",
    cooldown: 1000,
    async execute  (client, message, args) {
        
        if (!args[0]) {
        const embed = new MessageEmbed()
            .setColor(`${color[0].error}`)
            .setDescription('<a:error:854851816289075260> | Vui lòng nhập nội dung để bot nói')
        return message.channel.send(embed);
        }
        const string = args.join(' ');
        if (string.length > 200){
            const embed = new MessageEmbed()
            .setColor(`${color[0].error}`)
            .setDescription('<a:error:854851816289075260> | Vui lòng nhập nội dụng dưới 200 kí tự')
            return message.channel.send(embed)
        } 
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel){
            const embed = new MessageEmbed()
            .setColor(`${color[0].error}`)
            .setDescription('<a:error:854851816289075260> | Bạn phải vào room voice để sử dụng lệnh này!')
            return message.channel.send(embed)
        }
        const audioUrl = await getAudioUrl(string, {
            lang: 'vi',
            slow: false,
            host: 'https://translate.google.com',
            timeout: 100,
        });
        try {
            voiceChannel.join().then(connection => {
                const dispatcher = connection.play(audioUrl);
                dispatcher.on('finish', () => {
                    voiceChannel.leave();
                });
            });
        }
        catch(e) {
            message.channel.send(embed.setColor(`${color[0].error}`).setDescription('<a:error:854851816289075260> | Bot lỗi, vui lòng thử lại sau'));
            console.log(e)
        }

    }
}