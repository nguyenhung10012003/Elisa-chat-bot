const {Client, GatewayIntentBits, Collection, Partials} = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();
const {init} = require('./deploy-command')
const express = require('express')
const app = express()
const TrackManager = require('./handlers/track/TrackManager')

const TOKEN = process.env.TOKEN;

const main = async () => {
    await init();
    const client = new Client({
                                  intents: [
                                      GatewayIntentBits.Guilds,
                                      GatewayIntentBits.GuildMessages,
                                      GatewayIntentBits.GuildIntegrations,
                                      GatewayIntentBits.GuildVoiceStates
                                  ],
                                  partials: [Partials.Channel]
                              });

    client.commands = new Collection();
    const foldersPath = path.join(__dirname, 'commands');
    const commandFolders = fs.readdirSync(foldersPath);
    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ('data' in command && 'execute' in command) {
                client.commands.set(command.data.name, command);
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }

    const eventsPath = path.join(__dirname, 'events');
    const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else {
            client.on(event.name, (...args) => event.execute(...args));
        }
    }
    await client.login(TOKEN);
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    try {
        main().then(() => console.log("Application has started successfully!"));
        console.log(`Example app listening on port ${port}`)
    } catch (err) {
        console.log(`Application start fail with error: ${err}`)
    }
});
