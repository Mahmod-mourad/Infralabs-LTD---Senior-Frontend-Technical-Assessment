# Fonts Directory

This directory contains custom fonts for the vessel tracking application.

## Required Font

### Neutraface2TextGreek.ttf
- **Font Family**: Neutraface2TextGreek
- **Format**: TrueType (.ttf)
- **Usage**: Primary font for the entire application

## Installation

1. Place the `Neutraface2TextGreek.ttf` file in this directory
2. The font will be automatically loaded by the application

## CSS Implementation

The font is defined in `src/styles/fonts.css` and applied globally to:
- Body text
- Headings (h1-h6)
- Buttons
- Form inputs
- All Material-UI components

## Fallback Fonts

If Neutraface2TextGreek is not available, the application will fall back to:
- -apple-system
- BlinkMacSystemFont
- Segoe UI
- Roboto
- Oxygen
- Ubuntu
- Cantarell
- Fira Sans
- Droid Sans
- Helvetica Neue
- sans-serif 