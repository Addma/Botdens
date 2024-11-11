module.exports = {
	name: 'queue',
	aliases: ['q'],
	inVoiceChannel: true,
	run: (client, message, args) => {
		try {
			const queue = client.DisTube.getQueue(message);
			let res = '';
			if (queue.songs.length > 0) {
				let i = 1;
				while (i - 1 < queue.songs.length) {
					const name = queue.songs[i - 1].name;
					res += ((`${i}. ` + name + '\n'));
					i += 1;
				}
			}
			if (res.length > 0) {return message.channel.send(res);}
			else {message.channel.send(`${client.emotes.error} | Error`);}
		}
		catch (err) {
			console.log(err);
			return message.channel.send(`${client.emotes.error} | Error`);
		}

	},
	help : () => {
        return `?${module.exports.name} (?${module.exports.aliases[0]}) - Lists the queue.`
    }
};