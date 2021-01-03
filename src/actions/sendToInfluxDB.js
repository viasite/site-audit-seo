const fs = require('fs');
const os = require('os');
const url = require('url');
const Influx = require('influx');

function init(options) {
  console.debug('init.options', options);
  const influx = new Influx.InfluxDB({
   host: options.influxdb.host,
   port: options.influxdb.port,
   database: options.influxdb.database,
   schema: options.influxdb.schema,
   username: options.influxdb.username,
   password: options.influxdb.password,
  });
  return influx;
}

async function getPoint(item, schema) {
  const point = {
    measurement: schema.measurement,
    tags: {
      host: os.hostname(), // todo. fix that if used by docker
      domain: url.parse(item.url).hostname,
      url: item.url
    },
    fields: {},
  }

  for (let fieldName in schema.fields) {
    const val = item[fieldName];
    if (val !== undefined && val !== null) {
      point.fields[fieldName] = val;
    }
  }

  console.log('point: ', point);
  return point;
}

function buildSchemaByFields(fields, measurement) {
  const schema = { fields: {}, measurement, tags: ['host', 'domain', 'url'] };
  for (let field of fields) {
    /* if (field.name === 'url') {
      schema.fields[field.name] = Influx.FieldType.STRING;
    } */
    if (field.name === 'detectedLanguageIso639-1') {
      schema.fields[field.name] = Influx.FieldType.STRING;
    }
    if (field.type === 'integer') {
      schema.fields[field.name] = Influx.FieldType.INTEGER;
    }
    if (field.type === 'boolean') {
      schema.fields[field.name] = Influx.FieldType.INTEGER;
    }
  }
  console.log('schema: ', schema);
  return schema;
}

module.exports = async (jsonPath, options) => {
  const jsonRaw = fs.readFileSync(jsonPath);
  const data = JSON.parse(jsonRaw);

  const measurement = options.influxdb.measurement || 'seoz';
  const schema = buildSchemaByFields(data.fields, measurement);
  options.influxdb.schema = [schema];

  console.log('options.influxdb: ', options.influxdb);
  const influx = init(options);

  // points list for influx
  const sendFirstCount = options.influxdb.maxSendCount || 1000000; // todo. inject all of urls
  let sent = 0;
  const points = [];
  for (let item of data.items) {
    console.log('item: ', item);
    const point = await getPoint(item, schema);
    points.push(point);

    sent++;
    if (sent >= sendFirstCount) break;
  }

  console.log('writePoints');
  console.log('points: ', points);
  console.log('options.influxdb: ', options.influxdb);
  await influx.writePoints(points);
  return points;
};
