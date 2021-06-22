const client = require("../index")
const { MessageEmbed, Collection } = require('discord.js');
const { default_prefix, color } = require('../config.json')
const db = require('quick.db');
const ms = require("ms")

const Timeout = new Collection();

client.on('message', async message => {

    if (message.author.bot) return;
    if (message.channel.type != "dm") return;
    
      let prefix = default_prefix;

    
    if(message.mentions.users.size){
      if(message.mentions.users.first().id == client.user.id){
        return message.reply(`my prefix is \`\`${prefix}\`\``)
      }
    }

    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if(cmd.length == 0 ) return;
    
    try {
        let command = client.commands.get(cmd);
        const embed = new MessageEmbed()
    
        if(!command) command = client.commands.get(client.aliases.get(cmd));
        if (command) {
          if(command.cooldown) {
              if(Timeout.has(`${command.name}${message.author.id}`)) 
                return message.channel.send(embed.setColor(`${color[0].error}`).setDescription(`<a:error:854851816289075260> | You are on cooldown for \`${command.name}\`\n**Default:** Cooldown is \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\``))
              command.execute(client, message, args),
              Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown),
              setTimeout(() => {
                  Timeout.delete(`${command.name}${message.author.id}`)
              }, command.cooldown)
          }
        }
        
      } catch (error) {
        console.error(error);
        message.reply(`Đã có lỗi khi sử dụng lệnh này!\n\n${error}`).then(msg => msg.delete({timeout:10000}));
      }
})