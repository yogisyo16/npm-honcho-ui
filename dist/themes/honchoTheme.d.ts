interface HonchoTypography {
    displayLarge: FontStyle;
    displayMedium: FontStyle;
    displaySmall: FontStyle;
    headlineLarge: FontStyle;
    headlineMedium: FontStyle;
    headlineSmall: FontStyle;
    titleLarge: FontStyle;
    titleMedium: FontStyle;
    titleSmall: FontStyle;
    bodyLarge: FontStyle;
    bodyMedium: FontStyle;
    bodySmall: FontStyle;
    labelLarge: FontStyle;
    labelMedium: FontStyle;
    labelSmall: FontStyle;
}
interface FontStyle {
    fontSize: number;
    lineHeight: string;
    fontWeight: number;
    letterSpacing: string;
}
export default function useHonchoTypography(): HonchoTypography;
export {};
