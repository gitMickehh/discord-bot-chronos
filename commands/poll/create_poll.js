const Discord = require("discord.js");
const commando = require('discord.js-commando');
const fs = require("fs");
const polls = require('../../polls.json');

class CreatePoll extends commando.Command{
    
    constructor(client){
        super(client, {
            name: 'createpoll',
            group: 'poll',
            memberName: 'createpoll',
            description: 'creates a poll so people can vote on it',
            examples: ['!createpoll poll name here $ shortcut $ option 1 $ option 2 etc', '!createpoll is Alfred a badass? $ 3' , '!createpoll should cucumber be cool? $ cmbr']
        });
    }

    async run(message, args){
        
        let argArray = args.split("$");
        
        if(argArray.length == 0 || argArray.length == 1)
        {
            message.channel.send("please specify the poll name and separate it with a $ then a shortcut!")
            .then(msg => msg.delete(9000));
            return;
        }

        if(argArray.length <= 3)
        {
            message.channel.send("Please enter the choices and spearate them with $ sign")
            .then(msg => msg.delete(9000));
            return;
        }

        if(argArray[1] == "" || argArray[1] == " " )
        {
            message.channel.send("please specify your poll shortcut after the $ sign!")
            .then(msg => msg.delete(9000));
            return;
        }

        let pollTitle = argArray[0];
        let pollShortcut = argArray[1];
        let pollID = 0;
        let choices = argArray.splice(2);
        
        let votesC = [];
        for (let i = 0; i < choices.length; i++) {
            votesC[i] = 0;
        }

        let votersA = [];
        
        //to get a new ID
        while(polls[pollID.toString()])
        {   
            if(polls[pollID.toString()].pollShortcut == pollShortcut)
            {
                message.channel.send("This shortcut (" + pollShortcut + ") is already taken!")
            .then(msg => msg.delete(9000));
                return;
            }

            pollID++;
        }

        if(!polls[pollID.toString()])
        {
            polls[pollID.toString()] = {
                active: "Y",
                pollTitle: pollTitle,
                pollShortcut: pollShortcut,
                choices: choices,
                votes: votesC,
                voters: votersA
            };

            fs.writeFile("./polls.json", JSON.stringify(polls), (err) => {
                if(err)
                    console.log(err);
            });
        }
        else
        {
            console.log("check poll ID and stuff in create_poll.js");
            message.channel.send("Couldn't create the poll! Sorry! 😁")
            .then(msg => msg.delete(9000));

            return;
        }

        // #00e530 green color for embd
        let pollEmbd = new Discord.RichEmbed()
        .setTitle("Poll Created! 😁")
        .setAuthor(message.author.username)
        .setColor("#00E530")
        .addField("Poll Name", pollTitle)
        .addField("Poll ID", pollID, true)
        .addField("Poll Shortcut!", pollShortcut);

        for (let i = 0; i < choices.length; i++) {
            
            pollEmbd.addField("Choice " + (i+1).toString(), choices[i]);
        }

        pollEmbd.setFooter("Good luck with that!");
        message.channel.send(pollEmbd);
    }

}

module.exports = CreatePoll;