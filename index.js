#!/usr/bin/env node
var program = require('commander')
  , slipper = require('serialport-slip')
  , sp = require('serialport')
  , fs = require('fs')
  , color = require('colors')

program
  .version('0.0.1')
  .option('-p, --port <path>', 'path to serial port to work with');

program
  .command('lp')
  .description('list all availible serial ports')
  .action(listPorts)

program.parse(process.argv);

function listPorts () {
  sp.list(function (err, ports) {
    ports.forEach(function(port) {
      console.log(color.green(port.comName))
    })
  })
}
