const commando = require('discord.js-commando');

const cucumberJokes = [
    "guys, I'm serious, Ayman needs help", "poor cucumber.. it has to deal with being around ayman.. :(",
    "What are cucumbers afraid of??...\nCucumber MAN!"
] 


class CucumberCommand extends commando.Command{
    
    constructor(client){
        super(client, {
            name: 'cucumber',
            group: 'random',
            memberName: 'cucumber',
            description: 'cucumber?'
        });
    }

    async run(message, args){
        let randomReply = Math.floor(Math.random()*cucumberJokes.length);
        message.reply(cucumberJokes[randomReply]);
    }

}

module.exports = CucumberCommand;