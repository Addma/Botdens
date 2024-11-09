module.exports = {
	name: 'skip',
	aliases: ['s'],
	inVoiceChannel: true,
	run: async (client, message, args) => {
		 try {
			const queue = client.DisTube.getQueue(message);
			if (queue.songs.length < 1) return;
			if (queue.songs.length == 1) {
				await client.DisTube.stop(message);
				return message.channel.send(`${client.emotes.success} Skipped!`);
			}
			console.log("HI");
			if (!queue) return message.channel.send(`${client.emotes.error} Queue is empty!`);
			if (args[0] === 'all') {
				if (!queue.autoplay && queue.songs.length == 1) {
				await client.DisTube.skip(message);
					message.channel.send('Only 1 song in queue, use skip next time plz :).');
	
					return;
				}
				else {
					await client.DisTube.stop(message);
					message.channel.send('All Skipped.');
					return;
				}
			}
			if (args[0] === undefined) {
				await client.DisTube.skip(message);
				return message.channel.send(`${client.emotes.success} Skipped!`);

			} else if (isNaN(parseInt(args[0])) && args[0] != undefined) {
				return message.channel.send(`${client.emotes.error} Invalid argument!`);
			} else {
				await client.DisTube.skip(message);
				return message.channel.send(`${client.emotes.success} Skipped ${args[0]}!`);

			}
		} catch (err) {
			message.channel.send(`${client.emotes.error} Error!`);
			console.log(err)
		}

	},
};