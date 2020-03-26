const ParserN3 = require('@rdfjs/parser-n3')
const Readable = require('stream').Readable

const parserN3 = new ParserN3()

export const parser{
const input = new Readable({
  read: () => {
    input.push(`
      PREFIX s: <http://schema.org/>

      [] a s:Person ;
        s:jobTitle "Professor" ;
        s:name "Jane Doe" ;
        s:telephone "(425) 123-4567" ;
        s:url <http://www.janedoe.com> .
    `)
    input.push(null)
  }
})

const output = parserN3.import(input)

output.on('data', quad => {
  console.log(`quad: ${quad.subject.value} - ${quad.predicate.value} - ${quad.object.value}`)
})

output.on('prefix', (prefix, ns) => {
  console.log(`prefix: ${prefix} ${ns.value}`)
})
}