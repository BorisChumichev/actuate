# actuate

- Посылка единичных команд
  - ~~вывести список доступных портов~~
  - ~~включить привод~~
  - ~~выключить привод~~
  - ~~разрешить работу двигателя (программно)~~
  - ~~запретить работу двигателя (программно)~~
  - ~~установить требуемую выходную координату~~
  - ~~разорвать обратную связь по положению~~
  - ~~установить обратную связь по положению~~
  - ~~чтение пути к порту из конфига~~

- Посылка последовательностей команд
  - ~~гармонический сигнал с параметрами~~
    - ~~амплитуда~~
    - ~~частота~~
    - ~~[число периодов]~~
    - ~~[путь для записи лога]~~

```
  Usage: index [options] [command]


  Commands:

    ls         lists all availible serial ports
    on         turns actuator on
    off        turns actuator off
    allow      allows the engine operation
    disallow   disallows the engine operation
    move       sets desired actuator position to a given value
    setstate   sets state of the internal systems (bitmap may differ)
    sine       writes sine input to the actuator

  Options:

    -h, --help               output usage information
    -V, --version            output the version number
    -p, --port <path>        path to serial port to work with
    -a, --amplitude <value>  amplitude of signal
    -f, --frequency <value>  frequency of signal
    -P, --periods <value>    how many periods to operate
    -o, --out <path>         logging directory
```

