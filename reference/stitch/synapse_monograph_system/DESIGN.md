---
name: SYNAPSE Monograph System
colors:
  surface: '#fef9ef'
  surface-dim: '#dedad0'
  surface-bright: '#fef9ef'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f3e9'
  surface-container: '#f2ede3'
  surface-container-high: '#ede8de'
  surface-container-highest: '#e7e2d8'
  on-surface: '#1d1c16'
  on-surface-variant: '#4a463f'
  inverse-surface: '#32302a'
  inverse-on-surface: '#f5f0e6'
  outline: '#7b766e'
  outline-variant: '#ccc6bc'
  surface-tint: '#625e58'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1d1b17'
  on-primary-container: '#88837d'
  inverse-primary: '#cbc6bf'
  secondary: '#b22c01'
  on-secondary: '#ffffff'
  secondary-container: '#ff6338'
  on-secondary-container: '#5d1200'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1e1b12'
  on-tertiary-container: '#898377'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e8e1da'
  primary-fixed-dim: '#cbc6bf'
  on-primary-fixed: '#1d1b17'
  on-primary-fixed-variant: '#494641'
  secondary-fixed: '#ffdbd1'
  secondary-fixed-dim: '#ffb5a1'
  on-secondary-fixed: '#3b0800'
  on-secondary-fixed-variant: '#881f00'
  tertiary-fixed: '#e9e2d3'
  tertiary-fixed-dim: '#cdc6b7'
  on-tertiary-fixed: '#1e1b12'
  on-tertiary-fixed-variant: '#4b463c'
  background: '#fef9ef'
  on-background: '#1d1c16'
  surface-variant: '#e7e2d8'
typography:
  display-xl:
    fontFamily: EB Garamond
    fontSize: 5.5rem
    fontWeight: '400'
    lineHeight: '1.02'
    letterSpacing: -0.03em
  display-xl-mobile:
    fontFamily: EB Garamond
    fontSize: 3.25rem
    fontWeight: '400'
    lineHeight: '1.08'
    letterSpacing: -0.02em
  display-lg:
    fontFamily: EB Garamond
    fontSize: 4rem
    fontWeight: '400'
    lineHeight: '1.05'
    letterSpacing: -0.025em
  display-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 2.5rem
    fontWeight: '400'
    lineHeight: '1.12'
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 2.75rem
    fontWeight: '400'
    lineHeight: '1.15'
    letterSpacing: -0.015em
  headline-md:
    fontFamily: EB Garamond
    fontSize: 2rem
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: EB Garamond
    fontSize: 1.5rem
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Geist
    fontSize: 1.125rem
    fontWeight: '400'
    lineHeight: '1.65'
    letterSpacing: -0.01em
  body-md:
    fontFamily: Geist
    fontSize: 1rem
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Geist
    fontSize: 0.875rem
    fontWeight: '400'
    lineHeight: '1.55'
  label-md:
    fontFamily: Geist
    fontSize: 0.75rem
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.12em
  label-sm:
    fontFamily: Geist
    fontSize: 0.6875rem
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: 0.14em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-desktop: 2.5rem
  margin: 1.25rem
  margin-desktop: 3rem
  space-xs: 0.5rem
  space-sm: 1rem
  space-md: 1.5rem
  space-lg: 2.5rem
  space-xl: 4rem
  space-2xl: 8rem
---

## Brand & Style

The design system embodies the quiet gravitas of a modern sanctuary for intellectual mastery: an intersection of an architectural monograph, a Himalayan study-hall, and an elite research laboratory. It deliberately rejects the noisy tropes of commercial EdTech, aggressive gamification, and transient SaaS marketing patterns. The emotional register is contemplative, disciplined, and enduring.

The visual language draws inspiration from classical editorial craft and brutalist architectural drafting. High-contrast typography, vast meditative negative space, and hairline structural boundaries instill a feeling of profound permanence. Visual tension is achieved not through heavy drop shadows or dynamic gloss, but through precise proportional scale, disciplined typography, and sparing punctures of vermilion energy.

The audience consists of engineers, philosophers, scholars, and creators seeking depth over speed. Every interaction communicates absolute intentionality, structural rigor, and scholarly stillness.

## Colors

The palette is restricted to a disciplined triad anchored by tactile materiality:

- **Ink (`#15130F`)**: Primary deep tone. Represents structural permanence, foundational typography, and deep nocturnal reading sections.
- **Paper (`#F3EEE4`)**: The dominant surface canvas. An archival, tactile off-white that prevents visual fatigue and evokes heavyweight unbleached paper.
- **Spark (`#D9481F`)**: Sparing vermilion accent. Used exclusively for essential focal paths, live interactive states, critical callouts, and scholarly markers.
- **Subordinate Neutrals**:
  - `Muted Slate / Text Secondary`: `#6F6A5E` for metadata, secondary passages, and captions.
  - `Hairline Rule (Paper)`: `#D8D0BF` for 1px structural division across light surfaces.
  - `Hairline Rule (Ink)`: `#3A362E` for 1px structural framing on dark contextual blocks.

Surfaces do not blend or use diffuse gradients; colors meet along sharp hairline boundaries with absolute clarity.

## Typography

Typography governs the spatial hierarchy and scholarly tone. The system pairs the classical editorial beauty of **EB Garamond** with the clean technical neutrality of **Geist**.

- **Editorial Headlines (EB Garamond)**: Set with exceptionally tight line heights (`1.0` to `1.15`). Display scales use optical tension, with italics deployed deliberately for emphasis, scholarly quotes, or philosophical axioms.
- **Reading Body (Geist)**: Optimized for sustained immersion, set at `17px`–`18px` (`1.0625rem`–`1.125rem`) with an open line height of `1.6` to `1.65`.
- **System Labels & Data Indicators (Geist)**: Rendered in uppercase with generous tracking (`0.12em`–`0.14em`) to invoke architectural schematics and technical index notations.
- **Devanagari Accents**: When paired with classical Devanagari inscriptions, respect natural proportional baselines without artificial vertical alignment shifts.

## Layout & Spacing

The structural layout adheres to an asymmetric 12-column architectural grid with a maximum content boundary of `1280px`. Vertical rhythm prioritizes meditative isolation over dense stacking:

- **Structural Canvas**:
  - Desktop: 12-column layout with `40px` (`2.5rem`) gutters and `48px` (`3rem`) canvas margins.
  - Tablet: 8-column layout with `24px` (`1.5rem`) gutters and `32px` (`2rem`) canvas margins.
  - Mobile: 4-column layout with `16px` (`1rem`) gutters and `20px` (`1.25rem`) canvas margins.
- **Vertical Spacing Cadence**:
  - Section transitions demand spaciousness, utilizing `120px` to `180px` (`space-2xl` variations) to allow ideas to register in complete isolation.
  - Component internals follow an 8pt step system (`8px`, `16px`, `24px`, `40px`, `64px`).
- **Asymmetric Editorial Weight**:
  - Avoid centered default compositions. Major passages align to 7-column or 5-column spans against open negative space or complementary offset annotations.

## Elevation & Depth

This system rejects physical drop shadows, blur-based surface skeuomorphism, and floating cards. Elevation is conveyed strictly through architectural layering and hairline framing:

- **Flat Monograph Planes**: Surfaces sit upon the canvas without simulated Z-axis elevation. Contrast between layers is achieved purely by shifting between Paper (`#F3EEE4`) and Ink (`#15130F`) surfaces.
- **Hairline Demarcation**: Structural boundaries rely on 1px solid hairline dividers (`#D8D0BF` on light surfaces, `#3A362E` on dark surfaces). No container utilizes soft drop shadows or ambient glow effects.
- **Focused States**: Interactive prominence is indicated through hairline color changes (shifting from hairline neutral to `#D9481F`) or subtle fill inversions, maintaining an uninterrupted planar field.

## Shapes

The design system employs a soft, precise shape language grounded in architectural precision:

- **Base Corner Geometry**: Containers, cards, structural panels, and inputs apply a subtle corner radius of `4px` (`0.25rem`), providing a clean corner that avoids clinical sharpness while resisting casual playfulness.
- **Specialized Pill Geometry**: Interactive buttons and key index tags diverge cleanly from the grid as full pills (`9999px`), creating immediate functional affordance against the strict rectangular hairline grid.
- **Dividers**: Always exact 1px lines running edge-to-edge within grid columns, reinforcing the feel of physical architectural drawings.

## Components

### Buttons
- **Primary Action**: Pill-shaped (`9999px` radius), strictly `48px` in height. Background is deep Ink (`#15130F`) with Paper (`#F3EEE4`) text in uppercase label typography. On hover, background shifts to Spark vermilion (`#D9481F`).
- **Secondary / Outline**: Pill-shaped, `48px` height, transparent background with 1px hairline border in `#15130F`. Text in Ink (`#15130F`). Hover yields a subtle background wash of `#D8D0BF` at 30% opacity.
- **Text Link / Scholarly Prompt**: Unstyled wrapper; underlined with a 1px hairline rule offset by `4px`. Transition color to `#D9481F` on interaction.

### Cards & Study Cells
- **Geometry**: Base radius of `4px` (`roundedness: 1`), background matching `#F3EEE4` (or deep `#15130F` in nocturnal blocks).
- **Framing**: Framed exclusively with a 1px solid rule (`#D8D0BF` or `#3A362E`). Zero drop shadows.
- **Padding**: Generous internal spacing of `32px` to `40px` (`space-lg`). Content is structured vertically with expansive breathing room between category tag, heading, and body notes.

### Input Fields & Controls
- **Text Inputs**: Flat single-line base or boxed cell with a 1px border in `#D8D0BF` and `4px` radius. Internal padding is `12px 16px`. Text rendered in Geist body size. Focus state transitions border strictly to Spark vermilion (`#D9481F`) with no ring shadow.
- **Checkboxes & Radios**: Minimalist `16px` squares (`2px` radius) or circles. 1px hairline outline in `#6F6A5E`. When active, fill is deep Ink (`#15130F`) or vermilion Spark (`#D9481F`) with a solid white central dot or mark.

### Metadata Chips & Badges
- **Specification**: Pill-shaped (`9999px`) or rectangular with `2px` radius, height `24px`. Background transparent with 1px border `#D8D0BF`. Typography set to uppercase `label-sm` with wide letter-spacing.

### Lists & Archival Indexes
- **Structure**: Continuous stacked list rows separated by full-width 1px `#D8D0BF` hairlines.
- **Interaction**: Row hover triggers a subtle background shift to `#EBE5D8` alongside vermilion coloring on leading index numerals.