const { SlashCommandBuilder } = require('discord.js');
const mysql = require('mysql');
const { dbhost, db, username, password } = require('../config.json');
let result2 = null;
let result3 = null;
let result4 = null;
let result5 = null;
let result6 = null;
let result7 = null;
module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
	// eslint-disable-next-line quotes
		.setDescription("Get a user's info")
		.addStringOption(option =>
			option.setName('user')
				.setRequired(true)
				.setDescription('The user')),
	async execute(interaction) {
		const dbe = mysql.createConnection({
			host: dbhost,
			user: username,
			password: password,
			database: db,
		});
		const user = interaction.options.getString('user');
		// eslint-disable-next-line quotes
		const query = `SELECT Cash FROM users WHERE Username = '${user}'`;
		const query2 = `SELECT Level FROM users WHERE Username = '${user}'`;
		const query3 = `SELECT Exp FROM users WHERE Username = '${user}'`;
		const query4 = `SELECT Vip FROM users WHERE Username = '${user}'`;
		const query5 = `SELECT Admin FROM users WHERE Username = '${user}'`;
		const query6 = `SELECT Faction FROM users WHERE Username = '${user}'`;
		dbe.query(query2, (err, result) => {
			if (err) throw err;
			result3 = JSON.stringify(result).replace(/"/g, '').replace(/\[/g, '').replace(/\]/g, '').replace(/\{/g, '').replace(/\}/g, '');
		});
		dbe.query(query3, (err, result) => {
			if (err) throw err;
			result4 = JSON.stringify(result).replace(/"/g, '').replace(/\[/g, '').replace(/\]/g, '').replace(/\{/g, '').replace(/\}/g, '');
		});
		dbe.query(query4, (err, result) => {
			if (err) throw err;
			result5 = JSON.stringify(result).replace(/"/g, '').replace(/\[/g, '').replace(/\]/g, '').replace(/\{/g, '').replace(/\}/g, '');
		});
		dbe.query(query5, (err, result) => {
			if (err) throw err;
			result6 = JSON.stringify(result).replace(/"/g, '').replace(/\[/g, '').replace(/\]/g, '').replace(/\{/g, '').replace(/\}/g, '');
		});
		dbe.query(query6, (err, result) => {
			if (err) throw err;
			result7 = JSON.stringify(result).replace(/"/g, '').replace(/\[/g, '').replace(/\]/g, '').replace(/\{/g, '').replace(/\}/g, '');
		});
		dbe.query(query, async (err, result) => {
			if (err) throw err;
			result2 = JSON.stringify(result).replace(/"/g, '').replace(/\[/g, '').replace(/\]/g, '').replace(/\{/g, '').replace(/\}/g, '');
			const embed = {
				title: `${interaction.options.getString('user')}`,
				// eslint-disable-next-line quotes
				description: "",
				fields: [
					{
						name: 'Cash',
						value: `${result2}`,
						inline: true,
					},
					{
						name: 'Level',
						value: `${result3}`,
						inline: true,
					},
					{
						name: 'Exp',
						value: `${result4}`,
						inline: true,
					},
					{
						name: 'Vip',
						value: `${result5}`,
						inline: true,
					},
					{
						name: 'Admin',
						value: `${result6}`,
						inline: true,
					},
					{
						name: 'Faction',
						value: `${result7}`,
						inline: true,
					},
				],
			};
			await interaction.reply({ embeds:[embed] });
		});
	},
};