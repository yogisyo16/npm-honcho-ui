import "@mui/material/styles/createTypography";

declare module "@mui/material/styles/createTypography" {
  // allow configuration using `createTheme`
  interface TypographyOptions {
    displayLarge?: TypographyStyleOptions | undefined;
    displayMedium?: TypographyStyleOptions | undefined;
    displaySmall?: TypographyStyleOptions | undefined;
    headlineLarge?: TypographyStyleOptions | undefined;
    headlineMedium?: TypographyStyleOptions | undefined;
    headlineSmall?: TypographyStyleOptions | undefined;
    titleLarge?: TypographyStyleOptions | undefined;
    titleMedium?: TypographyStyleOptions | undefined;
    titleSmall?: TypographyStyleOptions | undefined;
    bodyLarge?: TypographyStyleOptions | undefined;
    bodyMedium?: TypographyStyleOptions | undefined;
    bodySmall?: TypographyStyleOptions | undefined;
    buttonLarge?: TypographyStyleOptions | undefined;
    buttonMedium?: TypographyStyleOptions | undefined;
    buttonSmall?: TypographyStyleOptions | undefined;
    labelSmall?: TypographyStyleOptions | undefined;
    labelMedium?: TypographyStyleOptions | undefined;
    labelLarge?: TypographyStyleOptions | undefined;
    customLink?: TypographyStyleOptions | undefined;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    displayLarge: true;
    displayMedium: true;
    displaySmall: true;
    headlineLarge: true;
    headlineMedium: true;
    headlineSmall: true;
    titleLarge: true;
    titleMedium: true;
    titleSmall: true;
    bodyLarge: true;
    bodyMedium: true;
    bodySmall: true;
    buttonLarge: true;
    buttonMedium: true;
    buttonSmall: true;
    labelSmall: true;
    labelMedium: true;
    labelLarge: true;
    customLink: true;
  }
}
