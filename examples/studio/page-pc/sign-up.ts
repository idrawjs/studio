import type { Element } from 'idraw';

const page: Element<'group'> = {
  name: 'Sign Up',
  uuid: '8f027d03-48f1-5db5-6d53-c08074fcee8d',
  type: 'group',
  x: 0,
  y: 0,
  w: 1440,
  h: 950,
  detail: {
    background: '#FFFFFF',
    children: [
      {
        uuid: '78f2de65-bc43-5609-a56f-49be8cf6ee04',
        type: 'text',
        x: 854,
        y: 69.1875,
        w: 273,
        h: 39,
        detail: {
          text: 'Create your account',
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
        uuid: 'cc11d3e8-6c1f-c748-26cf-9b28493897fb',
        type: 'text',
        x: 854,
        y: 198.0625,
        w: 150,
        h: 20,
        detail: {
          text: 'Acccout Name',
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
        uuid: '0e84c917-5ba1-5603-786c-48d6b034f808',
        name: 'Account Name Input Box',
        type: 'rect',
        x: 854,
        y: 224.5,
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
        uuid: '854a4ad4-1986-d092-ab6d-aeef23629f6a',
        type: 'text',
        x: 870,
        y: 235.9375,
        w: 200,
        h: 21,
        detail: {
          text: 'Enter your account name',
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
        uuid: 'b03394ca-a892-4a29-00d1-5618134d89e5',
        type: 'text',
        x: 854,
        y: 299.0625,
        w: 164,
        h: 20,
        detail: {
          text: 'E-mail or phone number',
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
        uuid: '775b1e3f-76c8-6932-240b-3d4375cd1e53',
        name: 'E-mail Input Box',
        type: 'rect',
        x: 854,
        y: 325.5,
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
        uuid: 'b26f9982-4562-12ee-60f2-e5a650f9ba55',
        type: 'text',
        x: 870,
        y: 336.9375,
        w: 300,
        h: 21,
        detail: {
          text: 'Enter your e-mail or phone number',
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
        uuid: 'ba06161f-887e-f892-2332-974f4ec9e5f0',
        type: 'text',
        x: 854,
        y: 400.0625,
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
        uuid: '91a28574-1b45-79d5-3c76-a46288b5ffe7',
        name: 'Password Input Box',
        type: 'rect',
        x: 854,
        y: 426.5,
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
        uuid: '3d6874c9-a32f-3910-5dd0-5f15a043ef1e',
        type: 'text',
        x: 870,
        y: 437.9375,
        w: 200,
        h: 21,
        detail: {
          text: 'Enter your password',
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
        uuid: '33307ddf-459c-203f-0bdd-ebb914cf07ac',
        type: 'text',
        x: 854,
        y: 479,
        w: 152,
        h: 15,
        detail: {
          text: 'Must be 16 characters at least',
          color: '#718096',
          fontSize: 11,
          fontFamily: 'Inter',
          opacity: 1,
          textAlign: 'left',
          lineHeight: 11
        }
      },
      {
        uuid: 'c4e9a0ea-5f4e-9b2c-d4b3-307becbb6f61',
        name: 'Checkbox',
        type: 'path',
        x: 854,
        y: 522.5,
        w: 20,
        h: 20,
        detail: {
          commands: [
            {
              type: 'M',
              params: [857.846, 524.5]
            },
            {
              type: 'C',
              params: [856.929, 524.5, 856.704, 524.543, 856.478, 524.664]
            },
            {
              type: 'C',
              params: [856.338, 524.739, 856.239, 524.838, 856.164, 524.978]
            },
            {
              type: 'C',
              params: [856.043, 525.204, 856, 525.429, 856, 526.346]
            },
            {
              type: 'V',
              params: [538.654]
            },
            {
              type: 'C',
              params: [856, 539.571, 856.043, 539.796, 856.164, 540.022]
            },
            {
              type: 'C',
              params: [856.239, 540.162, 856.338, 540.261, 856.478, 540.336]
            },
            {
              type: 'C',
              params: [856.704, 540.457, 856.929, 540.5, 857.846, 540.5]
            },
            {
              type: 'H',
              params: [870.154]
            },
            {
              type: 'C',
              params: [871.071, 540.5, 871.296, 540.457, 871.522, 540.336]
            },
            {
              type: 'C',
              params: [871.662, 540.261, 871.761, 540.162, 871.836, 540.022]
            },
            {
              type: 'C',
              params: [871.957, 539.796, 872, 539.571, 872, 538.654]
            },
            {
              type: 'V',
              params: [526.346]
            },
            {
              type: 'C',
              params: [872, 525.429, 871.957, 525.204, 871.836, 524.978]
            },
            {
              type: 'C',
              params: [871.761, 524.838, 871.662, 524.739, 871.522, 524.664]
            },
            {
              type: 'C',
              params: [871.296, 524.543, 871.071, 524.5, 870.154, 524.5]
            },
            {
              type: 'H',
              params: [857.846]
            },
            {
              type: 'Z',
              params: []
            },
            {
              type: 'M',
              params: [857.846, 522.5]
            },
            {
              type: 'H',
              params: [870.154]
            },
            {
              type: 'C',
              params: [871.491, 522.5, 871.976, 522.639, 872.465, 522.901]
            },
            {
              type: 'C',
              params: [872.954, 523.162, 873.338, 523.546, 873.599, 524.035]
            },
            {
              type: 'C',
              params: [873.861, 524.524, 874, 525.009, 874, 526.346]
            },
            {
              type: 'V',
              params: [538.654]
            },
            {
              type: 'C',
              params: [874, 539.991, 873.861, 540.476, 873.599, 540.965]
            },
            {
              type: 'C',
              params: [873.338, 541.454, 872.954, 541.838, 872.465, 542.099]
            },
            {
              type: 'C',
              params: [871.976, 542.361, 871.491, 542.5, 870.154, 542.5]
            },
            {
              type: 'H',
              params: [857.846]
            },
            {
              type: 'C',
              params: [856.509, 542.5, 856.024, 542.361, 855.535, 542.099]
            },
            {
              type: 'C',
              params: [855.046, 541.838, 854.662, 541.454, 854.401, 540.965]
            },
            {
              type: 'C',
              params: [854.139, 540.476, 854, 539.991, 854, 538.654]
            },
            {
              type: 'V',
              params: [526.346]
            },
            {
              type: 'C',
              params: [854, 525.009, 854.139, 524.524, 854.401, 524.035]
            },
            {
              type: 'C',
              params: [854.662, 523.546, 855.046, 523.162, 855.535, 522.901]
            },
            {
              type: 'C',
              params: [856.024, 522.639, 856.509, 522.5, 857.846, 522.5]
            },
            {
              type: 'Z',
              params: []
            }
          ],
          fill: '#C9CED6',
          stroke: 'transparent',
          strokeWidth: 0,
          originX: 854,
          originY: 522.5,
          originW: 20,
          originH: 20,
          opacity: 1
        }
      },
      {
        uuid: '618fcc68-7538-416e-084d-07c93ddda6d4',
        type: 'text',
        x: 884,
        y: 524.375,
        w: 400,
        h: 37,
        detail: {
          text: 'By creating an account means you agree to the Terms and Conditions, and our Privacy Policy',
          color: '#425466',
          fontSize: 12,
          fontFamily: 'Inter',
          opacity: 1,
          textAlign: 'left',
          lineHeight: 16.5
        }
      },
      {
        uuid: 'aa88f85b-b880-6a39-2c80-0966d741b0ef',
        name: 'Sign Up Button',
        type: 'rect',
        x: 854,
        y: 612.5,
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
        uuid: 'c86866c7-3287-d82b-7296-f840cdfe22d6',
        type: 'text',
        x: 1037.125,
        y: 624.9375,
        w: 61,
        h: 23,
        detail: {
          text: 'Sign Up',
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
        uuid: '4b45a778-8749-3a6f-25b1-c6281a51b0e0',
        type: 'text',
        x: 992.0625,
        y: 711.375,
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
        uuid: 'bcb9cc77-b585-5d0e-29bb-24ea32a7266f',
        name: 'Google Button',
        type: 'group',
        x: 956,
        y: 752.5,
        w: 52,
        h: 52,
        detail: {
          children: [
            {
              uuid: '46f76bdd-506c-9d04-88c2-70b824abc8bd',
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
              uuid: 'd834124b-6d1f-06c1-023a-b0185c1b75d8',
              type: 'group',
              x: 15,
              y: 15,
              w: 23.1875,
              h: 23.1875,
              detail: {
                children: [
                  {
                    uuid: '7d5e8a75-829b-65e6-b241-d3751c9d8472',
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
                    uuid: 'c7dbcbe9-f558-4ef6-899b-88bcf3bd483c',
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
                    uuid: 'e35ae59a-64c4-1667-a680-4dba97eecb19',
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
                    uuid: '324e19ed-af6b-78c1-5f59-f81c191a5328',
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
        uuid: 'a3e171ff-c4ad-eac8-39b9-df79154ea262',
        name: 'Apple Button',
        type: 'group',
        x: 1040,
        y: 752.5,
        w: 52,
        h: 52,
        detail: {
          children: [
            {
              uuid: '2f9580a7-c307-fb62-0aa7-04eca9920856',
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
              uuid: 'a138b1d7-b1a6-d81b-f663-cd24d3e34c5f',
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
        uuid: 'aaa5e393-ae54-fd4e-0aaa-106865b3fdd5',
        name: 'Facebook Button',
        type: 'group',
        x: 1124,
        y: 752.5,
        w: 52,
        h: 52,
        detail: {
          children: [
            {
              uuid: '19a58e04-afe2-de2f-296f-e837269ac5f6',
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
              uuid: 'fbe4592f-0956-42bf-d740-298c20935010',
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
        uuid: '210a8d17-b45b-3327-7c50-a8c14ccc5d40',
        type: 'text',
        x: 949.9375,
        y: 866.5625,
        w: 181,
        h: 20,
        detail: {
          text: 'Aldready have an account?',
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
        uuid: 'd6133691-62fe-5d1a-f5f9-02716b0b5ba5',
        type: 'text',
        x: 1136.625,
        y: 866.5625,
        w: 46,
        h: 20,
        detail: {
          text: 'Sign In',
          color: '#141416',
          fontSize: 14,
          fontFamily: 'Inter',
          opacity: 1,
          textAlign: 'left',
          lineHeight: 14,
          fontWeight: '600'
        }
      },
      {
        uuid: 'f4493058-44a6-194d-eaac-449a75d02fe4',
        name: 'Preview Background',
        type: 'path',
        x: 0,
        y: 0,
        w: 718,
        h: 950,
        detail: {
          commands: [
            {
              type: 'M',
              params: [0, 0]
            },
            {
              type: 'H',
              params: [717.972]
            },
            {
              type: 'V',
              params: [950]
            },
            {
              type: 'H',
              params: [0]
            },
            {
              type: 'V',
              params: [0]
            },
            {
              type: 'Z',
              params: []
            }
          ],
          fill: '#353945',
          stroke: 'transparent',
          strokeWidth: 0,
          originX: 0,
          originY: 0,
          originW: 718,
          originH: 950,
          opacity: 1
        }
      },
      {
        uuid: 'f82890a2-4418-9eeb-d2e1-4f9e3732cda0',
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
        uuid: '7ae4ba11-4c4c-b9be-5060-67c57bbebd8b',
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
        uuid: '3473aa5b-b331-eb78-6162-bb80b7dc127c',
        type: 'text',
        x: 132,
        y: 73.4375,
        w: 47,
        h: 23,
        detail: {
          text: 'Home',
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
        uuid: '62c20924-0f9c-bb14-e91a-59ae4396fecd',
        type: 'text',
        x: 158,
        y: 248.125,
        w: 431,
        h: 56,
        detail: {
          text: 'Welcome to iDraw!',
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
        uuid: 'f5183f8f-f7ec-5930-7074-84c83f9e563a',
        type: 'text',
        x: 158,
        y: 343.5625,
        w: 341,
        h: 55,
        detail: {
          text: 'A simple JavaScript framework for Drawing on the web.',
          color: 'white',
          fontSize: 18,
          fontFamily: 'Inter',
          opacity: 1,
          textAlign: 'left',
          lineHeight: 25
        }
      },
      {
        uuid: 'c6bdbb71-a10f-9051-eeee-7605589c12a3',
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
      }
    ],
    assets: {}
  }
};

export default page;
