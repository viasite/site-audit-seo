import fs from 'fs';
import os from 'os';
import url from 'url';
import Influx from 'influx';

function init(options) {
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
      host: os.hostname(), // TODO: fix that if used by docker
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

  // console.log('point: ', point);
  return point;
}

function buildSchemaByFields(fields, measurement) {
  const schema = { fields: {}, measurement, tags: ['host', 'domain', 'url'] };
  for (let field of fields) {
    /* if (field.name === 'url') {
      schema.fields[field.name] = Influx.FieldType.STRING;
    } */
    if (field.type === 'integer') {
      schema.fields[field.name] = Influx.FieldType.INTEGER;
    }
    if (field.type === 'boolean') {
      schema.fields[field.name] = Influx.FieldType.INTEGER;
    }
  }
  // console.log('schema: ', schema);
  return schema;
}

async function sendToInfluxDB (jsonPath, options) {
  // console.log("options.influxdb:", options.influxdb);
  if (options.influxdb && options.fieldsPreset == 'seo') {
    options.log('send to InfluxDB...');
  } else {
    return false;
  }

  // console.log('options.influxdb: ', options.influxdb);
  const jsonRaw = fs.readFileSync(jsonPath);
  const data = JSON.parse(jsonRaw);

  const measurement = options.influxdb.measurement || 'site_audit_seo';
  const schema = buildSchemaByFields(data.fields, measurement);
  options.influxdb.schema = [schema];
  const influx = init(options);

  // points list for influx
  const sendFirstCount = options.influxdb.maxSendCount || 5;
  let sent = 0;
  const points = [];
  for (let item of data.items) {
    // console.log('item: ', item);
    const point = await getPoint(item, schema);
    points.push(point);

    sent++;
    if (sent >= sendFirstCount) break;
  }

  // console.log('writePoints');
  // console.log('points: ', points);
  // console.log('options.influxdb: ', options.influxdb);
  await influx.writePoints(points);

  options.log(`sent ${points.length} points`);
  return points;
};

export default sendToInfluxDB;
