import { OpenAPIObject } from '@nestjs/swagger';
import * as yaml from 'js-yaml';
import * as path from 'path';
import * as fs from 'fs';

const pathDir = path.join('./api', 'paths');
const difinitionDir = path.join('./api', 'definitions');

const pathFileNames = fs.readdirSync(pathDir, { encoding: 'utf8' });
const paths = pathFileNames
  .flatMap(name => {
    const file = fs.readFileSync(`${pathDir}/${name}`, 'utf8');
    return yaml.load(file);
  })
  .reduce((acc, path) => {
    const [[key, value]] = Object.entries(path);
    acc[key] = value;
    return acc;
  }, {});
const main = yaml.load(fs.readFileSync(`${difinitionDir}/main.api.yaml`, 'utf8'));
const tags = yaml.load(fs.readFileSync(`${difinitionDir}/tags.api.yaml`, 'utf8'));
const security = yaml.load(fs.readFileSync(`${difinitionDir}/security.api.yaml`, 'utf8'));
const models = yaml.load(fs.readFileSync(`${difinitionDir}/models.api.yaml`, 'utf8'));

export const swaggerApi = {
  ...main,
  tags,
  paths,
  securityDefinitions: security.securityDefinitions,
  definitions: models.definitions
} as OpenAPIObject;
