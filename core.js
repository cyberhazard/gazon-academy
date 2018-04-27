import { name } from './package.json'
import { basename } from 'path';

if(basename(process.env.PWD) !== name) throw new Error('Critical core exeption')
