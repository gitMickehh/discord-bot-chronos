const Discord = require('discord.js');
const commando = require('discord.js-commando');
const superagent = require('superagent');


class CatCommand extends commando.Command{
    
    constructor(client){
        super(client, {
            name: 'cat',
            group: 'admin',
            memberName: 'cat',
            description: 'cat :)'
        });
    }

    async run(message, args){
        
        //let {body} = await superagent
        //.get(`http://random.cat/meow`);

        //let catEmbd = new Discord.RichEmbed()
        //.setTitle("Cat :cat:")
        //.setColor("#ff9900")
        //.setImage(body.file);

        //message.channel.send(catEmbd);
    }

}

module.exports = CatCommand;