class ParseStringArray {
    parseStringAsArray(arrayAsString) {
        return arrayAsString.split(',').map(t => t.trim());
    }
}
export default new ParseStringArray();