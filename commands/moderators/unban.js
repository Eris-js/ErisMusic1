const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "unban",
    cooldown: 1000,
    async execute(client, message, args) {
        const embed = new MessageEmbed()
        if (!message.member.permissions.has("BAN_MEMBERS")) return;

        const id = args[0];
        if (!id) return message.send(embed.setDescription("<a:error:854851816289075260> | Please send an id!"));

        const bannedMembers = await message.guild.fetchBans();
        if (!bannedMembers.find((user) => user.user.id === id))
            return message.send(embed.setDescription("<a:error:854851816289075260> | User is not banned!"))

        message.guild.members.unban(id)
        message.send(embed.setDescription("<a:success:854851799063461940> | Unbanned user successfully!"))
    }
}