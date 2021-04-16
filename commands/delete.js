module.exports = {
	name: 'delete',
	description: 'wipes some messages + roles',
	execute(message, args, wipe) {
		
		// wipes command message
		message.delete();

		// deletes last 100 messages
		message.channel.bulkDelete(100, true).catch(async err => {
			message.guild.channels.cache.find(c => c.name === 'bot-logs').send({embed: {
				color: 3447003,
				title: "DELETE ERROR",
				description: `Channel: ${message.channel.name} \n Deletor: <@${message.author.id}> \n ${err}`,
                timestamp: new Date(),
			}})
		});

		// deletes roles and channesl
		if (args[0] === 'r') { 
			for (i = 0; i < 100; i++){

				// deletes text channels
				try {
					message.guild.channels.cache.find(c => c.name === message.channel.name + i && c.type === 'text').delete();

				} catch (error) {
					console.log(error)
				}

				// deletes voice channels
				try {
					message.guild.channels.cache.find(c => c.name === message.channel.name + i && c.type === 'voice').delete();

				} catch (error) {
					console.log(error)
				}

				// deletes categories
				try {
					message.guild.channels.cache.find(c => c.name === message.channel.name + i && c.type === 'category').delete();

				} catch (error) {
					console.log(error)
				}

				// deletes roles
				try {
					message.guild.roles.cache.find(r => r.name === message.channel.name + i).delete();

				} catch (error) {
					console.log(error)
				}
			}	
		}

	},
}; 