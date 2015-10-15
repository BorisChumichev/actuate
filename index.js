#!/usr/bin/env node
var program = require('commander')
  , slipper = require('serialport-slip')
  , sp = require('serialport')
  , fs = require('fs')
  , color = require('colors')
  , message = require('./message')
  , port = null

program
  .version('0.0.1')
  .option('-p, --port <path>', 'path to serial port to work with')

program
  .command('lp')
  .description('list all availible serial ports')
  .action(listPorts)

program
  .command('turnon')
  .description('turn actuator on')
  .action(turnOn)

program
  .command('turnoff')
  .description('turn actuator off')
  .action(turnOff)

program
  .command('allow')
  .description('allow the engine')
  .action(allowEngine)

program
  .command('disallow')
  .description('disallow the engine')
  .action(disAllowEngine)

program.parse(process.argv)

function initPort(cb) {
  if (!program.port) {
    console.error(color.red('path to port is not defined'))
    process.exit(1)
  }
  try {
    var sp = new slipper(program.port, {
      baudrate: 115200
    })
  } catch (err) {
    handleError(err)
  }
  sp.on('error', function (err) {
    handleError(err)
  })
  sp.on('open', function () {
    port = sp
    cb()
  })
}

function listPorts () {
  sp.list(function (err, ports) {
    ports.forEach(function(port) {
      console.log(color.green(port.comName))
    })
  })
}

function turnOn () {
  initPort(function () {
    port.write(message.command(0x01), handleWriteOnce)
  })
}

function turnOff () {
  initPort(function () {
    port.write(message.command(0x00), handleWriteOnce)
  })
}

function allowEngine () {
  initPort(function () {
    port.write(message.command(0x15), handleWriteOnce)
  })
}

function disAllowEngine () {
  initPort(function () {
    port.write(message.command(0x20), handleWriteOnce)
  })
}

function handleWriteOnce(err, res) {
  if (err) {
    handleError(err)
  } else {
    console.log(color.green('done, ' +res+ ' bytes sent'))
    process.exit(0)
  }
}

function handleError(err) {
  console.error(color.red(err))
  process.exit(1)
}
