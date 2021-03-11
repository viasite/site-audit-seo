const fs = require('fs');
const path = require('path');
const color = require('./color');
const userDir = './data';
const plugins = [];
let loaded = false;

function load() {
  if (loaded) return;

  // core plugins
  loadPluginsFromDir('src/plugins');
  // user plugins
  loadPluginsFromDir(path.join(userDir, 'node_modules'));

  if (plugins.length > 0) {
    console.log('loaded plugins: ', plugins.map(p => p.name).join(', '));
  }

  loaded = true;
}

function loadPluginsFromDir(dir) {
  if (!fs.existsSync(dir)) return [];

  const dirPlugins = [];
  const files = fs.readdirSync(dir);

  for (let file of files) {
    const dirPath = path.join(dir, file);
    if (!fs.lstatSync(dirPath).isDirectory()) continue;
    const info = getModuleInfo(dirPath);

    if (info.plugins) for (let pluginName in info.plugins) {
      const pluginInfo = info.plugins[pluginName];
      const pluginFile = typeof pluginInfo === 'string' ? pluginInfo : pluginInfo.main;
      const pluginPath = path.join(dirPath, pluginFile);

      if (!fs.existsSync(pluginPath)) {
        console.log(`plugin ${pluginName} not found: ${pluginPath}`);
        continue;
      }
      let plugin = {
        name: pluginName,
        path: pluginPath,
        type: pluginInfo.type
      };
      if (typeof pluginInfo === 'object') {
        plugin = {...plugin, ...{
          type: pluginInfo.type,
          fields: pluginInfo.fields,
        }}
      }
      plugins.push(plugin);
      dirPlugins.push(plugin);
    }
  }

  return dirPlugins;
}

function getModuleInfo(dir) {
  var packageJson = path.join(dir, 'package.json');
  if (!fs.existsSync(packageJson)) return {};
  // const pkg = require(packageJson);
  const pkg = JSON.parse(fs.readFileSync(packageJson));
  if (!pkg['site-audit-seo']) return {};
  return pkg['site-audit-seo'];
}

function getPlugins() {
  load();
  return plugins;
}

async function execPlugins(jsonPath, options, type = 'any') {
  load();
  if (!plugins) return;
  // console.log(`\n${color.white}exec plugins (${type}):${color.reset}`);
  for (let plugin of plugins) {
    if (options.disablePlugins.includes(plugin.name)){
      continue;
    }
    if (type !== 'any' && plugin.type != type) continue;

    // console.log(`exec plugin ${plugin.name} (type ${type}):`);
    // console.log('plugin: ', plugin);
    const relPath = path.join('..', plugin.path);
    const pluginObj = require(relPath);
    await pluginObj(jsonPath, options);
    // console.log('');
  }
}

module.exports = {
  load,
  getPlugins,
  execPlugins,
}
