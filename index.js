const {SerialPort} = require('serialport');
const {StringStream} = require('scramjet');
const fs = require('fs');

// Parameters to customize for a different machine
const COM_port = 'COM3';
const CSV_filepath = 'temperatures.csv';

// Initialize serial port
const port = new SerialPort({
    path: COM_port,
    baudRate: 9600
});


// Called when serial port first open
port.on('open', () => {
    console.log('Serial port opened');
});


// Process every new line (ended by \n)
port.pipe(new StringStream)
    .lines('\n')
    .each(data => {
        const date = new Date(Date.now());
        // Append the date, time and temperature to the file
        const line = `${date.toLocaleDateString('es-ES')};${date.toLocaleTimeString('es-ES')};${data}`;
        
        console.log(line);
        fs.appendFile(CSV_filepath, line, err => {
            // Handle errors
            // This may file if the file is locked. For example, excel blocks the file on load
            if(err) {
                console.log(`ERROR! Couldn't append data to file: ${err}`)
            }
        });
    });
