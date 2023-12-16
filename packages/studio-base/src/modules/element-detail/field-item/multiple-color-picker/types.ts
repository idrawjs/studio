import type { LinearGradientColor, RadialGradientColor } from 'idraw';

export type GradientColor = LinearGradientColor | RadialGradientColor;

export type ColorValue = string | GradientColor;

export type ColorModeType = 'solid' | 'linear-gradient' | 'radial-gradient';
