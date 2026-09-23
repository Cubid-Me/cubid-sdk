---
"@cubid/react": minor
---

`EmailOtpForm` and `PhoneOtpForm` (and `CubidWeb2Provider`, for a whole tree) take an optional, typed look: `theme` tokens (accent, text, border, radius, font, spacing) the kit draws itself from, `classNames` and inline `styles` per slot (container, field, label, input, actions, button, buttonSecondary, status), and `labels` for every string. Without a theme the forms stay unstyled, as before. `CubidThemeProvider` sets the look without a client.
