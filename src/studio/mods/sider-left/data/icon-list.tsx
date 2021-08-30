import * as React from 'react';
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

export const iconConfigList: {
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

