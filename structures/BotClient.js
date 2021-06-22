const { Client } = require("discord.js");
const YouTube = require("simple-youtube-api");

class botClient extends Client {
	constructor(opt) {
		super(opt);

		this.util = require("../utils/util");
		this.queue = new Map();
		this.players = require("../utils/players");
		this.youtube = new YouTube("AIzaSyCwr8to_nm214bJrjlXHo_6wSJhIxlCIKA");

	}
}

module.exports = botClient;
