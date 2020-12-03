import mpAdapter from 'axios-miniprogram-adapter'
import DollarRequest from './DollarRequest'

export default class {
    constructor (options) {
        options.adapter = mpAdapter
        return new DollarRequest(options, mpAdapter)
    }
}
