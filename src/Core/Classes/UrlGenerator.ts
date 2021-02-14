let idGenerator = require('nanoid')

export default class UrlGenerator {
    public execute() {
        return idGenerator.nanoid(8)
    }
}