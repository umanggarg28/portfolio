const THEMES = ['hermes', 'lime', 'oxide', 'infra', 'lab', 'signal'] as const

export type SiteTheme = (typeof THEMES)[number]

export type ThemePalette = {
  name: string
  bg: string
  bg2: string
  fg: string
  accent: string
  accent2: string
  bgRgb: string
  bg2Rgb: string
  fgRgb: string
  accentRgb: string
  accent2Rgb: string
}

export const THEME_PALETTES: Record<SiteTheme, ThemePalette> = {
  hermes: {
    name: 'Hermes Teal',
    bg: '#041c1c',
    bg2: '#051f1f',
    fg: '#ffe6cb',
    accent: '#e5b44e',
    accent2: '#fff0a6',
    bgRgb: '4,28,28',
    bg2Rgb: '5,31,31',
    fgRgb: '255,230,203',
    accentRgb: '229,180,78',
    accent2Rgb: '255,240,166',
  },
  lime: {
    name: 'Current Lime',
    bg: '#030303',
    bg2: '#050605',
    fg: '#f0ede6',
    accent: '#b8ff57',
    accent2: '#8fd13d',
    bgRgb: '3,3,3',
    bg2Rgb: '5,6,5',
    fgRgb: '240,237,230',
    accentRgb: '184,255,87',
    accent2Rgb: '143,209,61',
  },
  oxide: {
    name: 'Oxide Copper',
    bg: '#050807',
    bg2: '#0a100d',
    fg: '#ede7dc',
    accent: '#c9824a',
    accent2: '#6fa66a',
    bgRgb: '5,8,7',
    bg2Rgb: '10,16,13',
    fgRgb: '237,231,220',
    accentRgb: '201,130,74',
    accent2Rgb: '111,166,106',
  },
  infra: {
    name: 'Infra Amber',
    bg: '#050505',
    bg2: '#10100d',
    fg: '#f2e8d8',
    accent: '#ffb547',
    accent2: '#6f7b3a',
    bgRgb: '5,5,5',
    bg2Rgb: '16,16,13',
    fgRgb: '242,232,216',
    accentRgb: '255,181,71',
    accent2Rgb: '111,123,58',
  },
  lab: {
    name: 'Cold Lab Blue',
    bg: '#030a0c',
    bg2: '#071316',
    fg: '#eae6dd',
    accent: '#64d8e8',
    accent2: '#6f8fa3',
    bgRgb: '3,10,12',
    bg2Rgb: '7,19,22',
    fgRgb: '234,230,221',
    accentRgb: '100,216,232',
    accent2Rgb: '111,143,163',
  },
  signal: {
    name: 'Signal Red',
    bg: '#060505',
    bg2: '#110d0c',
    fg: '#efe8dc',
    accent: '#ff5a3d',
    accent2: '#f5a24f',
    bgRgb: '6,5,5',
    bg2Rgb: '17,13,12',
    fgRgb: '239,232,220',
    accentRgb: '255,90,61',
    accent2Rgb: '245,162,79',
  },
}

function isSiteTheme(value: string | undefined): value is SiteTheme {
  return Boolean(value && THEMES.includes(value as SiteTheme))
}

// Switch the whole portfolio palette here, or set NEXT_PUBLIC_SITE_THEME.
// The original black/lime palette is preserved as "lime".
export const SITE_THEME: SiteTheme = isSiteTheme(process.env.NEXT_PUBLIC_SITE_THEME)
  ? process.env.NEXT_PUBLIC_SITE_THEME
  : 'lime'

export const SITE_PALETTE = THEME_PALETTES[SITE_THEME]
