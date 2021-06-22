const { MessageEmbed } = require("discord.js");
const { color } = require("../../config.json")

module.exports = {
    name: "avatar",
    category: "user",
    aliases: ["ava"],
    description: "Lấy avatar của người dùng",
    usage: `[Tag/ID]`,
    cooldown: 10000,
    execute (client, message, args) {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        const URL = member.user.avatarURL({ format: 'jpg', dynamic: true, size: 1024})
        const avatarEmbed = new MessageEmbed()
              .setColor(`${color[0].primary}`)
              .setImage(URL)
              .setTitle(`Avatar của ${member.user.username}`)
              .setDescription(`[Download ở đây](${URL})`)
              .setTimestamp()
              .setFooter(`Avatar của: ${member.user.tag}`, `${URL}`);

            message.channel.send(avatarEmbed)
    }
}