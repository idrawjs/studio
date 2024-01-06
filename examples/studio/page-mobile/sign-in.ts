import type { Element } from 'idraw';

const page: Element<'group'> = {
  uuid: 'd3430ebf-a079-1ffc-ac81-f4031b3cd1bd',
  name: 'Mobile Sign In',
  type: 'group',
  x: 0,
  y: 0,
  w: 375,
  h: 812,
  detail: {
    background: '#FFFFFF',
    children: [
      {
        uuid: '32cba41a-f9e9-6067-0823-35596e905732',
        name: 'Background',
        type: 'rect',
        x: 0,
        y: 0,
        w: 375,
        h: 812,
        detail: {
          background: '#FFFFFF'
        }
      },
      {
        uuid: 'f689c645-d215-5562-2be8-9a8e6863eb4d',
        name: 'Banner Background',
        type: 'rect',
        x: 0,
        y: 0,
        w: 375,
        h: 227,
        detail: {
          background: '#353945'
        }
      },
      {
        uuid: '01ab3c46-953a-e3de-a4a3-47830b7400fd',
        name: 'Logo Button',
        type: 'rect',
        x: 32,
        y: 22,
        w: 100,
        h: 37,
        detail: { background: '#FCFCFD', borderRadius: 18.5, opacity: 1, boxSizing: 'border-box' }
      },
      {
        uuid: '06be47dc-752d-c715-3a35-178f4ea040f2',
        name: 'Icon',
        type: 'path',
        x: 46,
        y: 34,
        w: 14,
        h: 13,
        detail: {
          commands: [
            { type: 'M', params: [52.3877, 34.5851] },
            { type: 'C', params: [52.6193, 34.0484, 53.3803, 34.0484, 53.6119, 34.5851] },
            { type: 'L', params: [55.0653, 37.9531] },
            { type: 'C', params: [55.1634, 38.1803, 55.3793, 38.3345, 55.626, 38.3536] },
            { type: 'L', params: [59.3531, 38.6416] },
            { type: 'C', params: [59.9511, 38.6878, 60.1887, 39.4385, 59.7262, 39.8204] },
            { type: 'L', params: [56.9233, 42.1346] },
            { type: 'C', params: [56.7256, 42.2978, 56.639, 42.5599, 56.7006, 42.8088] },
            { type: 'L', params: [57.5632, 46.2944] },
            { type: 'C', params: [57.7051, 46.8676, 57.0867, 47.3286, 56.5779, 47.029] },
            { type: 'L', params: [53.338, 45.1217] },
            { type: 'C', params: [53.1293, 44.9988, 52.8703, 44.9988, 52.6616, 45.1217] },
            { type: 'L', params: [49.4218, 47.029] },
            { type: 'C', params: [48.9129, 47.3286, 48.2946, 46.8676, 48.4364, 46.2944] },
            { type: 'L', params: [49.2991, 42.8088] },
            { type: 'C', params: [49.3606, 42.5599, 49.2741, 42.2978, 49.0764, 42.1346] },
            { type: 'L', params: [46.2734, 39.8204] },
            { type: 'C', params: [45.8109, 39.4385, 46.0485, 38.6878, 46.6465, 38.6416] },
            { type: 'L', params: [50.3736, 38.3536] },
            { type: 'C', params: [50.6204, 38.3345, 50.8363, 38.1803, 50.9344, 37.9531] },
            { type: 'L', params: [52.3877, 34.5851] },
            { type: 'Z', params: [] }
          ],
          fill: '#23262F',
          stroke: 'transparent',
          strokeWidth: 0,
          originX: 46,
          originY: 34,
          originW: 14,
          originH: 12.9375,
          opacity: 1
        }
      },
      {
        uuid: '0fea0fcd-20e7-be4e-1bf6-8be572a0afb5',
        type: 'text',
        x: 73,
        y: 29,
        w: 47,
        h: 22,
        detail: {
          text: 'LOGO',
          verticalAlign: 'middle',
          color: '#23262F',
          fontSize: 16,
          fontFamily: 'DM Sans',
          opacity: 1,
          textAlign: 'left',
          lineHeight: 16,
          fontWeight: 'bold'
        }
      },
      {
        uuid: 'c7dd6467-ef29-c68e-2832-2e02de4e6618',
        name: 'Banner Image',
        type: 'path',
        x: 125,
        y: 79,
        w: 135,
        h: 106,
        detail: {
          commands: [
            { type: 'M', params: [254.562, 79.0625] },
            { type: 'H', params: [129.438] },
            { type: 'C', params: [126.776, 79.0625, 124.625, 81.2131, 124.625, 83.875] },
            { type: 'V', params: [180.125] },
            { type: 'C', params: [124.625, 182.787, 126.776, 184.938, 129.438, 184.938] },
            { type: 'H', params: [254.562] },
            { type: 'C', params: [257.224, 184.938, 259.375, 182.787, 259.375, 180.125] },
            { type: 'V', params: [83.875] },
            { type: 'C', params: [259.375, 81.2131, 257.224, 79.0625, 254.562, 79.0625] },
            { type: 'Z', params: [] },
            { type: 'M', params: [165.832, 100.719] },
            { type: 'C', params: [171.141, 100.719, 175.457, 105.035, 175.457, 110.344] },
            { type: 'C', params: [175.457, 115.653, 171.141, 119.969, 165.832, 119.969] },
            { type: 'C', params: [160.523, 119.969, 156.207, 115.653, 156.207, 110.344] },
            { type: 'C', params: [156.207, 105.035, 160.523, 100.719, 165.832, 100.719] },
            { type: 'Z', params: [] },
            { type: 'M', params: [243.118, 166.454] },
            { type: 'C', params: [242.899, 166.639, 242.622, 166.74, 242.336, 166.74] },
            { type: 'H', params: [141.649] },
            { type: 'C', params: [140.987, 166.74, 140.446, 166.199, 140.446, 165.537] },
            { type: 'C', params: [140.446, 165.251, 140.551, 164.981, 140.732, 164.755] },
            { type: 'L', params: [166.343, 134.376] },
            { type: 'C', params: [166.764, 133.865, 167.531, 133.805, 168.043, 134.226] },
            { type: 'C', params: [168.088, 134.271, 168.148, 134.316, 168.193, 134.376] },
            { type: 'L', params: [183.142, 152.122] },
            { type: 'L', params: [206.919, 123.924] },
            { type: 'C', params: [207.34, 123.413, 208.107, 123.353, 208.618, 123.774] },
            { type: 'C', params: [208.663, 123.819, 208.723, 123.864, 208.769, 123.924] },
            { type: 'L', params: [243.298, 164.77] },
            { type: 'C', params: [243.689, 165.266, 243.629, 166.033, 243.118, 166.454] },
            { type: 'Z', params: [] }
          ],
          fill: 'white',
          stroke: 'transparent',
          strokeWidth: 0,
          originX: 125,
          originY: 79,
          originW: 134.75,
          originH: 105.875,
          opacity: 0.1
        }
      },
      {
        uuid: '6caddfe4-6557-01ad-eba5-125042eb15a3',
        type: 'text',
        x: 32,
        y: 78,
        w: 324,
        h: 33,
        detail: { text: 'Welcome to @idraw/studio', color: 'white', fontSize: 24, fontFamily: 'Poppins', opacity: 1, textAlign: 'left', lineHeight: 24 }
      },
      {
        uuid: 'ebbd3323-63bb-cba5-5a73-16fa4574c09c',
        type: 'text',
        x: 32,
        y: 142,
        w: 270,
        h: 44,
        detail: {
          text: 'The studio of iDraw.js, you can use it to design on web page.',
          color: 'white',
          fontSize: 14,
          fontFamily: 'Poppins',
          opacity: 1,
          textAlign: 'left',
          lineHeight: 20
        }
      },
      {
        uuid: 'f8f1ba87-62cb-77a0-6830-b015310f4599',
        type: 'text',
        x: 32,
        y: 253,
        w: 177,
        h: 33,
        detail: { text: 'Welcome back!', color: '#27272E', fontSize: 24, fontFamily: 'Inter', opacity: 1, textAlign: 'left', lineHeight: 24, fontWeight: '600' }
      },
      {
        uuid: '4f835d49-c182-bbac-0474-254db691bd4b',
        type: 'text',
        x: 32,
        y: 300,
        w: 174,
        h: 20,
        detail: { text: 'Design on web more easily', color: '#27272E', fontSize: 14, fontFamily: 'Inter', opacity: 1, textAlign: 'left', lineHeight: 14 }
      },
      {
        uuid: '0c7adc7e-4e6a-e5a2-11c5-59d36842d8dc',
        type: 'text',
        x: 32,
        y: 360,
        w: 164,
        h: 20,
        detail: {
          text: 'E-mail',
          color: '#425466',
          fontSize: 14,
          fontFamily: 'Inter',
          opacity: 1,
          textAlign: 'left',
          lineHeight: 14,
          fontWeight: '500'
        }
      },
      {
        uuid: '23ef5e9f-d36f-3690-1bc5-bb50326f0cfd',
        name: 'E-mail Input',
        type: 'rect',
        x: 32,
        y: 386,
        w: 311,
        h: 46,
        detail: { background: '#EDF2F7', borderColor: 'transparent', borderWidth: 0, borderRadius: 6, opacity: 1, boxSizing: 'border-box' }
      },
      {
        uuid: 'c9dd69e3-9187-29b5-4c78-207e2abbda8d',
        type: 'text',
        x: 48,
        y: 398,
        w: 233,
        h: 20,
        detail: {
          text: 'Type your e-mail',
          color: '#7A828A',
          fontSize: 14,
          fontFamily: 'Inter',
          opacity: 1,
          textAlign: 'left',
          lineHeight: 14,
          fontWeight: '500'
        }
      },
      {
        uuid: '24c0bf35-e552-38f4-3b86-1f2602af225a',
        type: 'text',
        x: 32,
        y: 455,
        w: 65,
        h: 20,
        detail: { text: 'Password', color: '#425466', fontSize: 14, fontFamily: 'Inter', opacity: 1, textAlign: 'left', lineHeight: 14, fontWeight: '500' }
      },
      {
        uuid: '8ee89270-6559-44bd-b1e1-59f6f81e55c8',
        name: 'Password Input',
        type: 'rect',
        x: 32,
        y: 481,
        w: 312,
        h: 46,
        detail: { background: '#EDF2F7', borderColor: 'transparent', borderWidth: 0, borderRadius: 6, opacity: 1, boxSizing: 'border-box' }
      },
      {
        uuid: '7ec7ee4e-9215-b3ac-00cd-8969cbdaba8e',
        type: 'text',
        x: 48,
        y: 492,
        w: 144,
        h: 21,
        detail: {
          text: 'Type your password',
          color: '#7A828A',
          fontSize: 15,
          fontFamily: 'Inter',
          opacity: 1,
          textAlign: 'left',
          lineHeight: 15,
          fontWeight: '500'
        }
      },
      {
        uuid: '421fbcdf-868c-6e92-b5b0-4c6a3e84ca97',
        type: 'text',
        x: 251,
        y: 533,
        w: 93,
        h: 16,
        detail: { text: 'Forgot Password?', color: '#777E91', fontSize: 11, fontFamily: 'Inter', opacity: 1, textAlign: 'left', lineHeight: 11 }
      },
      {
        uuid: 'ad2a9935-54c5-c16d-ebb6-3ce0037a934c',
        name: 'Sign In Button',
        type: 'rect',
        x: 32,
        y: 579,
        w: 312,
        h: 48,
        detail: { background: '#141416', borderColor: 'transparent', borderWidth: 0, borderRadius: 24, opacity: 1, boxSizing: 'border-box' }
      },
      {
        uuid: '87b8b84e-df2e-5000-9b49-1e1d20c02cd4',
        type: 'text',
        x: 163,
        y: 591,
        w: 53,
        h: 22,
        detail: { text: 'Sign In', color: '#FCFCFD', fontSize: 16, fontFamily: 'DM Sans', opacity: 1, textAlign: 'left', lineHeight: 16, fontWeight: 'bold' }
      },
      {
        uuid: 'd455eb90-4210-56ab-1b80-242b17ca04cd',
        type: 'text',
        x: 114,
        y: 651,
        w: 149,
        h: 17,
        detail: {
          text: 'or do it via other accounts',
          color: '#718096',
          fontSize: 12,
          fontFamily: 'Inter',
          opacity: 1,
          textAlign: 'left',
          lineHeight: 12,
          fontWeight: '500'
        }
      },
      {
        uuid: 'b77ee539-cd2b-364e-9648-c34128e71460',
        name: 'Twitter Button',
        type: 'rect',
        x: 106,
        y: 690,
        w: 41,
        h: 41,
        detail: { background: 'white', borderColor: '#332218', borderWidth: 1, borderRadius: 20.5, opacity: 1, boxSizing: 'border-box' }
      },
      {
        uuid: 'bed0f7b6-0f83-8172-9095-b8eb1530cd9a',
        name: 'Twitter Logo',
        type: 'svg',
        x: 111,
        y: 695,
        w: 32,
        h: 32,
        detail: {
          svg: `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4 35.4-21.1 62.3-54.4 75-94-32.7 19.5-69.7 33.8-108.2 41.2C765.4 194.6 721.1 174 672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-351.6-178.5-14.8 25.4-23.2 54.4-23.2 86.1 0 59.2 30.1 111.4 76 142.1-28-1.1-54.4-9-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4-14.3 3.7-29.6 5.8-44.9 5.8-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9-14.3 0-27.5-0.5-41.2-2.1C171.5 822 261.2 850 357.8 850 671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-0.5-22.2 33.2-24.3 62.3-54.4 85.5-88.2z"></path></svg>`
        }
      },
      {
        uuid: 'b8ce67ba-4691-5593-4de2-9513600cbc93',
        type: 'rect',
        name: 'Google Button',
        x: 168,
        y: 690,
        w: 41,
        h: 41,
        detail: { background: 'white', borderColor: '#332218', borderWidth: 1, borderRadius: 20.5, opacity: 1, boxSizing: 'border-box' }
      },
      {
        uuid: '4d13fa1f-37ae-0c5c-6bc7-829522c9fb65',
        type: 'svg',
        name: 'Google Logo',
        x: 173,
        y: 695,
        w: 32,
        h: 32,
        detail: {
          svg: `<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8-34.4 23-78.3 36.6-129.9 36.6-99.9 0-184.4-67.5-214.6-158.2-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1 56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100-149.9 0-279.6 86-342.7 211.4-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93 72.5-66.8 114.4-165.2 114.4-282.1 0-27.2-2.4-53.3-6.9-78.5z" ></path></svg>`
        }
      },
      {
        uuid: '24b82625-2414-aef3-3686-015cc6c9d19a',
        name: 'Facebook Button',
        type: 'rect',
        x: 230,
        y: 690,
        w: 41,
        h: 41,
        detail: { background: 'white', borderColor: '#332218', borderWidth: 1, borderRadius: 20.5, opacity: 1, boxSizing: 'border-box' }
      },
      {
        uuid: '5d4dba8e-c3b8-a1c9-70e4-41780aeda773',
        name: 'Facebook Logo',
        type: 'svg',
        x: 235,
        y: 695,
        w: 32,
        h: 32,
        detail: {
          svg: `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M750.592 335.510588l-18.612706 176.489412H590.908235V1024H379.000471V512H273.408V335.510588h105.592471V229.255529C379.000471 85.714824 438.693647 0 608.376471 0h141.010823v176.489412h-88.244706c-65.837176 0-70.234353 24.877176-70.234353 70.836706V335.510588h159.683765z" ></path></svg>`
        }
      },
      {
        uuid: '803eaa40-00d3-4c80-95f7-893ba90a0c25',
        type: 'text',
        x: 232,
        y: 752,
        w: 14,
        h: 20,
        detail: { text: '', color: '#425466', fontSize: 14, fontFamily: 'Inter', opacity: 1, textAlign: 'left', lineHeight: 14, fontWeight: '600' }
      },
      {
        uuid: '538c6b39-9166-7334-0d6d-5d5c644c9c76',
        type: 'text',
        x: 79,
        y: 752,
        w: 160,
        h: 20,
        detail: {
          text: 'Don’t have an account?',
          color: '#718096',
          fontSize: 14,
          fontFamily: 'Inter',
          opacity: 1,
          textAlign: 'left',
          lineHeight: 14,
          fontWeight: '600'
        }
      },
      {
        uuid: 'ace70d53-e55a-e70b-fac5-5851f15388fa',
        type: 'text',
        x: 241,
        y: 752,
        w: 53,
        h: 20,
        detail: { text: 'Sign Up', color: '#141416', fontSize: 14, fontFamily: 'Inter', opacity: 1, textAlign: 'left', lineHeight: 14, fontWeight: '600' }
      }
    ],
    assets: {}
  }
};

export default page;
