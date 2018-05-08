const ejs = require('ejs')

module.export = async (ctx, renderer, template) => {
  ctx.header['ContentType'] = 'text/html'

  const context = { url: ctx.path } // 要把这个context传入server render

  try {
    const appString = await renderer.rendererToString(context)

    const html = ejs.render(template, {
      appString,
      style: context.renderStyles(),
      scripts: context.renderScripts()
    })

    ctx.body = html
  } catch (err) {
    // console.err(err)
    console.err('err')
    throw err
  }
}