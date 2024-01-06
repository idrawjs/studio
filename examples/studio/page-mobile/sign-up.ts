import type { Element } from 'idraw';

const page: Element<'group'> = {
  uuid: '7a7c5812-7f69-256f-f836-2dbc60e2f6f0',
  name: 'Mobile Sign Up',
  type: 'group',
  x: 0,
  y: 0,
  w: 375,
  h: 1051,
  detail: {
    children: [
      {
        uuid: 'fd286937-7287-ff22-e18a-f6c22c24f94c',
        name: 'Background',
        type: 'rect',
        x: 0,
        y: 0,
        w: 375,
        h: 1051,
        detail: { background: '#FFFFFF' }
      },
      {
        uuid: 'effe47d3-e773-2e87-c3c9-c7611200ff3a',
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
        uuid: '862eee1e-cf6b-3c54-27c4-8b7b54b9b76e',
        type: 'text',
        x: 32,
        y: 78,
        w: 342,
        h: 33,
        detail: { text: 'Welcome to @idraw/studio', color: 'white', fontSize: 24, fontFamily: 'Poppins', opacity: 1, textAlign: 'left', lineHeight: 24 }
      },
      {
        uuid: '012eaa20-0845-e8b1-4508-66ea1c16708d',
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
        uuid: 'f873ca2e-a593-7a24-d72b-d3721910c947',
        name: 'Banner Image',
        type: 'path',
        x: 121,
        y: 79,
        w: 135,
        h: 106,
        detail: {
          commands: [
            { type: 'M', params: [250.562, 79.0625] },
            { type: 'H', params: [125.438] },
            { type: 'C', params: [122.776, 79.0625, 120.625, 81.2131, 120.625, 83.875] },
            { type: 'V', params: [180.125] },
            { type: 'C', params: [120.625, 182.787, 122.776, 184.938, 125.438, 184.938] },
            { type: 'H', params: [250.562] },
            { type: 'C', params: [253.224, 184.938, 255.375, 182.787, 255.375, 180.125] },
            { type: 'V', params: [83.875] },
            { type: 'C', params: [255.375, 81.2131, 253.224, 79.0625, 250.562, 79.0625] },
            { type: 'Z', params: [] },
            { type: 'M', params: [161.832, 100.719] },
            { type: 'C', params: [167.141, 100.719, 171.457, 105.035, 171.457, 110.344] },
            { type: 'C', params: [171.457, 115.653, 167.141, 119.969, 161.832, 119.969] },
            { type: 'C', params: [156.523, 119.969, 152.207, 115.653, 152.207, 110.344] },
            { type: 'C', params: [152.207, 105.035, 156.523, 100.719, 161.832, 100.719] },
            { type: 'Z', params: [] },
            { type: 'M', params: [239.118, 166.454] },
            { type: 'C', params: [238.899, 166.639, 238.622, 166.74, 238.336, 166.74] },
            { type: 'H', params: [137.649] },
            { type: 'C', params: [136.987, 166.74, 136.446, 166.199, 136.446, 165.537] },
            { type: 'C', params: [136.446, 165.251, 136.551, 164.981, 136.732, 164.755] },
            { type: 'L', params: [162.343, 134.376] },
            { type: 'C', params: [162.764, 133.865, 163.531, 133.805, 164.043, 134.226] },
            { type: 'C', params: [164.088, 134.271, 164.148, 134.316, 164.193, 134.376] },
            { type: 'L', params: [179.142, 152.122] },
            { type: 'L', params: [202.919, 123.924] },
            { type: 'C', params: [203.34, 123.413, 204.107, 123.353, 204.618, 123.774] },
            { type: 'C', params: [204.663, 123.819, 204.723, 123.864, 204.769, 123.924] },
            { type: 'L', params: [239.298, 164.77] },
            { type: 'C', params: [239.689, 165.266, 239.629, 166.033, 239.118, 166.454] },
            { type: 'Z', params: [] }
          ],
          fill: 'white',
          stroke: 'transparent',
          strokeWidth: 0,
          originX: 121,
          originY: 79,
          originW: 134.75,
          originH: 105.875,
          opacity: 0.1
        }
      },
      {
        uuid: 'b5e36ac2-6f27-bca0-fa53-4c47afbfaf52',
        name: 'Logo Button',
        type: 'rect',
        x: 32,
        y: 22,
        w: 100,
        h: 37,
        detail: { background: '#FCFCFD', borderColor: 'transparent', borderWidth: 0, borderRadius: 18.5, opacity: 1, boxSizing: 'border-box' }
      },
      {
        uuid: '04e161b7-000e-aac8-0811-abe5bda86eb4',
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
        uuid: '19fe205e-8d15-732b-5251-76c2ffc1eafe',
        type: 'text',
        x: 73,
        y: 29,
        w: 47,
        h: 22,
        detail: {
          text: 'LOGO',
          color: '#23262F',
          fontSize: 16,
          fontFamily: 'DM Sans',
          opacity: 1,
          verticalAlign: 'middle',
          textAlign: 'left',
          lineHeight: 16,
          fontWeight: 'bold'
        }
      },
      {
        uuid: '6ccf0e4a-4d12-62ca-c090-802ecf80f4ae',
        type: 'text',
        x: 32,
        y: 253,
        w: 234,
        h: 33,
        detail: {
          text: 'Create your account',
          color: '#27272E',
          fontSize: 24,
          fontFamily: 'Inter',
          opacity: 1,
          textAlign: 'left',
          lineHeight: 24,
          fontWeight: '600'
        }
      },
      {
        uuid: '1bd53af6-0204-6be6-7226-e92a48ef5a7c',
        type: 'text',
        x: 32,
        y: 300,
        w: 114,
        h: 20,
        detail: { text: "It's free and easy", color: '#27272E', fontSize: 14, fontFamily: 'Inter', opacity: 1, textAlign: 'left', lineHeight: 14 }
      },
      {
        uuid: 'f9460257-4b15-c15e-e709-6ae505183359',
        type: 'text',
        x: 32,
        y: 364,
        w: 65,
        h: 20,
        detail: { text: 'Full name', color: '#425466', fontSize: 14, fontFamily: 'Inter', opacity: 1, textAlign: 'left', lineHeight: 14, fontWeight: '500' }
      },
      {
        uuid: 'd477fc70-59d9-148d-f1c8-382bfc049343',
        name: 'Name Input',
        type: 'rect',
        x: 32,
        y: 390,
        w: 307,
        h: 46,
        detail: { background: '#EDF2F7', borderColor: 'transparent', borderWidth: 0, borderRadius: 6, opacity: 1, boxSizing: 'border-box' }
      },
      {
        uuid: '2c63229e-3902-91b2-4f95-866d226900aa',
        type: 'text',
        x: 48,
        y: 402,
        w: 110,
        h: 20,
        detail: {
          text: 'Enter your name',
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
        uuid: '77deef19-ee73-e5a7-7069-ea2385f99449',
        type: 'text',
        x: 32,
        y: 465,
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
        uuid: 'fca49a9b-931f-5772-1cc4-a031c7c27f12',
        name: 'E-mail Input',
        type: 'rect',
        x: 32,
        y: 491,
        w: 307,
        h: 46,
        detail: { background: '#EDF2F7', borderColor: 'transparent', borderWidth: 0, borderRadius: 6, opacity: 1, boxSizing: 'border-box' }
      },
      {
        uuid: '5af8fdae-fff5-c8b5-6055-cfd4c23a9f4e',
        type: 'text',
        x: 48,
        y: 503,
        w: 232,
        h: 20,
        detail: {
          text: 'Type your e-mail or phone number',
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
        uuid: '79323bc6-32bd-6a76-227d-7cfc6d8d7aef',
        type: 'text',
        x: 32,
        y: 566,
        w: 65,
        h: 20,
        detail: { text: 'Password', color: '#425466', fontSize: 14, fontFamily: 'Inter', opacity: 1, textAlign: 'left', lineHeight: 14, fontWeight: '500' }
      },
      {
        uuid: '2bd6416d-f991-841c-e287-a4bcdf8ef6f8',
        name: 'Password Input',
        type: 'rect',
        x: 32,
        y: 592,
        w: 307,
        h: 46,
        detail: { background: '#EDF2F7', borderColor: 'transparent', borderWidth: 0, borderRadius: 6, opacity: 1, boxSizing: 'border-box' }
      },
      {
        uuid: 'b30ebc6a-0cea-39f1-285c-b15c8ec15d9a',
        type: 'text',
        x: 48,
        y: 604,
        w: 134,
        h: 20,
        detail: {
          text: 'Type your password',
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
        uuid: '7158266d-3324-f73f-5a05-ccf10ce87b65',
        type: 'text',
        x: 32,
        y: 644,
        w: 152,
        h: 16,
        detail: { text: 'Must be 8 characters at least', color: '#718096', fontSize: 11, fontFamily: 'Inter', opacity: 1, textAlign: 'left', lineHeight: 11 }
      },
      {
        uuid: 'bf141b70-e330-4537-966e-5eeff7e8daed',
        name: 'Checkbox',
        type: 'path',
        x: 32,
        y: 688,
        w: 20,
        h: 20,
        detail: {
          commands: [
            { type: 'M', params: [35.8458, 690] },
            { type: 'C', params: [34.9285, 690, 34.7042, 690.043, 34.4779, 690.164] },
            { type: 'C', params: [34.3376, 690.239, 34.2394, 690.338, 34.1643, 690.478] },
            { type: 'C', params: [34.0433, 690.704, 34, 690.929, 34, 691.846] },
            { type: 'V', params: [704.154] },
            { type: 'C', params: [34, 705.071, 34.0433, 705.296, 34.1643, 705.522] },
            { type: 'C', params: [34.2394, 705.662, 34.3376, 705.761, 34.4779, 705.836] },
            { type: 'C', params: [34.7042, 705.957, 34.9285, 706, 35.8458, 706] },
            { type: 'H', params: [48.1542] },
            { type: 'C', params: [49.0715, 706, 49.2958, 705.957, 49.5221, 705.836] },
            { type: 'C', params: [49.6624, 705.761, 49.7606, 705.662, 49.8357, 705.522] },
            { type: 'C', params: [49.9567, 705.296, 50, 705.071, 50, 704.154] },
            { type: 'V', params: [691.846] },
            { type: 'C', params: [50, 690.929, 49.9567, 690.704, 49.8357, 690.478] },
            { type: 'C', params: [49.7606, 690.338, 49.6624, 690.239, 49.5221, 690.164] },
            { type: 'C', params: [49.2958, 690.043, 49.0715, 690, 48.1542, 690] },
            { type: 'H', params: [35.8458] },
            { type: 'Z', params: [] },
            { type: 'M', params: [35.8458, 688] },
            { type: 'H', params: [48.1542] },
            { type: 'C', params: [49.4915, 688, 49.9764, 688.139, 50.4653, 688.401] },
            { type: 'C', params: [50.9542, 688.662, 51.3378, 689.046, 51.5993, 689.535] },
            { type: 'C', params: [51.8608, 690.024, 52, 690.509, 52, 691.846] },
            { type: 'V', params: [704.154] },
            { type: 'C', params: [52, 705.491, 51.8608, 705.976, 51.5993, 706.465] },
            { type: 'C', params: [51.3378, 706.954, 50.9542, 707.338, 50.4653, 707.599] },
            { type: 'C', params: [49.9764, 707.861, 49.4915, 708, 48.1542, 708] },
            { type: 'H', params: [35.8458] },
            { type: 'C', params: [34.5085, 708, 34.0236, 707.861, 33.5347, 707.599] },
            { type: 'C', params: [33.0458, 707.338, 32.6622, 706.954, 32.4007, 706.465] },
            { type: 'C', params: [32.1392, 705.976, 32, 705.491, 32, 704.154] },
            { type: 'V', params: [691.846] },
            { type: 'C', params: [32, 690.509, 32.1392, 690.024, 32.4007, 689.535] },
            { type: 'C', params: [32.6622, 689.046, 33.0458, 688.662, 33.5347, 688.401] },
            { type: 'C', params: [34.0236, 688.139, 34.5085, 688, 35.8458, 688] },
            { type: 'Z', params: [] }
          ],
          fill: '#C9CED6',
          stroke: 'transparent',
          strokeWidth: 0,
          originX: 32,
          originY: 688,
          originW: 20,
          originH: 20,
          opacity: 1
        }
      },
      {
        uuid: 'e6c884a9-6f7b-fb7e-1bd5-26efc38c3a1a',
        type: 'text',
        x: 62,
        y: 689,
        w: 270,
        h: 37,
        detail: {
          text: 'By creating an account means you agree to the Policy',
          color: '#425466',
          fontSize: 12,
          fontFamily: 'Inter',
          opacity: 1,
          textAlign: 'left',
          lineHeight: 17
        }
      },
      {
        uuid: '615f0c46-89fc-e30e-a553-d9b2a3938017',
        name: 'Sign In Button',
        type: 'rect',
        x: 33,
        y: 760,
        w: 312,
        h: 48,
        detail: { background: '#141416', borderColor: 'transparent', borderWidth: 0, borderRadius: 24, opacity: 1, boxSizing: 'border-box' }
      },
      {
        uuid: 'b433de68-0089-fd6b-a366-dbecdc08a1b0',
        type: 'text',
        x: 164,
        y: 772,
        w: 53,
        h: 22,
        detail: { text: 'Sign In', color: '#FCFCFD', fontSize: 16, fontFamily: 'DM Sans', opacity: 1, textAlign: 'left', lineHeight: 16, fontWeight: 'bold' }
      },
      {
        uuid: '403d1093-2825-29e6-fd5c-3a3633af1494',
        type: 'text',
        x: 115,
        y: 842,
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
        uuid: '82b381d0-cec1-f6c1-9c23-0a13c2965e2e',
        name: 'Twitter Button',
        type: 'rect',
        x: 107,
        y: 881,
        w: 41,
        h: 41,
        detail: { background: 'white', borderColor: '#332218', borderWidth: 1, borderRadius: 20.5, opacity: 1, boxSizing: 'border-box' }
      },
      {
        uuid: '7acffb73-4afe-28d6-6cbc-74474fd439f2',
        name: 'Twitter Logo',
        type: 'svg',
        x: 112,
        y: 886,
        w: 32,
        h: 32,
        detail: {
          svg: `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M928 254.3c-30.6 13.2-63.9 22.7-98.2 26.4 35.4-21.1 62.3-54.4 75-94-32.7 19.5-69.7 33.8-108.2 41.2C765.4 194.6 721.1 174 672 174c-94.5 0-170.5 76.6-170.5 170.6 0 13.2 1.6 26.4 4.2 39.1-141.5-7.4-267.7-75-351.6-178.5-14.8 25.4-23.2 54.4-23.2 86.1 0 59.2 30.1 111.4 76 142.1-28-1.1-54.4-9-77.1-21.7v2.1c0 82.9 58.6 151.6 136.7 167.4-14.3 3.7-29.6 5.8-44.9 5.8-11.1 0-21.6-1.1-32.2-2.6C211 652 273.9 701.1 348.8 702.7c-58.6 45.9-132 72.9-211.7 72.9-14.3 0-27.5-0.5-41.2-2.1C171.5 822 261.2 850 357.8 850 671.4 850 843 590.2 843 364.7c0-7.4 0-14.8-0.5-22.2 33.2-24.3 62.3-54.4 85.5-88.2z"></path></svg>`
        }
      },
      {
        uuid: 'c9140eaf-f383-0f4a-7b71-78853e967147',
        name: 'Google Button',
        type: 'rect',
        x: 169,
        y: 881,
        w: 41,
        h: 41,
        detail: { background: 'white', borderColor: '#332218', borderWidth: 1, borderRadius: 20.5, opacity: 1, boxSizing: 'border-box' }
      },
      {
        uuid: '0e65724d-cfe1-9358-7f50-278230b4d062',
        name: 'Google Logo',
        type: 'svg',
        x: 174,
        y: 886,
        w: 32,
        h: 32,
        detail: {
          svg: `<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="200" height="200"><path d="M881 442.4H519.7v148.5h206.4c-8.9 48-35.9 88.6-76.6 115.8-34.4 23-78.3 36.6-129.9 36.6-99.9 0-184.4-67.5-214.6-158.2-7.6-23-12-47.6-12-72.9s4.4-49.9 12-72.9c30.3-90.6 114.8-158.1 214.7-158.1 56.3 0 106.8 19.4 146.6 57.4l110-110.1c-66.5-62-153.2-100-256.6-100-149.9 0-279.6 86-342.7 211.4-26 51.8-40.8 110.4-40.8 172.4S151 632.8 177 684.6C240.1 810 369.8 896 519.7 896c103.6 0 190.4-34.4 253.8-93 72.5-66.8 114.4-165.2 114.4-282.1 0-27.2-2.4-53.3-6.9-78.5z" ></path></svg>`
        }
      },
      {
        uuid: '2b057c71-ccf1-cd8d-9d92-9265c7659299',
        name: 'Fackbook Button',
        type: 'rect',
        x: 231,
        y: 881,
        w: 41,
        h: 41,
        detail: { background: 'white', borderColor: '#332218', borderWidth: 1, borderRadius: 20.5, opacity: 1, boxSizing: 'border-box' }
      },
      {
        uuid: '30ad9855-be31-4b07-d574-e6a32d9534e0',
        name: 'Fackbook Logo',
        type: 'svg',
        x: 236,
        y: 886,
        w: 32,
        h: 32,
        detail: {
          svg: `<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><path d="M750.592 335.510588l-18.612706 176.489412H590.908235V1024H379.000471V512H273.408V335.510588h105.592471V229.255529C379.000471 85.714824 438.693647 0 608.376471 0h141.010823v176.489412h-88.244706c-65.837176 0-70.234353 24.877176-70.234353 70.836706V335.510588h159.683765z" ></path></svg>`
        }
      },
      {
        uuid: '3f3b991a-e8fb-3982-968f-13286068c39b',
        type: 'text',
        x: 80,
        y: 958,
        w: 160,
        h: 20,
        detail: {
          text: "Don't have an account?",
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
        uuid: 'c6b42143-df6c-00b5-7352-e6daf611b3fa',
        type: 'text',
        x: 242,
        y: 958,
        w: 53,
        h: 20,
        detail: { text: 'Sign Up', color: '#141416', fontSize: 14, fontFamily: 'Inter', opacity: 1, textAlign: 'left', lineHeight: 14, fontWeight: '600' }
      }
    ],
    assets: {}
  }
};

export default page;
