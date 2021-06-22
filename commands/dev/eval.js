const { MessageEmbed } = require("discord.js"),
      { color, ownerID } = require("../../config.json"),
      { post } = require("node-superfetch");

module.exports = {
    name: "eval",
    aliases: ["ev"],
    cooldown: 1000,
    description: "Evaluate some code.",
    usage: "!eval <code>",

    async execute(client, message, args) {
      
        if(message.author.id !== ownerID) return;
        if(!args) {
            const embed = new MessageEmbed()
            .setColor(`${color[0].error}`)
            .setDescription("<a:error:854851816289075260> | Vui lòng nhập nội dung")  
            
            return message.channel.send(embed)
        }
        if(args.join(' ').length > 200) {
            if(message.deletable) message.delete()
            const embed = new MessageEmbed()
            .setColor(`${color[0].error}`)
            .setDescription("<a:error:854851816289075260> | Văn bản bạn nhập vượt quá 200 kí tự")  
            
            return message.channel.send(embed)
        }

        
        try {
          const code = args.join(" ");
          let evaled = eval(code);
     
          if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
            if(message.deletable) message.delete()
            const embed = new MessageEmbed()
                .setColor(`${color[0].primary}`)
                .setDescription(`<:termux:855364182249177088>  | Termux Control`)
                .addField("Input", "```js\n" + args.join(" ") + "```")
                .addField("Ouput",`\`\`\`xl\n${clean(evaled)}\n\`\`\``)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
          message.channel.send(embed);
        } catch (err) {
             if(message.deletable) message.delete()
            const embed = new MessageEmbed()
                .setColor(`${color[0].error}`)
                .setDescription(`<:termux:855364182249177088>  | Termux Control`)
                .addField(`\`ERROR\``,` \`\`\`xl\n${clean(err)}\n\`\`\``)
                .setTimestamp()
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
          message.channel.send(embed);
        }
      
    }
}

function clean(string) {
    if (typeof text === "string") {
      return string.replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
    } else {
      return string;
    }
  }