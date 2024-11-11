module.exports = {
	name: 'shuffle',
	aliases: ['sh'],
	inVoiceChannel: true,
	run: async (client, message, args) => {
		try {
			const queue = client.DisTube.getQueue(message);
			if (queue.songs.length > 0) { 
				await client.DisTube.shuffle(message);
				return message.channel.send(`${client.emotes.success} | Shuffled!`);
			} else {
				return message.channel.send(`${client.emotes.error} | Error`);
			}
		}
		catch (err) {
			console.log(err);
			return message.channel.send(`${client.emotes.error} | Error`);
		}

	},
	help : () => {
        return `?${module.exports.name} (?${module.exports.aliases[0]}) - Shuffles queue.`
    }
};