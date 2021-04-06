module.exports = {
	name: 'create',
	description: 'creates tutor rooms',
	execute(message, args) {
        message.delete();
        async function create() {
            for (z = 0; z < 100; z++) {
                let temp = message.channel.name + z;
                if (!message.guild.roles.cache.find(r => r.name === temp)) {
                    // creates role
                    await message.guild.roles.create({ data: {name: temp} });
                    
                    // finds the role that was just created
                    let tempRole = await message.guild.roles.cache.find(r => r.name === temp).id;
                    
                    // give author role
                    message.member.roles.add(tempRole);
                    
                    // console.log(message.guild.roles.cache.find(r => r.name === chan).id)
                    // console.log(tempRole)
                    // creates category
                    await message.guild.channels.create(temp, {
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
                    await message.guild.channels.create(temp, {
                        type: 'text',
                        topic: 'React with the red X to close',
                        parent: message.guild.channels.cache.find(c => c.name === temp),
                    });

                    // creates voice channel
                    message.guild.channels.create(temp, {
                        type: 'voice',
                        parent: message.guild.channels.cache.find(c => c.name === temp),
                    });

                    // sends message in answering channel
                    await message.guild.channels.cache.find(c => c.name === chan + '-ans').send({embed: {
                        color: 3447003,
                        title: chan + '-questions' + z,
                        image: message.attachments.first(),
                        description: message.content,
                    }});

                    // sends message in private channel
                    await message.guild.channels.cache.find(d => d.name === chan + '-questions' + z && d.type === 'text').send({embed: {
                        color: 3447003,
                        title: chan + '-questions' + z,
                        image: message.attachments.first(),
                        description: message.content,
                    }});

                    // instruction to user
                    message.reply('Please join ' + chan + '-questions' + z);
                    setTimeout(() => message.channel.bulkDelete(1, true), 2000);

                    // bot logs
                    message.guild.channels.cache.find(c => c.name === 'bot-logs').send({embed: {
                        color: 3447003,
                        title: 'CREATED: ' + message.channel.name + z,
                        description: 'Maker: ' + message.author.tag,
                        timestamp: new Date(),
                    }})

                    return;
                }
            }
        }
        create();
	},
}; 