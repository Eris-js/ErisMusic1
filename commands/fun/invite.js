const { MessageEmbed } = require("discord.js")
const { MessageButton } = require('discord-buttons');
const { color } = require("../../config.json")

module.exports = {
  name: "invite",
  description: "invite the bot in your server",
  cooldown: 10000,
  async execute (client, message, args) {
    const button = new MessageButton()
    .setStyle('url')
    .setURL('https://discord.com/api/oauth2/authorize?client_id=854843272043429929&permissions=4294967287&scope=bot') 
    .setLabel('Invite me!')

    const support = new MessageButton()
    .setStyle('url')
    .setURL('https://discord.gg/czvKnPth4j') 
    .setLabel('Support Channel!')
    //.setDisabled();

    const inviteURL = 'https://discord.com/api/oauth2/authorize?client_id=854843272043429929&permissions=4294967287&scope=bot';
    let embed = new MessageEmbed()
        .setColor(`${color[0].primary}`)
        .setAuthor("Here are all of my invite links!")
        .setDescription(`Click the buttons for each link or check out my [Top.gg](${inviteURL}) page.`)
        .setTimestamp()
        .setFooter(`${client.user.username}`,`${client.user.displayAvatarURL()}`);
    
    return message.channel.send({
      buttons: [support, button],
      embed: embed
    })
  
}
}