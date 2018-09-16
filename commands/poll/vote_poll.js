const Discord = require('discord.js');
const commando = require('discord.js-commando');
const fs = require("fs");
const polls = require('../../polls.json');

class VotePoll extends commando.Command{
    
    constructor(client){
        super(client, {
            name: 'vote',
            group: 'poll',
            memberName: 'vote',
            description: 'votes on the current poll! you can only vote once',
            examples: ['!vote psc 1', '!vote cmbr 3']
        });
    }

    async run(message, args){

        let details = args.split(" ");

        if(isNaN(details[1]))
        {
            message.reply("Please specify your choice with a number")
            .then(msg=>msg.delete(6000));
            return;
        }

        let shortcut = details[0];
        let voteIndex = parseInt(details[1]) - 1;

        let pollID = 0;
        while(polls[pollID.toString()])
        {
            let currentPoll = polls[pollID.toString()];

            if(currentPoll.pollShortcut == shortcut)
            {

                for (let i = 0; i < currentPoll.voters.length; i++) {
                    //if the voter  has already voted!
                    if(currentPoll.voters[i] == message.author.id)
                    {
                        message.reply("you already voted! sorry :(! You can't vote again")
                        .then(msg=>msg.delete(12000));
                        message.delete();
                        return;
                    }                    
                }

                currentPoll.votes[voteIndex] = currentPoll.votes[voteIndex] + 1;
                currentPoll.voters.push(message.author.id);

                fs.writeFile("./polls.json", JSON.stringify(polls), (err) => {
                    if(err)
                        console.log(err);
                });

                message.channel.send(`${message.author} voted!`);
                message.delete();
                return;
            }

            pollID++;
        }

        message.reply("The shortcut doesn't exist! please check using !polls")
            .then(msg=>msg.delete(6000));
            return;

    }

}

module.exports = VotePoll;