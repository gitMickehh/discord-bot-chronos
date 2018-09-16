const commando = require('discord.js-commando');

class DiceRollCommand extends commando.Command{
    
    constructor(client){
        super(client, {
            name: 'roll',
            group: 'random',
            memberName: 'roll',
            description: 'rolls a die'
        });
    }

    async run(message, args){

        let roll;
        let botreply = "";

        if(args == "")
        {
            roll = Math.floor(Math.random()*6) + 1;
            botreply += `you landed on a ${roll}!`;
        }
        else if(isNaN(args))
        {
            botreply += "That's not a number! we rolled with a 6 for you! ";
            roll = Math.floor(Math.random()*6) + 1;
            botreply += `you landed on a ${roll}!`;
        }
        else
        {
            roll = Math.floor(Math.random()*args) + 1;
            botreply += `you landed on a ${roll}!`;
        }
        
        message.reply(botreply);
    }

}

module.exports = DiceRollCommand;