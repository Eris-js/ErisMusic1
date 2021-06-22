const { coins } = require("../../config.json")
const db = require("quick.db")

// config

const spin = "<a:436677458339823636:855976357132632104> ";
const heads = "<:head:855976393337471006> ";
const random = require('random-number-csprng');
const tails = "<:tails:855976393086730282>";

module.exports = {
    name: "coinflip",
    aliases: ['cf'],
    cooldown: 1000,
    category: 'gambling',
    description: 'Flip a coin to earn some cowoncy! You can also shorten the command like in the example!',
    
    async execute(client, message, args) {

        let bet = args[1];
        
        if (args[1] && args[1].toLowerCase() === 'all') {
            bet = "all"
        } else if (!args[1]) {
            bet = 1
        } else if (args[1] == 0) {
            return message.channel.send("Số tiền bạn đặt không thể thấp hơn `1`")
        } 

        if (args[0] == 'heads'|| args[0] =='h' || args[0] == 'head')
			choice = 'h';
		else if(args[0] == 'tails'||args[0] == 't'||args[0] =='tail')
			choice = 't';
        else if (!args[0]) {
            message.channel.send('Bạn vui lòng chọn `heads` hoặc `tails`')
        }

        let money = await db.fetch(`money_${message.author.id}`);

        if (money < bet || money == 0 || money == null) {
            return message.channel.send('Số dư trong ví của bạn không đủ')
        } else if (bet == "all") {
            bet = money
        }

        let rand = await random(0,1);
		let win = false;

        //tails
			if ( rand ==0 && choice == "t")
            win = true;
        //heads
         else if( rand == 1 && choice == "h") 
            win = true;

            let text = `**${message.author.username}** spent **${bet} ${coins}** and chose ${((choice =='h') ? heads : tails)}`;
            let text2 = text;
			text2 += `\nThe coin spins... ${((win)?((choice=='h')?heads:tails):((choice=='h')?tails:heads))} and you `;
			if (win) {
				text2 += `won ** ${coins} ${bet * 2 }**!!`
                db.add(`money_${message.author.id}`, `${bet * 2 }`);
            } else {
				text2 += "lost it all... :c";
                db.subtract(`money_${message.author.id}`, `${bet}`)
            }
			text += `\nThe coin spins... " ${spin}`;

            let mess = await message.channel.send(text)
			setTimeout(function(){
				mess.edit(text2)
			},2000);
			

    } // end execute
}