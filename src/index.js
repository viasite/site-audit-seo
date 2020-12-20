#!/usr/bin/env node
const process = require('process');
const program = require('./program');
const scrapSite = require('./scrap-site');
const {saveAsXlsx, saveAsJson, uploadJson, publishGoogleDrive, startViewer} = require(
  './actions');
const {exec} = require('child_process');

program.parse(process.argv);

async function start() {
  if (!program.urls) {
    console.log(`${program.name()} ${program.version()}`);
    console.log(`Usage: ${program.name()} ${program.usage()}`);
    process.exit(1);
  }

  await program.postParse();

  // convert csv and exit
  if (program.csv) {
    program.removeCsv = false;
    const csvPath = expandHomedir(program.csv);
    const xlsxPath = path.normalize(csvPath.replace(/\.csv$/, '.xlsx'));
    let jsonPath = path.normalize(csvPath.replace(/\.csv$/, '.json'));
    let webPath;
    try {
      if (program.xlsx) {
        saveAsXlsx(csvPath, xlsxPath);
        if (program.gdrive) await publishGoogleDrive(xlsxPath);
        if (program.openFile) exec(`"${xlsxPath}"`);
      }

      if (program.json) {
        await saveAsJson(csvPath, jsonPath, program.lang, program.preset);
        if (!program.removeJson) console.log('Saved to ' + jsonPath);

        const stats = fs.statSync(jsonPath);
        const fileSizeInBytes = stats.size;
        const fileSizeInMegabytes = fileSizeInBytes / 1000000.0
        const fileSizeRounded = Math.round(fileSizeInMegabytes * 100) / 100;
        console.log(`Size: ${fileSizeRounded} MB`);

        if (program.upload) webPath = await uploadJson(jsonPath, program);
        // if (program.gdrive) webPath = await publishGoogleDrive(jsonPath);

        await startViewer(jsonPath, webPath);
        if (program.removeJson) fs.unlinkSync(jsonPath);
      }

      if (program.removeCsv) fs.unlinkSync(csvPath);
    } catch (e) {
      console.error(e);
    }
    return;
  }

  const opts = program.getOptions();
  program.outBrief(opts);

  const sites = program.urls;

  for (let site of sites) {
    // console.log('program: ', program);
    await scrapSite(site, opts);
  }
}

start();
