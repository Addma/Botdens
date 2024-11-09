const fs = require('node:fs');
module.exports = {
	name: 'shows',
	aliases: ['sh'],
	inVoiceChannel: true,
	run: async (client, message, args) => {
		const fileName = 'shows.txt';
		const cmd = args[0];
		args = args.slice(1);
		const nameOfShow = args.filter(arg => isNaN(parseInt(arg))).join(' ').trim();
		const nameOfShowFormatted = nameOfShow.replace(/ /g, '').toLowerCase();

		console.log(args, nameOfShow);
		if (cmd === 'all') {
			fs.readFile(fileName, 'utf-8', (err, data) => {
				if (err) {
					message.reply('Error occurred');
				}
				let msg = '';
				data.split('\n').forEach(element => {
					const line = element.split(',');
					const name = line[0];
					const szn = line[1];
					const ep = line[2];
					msg += `Show: ${name}, Season: ${szn}, Episode: ${ep}\n`;
				});
				message.reply(msg);
			});


		}
		else if (cmd === 'add') {
			if (args.length <= 0) {
				message.reply('Need a show name sir...');
				return;
			}
			else {

				try {
					const nums = args.filter(arg => !isNaN(parseInt(arg)));
					const season = nums[0] || 0;
					const ep = nums[1] || 0;
					const newLine = `\n${nameOfShow},${season},${ep}`.toLowerCase();
					fs.readFile(fileName, 'utf8', (err, txt) => {
						if (err) {
							message.reply('Error');
						}
						const shows = txt.split('\n');
						const findShow = shows.find(show => {
							console.log(show.split(',')[0].replace(/ /g, ''), nameOfShowFormatted);

							return show.split(',')[0].replace(/ /g, '').includes(nameOfShowFormatted);
						});
						if (findShow) {message.reply('Show exists already');}
						else {
							fs.appendFile(fileName, newLine, (error) => {
								if (error) {
									message.reply('Error occurred');
								}
								else {
									message.reply(`Added ${nameOfShow}, Season ${season}, Episode ${ep}`);
								}
							});
						}
					});

				}
				catch (err) {
					message.reply('Incorrect format. Ex: "Breaking Bad 2 10" logs season 2 episode 10 of Breaking Bad.');

				}
			}
		}
		else if (cmd === 'remove') {
			console.log(args, 'ARGS');
			if (args.length <= 0) {
				message.reply('Need a show name sir...');
				return;
			}
			const showToRemove = nameOfShowFormatted;

			fs.readFile(fileName, 'utf-8', (err, data) => {
				if (err) {
					message.reply('Error occurred');
					return;
				}
				const shows = data.split('\n');
				let ind = null;
				shows.forEach((show, i) => {
					if (show.split(',')[0].replace(/ /g, '').includes(showToRemove)) {
						ind = i;
					}
				});
				if (ind == null) {
					message.reply('Show not found');
					return;
				}
				fs.readFile(fileName, 'utf8', (err, text) => {
					if (err) {
						message.reply('Error');
					}
					// data is the file contents as a single unified string
					// .split('\n') splits it at each new-line character and all splits are aggregated into an array (i.e. turns it into an array of lines)
					// .slice(1) returns a view into that array starting at the second entry from the front (i.e. the first element, but slice is zero-indexed so the "first" is really the "second")
					// .join() takes that array and re-concatenates it into a string

					const linesExceptFirst = (text.split('\n').slice(0, ind).concat(text.split('\n').slice(ind + 1, text.length))).join('\n');
					fs.writeFile(fileName, linesExceptFirst, (errr) => {
						if (errr) {
							message.reply('Error updating shows');
						}
						else {
							message.reply(`Removed ${shows[ind].split(',')[0].replace(/ /g, '')} successfully`);
						}
					});
				});
			});
		}
		else if (cmd === 'update') {
			const showToUpdate = nameOfShowFormatted;
			const nums = args.filter(arg => !isNaN(parseInt(arg)));
			const seasonArg = nums[0] || 0;
			const epArg = nums[1] || 0;
			fs.readFile(fileName, 'utf-8', (err, data) => {
				if (err) {
					message.reply('Error occurred');
					return;
				}
				const shows = data.split('\n');
				const result = shows.map((show) => {

					if (show.split(',')[0].replace(/ /g, '').includes(showToUpdate)) {
						const lineSplit = show.split(',');
						const showName = lineSplit[0];
						const season = seasonArg || lineSplit[1];
						const ep = epArg || lineSplit[2];
						return `${showName},${season},${ep}`;
					}
					return show;
				}).join('\n');
				fs.writeFile(fileName, result, (errr) => {
					if (errr) {
						message.reply('Error updating shows');
					}
					else {
						message.reply(`Updated ${nameOfShow} successfully`);
					}
				});
			});
		}
		else {
			message.reply('Invalid command. Available commands:\n'
                + '?shows add [show name] [season#] [episode#]\n'
                + '?shows remove [show name]\n' +
                '?shows all\n' +
                '?shows update [show name] [season] [episode]',
			);
		}

	},
};