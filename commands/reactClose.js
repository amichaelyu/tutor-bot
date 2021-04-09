module.exports = {
	name: 'reactClose',
	description: 'gives closes channels based off reactions',
	execute(reaction, user, ans, logs) {    

        // finds channel name from embed title
        reaction.message.embeds.forEach(embed => tempChan = embed.title);

        // tries to delete channels + role
        try {
            // deletes channels (category, text, voice)
            reaction.message.guild.channels.cache.find(c => c.name === tempChan && c.type === 'text').delete();
            reaction.message.guild.channels.cache.find(c => c.name === tempChan && c.type === 'voice').delete();
            reaction.message.guild.channels.cache.find(c => c.name === tempChan && c.type === 'category').delete();

            // deletes role
            reaction.message.guild.roles.cache.find(r => r.name === tempChan).delete();
            
            // deletes answer call
            let ansChan = reaction.message.guild.channels.cache.find(c => c.name === ans && c.type === 'text');
            console.log(ansChan.messages.cache);

        } catch (err) {
            // logs errors in #bot-logs
            reaction.message.guild.channels.cache.find(c => c.name === 'bot-logs').send({embed: {
                color: 3447003,
                title: "CLOSING ERROR",
                description: `Channel: ${tempChan} \n Closer: <@${user.id}> \n ${err}`,
                timestamp: new Date(),
            }})
        }

        // logs in #bots-logs
        if (logs) {
            reaction.message.guild.channels.cache.find(c => c.name === 'bot-logs').send({embed: {
                color: 3447003,
                title: "CLOSED",
                description: `Channel: ${tempChan} \n Closer: <@${user.id}>`,
                timestamp: new Date(),
            }})
        }

	},
}; 