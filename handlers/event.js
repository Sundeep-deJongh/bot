const fs = require('fs');
const chalk = require('chalk');

const AscciTable = require('ascii-table');
const table = new AscciTable();

table.setHeading('Event', 'Status').setBorder('|', '=', "0", "0");
module.exports = (client) => {
    fs.readdirSync('./events/').filter((file) => file.endsWith('.js')).forEach((event) => {
       require(`../events/${event}`);
       table.addRow(event.split('.js')[0], '✅');
    });
    
    console.log(chalk.greenBright(table.toString()));
    
}