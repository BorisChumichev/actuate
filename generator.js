var EventEmitter = require('events').EventEmitter
  , inherits = require('util').inherits

var time = module.exports.time = (function () {
  var startTime = process.hrtime()
  return function () {
    return process.hrtime(startTime)[0] + process.hrtime(startTime)[1]*1e-9
  }
})()

module.exports.Emitter = function (signal, maxPeriods) {
  this.cursor = 0
  this.periods = 0
  this.isActive = false
  var that = this
  this.start = function () {
    that.isActive = true
    that.interval = setInterval(function () {
      if (that.cursor >= that.data.length) {
        that.cursor = 0
        that.periods++
        if (that.periods >= maxPeriods) 
          return (that.emit('endpoint'), that.stop())
        that.emit('newperiod', that.periods)
      }
      that.emit('newpoint', [ time(), that.data[that.cursor] ])
      that.cursor++
    }, 20)
  }
  this.stop = function () {
    that.isActive = false
    that.cursor = 0
    clearInterval(that.interval)
  }
  this.data = computeSignalArray(signal)
}

inherits(module.exports.Emitter, EventEmitter)


var computeSignalArray = function (signal) {
  var period = 1/signal.frequency
  var data = []
  for (var t = 0; t <= period; t+=0.02) {
    var amplitude = signal.resolve(t)
    data.push(limit(amplitude, -100, 100))
  }
  return data
}


var limit = function (val, min, max) {
  return val > max
    ? max
    : val < min
      ? min
      : val
}
