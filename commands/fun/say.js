
module.exports = {
    name: 'say',
    category: 'fun',
    aliases: ['s'],
    description: "Nhái lại những gì bạn nhập vào",
    usage: `<Nội dung>`,
    cooldown: 1000,
    execute (client, message, args) {
        if(message.deletable) message.delete()
            message.channel.send(args.join(' '))
    }
}