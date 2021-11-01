//Client and Server Side

class Base {
  constructor(ctx) {
    this.ctx = ctx
  }
  url(url, ext) { 
    url = url.replace(/^\/\//, 'https://')
    if (!this.ctx.encode==='base64') {
      url = this.ctx.encoding.decode(url)
    }
    if (url.startsWith(this.ctx.prefix)) return url
    if (!url.startsWith('http')) {
      try {
        var host = new URL(this.ctx.url).hostname
      } catch(err) {
        try {var host = new URL(this.ctx.encoding.decode(this.ctx)).hostname} catch(e) {}
      }
      url = 'https://'+ host + (url.startsWith('/') ? '' : '/') + url
    }
    if (!ext) return this.ctx.prefix + this.ctx.encoding.encode(url)+'/'
    return this.ctx.prefix + ext + this.ctx.encoding.encode(url)+'/'
  }
  element(attr, ext) {
    if (ext==='_plain/') {
      var url = this.url(attr)
    } else {
      var url = this.url(attr, ext)
    }

    return url
  }
}

if (typeof module !== undefined) module.exports = Base;