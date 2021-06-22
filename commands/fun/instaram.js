const axios = require('axios');
const { stripIndent } = require('common-tags');
const { MessageEmbed } = require('discord.js');
const { color } = require('../../config.json')

module.exports = {
    name: "instagram",
    aliases: ['ins'],
    category: 'fun',
    description: "Check thông tin instaram",
    usage: `<Tên người dùng>`,
    cooldown: 10000,
    async execute (client, message, args) {
        const embed1 = new MessageEmbed()
        if (!args[0]) return message.channel.send(embed1.setColor(`${color[0].error}`).setDescription('<a:error:854851816289075260> | Vui lòng nhập tên instagram!'));
        const instagram_id = args.join(' ');
        const cookie = 'mid=YGDV4QALAAHx67JEf_UHj_bJzSHf; ig_did=A8783F64-F91B-415E-93D8-FB0F0EFB80A5; ig_nrcb=1; fbm_124024574287414=base_domain=.instagram.com; fbsr_124024574287414=25-UfQGNeV62gWETwLp5AOdCnnluEh39vetjBo3jwRY.eyJ1c2VyX2lkIjoiMTAwMDQzODA0MTc3NDYzIiwiY29kZSI6IkFRRGpTRmdsVmd1b3hXeEpOT29rb1FPbEFyVzcxdzY2dWtYNy1zazU0OVJEN0wtT0pyLUJuUUtqZFJWMFFBNURLdkJvMXhheHNqMFQ3cUgtUmFFbm5HNV9sdEM1NDFWODNnYXpodkRhbUsyQmFHZms2QnE4enVsNkxyalhFQWpWUUZDUjBDdDMwenY4cllMSnhFcjljZUJtcUZLQ0lnaWtZQ1ZfQmJvNUZMRzRyN2w0SGxwa1JHZ1JFWUpUaHYyb1AyZllkUUtheTJGRmFNV2hCczdqZ2ZaeGJfaTdCcTJkRG10bGpMV1JwMHk1T0hlS3ZESTJONllIcUgzLWpwXzlCblBKWWdVUXBEV1Y1NV92Ty1LTngxT2J0OVladEhWTUstN2NIbm5xTlNTNzNraVlMM0l0WDZKOGhRSko1aXYtSmszZldXcVZ0a3V5WDh6ckZuNDJRQU5iIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUZOa1h4MnA4bXdYWkFlRlc2YXV6OFRkemNXSWw2aEdpakNOM2dGYTkxZDA0WFlIc1B0dTJEWkJKY28xMHM2ZFJid2hFSWh3SFl4Y0dOWHhzMDlUNUxEVjNNTTl2RFJXc1VVVGZvVU0xYUdsWkJZWkI0MEJYUThXUTVDb3N3QTV0S3ZMaWRqeGdaQU9YMFpCd29kVFRhTlpDZ0xXbXI2N0hGTGFpWVVpMk94IiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE2MTY5NTg5NDh9; csrftoken=ojgEAHNEMW0Y5dk5SGxO6rM7snUUiYvj; ds_user_id=13224575476; sessionid=13224575476%3Ax5ih5lsClZLu2B%3A8; shbid=18989; shbts=1616958950.8120112; fbsr_124024574287414=25-UfQGNeV62gWETwLp5AOdCnnluEh39vetjBo3jwRY.eyJ1c2VyX2lkIjoiMTAwMDQzODA0MTc3NDYzIiwiY29kZSI6IkFRRGpTRmdsVmd1b3hXeEpOT29rb1FPbEFyVzcxdzY2dWtYNy1zazU0OVJEN0wtT0pyLUJuUUtqZFJWMFFBNURLdkJvMXhheHNqMFQ3cUgtUmFFbm5HNV9sdEM1NDFWODNnYXpodkRhbUsyQmFHZms2QnE4enVsNkxyalhFQWpWUUZDUjBDdDMwenY4cllMSnhFcjljZUJtcUZLQ0lnaWtZQ1ZfQmJvNUZMRzRyN2w0SGxwa1JHZ1JFWUpUaHYyb1AyZllkUUtheTJGRmFNV2hCczdqZ2ZaeGJfaTdCcTJkRG10bGpMV1JwMHk1T0hlS3ZESTJONllIcUgzLWpwXzlCblBKWWdVUXBEV1Y1NV92Ty1LTngxT2J0OVladEhWTUstN2NIbm5xTlNTNzNraVlMM0l0WDZKOGhRSko1aXYtSmszZldXcVZ0a3V5WDh6ckZuNDJRQU5iIiwib2F1dGhfdG9rZW4iOiJFQUFCd3pMaXhuallCQUZOa1h4MnA4bXdYWkFlRlc2YXV6OFRkemNXSWw2aEdpakNOM2dGYTkxZDA0WFlIc1B0dTJEWkJKY28xMHM2ZFJid2hFSWh3SFl4Y0dOWHhzMDlUNUxEVjNNTTl2RFJXc1VVVGZvVU0xYUdsWkJZWkI0MEJYUThXUTVDb3N3QTV0S3ZMaWRqeGdaQU9YMFpCd29kVFRhTlpDZ0xXbXI2N0hGTGFpWVVpMk94IiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE2MTY5NTg5NDh9; rur=FRC'
        const url = `https://www.instagram.com/${instagram_id}/?__a=1`
        let res;
        try {
            res = await axios.get(url, { headers: { cookie: `${cookie}`}})
        } catch(e) {
            return message.channel.send(embed.setColor(`${color[0].error}`).setDescription('<a:error:854851816289075260> | Tên instagram của bạn không hợp lệ!'));
        }
        const account = res.data.graphql.user;
        const embed = new MessageEmbed()
            .setColor(`${color[0].primary}`)
            .setTitle(account.full_name)
            .setThumbnail(account.profile_pic_url_hd)
            .addField("Thông tin cá nhân", stripIndent`**- Tên người dùng: ** ${account.username}
            **- Tên đầy đủ: ** ${account.full_name}
            **- Bio:** ${account.biography.length == 0 ? "Không có" : account.biography}
            **- Số bài đăng:** ${account.edge_owner_to_timeline_media.count}
            **- Người theo dõi:** ${account.edge_followed_by.count}
            **- Đang theo dõi:** ${account.edge_follow.count}
            **- Tài khoản riêng tư:** ${account.is_private ? "Có 🔐" : "Không 🔓"}
            **- Tài khoản xác minh:** ${account.is_verified? "Rồi" : "Chưa"}`)
            .setTimestamp()
            .setFooter(`${client.user.username}`,`${client.user.displayAvatarURL()}`);
        message.channel.send(embed)
    }
}