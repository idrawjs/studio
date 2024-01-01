import type { Data } from '@idraw/types';
import signIn from './page-pc/sign-in';
import signUp from './page-pc/sign-up';
import home from './page-pc/home';

import mSignIn from './page-mobile/sign-in';
import mSignUp from './page-mobile/sign-up';

const startX = 50;
const startY = 100;

// const startX = 0;
// const startY = 0;

const data: Data = {
  elements: [
    {
      ...mSignIn,
      x: startX,
      y: startY
    },
    {
      ...mSignUp,
      x: startX + 500,
      y: startY
    },
    {
      ...signIn,
      x: 1000 + startX,
      y: 0 + startY
    },
    {
      ...signUp,
      x: 2500 + startX,
      y: 0 + startY
    },
    {
      ...home,
      x: 4000 + startX,
      y: 0 + startY
    }
  ]
};
export default data;
