
import * as fileType from 'file-type';
import _ from 'lodash';
import __ from 'lodash-es';
import cjs from 'shared-cjs';
import esm from 'shared-esm';
import * as noDefault from 'shared-esm/index.noDefault.js'

export async function executor() {
  console.log(await fileType.fileTypeFromFile('chrome.avif'));
  console.log(_.upperCase('lodash'))
  console.log(__.upperCase('lodash-es'));
  console.log(cjs);
  console.log(esm);
  console.log(noDefault, noDefault.a, noDefault.b);
}