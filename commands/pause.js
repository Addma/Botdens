module.exports = {
	name: 'pause',
	aliases: ['pa'],
	inVoiceChannel: true,
	run:  (client, message, args) => {
		try {
			const queue = client.DisTube.getQueue(message);
			const string = args.join(' ');
			if (!message.member.voice.channel) {
				return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`);
			}
			if (queue.songs.length < 1) {
				return message.channel.send(`${client.emotes.error} | Nothing to pause!`);
			}
			if (!queue.playing) {
				return message.channel.send(`${client.emotes.error} | Nothing playing`);
			}
			 client.DisTube.pause(message);
             message.channel.send(`${client.emotes.success} | Paused!`);

		} catch(err) {
			console.log(err);
			message.channel.send(`${client.emotes.error} | Error!`)
		}
	},
	help : () => {
        return `?${module.exports.name} (?${module.exports.aliases[0]}) - Pauses current song.`
    }
};