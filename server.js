require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Client, GatewayIntentBits } = require('discord.js');

const app = express();

app.use(cors());

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

let cachedVouches = [];

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);

    const channel = await client.channels.fetch('1497158913420689495');

    async function fetchMessages() {
        const messages = await channel.messages.fetch({ limit: 20 });

        cachedVouches = messages.map(msg => ({
            author: msg.author.username,
            avatar: msg.author.displayAvatarURL(),
            content: msg.content,
            date: msg.createdAt
        }));
    }

    await fetchMessages();

    setInterval(fetchMessages, 30000);
});

app.get('/vouches', (req, res) => {
    res.json(cachedVouches);
});

app.listen(process.env.PORT || 3000, () => {
    console.log('API running');
});

client.login(process.env.MTUwMzE0MDUwNjkwNDAzOTYxOA.GgPckC.sxGaxZjsuO37g6Jml5d129X0XPxttPlu-j3QWw);
