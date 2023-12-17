import type { Data } from '@idraw/types';
import signIn from './page-pc/sign-in';
import signUp from './page-pc/sign-up';
import home from './page-pc/home';

const data: Data = {
  elements: [
    {
      ...signIn
    },
    {
      ...signUp,
      x: 1500,
      y: 0
    },
    {
      ...home,
      x: 3000,
      y: 0
    }
  ]
};
export default data;
