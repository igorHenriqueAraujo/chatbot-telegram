const env = require('../.env')
const Telegraf = require('telegraf')
const bot = new Telegraf(env.token)


bot.start(async ctx => {
    const name = ctx.update.message.from.first_name
    await ctx.reply(`Seja bem vindo, ${name}! 😎`)
    await ctx.replyWithHTML(`Destacando mensagem <b>HTML</b>
    <i>de várias</i> <code>formas</code> <pre>possíveis</pre>
    <a href="http://google.com">Google</a>`)
    await ctx.replyWithMarkdown('Destacando mensagem *Markdown* '
    + '_de várias_ `formas` ```possíveis```'
    + '[Google](http://www.google.com)')
    await ctx.replyWithPhoto({source: `${__dirname}/cat.jpeg`})
    await ctx.replyWithPhoto('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHonUcwRlb9fCcSb9vcRD3zOAnk9uJIFXns_rPCkKExALa-x8V',
    {caption: 'Olha o estilo!'})
    await ctx.replyWithLocation(-23.493294, -46.831524)
    await ctx.replyWithVideo('http://files.cod3r.com.br/curso-bot/cod3r-end.m4v')
    
})

bot.startPolling()