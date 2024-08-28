
import { fileTypeFromFile } from 'file-type';
import { default as _ } from 'lodash';
import { upperCase } from 'lodash-es';
import { default as cjs } from 'shared-cjs';
import { default as esm, b, c } from 'shared-esm';
import { a as noA, b as noB} from 'shared-esm/index.noDefault.js'

export async function executor() {
  console.log(await fileTypeFromFile('chrome.avif'));
  console.log(_.upperCase('lodash'))
  console.log(upperCase('lodash-es'));
  console.log(cjs);
  console.log(esm, b, c );
  console.log(noA, noB);
}