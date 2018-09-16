const Discord = require('discord.js');
const commando = require('discord.js-commando');
const coinsDB = require('../../coinsDB.json');
const fs = require("fs");

class GiveCoinsCommand extends commando.Command{
    
    constructor(client){
        super(client, {
            name: 'givecoins',
            group: 'coins',
            memberName: 'givecoins',
            description: 'gives coins to another member from your own pile',
            examples: ['!givecoins 20 @someguynamedJeff', '!givecoins 10 @mary']
        });
    }

    async run(message, args){
        
        let argsArr = args.split(" ");

        if(isNaN(argsArr[0]) || !argsArr[1] || argsArr[1] == " " || argsArr[1] == "" )
        {
            message.reply("Enter a number then mention the person you're giving coins to!").then(msg=>{msg.delete(5000)});
            return;
        }
        
        let coinsAmt = parseInt(argsArr[0]);

        if(coins == 0)
        {
            return message.reply("you can't send Zero coins?... that's Cheap!");
        }

        if(coinsAmt < 0)
        {
            return message.reply("you can't send negative coins!");
        }

        let giftedUser = message.mentions.users.first() || message.guild.members.get(args[1]);

        if(giftedUser == message.author)
        {
            message.reply("Don't send coins to yourself! This is useless :(").then(msg=>{msg.delete(5000)});
            return;
        }

        if(!coinsDB[message.author.id])
        {
            coinsDB[message.author.id] = {
                coins: 0
            }

            message.reply("You don't have enough coins! Sorry!").then(msg=>{msg.delete(5000)});
        }
        else
        {
            if(parseInt(coinsDB[message.author.id].coins) >= coinsAmt)
            {
                if(!coinsDB[giftedUser.id])
                {
                    coinsDB[giftedUser.id] = {
                        coins: coinsAmt
                    }
                }
                else
                {
                    coinsDB[giftedUser.id].coins = parseInt(coinsDB[giftedUser.id].coins) + coinsAmt
                    
                }

                coinsDB[message.author.id].coins = parseInt(coinsDB[message.author.id].coins) - coinsAmt;
                message.channel.send(`${message.author} sent ${coinsAmt} coins to ${giftedUser}!`);
            }
            else
            {
                message.reply("You don't have enough coins! Sorry!").then(msg=>{msg.delete(5000)});
                return;
            }
        }

        fs.writeFile("./coinsDB.json", JSON.stringify(coinsDB), (err) => {
            if(err)
                console.log(err);
        });
    }

}

module.exports = GiveCoinsCommand;