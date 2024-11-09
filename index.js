// Require the necessary discord.js classes
const Discord = require('discord.js');
require('dotenv').config();
const token = process.DISCORD_TOKEN;
// Create a new client instance
const fs = require('node:fs');
const path = require('node:path');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')
const { YouTubePlugin } = require('@distube/youtube');
const { Events } = require('discord.js')
const config = require('./config.json')
const http = require('https');
const {parse} = require('node-html-parser');
const client = new Discord.Client({ intents: [Discord.GatewayIntentBits.Guilds, Discord.GatewayIntentBits.GuildMessages, Discord.GatewayIntentBits.MessageContent, Discord.GatewayIntentBits.GuildVoiceStates] });
client.commands = new Discord.Collection()
client.aliases = new Discord.Collection()
client.emotes = config.emoji
client.rfd = false;

let cookie = JSON.parse(fs.readFileSync("cookies.json"));
console.log(typeof(cookie));
console.log((cookie[0]));

client.DisTube = new DisTube(
	client,
	{
		emitNewSongOnly: true,
		emitAddSongWhenCreatingQueue: false,
		emitAddListWhenCreatingQueue: false,
		plugins: [
			new SpotifyPlugin(),
			new YouTubePlugin({
				cookies: [
					cookie[0],
					]
			  }),
			  			new SoundCloudPlugin(),
			new YtDlpPlugin(),
		  ],
		  nsfw: true,
	}
)


client.logsOn = false;
fs.readdir('./commands/', (err, files) => {
	if (err) return console.log("Couldn't find commands!");
	const jsFiles = files.filter(f => f.split(".").pop() === "js")
	if (jsFiles.length <= 0) return console.log("Coulddn't find any commands!");
	jsFiles.forEach(file => {
		console.log(file);
		const cmd = require(`./commands/${file}`)
		console.log(`Loaded ${file}`)
		client.commands.set(cmd.name, cmd);
		if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
	})
})

client.on(Events.MessageCreate, async message => {
	if (message.author.bot || !message.guild) return;
	const prefix = "?";
	if (client.logsOn) {
		client.channels.cache.get(message.channel.id).send(`${message.author.username} said in #${message.channel.name}: ${message.content}`);
	}
	if (!message.content.toLowerCase().startsWith(prefix) || message.content.length <= 1) return;
	const args = message.content.slice(prefix.length).trim().split(/ /g);
	const command = args.shift().toLowerCase();
	const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))

	if (!cmd) return;
	try {
		console.log(cmd);
		cmd.run(client, message, args)
	}catch(e) {
		console.log(e);
	}
})

client.DisTube.on("playSong", (queue, song) => {
	console.log(song);
	queue.textChannel.send("NOW PLAYING " + song.name + ` (${song.formattedDuration})`)
})
client.DisTube.on("addSong", (queue, song) => {
	queue.textChannel.send("QUEUED: " + song.name + ` (${song.formattedDuration})`)
})
client.on(Events.InteractionCreate, async interaction => {
	console.log("HI")
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}

});
//client.DisTube.on("ffmpegDebug", console.log);

client.commands = new Discord.Collection();
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Discord.Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(token);

