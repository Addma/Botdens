module.exports = {
	name: 'seek',
	aliases: ['se'],
	inVoiceChannel: true,
	run: (client, message, args) => {
		try {
            console.log(args[0].length, args[0].includes(":"));
			if (!args[0].includes(':') || (args[0].length != 5 && args[0].length != 7)) {
				return message.channel.send(`${client.emotes.error} | Incorrect number parameter. Please provide in format HH:MM:SS`);
			}
			const time = args[0].split(':');
			let hours = 0;
			let mins, secs;
			if (time.length > 5) {
				hours = time[0];
				mins = time[1];
				secs = time[2];
			}
			else {
				mins = time[0];
				secs = time[1];
			}

			if (isNaN(parseInt(mins)) || isNaN(secs) || isNaN(parseInt(hours)) || secs > 60 || mins > 60) {
				return message.channel.send(`${client.emotes.error} | Incorrect number parameter. Please provide in format HH:MM:SS`);
			}
			const timeTotal = (parseInt(hours) * 3600) + (parseInt(mins) * 60) + parseInt(secs);
			const queue = client.DisTube.getQueue(message);
			if (queue.songs.length <= 0) {
				return message.channel.send(`${client.emotes.error} | No song queued!`);
			}
			if (queue.isPaused() || queue.isPlaying()) {
				if (timeTotal > queue.songs[0].duration || timeTotal < 0) {
					return message.channel.send(`${client.emotes.error} | Seek time not within song boundaries!`);
				}
				client.DisTube.seek(message, timeTotal);
				return message.channel.send(`${client.emotes.success} | Seeked to ${args[0]}!`);
			}
		}
		catch (err) {
			console.log(err);
			return message.channel.send(`${client.emotes.error} | Error`);
		}

	},
};