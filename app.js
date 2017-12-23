    var request = require('request');
    var cheerio = require('cheerio');
    const https = require("https");
    // Load up the discord.js library
    const Discord = require("discord.js");

    // This is your client. Some people call it `bot`, some people call it `self`, 
    // some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
    // this is what we're refering to. Your client.
    const client = new Discord.Client();

    // Here we load the config.json file that contains our token and our prefix values. 
    const config = require("./config.json");
    // config.token contains the bot's token
    // config.prefix contains the message prefix.

    client.on("ready", () => {
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".
    client.user.setGame(`on ${client.guilds.size} servers`);
    });

    client.on("guildCreate", guild => {
    // This event triggers when the bot joins a guild.
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    client.user.setGame(`on ${client.guilds.size} servers`);
    });

    client.on("guildDelete", guild => {
    // this event triggers when the bot is removed from a guild.
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    client.user.setGame(`on ${client.guilds.size} servers`);
    });


    client.on("message", async message => {
        // This event will run on every single message received, from any channel or DM.

        // It's good practice to ignore other bots. This also makes your bot ignore itself
        // and not get into a spam loop (we call that "botception").
        if(message.author.bot) return;

        // Also good practice to ignore any message that does not start with our prefix, 
        // which is set in the configuration file.
        if(message.content.indexOf(config.prefix) !== 0) return;

        // Here we separate our "command" name, and our "arguments" for the command. 
        // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
        // command = say
        // args = ["Is", "this", "the", "real", "life?"]
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();  

        
        if(command === "price" || command === "p")
        {
            const url = "https://api.binance.com/api/v3/ticker/price?symbol=XVGBTC";
            https.get(url, res => {
                res.setEncoding("utf8");
                let body = "";
                    res.on("data", data => {
                    body += data;
                });
                res.on("end", () => {
                    body = JSON.parse(body);
                    console.log(
                        body.price
                    //`City: ${body.results[0].} -`,
                    //`Latitude: ${body.results[0].geometry.location.lat} -`,
                    //`Longitude: ${body.results[0].geometry.location.lng}`
                    );
                        message.channel.send(`Binance price:  ${body.price} BTC/XVG`);
                });
            });

            const bittrex = "https://bittrex.com/api/v1.1/public/getmarketsummary?market=btc-xvg";
            https.get(bittrex, res => {
                res.setEncoding("utf8");
                let body = "";
                    res.on("data", data => {
                    body += data;
                });
                res.on("end", () => {
                    body = body.replace('[', '');
                    body = body.replace(']', '');
                    body = JSON.parse(body);
                    console.log(
                        body
                    //`City: ${body.results[0].} -`,
                    //`Latitude: ${body.results[0].geometry.location.lat} -`,
                    //`Longitude: ${body.results[0].geometry.location.lng}`
                    );
                        message.channel.send(`Bittrex price:${body.result.Last} BTC/XVG`);
                });
            });

        }

        if(command === "shit")
        {
            const url = "https://api.coinmarketcap.com/v1/ticker/litecoin/?convert=USD";
            https.get(url, res => {
                res.setEncoding("utf8");
                let body = "";
                    res.on("data", data => {
                    body += data;
                });
                res.on("end", () => {
                    body = body.replace('[', '');
                    body = body.replace(']', '');
                    body = JSON.parse(body);
                    
                    console.log(
                        body
                    //`City: ${body.results[0].} -`,
                    //`Latitude: ${body.results[0].geometry.location.lat} -`,
                    //`Longitude: ${body.results[0].geometry.location.lng}`
                    );

                    if(body.price_usd <= 100)
                        message.channel.send(`RICKY HAS TO EAT CAT SHIT!!!!!!!, Litecoin price: ${body.price_usd} USD`);

                    else if(body.price_usd > 0)
                        message.channel.send(`Ricky does not have to eat cat shit, Litecoin price: ${body.price_usd} USD`);
                    
                    
                });
            });
        }

        if(command === "hodl")
        {
            var hodl = ["https://i.imgur.com/afOSYMt.png", 
            "https://i.imgur.com/cxSbd1v.png",
             "https://i.imgur.com/y8qvNvK.jpg",
              "https://i.imgur.com/EDELavw.png",
               "https://i.imgur.com/C12MvAx.png"]
            
            
            message.channel.send(hodl[Math.floor(Math.random() * hodl.length)]);
        }

        if(command === "mine")
        {
            request('http://yiimp.eu/?address=DCYEEy987KovCnq3hb7dmQeCygqNYVkpnh', function (error, response, html) {
            if (!error && response.statusCode == 200) {
                console.log("HTML " + html);
            }
            });
        }

        if (command === "unpaid")
        {
            const url = "http://yiimp.eu/?address=DCYEEy987KovCnq3hb7dmQeCygqNYVkpnh";
            request(url, function (error, response, body) 
            {
            if (!error && response.statusCode == 200) 
            {
                var $ = cheerio.load(body);
                var title = $("title").text();
                console.log(title);
            }
            })
        }
    });

client.login(config.token);