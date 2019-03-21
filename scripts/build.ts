import archiver from 'archiver'
import fs from 'fs'

const output = fs.createWriteStream('lambda.zip')
const archive = archiver('zip')
archive.pipe(output)
archive.directory('dist/', false)
archive.finalize()