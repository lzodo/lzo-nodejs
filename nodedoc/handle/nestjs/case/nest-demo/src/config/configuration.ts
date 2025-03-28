import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import * as _ from 'lodash';

const baseConfig = yaml.load(
  readFileSync(join(__dirname, './config.yml'), 'utf8'),
) as Record<string, any>;

const envConfig = yaml.load(
  readFileSync(join(__dirname, `./config.${process.env.NODE_ENV}.yml`), 'utf8'),
) as Record<string, any>;

// ConfigModules 的 load 方法，需要接收一个函数
export default () => {
  return _.merge(baseConfig, envConfig);
};
