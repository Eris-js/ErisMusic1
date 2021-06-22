const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const prefix = require("../../config.json").default_prefix;
const { color } = require("../../config.json")
const { MessageButton } = require('discord-buttons');

module.exports = {
  name: "help",
  aliases : ['h'],
  cooldown: 10000,
  description: "Shows all available bot commands.",
  async execute (client, message, args) {

    const button = new MessageButton()
        .setStyle('url')
        .setURL('https://discord.com/api/oauth2/authorize?client_id=854843272043429929&permissions=4294967287&scope=bot') 
        .setLabel('Invite me!')
        //.setDisabled();

    const support = new MessageButton()
        .setStyle('url')
        .setURL('https://discord.gg/czvKnPth4j') 
        .setLabel('Support Channel!')
        //.setDisabled();

    if (!args[0]) {
      let categories = [];

      readdirSync("./commands/").forEach((dir) => {
        const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
          file.endsWith(".js")
        );

        const cmds = commands.map((command) => {
          let file = require(`../../commands/${dir}/${command}`);

          if (!file.name) return "No command name.";

          let name = file.name.replace(".js", "");

          return `\`${name}\``;
        });

        let data = new Object();

        data = {
          name: dir[0].toUpperCase() + dir.slice(1),
          value: cmds.length === 0 ? "In progress." : cmds.join(" "),
        };

        categories.push(data);
      });

      const embed = new MessageEmbed()
        .setTitle("📬 Need help? Here are all of my commands:")
        .addFields(categories)
        .setDescription(
          `Use \`${prefix}help\` followed by a command name to get more additional information on a command. For example: \`${prefix}help ping\`.`
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(`${color[0].primary}`);
      return message.channel.send({
        buttons: [support, button],
        embed: embed
      });
    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        const embed = new MessageEmbed()
          .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
          .setColor("FF0000");
        return message.channel.send({
          buttons: [support, button],
          embed: embed
        });
      }

      const embed = new MessageEmbed()
        .setTitle("Command Details:")
        .setDescription(`My prefix is: \`${prefix}\``)
        .addField(
          "Command:",
          command.name ? `\`${command.name}\`` : "No name for this command."
        )
        .addField(
          "Aliases:",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "No aliases for this command."
        )
        .addField(
          "Usage:",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``
        )
        .addField(
          "Description:",
          command.description
            ? command.description
            : "No description for this command."
        )
        .setFooter(
          `Requested by ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(roleColor);
      return message.channel.send({
        buttons: [support, button],
        embed: embed
      });
    }
  },
};