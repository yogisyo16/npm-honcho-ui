import "@mui/material/styles/createPalette";

declare module "@mui/material/styles" {
  interface Palette {
    accent: AccentPaletteColor;
    danger: DangerPaletteColor;
    neutral: NeutralPaletteColor;
    light: LightPalleteColor;
    dark: DarkPalleteColor;
  }

  interface LightPalleteColor {
    Primary: string;
    "On-primary": string;
    "Primary-Container": string;
    "On-primary-Container": string;
    Surface: string;
    "On-Surface": string;
    "Surface-variant-1": string;
    "On-Surface-Variant-1": string;
    "Surface-Variant-2": string;
    "On-Surface-variant-2": string;
    Outline: string;
    "Outline-Variant": string;
    Background: string;
    "On-Background": string;
    Accent: string;
    "On-Accent": string;
    "Accent-Container": string;
    "On-Accent-Container": string;
    Error: string;
    "On-Error": string;
    "Error-Container": string;
    "On-Error-Container": string;
  }

  interface DarkPalleteColor {
    Primary: string;
    "On-Primary": string;
    "Primary-Container": string;
    "On-Primary-Container": string;
    Surface: string;
    "On-Surface": string;
    "Surface-Variant-1": string;
    "On-Surface-Variant-1": string;
    "Surface-Variant-2": string;
    "On-Surface-Variant-2": string;
    Outline: string;
    "Outline-Variant": string;
    Background: string;
    "On-Background": string;
    Error: string;
    "On-Error": string;
    "Error-Container": string;
    "On-Error-Container": string;
  }

  interface PaletteOptions {
    accent?: AccentPaletteColorOptions | undefined;
    danger?: DangerPaletteColorOptions | undefined;
    neutral?: NeutralPaletteColorOptions | undefined;
    light?: LightPalleteColor | undefined;
    dark?: DarkPalleteColor | undefined;
  }

  interface PaletteColor {
    base: string;
    light1: string;
    light2: string;
    light3: string;
    light4: string;
    dark1: string;
    dark2: string;
  }

  interface AccentPaletteColor {
    base: string;
    light1: string;
    light2: string;
    dark1: string;
    dark2: string;
  }
  interface DangerPaletteColor {
    base: string;
    light1: string;
    light2: string;
    dark1: string;
    dark2: string;
  }

  interface NeutralPaletteColor {
    white: string;
    neutral0: string;
    neutral10: string;
    neutral25: string;
    neutral50: string;
    neutral75: string;
    neutral100: string;
  }

  interface PaletteColorOptions {
    base?: string;
    main?: string;
    light1?: string;
    light2?: string;
    light3?: string;
    light4?: string;
    dark1?: string;
    dark2?: string;
  }

  type AccentPaletteColorOptions = Omit<
    PaletteColorOptions,
    "light3" | "light4"
  >;

  type DangerPaletteColorOptions = Omit<
    PaletteColorOptions,
    "light3" | "light4"
  >;

  interface NeutralPaletteColorOptions {
    white?: string;
    neutral0: string;
    neutral10?: string;
    neutral25?: string;
    neutral50?: string;
    neutral75?: string;
    neutral100?: string;
  }
  interface Theme {
    isMobile?: boolean;
    isTablet?: boolean;
    isDesktop?: boolean;
  }

  interface ThemeOptions {
    isMobile?: boolean;
    isTablet?: boolean;
    isDesktop?: boolean;
  }
}
