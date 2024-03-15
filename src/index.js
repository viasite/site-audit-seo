#!/usr/bin/env node
import process from 'process';
import program from './program.js';
import scrapSite from './scrap-site.js';
import {saveAsXlsx, saveAsJson, uploadJson, publishGoogleDrive, startViewer} from './actions/index.js';
// import {saveAsXlsx} from './actions/index.js';
import {exec} from 'child_process';

async function start() {
  program.parse(process.argv);

  if (!program.urls) {
    console.log(`${program.name()} ${program.version()}`);
    console.log(`Usage: ${program.name()} ${program.usage()}`);
    process.exit(1);
  }

  await program.postParse();

  // convert csv and exit
  // TODO: legacy, remove it!
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
        await saveAsJson(csvPath, jsonPath, program.lang, program.preset, false, program.urls[0], args, 0);

        if (program.upload) webPath = await uploadJson(jsonPath);

        // if (program.gdrive) webPath = await publishGoogleDrive(jsonPath);

        await startViewer(jsonPath, webPath);

        if (program.removeJson) fs.unlinkSync(jsonPath);
        if (!program.removeJson) console.log('Saved to ' + jsonPath);
      }

      if (program.removeCsv) fs.unlinkSync(csvPath);
    } catch (e) {
      console.error(e);
    }
    return;
  }

  const opts = program.getOptions();
  opts.args = process.argv.slice(2);
  program.outBrief(opts);

  const sites = program.urls;

  for (let site of sites) {
    // console.log('program: ', program);
    await scrapSite({baseUrl: site, options: opts});
  }
}

start();
