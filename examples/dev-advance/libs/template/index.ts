import { TypeTemplate } from './type';
import idrawjsIntroduction from '../../data/idrawjs-introduction';
import wave from '../../data/wave';

const templateList: TypeTemplate[] = [
  {
    name: 'Wave',
    data: wave,
    width: 400,
    height: 600,
  },
  {
    name: 'iDraw.js Introduction',
    data: idrawjsIntroduction,
    width: 800,
    height: 600,
  },
];

export default templateList;