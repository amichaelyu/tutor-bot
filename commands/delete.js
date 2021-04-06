module.exports = {
	name: 'delete',
	description: 'wipes 100 messages',
	execute(message, args) {
		// deletes last 100 messages
		message.channel.bulkDelete(100, true).catch(err => {
			message.reply("Uh-oh! Something went wrong");
			setTimeout(() => message.channel.bulkDelete(1, true), 2000);
		});
		if (args[0] === 'r') { 
			for (i = 0; i < 100; i++){
				try {
					// deletes channels (category, text, voice)
					message.guild.channels.cache.find(c => c.name === message.channel.name + i && c.type === 'text').delete();
					message.guild.channels.cache.find(c => c.name === message.channel.name + i && c.type === 'voice').delete();
					message.guild.channels.cache.find(c => c.name === message.channel.name + i && c.type === 'category').delete();

					// deletes roles
					message.guild.roles.cache.find(r => r.name === message.channel.name + i).delete();

				} catch (error) {
					console.log(error)
					return;
				}
			}	
		}
	},
}; 