const commando = require('discord.js-commando');

class TellJokeCommand extends commando.Command{
    
    constructor(client){
        super(client, {
            name: 'joke',
            group: 'random',
            memberName: 'joke',
            description: 'tells a joke'
        });
    }

    async run(message, args){

    }

}

module.exports = TellJokeCommand;