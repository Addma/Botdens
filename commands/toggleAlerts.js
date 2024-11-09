module.exports = {
    name: 'togglealert',
    inVoiceChannel: true,
    run: async (client, message, args) => {
        client.rfd = !client.rfd;
        const msg = client.rfd ? 'on' : 'off';
        message.reply(`Alerts are now ` + msg);
    }
}