# Carbon Design Grid

An example of [CSS Gridish](../../../README.md) generating CSS Grid code, fallback flexbox code, dev documentation, and Sketch files based on the [Carbon Design System grid.](https://github.com/carbon-design-system/carbon-components/blob/master/src/globals/grid/_grid.scss#L29-L31)

This grid was bootstrapped using [CSS Gridish](https://github.com/ibm/css-gridish). It includes:
- CSS Grid Layout code with a Flexbox fallback in CSS and SCSS
- Sketch file with artboards
- Config file (`css-gridish.json`) to review webpages with the [CSS Gridish Chrome Extension](https://chrome.google.com/webstore/detail/css-gridish/ebhcneoilkamaddhlphlehojpcooobgc)

## Sketch Artboards and Chrome Extension

The Sketch file can be found above in the list of files titled `bx-grid.sketch`. It includes both grid (CTRL+G) and layout (CTRL+L) settings.

The Chrome extension uses the same shortcuts. To set the extension up:

1. Install the [CSS Gridish extension](https://chrome.google.com/webstore/detail/css-gridish/ebhcneoilkamaddhlphlehojpcooobgc)
2. Download the `css-gridish.json` file in this project
3. Open the CSS Gridish menu in your Chrome toolbar and upload your `css-gridish.json` file

## Legacy Support

If you have no need to support browsers like IE 11 and Edge <15, please use `css/bx-grid.min.css` and ignore the legacy classes below for efficiency’s sake.

If you are supporting browsers that lack [CSS Grid Layout support](https://developer.mozilla.org/en-US/docs/Web/CSS/grid#Browser_compatibility), you can use `css/bx-grid-legacy.min.css` and the legacy classes below. With the legacy file and classes, the browsers that do not support the final CSS Grid Legacy spec will fallback to a flexbox alternative. The flexbox alternative supports embedded subgrids that still reflect the overall grid system’s column structure.

### Transitioning from Legacy

Once your experience can drop support for IE 11 and Edge <15, you can simply remove all legacy classes and switch over to `css/bx-grid.min.css`.

## Breakpoints

There are currently 2 breakpoints where the design specs change for our
grid. The great thing about CSS Grid Layout is that you can rearrange your
layout at any custom breakpoint between those:

| Breakpoint | Number of Columns | Width    | Value  |
| ---------- | ----------------- | ------- | ------ |
| `sm`       | 12                 | `20rem`     | `320px`      |
| `xxl`       | 12                 | `100rem`     | `1600px`      |

### Custom Breakpoints

One of the best parts about CSS Grid Layout is that you can rearrange the layout at any width in your own media query.

We also support rearranging layout at custom breakpoints for the legacy implementation when you compile your own Sass. Just define the following list of rem widths before the import in your own Sass file:

```
$extraBreakpoints: (
  xxsm: 10,
  whateversize: 78,
  superxlarge: 1000,
  ...
);
@import '/scss/bx-grid-legacy.scss;
```

The example above will create all legacy classes for your custom breakpoints like `.bx-grid__col--10-2`. This means that when the screen width is at 10rems (160px), the element would be two columns wide. All custom breakpoints’ dimensions are copied from the previously sized breakpoint.

## Classes

If you are new to CSS Grid, please try [learning the basics](https://www.google.com/search?q=css+grid+tutorials&oq=css+grid+tutorials) before using this. For the most part, you will only have to use `grid-column` and `grid-row` with the following classes:

| Class Name                                | Purpose                                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------------------------ |
| `.bx-container`                          | Container element of whole page for proper margin and max-width (can be used on body tag ) |
| `.bx-container--[left, right]`            | Align the container element to the left or right side                                      |
| `.bx-grid`                               | Use anytime you want to apply CSS Grid Layout, including as embedded subgrids              |
| `.bx-grid--bleed`                         | To extend the background color of a grid into the margin of the body on both sides         |
| `.bx-grid--bleed--[left, right]`           | To extend the background color of a grid into the margin of the body on one side           |
| `.bx-grid--fixed-columns`                         | Switch grid’s column widths to fixed instead of fluid                                       |
| `.bx-grid--fluid-rows`                         | Switch grid’s row height to match the width of a column                                        |
| `.bx-grid__break--[left, right]`           | Direct child of container element should ignore grid’s margin. Not supported for legacy.                              |
| `.bx-padding`                            | Add one unit of padding to element on all sides                                            |
| `.bx-padding--[bottom, left, right, top]` | Add one unit of padding to element on one side                                             |
| `.bx-padding--[horizontal, vertical]`     | Add one unit of padding to element on two sides                                            |

By default, the grid code uses fluid columns and fixed rows. You can switch both aspects with `.bx-grid--fixed-columns` and `.bx-grid--fluid-rows`.

### Legacy

The following classes are only necessary if supporting browsers that do not have [CSS Grid Layout support](https://developer.mozilla.org/en-US/docs/Web/CSS/grid#Browser_compatibility). The previous classes are also necessary for modern browsers.

Please remember that the classes below have no affect on browsers that have [CSS Grid Layout support](https://developer.mozilla.org/en-US/docs/Web/CSS/grid#Browser_compatibility).

| Class Name                                | Purpose                                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------------------------ |
| `.bx-grid__col--sm--[1-12]`                          | Set the width out of 12 columns for an item in the grid starting at the sm breakpoint |
| `.bx-grid__col--[sm]--0`                          | Do not display item at a specific breakpoint, but display at the next breakpoint with columns specified |
| `.bx-grid__col--[sm]--0--only`                          | Do not display item only at specific breakpoint |
| `.bx-grid__height-fixed--[sm]--[1-30]`                          | Set the min-height based on an interval of 8px for an item starting at the breakpoint specified |
| `.bx-grid__height-fluid--sm--[1-12]`                          | Set the min-height on the width of 1-12 columns for an item starting at the sm breakpoint |
| `.bx-grid__height--[sm]--0`                          | Reset the min-height for an item starting at the specified breakpoint |

The legacy `.bx-grid__height-fixed--[sm]--[1-30]` class follows the numbering system as described in our height variables](#Fixed Height).

If you follow the instructions above for custom breakpoints, all of these legacy classes will generate with a version for each custom breakpoint too. For example, adding the custom breakpoint of `35` will create `.bx-grid__col--35--1` and `.bx-grid__height-fixed--35--1`. Since that custom breakpoint is right after the previous breakpoint, it will have the same amount of columns and min-height.

## Variables

If your project is comfortable with the browser support for
[CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/grid#Browser_compatibility),
then you can also use
[CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables#Browser_compatibility).

### Fixed Height

We provide the fixed height variables for items that are not direct children of the grid.

| Variable               | Value                      |
| ---------------------- | -------------------------- |
| `--bx-height-[1-30]`  | Intervals of `0.5rem` (8px) |

#### Example

```
// Set card to span height of 10 rows (80px)
.banner {
  height: var(--bx-height-10);
  grid-row: span var(--bx-row-10);
}
```

## FAQs

### Why does none of the CSS Grid code use `grid-gap` for gutters?

A lot of times, you will want an item to break out of the gutters for background color, to extend media, or for another reason. Until the CSS Grid spec has a way to ignore that gutter, we use the padding classes (`.bx-padding`) to opt-in to respecting the gutter. The padding classes are always half the size of a gutter for alignment.

### Why is the fallback using flexbox instead of the `-ms` prefix use of CSS Grid?

The biggest reason is due to the lack of auto-placement when using that prefix. See more details about difference in the `-ms` prefix in [this blog post.](https://rachelandrew.co.uk/archives/2016/11/26/should-i-try-to-use-the-ie-implementation-of-css-grid-layout/)

### Why are columns using vw units and sometimes the calc function?

Until Edge and Safari support
[`display: subgrid`](https://developer.mozilla.org/en-US/docs/Web/CSS/display#Browser_compatibility),
it is difficult for you to write semantic HTML with CSS Grid Layout. We are
able to take advantage of vw units and the calc function so you can embed 
`.bx-grid` elements inside of each other and still respect the overall grid design.

### Why are there no row classes for the legacy implementation?

Thanks to flexbox’s wrapping functionality, nodes that specify rows are not necessary. Only create a node for a row if it has semantic or accessibility significance. You can keep embedding `.bx-grid` as necessary to accomplish this.

### What happens in the legacy implementation if I specify the column width for one breakpoint, but not the next larger breakpoint?

To maintain a mobile-first opinion, column widths will scale to the next breakpoint if not specified. This means that a `.bx-grid__col--sm--1` be the size of `.bx-grid__col----2` if no `` class was declared.