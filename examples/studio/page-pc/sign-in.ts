import type { Element } from 'idraw';

const page: Element<'group'> = {
  name: 'Sign In',
  uuid: 'c4268e7c-66c4-ab00-2313-8bdea47bdff1',
  type: 'group',
  x: 0,
  y: 0,
  w: 1440,
  h: 950,
  detail: {
    children: [
      {
        uuid: 'ec28b7ed-a6d9-f264-5cb8-8e441b4d9008',
        type: 'rect',
        name: 'Background',
        x: 0,
        y: 0,
        w: 1440,
        h: 950,
        detail: {
          background: '#FFFFFF'
        }
      },
      {
        uuid: 'ab02cfdb-6cfe-a6b0-c5fd-037645ce6a84',
        type: 'rect',
        name: 'Preview Background',
        x: 0,
        y: 0,
        w: 718,
        h: 950,
        detail: {
          background: '#353945'
        }
      },
      {
        uuid: '35743342-2fa0-af65-1965-46d91558c9fe',
        name: 'Logo Button',
        type: 'rect',
        x: 52,
        y: 52,
        w: 178,
        h: 66,
        detail: {
          background: '#FCFCFD',
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 33,
          opacity: 1
        }
      },
      {
        uuid: '8f31ac65-dcc7-4c82-277a-e523b9876d17',
        name: 'Logo',
        type: 'path',
        x: 105,
        y: 78.6875,
        w: 14,
        h: 12.9375,
        detail: {
          commands: [
            {
              type: 'M',
              params: [111.388, 79.0851]
            },
            {
              type: 'C',
              params: [111.619, 78.5484, 112.38, 78.5484, 112.612, 79.0851]
            },
            {
              type: 'L',
              params: [114.065, 82.4531]
            },
            {
              type: 'C',
              params: [114.163, 82.6803, 114.379, 82.8345, 114.626, 82.8536]
            },
            {
              type: 'L',
              params: [118.353, 83.1416]
            },
            {
              type: 'C',
              params: [118.951, 83.1878, 119.189, 83.9385, 118.726, 84.3204]
            },
            {
              type: 'L',
              params: [115.923, 86.6346]
            },
            {
              type: 'C',
              params: [115.726, 86.7978, 115.639, 87.0599, 115.701, 87.3088]
            },
            {
              type: 'L',
              params: [116.563, 90.7944]
            },
            {
              type: 'C',
              params: [116.705, 91.3676, 116.087, 91.8286, 115.578, 91.529]
            },
            {
              type: 'L',
              params: [112.338, 89.6217]
            },
            {
              type: 'C',
              params: [112.129, 89.4988, 111.87, 89.4988, 111.662, 89.6217]
            },
            {
              type: 'L',
              params: [108.422, 91.529]
            },
            {
              type: 'C',
              params: [107.913, 91.8286, 107.295, 91.3676, 107.436, 90.7944]
            },
            {
              type: 'L',
              params: [108.299, 87.3088]
            },
            {
              type: 'C',
              params: [108.361, 87.0599, 108.274, 86.7978, 108.076, 86.6346]
            },
            {
              type: 'L',
              params: [105.273, 84.3204]
            },
            {
              type: 'C',
              params: [104.811, 83.9385, 105.049, 83.1878, 105.647, 83.1416]
            },
            {
              type: 'L',
              params: [109.374, 82.8536]
            },
            {
              type: 'C',
              params: [109.62, 82.8345, 109.836, 82.6803, 109.934, 82.4531]
            },
            {
              type: 'L',
              params: [111.388, 79.0851]
            },
            {
              type: 'Z',
              params: []
            }
          ],
          fill: '#23262F',
          stroke: 'transparent',
          strokeWidth: 0,
          originX: 105,
          originY: 78.6875,
          originW: 14,
          originH: 12.9375,
          opacity: 1
        }
      },
      {
        uuid: 'b5bc3974-3058-1aa6-ceb6-979072ce4038',
        name: 'Logo Name',
        type: 'text',
        x: 132,
        y: 73.4375,
        w: 47,
        h: 23,
        detail: {
          text: 'LOGO',
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
        uuid: '7575c930-e409-e417-37ba-a77130525370',
        type: 'text',
        x: 158,
        y: 248.125,
        w: 431,
        h: 56,
        detail: {
          text: 'Welcome to iDraw',
          color: 'white',
          fontSize: 40,
          fontFamily: 'DM Sans',
          opacity: 1,
          textAlign: 'left',
          lineHeight: 40,
          fontWeight: 'bold'
        }
      },
      {
        uuid: '8c879085-b544-54f3-1ce5-dc6352fc839d',
        type: 'text',
        x: 158,
        y: 343.5625,
        w: 341,
        h: 55,
        detail: {
          text: 'A simple JavaScript framework for Drawing on the web..',
          color: 'white',
          fontSize: 18,
          fontFamily: 'Inter',
          opacity: 1,
          textAlign: 'left',
          lineHeight: 25
        }
      },
      {
        uuid: '0f731092-d90c-4375-ff65-8867fbf37b75',
        name: 'Preview Image',
        type: 'path',
        x: 258,
        y: 616,
        w: 196,
        h: 154,
        detail: {
          commands: [
            {
              type: 'M',
              params: [447, 616]
            },
            {
              type: 'H',
              params: [265]
            },
            {
              type: 'C',
              params: [261.128, 616, 258, 619.128, 258, 623]
            },
            {
              type: 'V',
              params: [763]
            },
            {
              type: 'C',
              params: [258, 766.872, 261.128, 770, 265, 770]
            },
            {
              type: 'H',
              params: [447]
            },
            {
              type: 'C',
              params: [450.872, 770, 454, 766.872, 454, 763]
            },
            {
              type: 'V',
              params: [623]
            },
            {
              type: 'C',
              params: [454, 619.128, 450.872, 616, 447, 616]
            },
            {
              type: 'Z',
              params: []
            },
            {
              type: 'M',
              params: [317.938, 647.5]
            },
            {
              type: 'C',
              params: [325.659, 647.5, 331.938, 653.778, 331.938, 661.5]
            },
            {
              type: 'C',
              params: [331.938, 669.222, 325.659, 675.5, 317.938, 675.5]
            },
            {
              type: 'C',
              params: [310.216, 675.5, 303.938, 669.222, 303.938, 661.5]
            },
            {
              type: 'C',
              params: [303.938, 653.778, 310.216, 647.5, 317.938, 647.5]
            },
            {
              type: 'Z',
              params: []
            },
            {
              type: 'M',
              params: [430.353, 743.116]
            },
            {
              type: 'C',
              params: [430.034, 743.383, 429.632, 743.53, 429.216, 743.531]
            },
            {
              type: 'H',
              params: [282.762]
            },
            {
              type: 'C',
              params: [281.8, 743.531, 281.012, 742.744, 281.012, 741.781]
            },
            {
              type: 'C',
              params: [281.012, 741.366, 281.166, 740.972, 281.428, 740.644]
            },
            {
              type: 'L',
              params: [318.681, 696.456]
            },
            {
              type: 'C',
              params: [319.294, 695.712, 320.409, 695.625, 321.153, 696.237]
            },
            {
              type: 'C',
              params: [321.219, 696.303, 321.306, 696.369, 321.372, 696.456]
            },
            {
              type: 'L',
              params: [343.116, 722.269]
            },
            {
              type: 'L',
              params: [377.7, 681.253]
            },
            {
              type: 'C',
              params: [378.312, 680.509, 379.428, 680.422, 380.172, 681.034]
            },
            {
              type: 'C',
              params: [380.238, 681.1, 380.325, 681.166, 380.391, 681.253]
            },
            {
              type: 'L',
              params: [430.616, 740.666]
            },
            {
              type: 'C',
              params: [431.184, 741.388, 431.097, 742.503, 430.353, 743.116]
            },
            {
              type: 'Z',
              params: []
            }
          ],
          fill: 'white',
          stroke: 'transparent',
          strokeWidth: 0,
          originX: 258,
          originY: 616,
          originW: 196,
          originH: 154,
          opacity: 1
        }
      },
      {
        uuid: '310646fd-e465-00ef-6dd7-cdfd52d78ac6',
        type: 'text',
        x: 855,
        y: 165.6875,
        w: 276,
        h: 39,
        detail: {
          text: 'Welcome to sign in',
          color: '#27272E',
          fontSize: 28,
          fontFamily: 'Inter',
          opacity: 1,
          textAlign: 'left',
          lineHeight: 28,
          fontWeight: '600'
        }
      },
      {
        uuid: '28a6b043-29fe-6c4f-7f2b-406860940505',
        type: 'text',
        x: 855,
        y: 217.8125,
        w: 300,
        h: 23,
        detail: {
          text: 'Please enter your e-mail and password',
          color: '#27272E',
          fontSize: 16,
          fontFamily: 'Inter',
          opacity: 1,
          textAlign: 'left',
          lineHeight: 16
        }
      },
      {
        uuid: '79de7c71-38f6-18ef-719c-8632e3f62e63',
        type: 'text',
        x: 855,
        y: 294.5625,
        w: 164,
        h: 20,
        detail: {
          text: 'Account E-mail',
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
        uuid: '61485823-71af-d87b-027d-0a57fb170929',
        name: 'E-mail Input Box',
        type: 'rect',
        x: 855,
        y: 321,
        w: 424,
        h: 46,
        detail: {
          background: '#EDF2F7',
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 6,
          opacity: 1
        }
      },
      {
        uuid: 'a37ced5d-e4ad-00a6-c3d7-3df4016312bb',
        type: 'text',
        x: 871,
        y: 333.4375,
        w: 250,
        h: 21,
        detail: {
          text: 'Please enter your account e-mail',
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
        uuid: 'f298d62d-f984-43c8-bb69-4192dec12c12',
        type: 'text',
        x: 855,
        y: 395.5625,
        w: 65,
        h: 20,
        detail: {
          text: 'Password',
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
        uuid: '166e3ec3-9f60-a9bc-cbdd-0baae9a5b933',
        name: 'Password Input Box',
        type: 'rect',
        x: 855,
        y: 422,
        w: 424,
        h: 46,
        detail: {
          background: '#EDF2F7',
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 6,
          opacity: 1
        }
      },
      {
        uuid: 'e4104e95-aba4-e18f-7781-0abb359b4bd7',
        type: 'text',
        x: 871,
        y: 433.4375,
        w: 300,
        h: 21,
        detail: {
          text: 'Please enter your account password',
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
        uuid: '72a6d0a1-dc1a-a49e-2071-17d897a42b1a',
        type: 'text',
        x: 1185.875,
        y: 474.5,
        w: 93,
        h: 15,
        detail: {
          text: 'Forgot Password?',
          color: '#777E91',
          fontSize: 11,
          fontFamily: 'Inter',
          opacity: 1,
          textAlign: 'left',
          lineHeight: 11
        }
      },
      {
        uuid: 'b3c3a613-6676-5eeb-2ce7-f639ed930682',
        name: 'Sign In Button',
        type: 'rect',
        x: 855,
        y: 518,
        w: 424,
        h: 48,
        detail: {
          background: '#141416',
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 24,
          opacity: 1
        }
      },
      {
        uuid: '05512905-5b0e-c357-2170-46c1e3de3d6a',
        type: 'text',
        x: 1041.8125,
        y: 530.4375,
        w: 53,
        h: 23,
        detail: {
          text: 'Sign In',
          color: '#FCFCFD',
          fontSize: 16,
          fontFamily: 'DM Sans',
          opacity: 1,
          textAlign: 'left',
          lineHeight: 16,
          fontWeight: 'bold'
        }
      },
      {
        uuid: '640e0c66-5139-a4ad-34df-730ad0c851ee',
        type: 'text',
        x: 993.0625,
        y: 596.875,
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
        uuid: '24c60794-02f7-cc92-9892-cd7753f71b4b',
        name: 'Google Button',
        type: 'group',
        x: 956,
        y: 640,
        w: 52,
        h: 52,
        detail: {
          children: [
            {
              uuid: '7e55b258-1b15-0b9f-c063-8707572fe76b',
              type: 'rect',
              x: 0,
              y: 0,
              w: 52,
              h: 52,
              detail: {
                shadowBlur: 1.5,
                shadowColor: '#0b1a4b33',
                shadowOffsetX: 0,
                shadowOffsetY: 1,
                background: 'white',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 26,
                opacity: 1
              }
            },
            {
              uuid: 'a86d5846-4d60-315b-c15d-c41965fddc79',
              type: 'group',
              x: 15,
              y: 15,
              w: 23.1875,
              h: 23.1875,
              detail: {
                children: [
                  {
                    uuid: '860d80e9-5d11-bf74-ead2-920a197c6b29',
                    type: 'path',
                    x: 0,
                    y: 6.25,
                    w: 5.125,
                    h: 10.8125,
                    detail: {
                      commands: [
                        {
                          type: 'M',
                          params: [975.138, 780.509]
                        },
                        {
                          type: 'L',
                          params: [974.331, 783.522]
                        },
                        {
                          type: 'L',
                          params: [971.381, 783.584]
                        },
                        {
                          type: 'C',
                          params: [970.5, 781.949, 970, 780.079, 970, 778.091]
                        },
                        {
                          type: 'C',
                          params: [970, 776.169, 970.467, 774.356, 971.296, 772.76]
                        },
                        {
                          type: 'H',
                          params: [971.297]
                        },
                        {
                          type: 'L',
                          params: [973.922, 773.242]
                        },
                        {
                          type: 'L',
                          params: [975.073, 775.852]
                        },
                        {
                          type: 'C',
                          params: [974.832, 776.554, 974.701, 777.307, 974.701, 778.091]
                        },
                        {
                          type: 'C',
                          params: [974.701, 778.942, 974.855, 779.757, 975.138, 780.509]
                        },
                        {
                          type: 'Z',
                          params: []
                        }
                      ],
                      fill: '#555555',
                      stroke: 'transparent',
                      strokeWidth: 0,
                      originX: 970,
                      originY: 772.75,
                      originW: 5.125,
                      originH: 10.8125,
                      opacity: 1
                    }
                  },
                  {
                    uuid: '463c2d98-c0fc-9f39-4bc0-979d0838b2a5',
                    type: 'path',
                    x: 11.875,
                    y: 9.4375,
                    w: 11.3125,
                    h: 11.1875,
                    detail: {
                      commands: [
                        {
                          type: 'M',
                          params: [992.979, 775.925]
                        },
                        {
                          type: 'C',
                          params: [993.112, 776.626, 993.182, 777.351, 993.182, 778.091]
                        },
                        {
                          type: 'C',
                          params: [993.182, 778.92, 993.095, 779.73, 992.928, 780.511]
                        },
                        {
                          type: 'C',
                          params: [992.364, 783.168, 990.89, 785.488, 988.847, 787.13]
                        },
                        {
                          type: 'L',
                          params: [988.847, 787.129]
                        },
                        {
                          type: 'L',
                          params: [985.539, 786.96]
                        },
                        {
                          type: 'L',
                          params: [985.071, 784.038]
                        },
                        {
                          type: 'C',
                          params: [986.427, 783.244, 987.486, 782, 988.044, 780.511]
                        },
                        {
                          type: 'H',
                          params: [981.846]
                        },
                        {
                          type: 'V',
                          params: [775.925]
                        },
                        {
                          type: 'H',
                          params: [988.134]
                        },
                        {
                          type: 'H',
                          params: [992.979]
                        },
                        {
                          type: 'Z',
                          params: []
                        }
                      ],
                      fill: '#555555',
                      stroke: 'transparent',
                      strokeWidth: 0,
                      originX: 981.875,
                      originY: 775.9375,
                      originW: 11.3125,
                      originH: 11.1875,
                      opacity: 1
                    }
                  },
                  {
                    uuid: '9baecf16-beef-f0dc-9043-b1dfd10ce13a',
                    type: 'path',
                    x: 1.375,
                    y: 14,
                    w: 17.5,
                    h: 9.1875,
                    detail: {
                      commands: [
                        {
                          type: 'M',
                          params: [988.846, 787.129]
                        },
                        {
                          type: 'L',
                          params: [988.847, 787.13]
                        },
                        {
                          type: 'C',
                          params: [986.86, 788.727, 984.337, 789.682, 981.59, 789.682]
                        },
                        {
                          type: 'C',
                          params: [977.176, 789.682, 973.339, 787.215, 971.381, 783.584]
                        },
                        {
                          type: 'L',
                          params: [975.137, 780.509]
                        },
                        {
                          type: 'C',
                          params: [976.116, 783.122, 978.636, 784.981, 981.59, 784.981]
                        },
                        {
                          type: 'C',
                          params: [982.86, 784.981, 984.05, 784.638, 985.071, 784.039]
                        },
                        {
                          type: 'L',
                          params: [988.846, 787.129]
                        },
                        {
                          type: 'Z',
                          params: []
                        }
                      ],
                      fill: '#555555',
                      stroke: 'transparent',
                      strokeWidth: 0,
                      originX: 971.375,
                      originY: 780.5,
                      originW: 17.5,
                      originH: 9.1875,
                      opacity: 1
                    }
                  },
                  {
                    uuid: 'a8052f29-56e5-8478-2210-527ac1b1a844',
                    type: 'path',
                    x: 1.3125,
                    y: 0,
                    w: 17.6875,
                    h: 9.375,
                    detail: {
                      commands: [
                        {
                          type: 'M',
                          params: [988.989, 769.168]
                        },
                        {
                          type: 'L',
                          params: [985.234, 772.243]
                        },
                        {
                          type: 'C',
                          params: [984.178, 771.582, 982.929, 771.201, 981.591, 771.201]
                        },
                        {
                          type: 'C',
                          params: [978.57, 771.201, 976.002, 773.146, 975.072, 775.852]
                        },
                        {
                          type: 'L',
                          params: [971.297, 772.76]
                        },
                        {
                          type: 'H',
                          params: [971.296]
                        },
                        {
                          type: 'C',
                          params: [973.225, 769.041, 977.111, 766.5, 981.591, 766.5]
                        },
                        {
                          type: 'C',
                          params: [984.403, 766.5, 986.982, 767.502, 988.989, 769.168]
                        },
                        {
                          type: 'Z',
                          params: []
                        }
                      ],
                      fill: '#555555',
                      stroke: 'transparent',
                      strokeWidth: 0,
                      originX: 971.3125,
                      originY: 766.5,
                      originW: 17.6875,
                      originH: 9.375,
                      opacity: 1
                    }
                  }
                ],
                opacity: 1
              }
            }
          ],
          opacity: 1
        }
      },
      {
        uuid: 'adbb4f1b-d240-8d7b-fa17-45dc791a1f1b',
        name: 'Apple Button',
        type: 'group',
        x: 1040,
        y: 640,
        w: 52,
        h: 52,
        detail: {
          children: [
            {
              uuid: '75ec0fb2-3c24-e79b-3673-a7ae3b777c23',
              type: 'rect',
              x: 0,
              y: 0,
              w: 52,
              h: 52,
              detail: {
                shadowBlur: 1.5,
                shadowColor: '#0b1a4b33',
                shadowOffsetX: 0,
                shadowOffsetY: 1,
                background: 'white',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 26,
                opacity: 1
              }
            },
            {
              uuid: 'f3911d82-3eaa-c36b-1af4-bbbaadf926b3',
              name: 'Apple',
              type: 'path',
              x: 15,
              y: 12,
              w: 22,
              h: 27,
              detail: {
                commands: [
                  {
                    type: 'M',
                    params: [1069.97, 769.811]
                  },
                  {
                    type: 'C',
                    params: [1070.92, 768.67, 1071.55, 767.081, 1071.38, 765.5]
                  },
                  {
                    type: 'C',
                    params: [1070.02, 765.555, 1068.37, 766.406, 1067.4, 767.546]
                  },
                  {
                    type: 'C',
                    params: [1066.53, 768.557, 1065.76, 770.173, 1065.97, 771.722]
                  },
                  {
                    type: 'C',
                    params: [1067.48, 771.841, 1069.03, 770.953, 1069.97, 769.811]
                  },
                  {
                    type: 'H',
                    params: [1069.97]
                  },
                  {
                    type: 'Z',
                    params: []
                  },
                  {
                    type: 'M',
                    params: [1073.37, 779.844]
                  },
                  {
                    type: 'C',
                    params: [1073.41, 783.93, 1076.96, 785.29, 1077, 785.308]
                  },
                  {
                    type: 'C',
                    params: [1076.97, 785.404, 1076.43, 787.245, 1075.13, 789.148]
                  },
                  {
                    type: 'C',
                    params: [1074.01, 790.793, 1072.84, 792.432, 1070.99, 792.466]
                  },
                  {
                    type: 'C',
                    params: [1069.19, 792.498, 1068.6, 791.393, 1066.54, 791.393]
                  },
                  {
                    type: 'C',
                    params: [1064.47, 791.393, 1063.82, 792.432, 1062.11, 792.498]
                  },
                  {
                    type: 'C',
                    params: [1060.33, 792.566, 1058.98, 790.72, 1057.84, 789.082]
                  },
                  {
                    type: 'C',
                    params: [1055.52, 785.729, 1053.75, 779.609, 1056.13, 775.478]
                  },
                  {
                    type: 'C',
                    params: [1057.31, 773.426, 1059.43, 772.126, 1061.72, 772.094]
                  },
                  {
                    type: 'C',
                    params: [1063.46, 772.06, 1065.11, 773.267, 1066.18, 773.267]
                  },
                  {
                    type: 'C',
                    params: [1067.25, 773.267, 1069.25, 771.816, 1071.35, 772.028]
                  },
                  {
                    type: 'C',
                    params: [1072.23, 772.066, 1074.71, 772.384, 1076.29, 774.707]
                  },
                  {
                    type: 'C',
                    params: [1076.17, 774.786, 1073.34, 776.428, 1073.37, 779.844]
                  }
                ],
                fill: '#332218',
                stroke: 'transparent',
                strokeWidth: 0,
                originX: 1055,
                originY: 765.5,
                originW: 22,
                originH: 27,
                opacity: 1
              }
            }
          ],
          opacity: 1
        }
      },
      {
        uuid: 'b23e3db2-52c5-6be3-34a1-3109740cb35c',
        name: 'Facebook Button',
        type: 'group',
        x: 1124,
        y: 640,
        w: 52,
        h: 52,
        detail: {
          children: [
            {
              uuid: '161e2ddb-7df6-6e5c-b13f-850dd986607d',
              type: 'rect',
              x: 0,
              y: 0,
              w: 52,
              h: 52,
              detail: {
                shadowBlur: 1.5,
                shadowColor: '#0b1a4b33',
                shadowOffsetX: 0,
                shadowOffsetY: 1,
                background: 'white',
                borderColor: 'transparent',
                borderWidth: 0,
                borderRadius: 26,
                opacity: 1
              }
            },
            {
              uuid: 'c4503188-8bcb-9595-dcd6-a3debef0cae9',
              name: 'Fackbook',
              type: 'path',
              x: 20,
              y: 13,
              w: 13,
              h: 25,
              detail: {
                commands: [
                  {
                    type: 'M',
                    params: [1147.71, 791.5]
                  },
                  {
                    type: 'V',
                    params: [780.458]
                  },
                  {
                    type: 'H',
                    params: [1144]
                  },
                  {
                    type: 'V',
                    params: [775.856]
                  },
                  {
                    type: 'H',
                    params: [1147.71]
                  },
                  {
                    type: 'V',
                    params: [772.175]
                  },
                  {
                    type: 'C',
                    params: [1147.71, 768.371, 1150.13, 766.5, 1153.55, 766.5]
                  },
                  {
                    type: 'C',
                    params: [1155.18, 766.5, 1156.59, 766.621, 1157, 766.675]
                  },
                  {
                    type: 'V',
                    params: [770.65]
                  },
                  {
                    type: 'H',
                    params: [1154.63]
                  },
                  {
                    type: 'C',
                    params: [1152.77, 770.65, 1152.34, 771.529, 1152.34, 772.815]
                  },
                  {
                    type: 'V',
                    params: [775.856]
                  },
                  {
                    type: 'H',
                    params: [1156.97]
                  },
                  {
                    type: 'L',
                    params: [1156.04, 780.456]
                  },
                  {
                    type: 'H',
                    params: [1152.34]
                  },
                  {
                    type: 'L',
                    params: [1152.41, 791.5]
                  }
                ],
                fill: '#555555',
                stroke: 'transparent',
                strokeWidth: 0,
                originX: 1144,
                originY: 766.5,
                originW: 13,
                originH: 25,
                opacity: 1
              }
            }
          ],
          opacity: 1
        }
      },

      {
        uuid: 'baaf3e0c-977f-b107-2511-ebd09b10cd7a',
        type: 'text',
        x: 960.125,
        y: 752.0625,
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
        uuid: '4f210438-f0c3-f2c3-dc6c-b11b1f943338',
        type: 'text',
        x: 1121.5,
        y: 752.0625,
        w: 53,
        h: 20,
        detail: {
          text: 'Sign Up',
          color: '#141416',
          fontSize: 14,
          fontFamily: 'Inter',
          opacity: 1,
          textAlign: 'left',
          lineHeight: 14,
          fontWeight: '600'
        }
      }
    ],
    assets: {}
  }
};

export default page;
