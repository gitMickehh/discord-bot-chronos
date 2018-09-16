const Discord = require('discord.js');
const commando = require('discord.js-commando');
const coinsDB = require('../../coinsDB.json');
const fs = require("fs");

class CheckCoinsCommand extends commando.Command{
    
    constructor(client){
        super(client, {
            name: 'coins',
            group: 'coins',
            memberName: 'coins',
            description: 'check your coins'
        });
    }

    async run(message, args){
        
        let coinsAmt = 0;

        if(!coinsDB[message.author.id])
        {
            coinsDB[message.author.id] = {
                coins: 0
            }

            fs.writeFile("./coinsDB.json", JSON.stringify(coinsDB), (err) => {
                if(err)
                    console.log(err);
            });
        }
        else
        {
            coinsAmt = coinsDB[message.author.id].coins;
        }

        let coinsEmbd = new Discord.RichEmbed()
        .setTitle(`${message.author.username} Coins`)
        .addField("Coins",coinsAmt.toString());

        //then deletes after 5000 ms
        message.channel.send(coinsEmbd).then(msg=>{msg.delete(5000)});
        message.delete();
    }

}

module.exports = CheckCoinsCommand;