'use strict';
const pos = require('../');

const device = new pos.USB();
const printer = new pos.Printer(device);

function padWithZero(val) {
    return (val < 10) ? ("0" + val) : val;
}

function getDate() {
    let date = new Date();
    let day = padWithZero(date.getDate());
    let month = padWithZero(date.getMonth() + 1);
    let year = date.getFullYear();
    return day + '-' + month + '-' + year;
}

let date = getDate();

function getTime() {
    let time = new Date();
    let hour = padWithZero(time.getHours());
    let min = padWithZero(time.getMinutes());
    let sec = padWithZero(time.getSeconds());
    return hour + ':' + min + ':' + sec;
}

let time = getTime();

function constructBarcode() {
    let dt = new Date();
    let day = padWithZero(dt.getDate());
    let month = padWithZero(dt.getMonth() + 1);
    let year = dt.getFullYear().toString().slice(2);
    let hour = padWithZero(dt.getHours());
    let min = padWithZero(dt.getMinutes());
    let sec = padWithZero(dt.getSeconds());
    return day.toString() + month.toString() + year + hour.toString() + min.toString() + sec.toString();
}

device.open((err) => {
    printer
        .model('custompos')
        .hardware('INIT')
        .font('A')
        .align('CT')
        .style('BU')
        .size(2, 2)
        .print('RoninTech Parking')
        .feed()
        .style('NORMAL')
        .size(1, 1)
        .barcode(constructBarcode(), 'EAN13')
        .feed()
        .feed()
        .print(date)
        .feed()
        .print(time)
        .feed()
        .feed()
        .print('1 Hours AED 10')
        .feed()
        .print('First 15 Minutes Free')
        .feed()
        .print('Lost Ticket Charge AED 150')
        .feed()
        .style('I')
        .print('Thank You')
        .cut()
        .close();
});
