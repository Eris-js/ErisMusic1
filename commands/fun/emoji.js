const { Util, MessageEmbed } = require('discord.js');
const { parse } = require('twemoji-parser');
const { color } = require("../../config.json")


module.exports = {
    name: 'emoji',
    aliases: ['emo'],
    category: 'fun',
    description: "Xem emoji theo kích thước lớn",
    usage: `<Emoji/ID emoji>`,
    cooldown: 1000,
    execute (client, message, args) {
      
      const emoji = args[0];
      const embed = new MessageEmbed();
      if(!emoji) return message.channel.send(embed.setColor(`${color[0].error}`).setDescription('<a:error:854851816289075260> | Nhập cái gì đó đi bạn'));

      let custom = Util.parseEmoji(emoji)

      if (custom.id) {
        let link = `https://cdn.discordapp.com/emojis/${custom.id}.${custom.animated ? 'gif' : 'png'}`;
        embed.setImage(link)
             .setColor(`${color[0].succer}`)
             .setFooter(`Emoji ID: ${custom.id}`);
          return message.channel.send(embed)
      } else {
        let parsed = parse(emoji, { assetType: 'png'});
        if (!parsed[0]) return message.channel.send(embed.setColor(`${color[0].error}`).setDescription('<a:error:854851816289075260> | Emoji không hợp lệ'));
        embed.setImage(parsed[0].url).setColor(`${color[0].succer}`);
  
        return message.channel.send(embed)
      }
    }
}