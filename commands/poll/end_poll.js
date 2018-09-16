const Discord = require('discord.js');
const commando = require('discord.js-commando');
const fs = require("fs");
const polls = require('../../polls.json');

class EndPoll extends commando.Command{
    
    constructor(client){
        super(client, {
            name: 'endpoll',
            group: 'poll',
            memberName: 'endpoll',
            description: 'ends the current poll'
        });
    }

    async run(message, args){
        
        if(args == "" || args == " ")
        {
            message.reply("Please specify which poll using its shortcut!\nYou can view it using !polls")
            .then(msg => msg.delete(8000));
            return;
        }
        
        let pollID = 0;
        while(polls[pollID.toString()])
        {
            let currentPoll = polls[pollID.toString()];

            if(currentPoll.pollShortcut == args)
            {
                currentPoll.active = "N";
                message.reply("Poll (" + currentPoll.pollTitle + ") Ended! 😩");

                fs.writeFile("./polls.json", JSON.stringify(polls), (err) => {
                    if(err)
                        console.log(err);
                });

                let pollResult = new Discord.RichEmbed()
                .setTitle(currentPoll.pollTitle + " 🎬")
                .setColor("#049799");

                message.channel.send(pollResult);
                return;
            }

            pollID++;
        }

        message.reply("couldn't find the poll shortcut").then(msg => msg.delete(6000));
    }

}

module.exports = EndPoll;