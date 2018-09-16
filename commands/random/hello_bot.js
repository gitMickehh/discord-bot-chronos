const commando = require('discord.js-commando');

const helloArray = [
    'how low', 'hello!', 'Hi there!', 'Howdie', 'oh no... I mean Hello!', 'you! hello!'
, 'hello hello hello hellow... helow.adshuiosaanhjkldfaswnwrte', 'HI!', ':) sure'
] 


class HelloCommand extends commando.Command{
    
    constructor(client){
        super(client, {
            name: 'hello',
            group: 'random',
            memberName: 'hello',
            description: 'hello?'
        });
    }

    async run(message, args){
        
        let randomReply = Math.floor(Math.random()*helloArray.length);
        message.reply(helloArray[randomReply]);
    }

}

module.exports = HelloCommand;