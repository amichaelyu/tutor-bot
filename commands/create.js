module.exports = {
	name: 'create',
	description: 'creates tutor rooms',
	execute(message, args, wipe, logs) {
        message.delete();
        async function create() {

            // checks if user already has an open question
            // for (i in subjects) {
                // if (tempUser.cache.some(r => r.name.startsWith(`${subjects[i]}-questions`))) {}
                
            // loops through options to find closed channel
            for (z = 0; z < 100; z++) {

                // new channel name
                const tempChan = message.channel.name + z;

                // checks if channel already exists
                if (!message.guild.roles.cache.find(r => r.name === tempChan) || !message.guild.channels.cache.find(c => c.name === tempChan)) {

                    // creates role
                    const tempRole = await message.guild.roles.create({ data: {name: tempChan} });
                    
                    // give author role
                    message.member.roles.add(tempRole);

                    // creates category
                    await message.guild.channels.create(tempChan, {
                        type: 'category',
                        permissionOverwrites: [{
                            id: tempRole,
                            allow: ['VIEW_CHANNEL','SEND_MESSAGES','READ_MESSAGE_HISTORY','ATTACH_FILES','CONNECT','SPEAK','STREAM'],
                        },{
                            id: message.guild.roles.cache.find(r => r.name === chan),
                            deny: ['READ_MESSAGE_HISTORY'],
                        },{
                            id: message.guild.roles.everyone.id,
                            deny: ['VIEW_CHANNEL'],
                        }]
                    });

                    // creates text channel
                    await message.guild.channels.create(tempChan, {
                        type: 'text',
                        topic: 'React with the red X to close',
                        parent: message.guild.channels.cache.find(c => c.name === tempChan),
                    });

                    // creates voice channel
                    message.guild.channels.create(tempChan, {
                        type: 'voice',
                        parent: message.guild.channels.cache.find(c => c.name === tempChan),
                    });

                    // sends message in answering channel
                    await message.guild.channels.cache.find(c => c.name === `${chan}-ans`).send({embed: {
                        color: 3447003,
                        title: `${chan}-questions${z}`,
                        image: message.attachments.first(),
                        description: message.content,
                    }});

                    // sends message in private channel
                    await message.guild.channels.cache.find(d => d.name === `${chan}-questions${z}` && d.type === 'text').send({embed: {
                        color: 3447003,
                        title: `${chan}-questions${z}`,
                        image: message.attachments.first(),
                        description: message.content,
                    }});

                    // instruction to user
                    let tempMes = await message.reply(`Please join ${chan}-questions${z}`);
                    setTimeout(() => tempMes.delete(), wipe);

                    // bot logs
                    if (logs) {
                        message.guild.channels.cache.find(c => c.name === 'bot-logs').send({embed: {
                            color: 3447003,
                            title: `CREATED: ${message.channel.name}${z}`,
                            description: `Creator: <@${message.author.id}> \nMessage: ${message.content}`,
                            image: message.attachments.first(),
                            timestamp: new Date(),
                        }})
                    }

                    return;
                }
            }
        }
        create();
	},
}; 