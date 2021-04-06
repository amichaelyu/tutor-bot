module.exports = {
	name: 'copy',
	description: 'copies whatever you say',
	execute(message, args) {
        message.delete();
		message.channel.send(args.join(' '))
		message.guild.channels.cache.find(c => c.name === 'bot-logs').send({embed: {
			color: 3447003,
			title: "COPIED",
			description: 'Copied: ' + args.join(' ') + "\n Channel: " + message.channel.name,
		}})
	},
}; 