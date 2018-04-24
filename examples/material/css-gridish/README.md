# Material Design Grid

An example of [CSS Gridish](../../../README.md) generating CSS Grid code, fallback flexbox code, dev documentation, and Sketch files based on the [Material breakpoint system.](https://material.io/guidelines/layout/responsive-ui.html)

This grid was bootstrapped using [CSS Gridish](https://github.com/ibm/css-gridish). It includes:
- CSS Grid Layout code with a Flexbox fallback in CSS and SCSS
- Sketch file with artboards
- Config file (`css-gridish.json`) to review webpages with the [CSS Gridish Chrome Extension](https://chrome.google.com/webstore/detail/css-gridish/ebhcneoilkamaddhlphlehojpcooobgc)

## Sketch Artboards and Chrome Extension

The Sketch file can be found above in the list of files titled `material-grid.sketch`. It includes both grid (CTRL+G) and layout (CTRL+L) settings.

The Chrome extension uses the same shortcuts. To set the extension up:

1. Install the [CSS Gridish extension](https://chrome.google.com/webstore/detail/css-gridish/ebhcneoilkamaddhlphlehojpcooobgc)
2. Download the `css-gridish.json` file in this project
3. Open the CSS Gridish menu in your Chrome toolbar and upload your `css-gridish.json` file

## Legacy Support

If you have no need to support browsers like IE 11 and Edge <15, please use `css/material-grid.min.css`. This will omit the CSS Flexbox fallback from your code.

If you are supporting browsers that lack [CSS Grid Layout support](https://developer.mozilla.org/en-US/docs/Web/CSS/grid#Browser_compatibility), you can use `css/material-grid-legacy.min.css` and the legacy classes below. With the legacy file, the browsers that do not support the final CSS Grid Legacy spec will fallback to a flexbox alternative. The flexbox alternative supports embedded subgrids that still reflect the overall grid system’s column structure.

### Transitioning from Legacy

Once your experience can drop support for IE 11 and Edge <15, you can simply remove all legacy classes and switch over to `css/material-grid.min.css`.

## Breakpoints

There are currently 4 breakpoints where the design specs change for our
grid. The great thing about CSS Grid Layout is that you can rearrange your
layout at any custom breakpoint between those:

| Breakpoint | Number of Columns | Width    | Value  |
| ---------- | ----------------- | ------- | ------ |
| `xsmall`       | 4                 | `22.5rem`     | `360px`      |
| `small`       | 8                 | `37.5rem`     | `600px`      |
| `medium`       | 12                 | `64rem`     | `1024px`      |
| `xlarge`       | 12                 | `120rem`     | `1920px`      |

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
@import '/scss/material-grid-legacy.scss;
```

The example above will create all legacy classes for your custom breakpoints like `.material-grid__col--10-2`. This means that when the screen width is at 10rems (160px), the element would be two columns wide. All custom breakpoints’ dimensions are copied from the previously sized breakpoint.

## Classes

If you are new to CSS Grid, please try [learning the basics](https://www.google.com/search?q=css+grid+tutorials&oq=css+grid+tutorials) before using this. For the most part, you will only have to use `grid-column` and `grid-row` with the following classes:

| Class Name                                | Purpose                                                                                    |
| ----------------------------------------- | ------------------------------------------------------------------------------------------ |
| `.material-container`                          | Container element of whole page for proper margin and max-width (can be used on body tag ) |
| `.material-container--[left, right]`            | Align the container element to the left or right side                                      |
| `.material-container__bleed--[xsmall, small, medium]`                         | Extend the background color of a container child into the container margin on both sides starting at a specific breakpoint (CSS Grid browsers only)        |
| `.material-container__bleed--[xsmall, small, medium]--[left, right]`           | Extend the background color of a grid into the container margin on one side at a specific breakpoint (CSS Grid browsers only)           |
| `.material-container__break--[xsmall, small, medium]`                         | Child of container element should ignore grid’s margin at a specific breakpoint (CSS Grid browsers only)       |
| `.material-container__break--[xsmall, small, medium]--[left, right]`           | Child of container element should ignore grid’s margin on one side at a specific breakpoint (CSS Grid browsers only)                             |
| `.material-grid`                               | Use anytime you want to apply CSS Grid Layout, including as embedded subgrids              |
| `.material-grid--fixed-columns`                         | Switch grid’s column widths to fixed instead of fluid                                       |
| `.material-grid--fluid-rows`                         | Switch grid’s row height to match the width of a column                                        |
| `.material-padding`                            | Add one unit of padding to element on all sides                                            |
| `.material-padding--[bottom, left, right, top]` | Add one unit of padding to element on one side                                             |
| `.material-padding--[horizontal, vertical]`     | Add one unit of padding to element on two sides                                            |
| `.material-grid__col--xsmall--[1-4]`                          | Set the width out of 4 columns for an item in the grid starting at the xsmall breakpoint |
| `.material-grid__col--small--[1-8]`                          | Set the width out of 8 columns for an item in the grid starting at the small breakpoint |
| `.material-grid__col--medium--[1-12]`                          | Set the width out of 12 columns for an item in the grid starting at the medium breakpoint |
| `.material-grid__col--[xsmall, small, medium]--0`                          | Do not display item at a specific breakpoint, but display at the next breakpoint with columns specified |
| `.material-grid__col--[xsmall, small, medium]--0--only`                          | Do not display item only at specific breakpoint |
| `.material-grid__height--[xsmall, small, medium]--[1-30]`                          | Set the min-height based on an interval of 8px for an item starting at the breakpoint specified |
| `.material-grid__height--[xsmall, small, medium]--0`                          | Reset the min-height for an item starting at the specified breakpoint |

By default, the grid code uses fluid columns and fixed rows. You can switch both aspects with `.material-grid--fixed-columns` and `.material-grid--fluid-rows`. When switching to fluid rows, the rows will scale across breakpoints just like `col` classes and only supports quantities up to the amount of columns in that breakpoint.

If you follow the instructions above for custom breakpoints, all of the `col` and `height` classes will generate with a version for each custom breakpoint too. For example, adding the custom breakpoint of `whateversize` will create `.material-grid__col--whateversize--1`. Since that custom breakpoint is right after the previous breakpoint, it will have the same amount of columns and min-height.

## Variables

If your project is comfortable with the browser support for
[CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/grid#Browser_compatibility),
then you can also use
[CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables#Browser_compatibility).

### Fixed Height

We provide the fixed height variables for items that are not direct children of the grid.

| Variable               | Value                      |
| ---------------------- | -------------------------- |
| `--material-height-[1-30]`  | Intervals of `0.5rem` (8px) |

#### Example

```
// Set card to span height of 10 rows (80px)
.banner {
  height: var(--material-height-10);
  grid-row: span var(--material-row-10);
}
```

## Mixins and Functions

### Media Query Mixin

You can use the media query mixin to use breakpoints you’ve defined.

**Example SCSS**
```scss
button {
  @include media-query('sm') {
    border: 2px solid hotpink;
  }
}
```

**Output CSS**
```css
@media screen and (min-width: 20rem) {
  button {
    border: 2px solid hotpink;
  }
}
```

You can then **combine this mixin with the functions below** to construct media queries that set fluid and fixed sizes based on this grid.

### Get a Fluid Size

Use the `get-fluid-size()` SCSS function to calculate a fluid width based on: (1) a defined breakpoints, and (2) a number of columns to span, relative to the number of available columns for the given breakpoint.

**Example SCSS**
```scss
button {
  @include media-query('sm') {
    max-width: get-fluid-size('sm', 1);
  }
}
```

**Output CSS**
```css
@media screen and (min-width: 20rem) {
  button {
    max-width: 25vw;
  }
}
```

### Get a Fixed Size
Use the `get-fixed-size()` SCSS function to calculate a fixed size based on a number of fixed nondimensional units multiplied by the base value from the current row height of the grid (`$rowHeight`);

**Example SCSS**
```scss
button {
  @include media-query('sm') {
    max-width: get-fixed-size(10);
  }
}
```

**Output CSS**
```css
@media screen and (min-width: 20rem) {
  button {
    max-width: 5rem;
  }
}
```

## FAQs

### Why does none of the CSS Grid code use `grid-gap` for gutters?

A lot of times, you will want an item to break out of the gutters for background color, to extend media, or for another reason. Until the CSS Grid spec has a way to ignore that gutter, we use the padding classes (`.material-padding`) to opt-in to respecting the gutter. The padding classes are always half the size of a gutter for alignment.

### Why is the fallback using flexbox instead of the `-ms` prefix use of CSS Grid?

The biggest reason is due to the lack of auto-placement when using that prefix. See more details about difference in the `-ms` prefix in [this blog post.](https://rachelandrew.co.uk/archives/2016/11/26/should-i-try-to-use-the-ie-implementation-of-css-grid-layout/)

### Why are columns using vw units and sometimes the calc function?

Until Edge and Safari support
[`display: subgrid`](https://developer.mozilla.org/en-US/docs/Web/CSS/display#Browser_compatibility),
it is difficult for you to write semantic HTML with CSS Grid Layout. We are
able to take advantage of vw units and the calc function so you can embed 
`.material-grid` elements inside of each other and still respect the overall grid design.

### Why are there no grouping row classes needed?

Thanks to flexbox’s wrapping functionality, nodes that specify rows are not necessary. Only create a node for a row if it has semantic or accessibility significance. You can keep embedding `.material-grid` as necessary to accomplish this.

### What happens in the legacy implementation if I specify the column width for one breakpoint, but not the next larger breakpoint?

To maintain a mobile-first opinion, column widths will scale to the next breakpoint if not specified. This means that a `.material-grid__col--xsmall--1` be the size of `.material-grid__col--small--2` if no `small` class was declared.