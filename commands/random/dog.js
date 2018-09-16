const Discord = require('discord.js');
const commando = require('discord.js-commando');
const superagent = require('superagent');

class DogCommand extends commando.Command{
    
    constructor(client){
        super(client, {
            name: 'dog',
            group: 'random',
            memberName: 'dog',
            description: 'dog :)'
        });
    }

    async run(message, args){
        let {body} = await superagent
        .get(`https://random.dog/woof.json`);

        let dogEmbd = new Discord.RichEmbed()
        .setTitle("Doggo 🐶")
        .setColor("#ff9900")
        .setImage(body.url);

        message.channel.send(dogEmbd);
    }

}

module.exports = DogCommand;