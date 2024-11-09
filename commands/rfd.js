const run = () => {
	if (!client.rfd){
		return;
	}
	let links = new Array();
	http.get('https://forums.redflagdeals.com/feed/forum/9', (res) => {
		res.on('data', (d) => {
			const result = d.toString();
			const parsed = parse(result);
			const entries = parsed.querySelectorAll("entry");
			if (entries.length) {
				entries[0].childNodes.forEach(node => {
					if (typeof node.rawAttrs === 'string' || node.rawAttrs instanceof String) {
						let parsedLink = node.rawAttrs.split("\"")[1];
						if (parsedLink && node.rawTagName === "link"  && !parsedLink.includes("<")) {
							try {
								links.push(parsedLink);
							}
							catch (err) {
								console.log(err);
							}
						}
					}

				})
			}
		}).on('close', () => {
			sendLinks(links);
		})
	}).on('error', (e) => {
		console.log(e);
	})
}
const sendLinks = (links) => {
	client.channels.cache.get(channelId).send("Sent at " + (new Date()).toLocaleTimeString());
	for (let link in links){
		if (links[link]) {
			client.channels.cache.get(channelId).send(links[link]);
		}
	}
}