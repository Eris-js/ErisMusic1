const { MessageEmbed } = require('discord.js')
const { color, coins } = require('../../config.json')
const db = require('quick.db')

const maxBet = 50000;
const slots = ["<:o_:855958246148931634>","<:owo:855958246540312596>","<:eggplant:855958245842878485>","<:heart:855958245378490369>","<:cherry:855958245562908682>","<:w_:855983198268948510>"];
const moving = "<a:slot_gif:855950318785265664>";
const random = require('random-number-csprng');

module.exports = {
    name: "slot",
    cooldown: 1000,
    alias:["slots","slot","s"],
    description: 'Bet your money in the slot machine! Earn up to 10x your money!',

	 async execute(client, message, args) {

		let amount = 0;
		let all = false;

		if(args.length == 0)
			amount = 1;
		else if(args.length == 1)
			amount = parseInt(args[0]);
		else if(args.length == 1 && args[0] == 'all')
			all = true;
		else{
			message.channel.send(", Invalid arguments!! >:c");
			return;
		}

		if(amount == 0 && !all) {
			message.channel.send(", uwu.. you can't bet 0 silly!");
			return;
             
		} else if( amount < 0) {
			message.channel.send(", that... that's not how it works.");
			return;
		}

		//Check if valid time and cowoncy
		let money = db.fetch(`money_${message.author.id}`);

		if (all && money != undefined)
			amount = money
		if (maxBet && amount > maxBet)
			amount = maxBet;
		if (money == null || money < amount || money <= 0){
			message.channel.send(`**🚫 | ${message.author.username}**, You don't have enough cowoncy!`);
		} else {
            
			//Decide results
			let rslots = [];
            let rand = await random(1,1000)/10;
			let win = 0;
            /*
            var number = []

            for (i = 0; i < 3; i++) number[i] = Math.floor(Math.random() * slots.length);

            if (number[0] == number[1] && number[1] == number[2]) {
                win = true
                Money = amount * 9
            } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
                win = true
                Money = amount * 2
            }
            
			if (win == true) {
                winmsg = `Bạn đã thắng với **__${Money}__** ${coins}`
            }
            if (win == false) { 
                winmsg = 'Và đã bị thua'
            }
            */

            if(rand <= 20){//1x 20%
				win = amount;
				rslots.push(slots[0]);
				rslots.push(slots[0]);
				rslots.push(slots[0]);
				logging = 0;
			}else if( rand <= 40 ){ //2x 20%
				win = amount * 2;
				rslots.push(slots[1]);
				rslots.push(slots[1]);
				rslots.push(slots[1]);
				logging = 1;
			}else if(rand <= 60){ //3x 5%
				win = amount * 3;
				rslots.push(slots[2]);
				rslots.push(slots[2]);
				rslots.push(slots[2]);
				logging = 2;
			}else if(rand <= 70){ //4x 2.5%
				win = amount * 4;
				rslots.push(slots[3]);
				rslots.push(slots[3]);
				rslots.push(slots[3]);
				logging = 3;
			}else if(rand <= 80){ //10x 1%
				win = amount * 5;
				rslots.push(slots[4]);
				rslots.push(slots[5]);
				rslots.push(slots[4]);
				logging = 9;
			}else{
				logging = -1;
				var slot1 = Math.floor(Math.random()*(slots.length-1));
				var slot2 = Math.floor(Math.random()*(slots.length-1));
				var slot3 = Math.floor(Math.random()*(slots.length-1));
				if(slot3==slot1)
					slot2 = (slot1+Math.ceil(Math.random()*(slots.length-2)))%(slots.length-1);
				if(slot2==slots.length-2)
					slot2++;
				rslots.push(slots[slot1]);
				rslots.push(slots[slot2]);
				rslots.push(slots[slot3]);
			}
            console.log(win)
            let winmsg = (win == 0 ) ? "Không được gì cả... :c" :  `Bạn thắng nhận được ${win} ${coins}`;

            if (win == 0) {
                db.subtract(`money_${message.author.id}`, amount)
            } else if (win >= 1) {
                db.add(`money_${message.author.id}`, win)
            }

			//Display slots
			let machine = `**${message.author.username}** đã cược **__${amount}__** ${coins}\n\`___SLOTS___\`\n ${moving} ${moving} ${moving}  \n\`|         |\`\n\`|         |\``;
			let text = await message.channel.send(machine);
			setTimeout(async function(){

			machine = `**${message.author.username}** đã cược **__${amount}__** ${coins}\n\`___SLOTS___\`\n ${rslots[0]} ${moving} ${moving}   \n\`|         |\`\n\`|         |\``;
			await text.edit(machine)
			setTimeout(async function(){

			machine = `**${message.author.username}** đã cược **__${amount}__** ${coins}\n\`___SLOTS___\`\n ${rslots[0]} ${moving} ${rslots[0]}   \n\`|         |\`\n\`|         |\``;
			await text.edit(machine)
			setTimeout(async function(){

			machine = `**${message.author.username}** đã cược **__${amount}__** ${coins}\n\`___SLOTS___\`\n ${rslots[0]}  ${rslots[1]}  ${rslots[2]}\n\`|         |\`  \n\`|         |\`\n\n ${winmsg}`;
			text.edit(machine);


			},1000);
			},700);
			},1000);
		}
	}
}
