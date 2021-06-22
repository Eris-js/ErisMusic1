const { MessageEmbed } = require('discord.js')

module.exports=  {
    name : 'unmute', 
    cooldown: 1000,
    description: "Remove the mute for the user",
    async execute (client, message, args){
        const embed = new MessageEmbed()
        const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!Member) return message.channel.send(embed.setDescription('<a:error:854851816289075260> | Member not found'))

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await Member.roles.remove(role)

        message.channel.send(embed.setDescription(`<a:success:854851799063461940> | \`${Member.displayName}\` is now unmuted`))
    }
}