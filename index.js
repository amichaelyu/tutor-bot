// making sure required files exist
const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token} = require('./config.json');
const nodemon = require('nodemon');
const execSync = require('child_process').execSync;
const openChannels = ['math', 'english'];
const baudio = require('baudio');

// defines boop
{
    let n = 0;
    var boop = baudio(function (t) {
        return Math.sin(t * 200 * Math.PI * 5) + Math.sin(t * 500) * (t % 2 > 1);
    });
}

// bot is made as client
const client = new Discord.Client();

// makes place to store the commands
client.commands = new Discord.Collection();

// commands folder is filtered to only js files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// finds all commands in commands folder
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// what the bot does when it starts
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    boop.play();
 });

//  when the bot recieves a message
client.on('message', message => {

    // checks for command plus args afterwards
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    // checks for stupid
    if (!message.guild) return;
    
    // checks commands
    else if (message.content.startsWith(prefix) && message.guild.member(message.author).hasPermission('ADMINISTRATOR') && !message.author.bot) {
    
        // copies what you say
        if (command === 'copy') {
            client.commands.get('copy').execute(message, args);
        }

        // deletes usesless stuff
        else if (command === 'd') {
            client.commands.get('delete').execute(message, args);
        }

        // creates some number of categories
        else if (command == 'create') {
            client.commands.get('create').execute(message, args);
        }

        // kills client
        else if (command == 'kill') {
            client.destroy();
        }

    }
    
    // channel creation
    else if (message.channel.name.endsWith("-questions") && !message.author.bot){
        for (chan of openChannels) {
            if (message.channel.name === chan + '-questions') {
                client.commands.get('create').execute(message, args);
                return;
            }
        }
    }

    // reacts to bot posting in ans channel
    else if (message.channel.name.endsWith('-ans') && message.author.bot){
        message.react('✅')
    }

    // reacts to bot posting in private channel
    else if (message.channel.name.includes('-questions') && message.author.bot){
        for (i of openChannels) {
            if (message.channel.name.startsWith(i + '-questions') && message.channel.name !== i + '-questions') {
                message.react('❌')
                return;
            }
        }
    }

});

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.author.bot) { return; }
    if (reaction.partial) {
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: ', error);
			return;
		}
    }
    // reaction.message.author()
    console.log(reaction.message.title);
    
});

// logs in bot
client.login(token);