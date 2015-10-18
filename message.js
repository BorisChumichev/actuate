var m = new Buffer([ 0x80, 0x80, 0x01, 0x00, 0x00, 0x00, 0x00, 0x00 ])
  , pa = 3
  , ca = 5
  , sa = 6
  , noop = 0x03

module.exports = {
  command: function (code) {
    m.writeUInt8(code, ca)
    return m
  },
  position: function (number) {
    m.writeUInt8(noop, ca)
    m.writeInt16LE(parseInt(number*100), pa)
    return m
  },
  state: function (number) {
    m.writeUInt8(noop, ca)
    m.writeInt16LE(number, sa)
    return m
  }
}
