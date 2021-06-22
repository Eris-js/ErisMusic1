const { MessageEmbed } = require('discord.js');
module.exports = {
    name: "ban",
    cooldown: 1000,
    async execute(client, message, args) {
        const embed = new MessageEmbed()
        if(!message.guild.me.hasPermission('KICK_MEMBERS')) return;

         message.channel.send(embed.setDescription('<a:error:854851816289075260> | I do not have permissions to do this'))

        const member = message.mentions.members.first();
        if(!member) return message.channel.send(embed.setDescription('<a:error:854851816289075260> | Please specify a member to kick'))
        
        if (
            message.member.roles.highest.position <=
            member.roles.highest.position
        )
        
            return message.reply(
                embed.setDescription("<a:error:854851816289075260> | You cant punsih because u either have the same role or your role lower")
            )
        
        const reason = args.slice(1).join(" ") || "No Reason Provided";

        member.kick({ reason })

        message.channel.send(embed.setDescription(`<a:success:854851799063461940> | ${Member.user.tag} was kicked from the server!`))
    } 
}