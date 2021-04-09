module.exports = {
	name: 'reactOpen',
	description: 'gives roles based of reactions',
	execute(reaction, user, subjects, wipe) {    

            // gets user
            // const tempUser = await reaction.message.guild.members.cache.get(user.id).roles;
            const tempUser = reaction.message.guild.members.cache.get(user.id).roles;

            // loops through open subjects
            for (i in subjects) {

                // checks if user is already in an question answering channel
                if (tempUser.cache.some(r => r.name.startsWith(`${subjects[i]}-questions`))) {

                    const userReactions = reaction.message.reactions.cache.filter(re => re.users.cache.has(user.id));
                    try {
                        for (const react of userReactions.values()) {
                            // await react.users.remove(user.id);
                            react.users.remove(user.id);
                        }
                        let tempMes = reaction.message.channel.send(`<@${user.id}> You are already answering a querstion!`);
                        setTimeout(() => tempMes.delete(), wipe);
                    } catch (error) {
                        reaction.message.guild.channels.cache.find(c => c.name === 'bot-logs').send({embed: {
                            color: 3447003,
                            title: "ERROR PREVENTING ROLE",
                            description: `Channel: ${reaction.message.channel} \n User: <@${user.id}>`,
                            timestamp: new Date(),
                        }})
                    }
                    return;
                }
            }
            // gets channel name
            reaction.message.embeds.forEach((embed) => tempTitle = embed.title);

            // gets the role
            // const tempRole = await reaction.message.guild.roles.cache.find(r => r.name === tempTitle);
            const tempRole = reaction.message.guild.roles.cache.find(r => r.name === tempTitle);

            // give author role
            tempUser.add(tempRole);
	},
}; 