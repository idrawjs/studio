import * as React from 'react';
// import util from '@idraw/util';
import { TypeElement, TypeElemDesc } from '@idraw/types';
import {
  ArrowUpOutlined, ArrowDownOutlined, ArrowLeftOutlined, ArrowRightOutlined,
  CheckCircleOutlined, CloseCircleOutlined, MinusOutlined, PlusOutlined,
  SmileOutlined, MehOutlined, FrownOutlined, InfoCircleOutlined,
  SettingOutlined, SaveOutlined, ControlOutlined, CodeOutlined, 
  PieChartOutlined, AreaChartOutlined, LineChartOutlined, BarChartOutlined,
  UserOutlined, UserAddOutlined, UserDeleteOutlined, TeamOutlined,
  FileDoneOutlined, FileAddOutlined, FileSyncOutlined, FileTextOutlined,
  FileExcelOutlined, FileGifOutlined, FilePdfOutlined, FileMarkdownOutlined,
  FilePptOutlined, FileUnknownOutlined, FileZipOutlined,

} from '@ant-design/icons';
import { parseReactToSVG } from './util';


function createElementData(params: {
  name: string,
  Comp: React.ReactElement<any, string | React.JSXElementConstructor<any>>
}): {
  name: string,
  icon: React.ReactElement,
  element: TypeElement<keyof TypeElemDesc>
} {
  return {
    name: params.name,
    icon: params.Comp,
    element: {
      uuid: '',
      x: 0,
      y: 0,
      w: 100,
      h: 100,
      angle: 0,
      type: 'svg',
      desc: {
        svg: parseReactToSVG(params.Comp)
      },
      extension: {
        subType: 'svg-custom-color',
        currentColor: '#4A90E2FF'
      }
    },
    
  }
}

const list: {
  name: string,
  Comp: React.ReactElement<any, string | React.JSXElementConstructor<any>>
}[] = [
  // , , , ArrowRightOutlined,
  {
    name: 'ArrowUp',
    Comp: <ArrowUpOutlined />,
  },
  {
    name: 'ArrowDown',
    Comp: <ArrowDownOutlined />,
  },
  {
    name: 'ArrowLeft',
    Comp: <ArrowLeftOutlined />,
  },
  {
    name: 'ArrowRight',
    Comp: <ArrowRightOutlined />,
  },
  {
    name: 'Check',
    Comp: <CheckCircleOutlined />,
  },
  {
    name: 'Close',
    Comp: <CloseCircleOutlined />,
  },
  {
    name: 'Minus',
    Comp: <MinusOutlined />,
  },
  {
    name: 'Plus',
    Comp: <PlusOutlined />,
  },
  {
    name: 'Smile',
    Comp: <SmileOutlined />,
  },
  {
    name: 'Meh',
    Comp: <MehOutlined />,
  },
  {
    name: 'Frown',
    Comp: <FrownOutlined />,
  },
  {
    name: 'Info',
    Comp: <InfoCircleOutlined />,
  },
  {
    name: 'Setting',
    Comp: <SettingOutlined />,
  },
  {
    name: 'Save',
    Comp: <SaveOutlined />,
  },
  {
    name: 'Control',
    Comp: <ControlOutlined />,
  },
  {
    name: 'Code',
    Comp: <CodeOutlined />,
  },
  {
    name: 'AreaChart',
    Comp: <AreaChartOutlined />,
  },
  {
    name: 'LineChart',
    Comp: <LineChartOutlined />,
  },
  {
    name: 'BarChart',
    Comp: <BarChartOutlined />,
  },
  {
    name: 'PieChart',
    Comp: <PieChartOutlined />
  },
  {
    name: 'User',
    Comp: <UserOutlined />,
  },
  {
    name: 'UserAdd',
    Comp: <UserAddOutlined />,
  },
  {
    name: 'UserDelete',
    Comp: <UserDeleteOutlined />,
  },
  {
    name: 'Team',
    Comp: <TeamOutlined />,
  },
  {
    name: 'FileDone',
    Comp: <FileDoneOutlined />,
  },
  {
    name: 'FileAdd',
    Comp: <FileAddOutlined />,
  },
  {
    name: 'FileSync',
    Comp: <FileSyncOutlined />,
  },
  {
    name: 'FileText',
    Comp: <FileTextOutlined />,
  },
  {
    name: 'FileExcel',
    Comp: <FileExcelOutlined />,
  },
  {
    name: 'FileGif',
    Comp: <FileGifOutlined />,
  },
  {
    name: 'FilePDF',
    Comp: <FilePdfOutlined />,
  },
  {
    name: 'FilePPT',
    Comp: <FilePptOutlined />,
  },
  {
    name: 'FileMarkdown',
    Comp: <FileMarkdownOutlined />,
  },
  {
    name: 'FileUnknown',
    Comp: <FileUnknownOutlined />,
  },
  {
    name: 'FileZip',
    Comp: <FileZipOutlined />,
  },
]

export const iconDataList: {
  name: string,
  icon: React.ReactElement,
  element: TypeElement<keyof TypeElemDesc>
}[] = list.map((item) => {
  return createElementData(item)
});