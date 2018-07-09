#!/usr/bin/env node
const gulp = require("gulp"),
  cleanCSS = require("gulp-clean-css"),
  del = require("del"),
  fs = require("fs"),
  handlebars = require("handlebars"),
  jeditor = require("gulp-json-editor"),
  jsonSass = require("json-sass"),
  map = require("through2-map"),
  rename = require("gulp-rename"),
  sass = require("gulp-sass"),
  source = require("vinyl-source-stream"),
  vinylPaths = require("vinyl-paths"),
  zip = require("gulp-zip");

const dirRoot = process.cwd();
const routeConfig = `${dirRoot}/css-gridish.json`;
const config = require(routeConfig);
const intro =
  config.paths !== undefined && config.paths.intro !== undefined
    ? fs.readFileSync(`${dirRoot}/${config.paths.intro}`, "utf8")
    : "";
const route =
  config.paths !== undefined && config.paths.route !== undefined
    ? config.paths.route
    : "css-gridish";
const dirDest = `${dirRoot}/${route}`;
const dirDestCss = `${dirDest}/\css`;
const dirDestDesign = `${__dirname}/css-gridish-design.json`;
const dirDestJs = `${dirDest}/js`;
const dirDestScss = `${dirDest}/s\css`;
const dirDestSketch = `${dirDest}/sketch`;
const prefix = config.prefix ? config.prefix : "gridish";

const artboard = require(`${__dirname}/sketch/artboard.json`);

const parseUnit = function(value, width) {
  let parsed = value;
  if (value !== 0) {
    if (value.includes("vw")) {
      parsed = value.slice(0, -2) * width * 0.01;
    } else if (value.includes("rem")) {
      parsed = value.slice(0, -3) * config.rem;
    } else if (value.includes("px")) {
      parsed = value.slice(0, -2);
    } else if (value.includes("%")) {
      parsed = value.slice(0, -1) * width * 0.01;
    }
  }
  return parsed;
};

handlebars.registerHelper("length", function(json) {
  return Object.keys(json).length;
});

handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
  lvalue = parseFloat(lvalue);
  rvalue = parseFloat(rvalue);

  return {
    "+": lvalue + rvalue,
    "-": lvalue - rvalue,
    "*": lvalue * rvalue,
    "/": lvalue / rvalue,
    "%": lvalue % rvalue
  }[operator];
});

gulp.task("clean", function() {
  return del([
    dirDestCss,
    dirDestJs,
    dirDestScss,
    `${dirDest}/${prefix}-grid.sketch`
  ]);
});

gulp.task("css", ["scssRenameMinimal"], function() {
  return gulp
    .src(`${dirDestScss}/${prefix}-grid.s\css`)
    .pipe(sass().on("error", sass.logError))
    .pipe(rename(`${prefix}-grid.\css`))
    .pipe(gulp.dest(dirDestCss))
    .pipe(
      cleanCSS({
        level: 2
      })
    )
    .pipe(rename(`${prefix}-grid.min.\css`))
    .pipe(gulp.dest(dirDestCss));
});

gulp.task("css-legacy", ["css"], function() {
  return gulp
    .src(`${dirDestScss}/${prefix}-grid-legacy.s\css`)
    .pipe(sass().on("error", sass.logError))
    .pipe(rename(`${prefix}-grid-legacy.\css`))
    .pipe(gulp.dest(dirDestCss))
    .pipe(
      cleanCSS({
        level: 2
      })
    )
    .pipe(rename(`${prefix}-grid-legacy.min.\css`))
    .pipe(gulp.dest(dirDestCss));
});

gulp.task("css-minimal", ["css-legacy"], function() {
  return gulp
    .src(`${dirDestScss}/${prefix}-grid-minimal.s\css`)
    .pipe(sass().on("error", sass.logError))
    .pipe(rename(`${prefix}-grid-minimal.\css`))
    .pipe(gulp.dest(dirDestCss))
    .pipe(
      cleanCSS({
        level: 2
      })
    )
    .pipe(rename(`${prefix}-grid-minimal.min.\css`))
    .pipe(gulp.dest(dirDestCss));
});

gulp.task("docs", ["js"], function() {
  return gulp
    .src(`${__dirname}/docs/*.hbs`)
    .pipe(
      map.obj(chunk => {
        var template = handlebars.compile(chunk.contents.toString());
        chunk.contents = new Buffer(
          template({
            config: {
              ...config,
              classBreakpoints: Object.keys(config.breakpoints).slice(0, -1),
              intro
            }
          })
        );
        return chunk;
      })
    )
    .pipe(
      rename(path => {
        // a template file of the form AAAA.BBB.hbs produces output file AAAA.BBB
        var dot = path.basename.lastIndexOf(".");
        path.extname = path.basename.substring(dot);
        path.basename = path.basename.substring(0, dot);
      })
    )
    .pipe(gulp.dest(dirDest));
});

gulp.task("js", ["css-minimal"], function() {
  return gulp
    .src(`${__dirname}/js/gridish-grid.js`)
    .pipe(rename(`${prefix}-grid.js`))
    .pipe(gulp.dest(dirDestJs));
});

gulp.task("scss", ["valuesClean"], function() {
  return gulp.src(`${__dirname}/scss/**/*.s\css`).pipe(gulp.dest(dirDestScss));
});

gulp.task("scssRename", ["scss"], function() {
  return gulp
    .src(`${dirDestScss}/gridish-grid.s\css`)
    .pipe(vinylPaths(del))
    .pipe(rename(`${prefix}-grid.s\css`))
    .pipe(gulp.dest(dirDestScss));
});

gulp.task("scssRenameLegacy", ["scssRename"], function() {
  return gulp
    .src(`${dirDestScss}/gridish-grid-legacy.s\css`)
    .pipe(vinylPaths(del))
    .pipe(rename(`${prefix}-grid-legacy.s\css`))
    .pipe(gulp.dest(dirDestScss));
});

gulp.task("scssRenameMinimal", ["scssRenameLegacy"], function() {
  return gulp
    .src(`${dirDestScss}/gridish-grid-minimal.s\css`)
    .pipe(vinylPaths(del))
    .pipe(rename(`${prefix}-grid-minimal.s\css`))
    .pipe(gulp.dest(dirDestScss));
});

gulp.task("sketchClean", ["sketchZip"], function() {
  return del([dirDestSketch]);
});

gulp.task("sketchFiles", ["docs"], function() {
  return gulp
    .src([
      `${__dirname}/sketch/files/**/*`,
      `!${__dirname}/sketch/files/pages/BC333699-815E-4E1B-9816-9836EDA5B291.json`
    ])
    .pipe(gulp.dest(dirDestSketch));
});

gulp.task("sketchPage", ["sketchFiles"], function() {
  // Add breakpoint values to extra artboards
  const originalBreakpoints = config.breakpoints;
  let allBreakpoints = originalBreakpoints;
  for (let i = 0; i < Object.values(config.extraArtboards).length; i++) {
    const name = Object.keys(config.extraArtboards)[i];
    const value = Object.values(config.extraArtboards)[i];
    let found = false;
    for (let j = 0; j < Object.values(originalBreakpoints).length; j++) {
      // should catch at max
      if (
        Object.values(originalBreakpoints)[j + 1] !== undefined &&
        Object.values(originalBreakpoints)[j + 1].breakpoint > value &&
        !found
      ) {
        allBreakpoints[name] = {
          ...Object.values(originalBreakpoints)[j],
          breakpoint: value
        };
        found = true;
      } else if (Object.values(originalBreakpoints)[i + 1] === undefined) {
        allBreakpoints[name] = {
          ...Object.values(originalBreakpoints)[i],
          breakpoint: value
        };
      }
    }
  }

  // Sort all breakpoints by size
  let sorted = Object.values(allBreakpoints);
  for (let i = 0; i < sorted.length; i++) {
    sorted[i] = {
      ...sorted[i],
      name: Object.keys(allBreakpoints)[i]
    };
  }
  sorted = sorted.sort(function(a, b) {
    return a.breakpoint - b.breakpoint;
  });

  // Make artboards for each breakpoint
  let layers = [];
  let x = 0;
  for (let i = 0; i < sorted.length; i++) {
    x = i > 0 ? x + (sorted[i - 1].breakpoint + 1) * config.rem : 0;
    const values = sorted[i];
    const width = values.breakpoint * config.rem;
    const margin = parseUnit(values.margin, width);
    const gutter = parseUnit(values.gutter, width);
    const gridWidth = width - margin * 2;
    const gutterWidth = gutter;

    layers.push({
      ...artboard,
      name: `${values.name}-${width}px-${values.columns}`,
      do_objectID: artboard.do_objectID.slice(0, -1) + i,
      frame: {
        ...artboard.frame,
        width,
        x
      },
      grid: {
        ...artboard.grid,
        gridSize: config.rowHeight * config.rem
      },
      layout: {
        ...artboard.layout,
        columnWidth:
          (gridWidth - gutterWidth * values.columns) / values.columns,
        gutterWidth,
        horizontalOffset: margin,
        numberOfColumns: values.columns,
        totalWidth: gridWidth
      }
    });
  }
  return gulp
    .src(
      `${__dirname}/sketch/files/pages/BC333699-815E-4E1B-9816-9836EDA5B291.json`
    )
    .pipe(
      jeditor({
        layers
      })
    )
    .pipe(gulp.dest(`${dirDestSketch}/pages`));
});

gulp.task("sketchZip", ["sketchPage"], function() {
  return gulp
    .src(`${dirDestSketch}/**/*`)
    .pipe(zip(`${prefix}-grid.zip`))
    .pipe(rename(`${prefix}-grid.sketch`))
    .pipe(vinylPaths(del))
    .pipe(gulp.dest(dirDest));
});

gulp.task("values", ["valuesPrep"], function() {
  return fs
    .createReadStream(dirDestDesign)
    .pipe(
      jsonSass({
        prefix: "$grid-values: "
      })
    )
    .pipe(source(routeConfig))
    .pipe(rename("_values.scss"))
    .pipe(gulp.dest(dirDestScss));
});

gulp.task("valuesClean", ["values"], function() {
  return fs.unlinkSync(dirDestDesign);
});

gulp.task("valuesPrep", ["clean"], function() {
  return fs.writeFileSync(
    dirDestDesign,
    JSON.stringify({
      ...config,
      paths: null
    })
  );
});

gulp.task("default", ["sketchClean"], function() {
  console.log(
    `CSS Gridish finished building your ${prefix} grid in ${dirDest}! 🏁`
  );
});

gulp.start("default");
