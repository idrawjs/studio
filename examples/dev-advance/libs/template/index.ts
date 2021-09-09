import { TypeTemplate } from './type';
import idrawjsIntroduction from '../../data/idrawjs-introduction';
import iphone from './../../data/iphone';
import wave from '../../data/wave';
import waveBanner from './../../data/wave-banner';

const templateList: TypeTemplate[] = [
  {
    name: 'Wave Banner',
    data: waveBanner,
    width: 720,
    height: 400,
  },
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
  {
    name: 'Phone',
    data: iphone,
    width: 800,
    height: 600,
  },
];

export default templateList;