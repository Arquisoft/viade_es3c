const rdf = require('@rdfjs/data-model')
const Readable = require('readable-stream')
const N3 = require('n3')

class ParserStream extends Readable {
  constructor (input, {baseIRI = '', factory = rdf} = {}) {
    super({
      objectMode: true,
      read: () => {}
    })

    const parser = new N3.Parser({baseIRI, factory})

    parser.parse(input, (err, quad, prefixes) => {
      if (err) {
        return this.emit('error', err)
      }

      if (prefixes) {
        Object.keys(prefixes).forEach((prefix) => {
          this.emit('prefix', prefix, factory.namedNode(prefixes[prefix]))
        })
      }

      this.push(quad || null)
    })
  }
}

module.exports = ParserStream