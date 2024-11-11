module.exports = {
	name: 'next',
	aliases: ['n'],
	inVoiceChannel: true,
	run: async (client, message, args) => {
		try {
			const queue = client.DisTube.getQueue(message.guild.id);
			const num = parseInt(args[0]);
            let len = queue.songs.length;
			if (isNaN(num) || num > len || num <= 0) {
                return message.channel.send(`${client.emotes.error} | One of your switch numbers were incorrect!`);
			}
            const songToFront = queue.songs[num - 1];
			if (queue.songs.length > 0) { 
                queue.songs.splice(num - 1, 1);
                queue.songs.splice(1, 0, songToFront)
				return message.channel.send(`${client.emotes.success} | Switched #${num} to next song!`);
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
        return `?${module.exports.name} (?${module.exports.aliases[0]}) - Places chosen song as next in queue. Ex. \"?${module.exports.name} 10\". (Will play #10 in queue next)`
    }
};