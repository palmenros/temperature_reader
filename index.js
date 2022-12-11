const {SerialPort} = require('serialport');
const {StringStream} = require('scramjet');
const { fstat } = require('fs');
const fs = require('fs');

const COM_port = 'COM3';
const CSV_filepath = 'temperatures.csv';


const port = new SerialPort({
    path: 'COM3',
    baudRate: 9600
});

port.on('open', () => {
    console.log('Serial port opened');
});


port.pipe(new StringStream)
    .lines('\n')
    .each(data => {
        const date = new Date(Date.now());
        const line = `${date.toLocaleDateString('es-ES')};${date.toLocaleTimeString('es-ES')};${data}`;
        
        console.log(line);
        fs.appendFile(CSV_filepath, line, err => {
            if(err) {
                console.log(`ERROR! Couldn't append data to file: ${err}`)
            }
        });
    });
