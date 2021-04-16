module.exports = {
	name: 'copy',
	description: 'copies whatever you say',
	execute(message, args, logs) {
        message.delete();
		message.channel.send(args.join(' '))
		if (logs) {
			message.guild.channels.cache.find(c => c.name === 'bot-logs').send({embed: {
				color: 3447003,
				title: "COPIED",
				description: `Copied: ${args.join(' ')} \nChannel: ${message.channel.name}`,
                timestamp: new Date(),
			}})
		}
	},
}; 