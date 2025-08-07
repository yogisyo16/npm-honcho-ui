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


export default function useHonchoTypography(): HonchoTypography{
    return {
        displayLarge: {
            fontSize: 57,
            lineHeight: "64px",
            fontWeight: 500,
            letterSpacing: "0px"
        },
        displayMedium: {
            fontSize: 45,
            lineHeight: "52px",
            fontWeight: 500,
            letterSpacing: "0px"
        },
        displaySmall: {
            fontSize: 36,
            lineHeight: "44px",
            fontWeight: 500,
            letterSpacing: "0px"
        },
        headlineLarge: {
            fontSize: 32,
            lineHeight: "40px",
            fontWeight: 500,
            letterSpacing: "0px"
        },
        headlineMedium: {
            fontSize: 28,
            lineHeight: "36px",
            fontWeight: 500,
            letterSpacing: "0px"
        },
        headlineSmall: {
            fontSize: 24,
            lineHeight: "32px",
            fontWeight: 500,
            letterSpacing: "0px"
        },
        titleLarge: {
            fontSize: 18,
            lineHeight: "24px",
            fontWeight: 500,
            letterSpacing: "0px"
        },
        titleMedium: {
            fontSize: 16,
            lineHeight: "24px",
            fontWeight: 500,
            letterSpacing: "0.15px"
        },
        titleSmall: {
            fontSize: 14,
            lineHeight: "20px",
            fontWeight: 500,
            letterSpacing: "0.1px"
        },
        bodyLarge: {
            fontSize: 16,
            lineHeight: "24px",
            fontWeight: 400,
            letterSpacing: "0.5px"
        },
        bodyMedium: {
            fontSize: 14,
            lineHeight: "20px",
            fontWeight: 400,
            letterSpacing: "0.25px"
        },
        bodySmall: {
            fontSize: 12,
            lineHeight: "16px",
            fontWeight: 400,
            letterSpacing: "0.4px"
        },
        labelLarge: {
            fontSize: 16,
            lineHeight: "24px",
            fontWeight: 500,
            letterSpacing: "0.1px"
        },
        labelMedium: {
            fontSize: 14,
            lineHeight: "20px",
            fontWeight: 500,
            letterSpacing: "0.1px"
        },
        labelSmall: {
            fontSize: 12,
            lineHeight: "16px",
            fontWeight: 500,
            letterSpacing: "0.1px"
        },
    }
}