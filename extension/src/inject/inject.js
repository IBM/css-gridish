var checker = document.createElement("div");
checker.className = "css-gridish-checker";

var checkerStyle = document.createElement("style");
checker.appendChild(checkerStyle);

var grid = document.createElement("div");
grid.className = "css-gridish-checker__grid";

var layout = document.createElement("div");
layout.className = "css-gridish-checker__layout";

function createCol(breakpoint) {
  var col = document.createElement("div");
  col.className =
    "css-gridish-checker__layout__col css-gridish-checker__layout__col--" +
    breakpoint;
  return col;
}

function createGrid(gridConfig) {
  checkerStyle.innerHTML = "";
  grid.innerHTML = "";
  layout.innerHTML = "";

  var largestBreakpoint = Object.values(gridConfig.breakpoints)
    .map(breakpoint => breakpoint.breakpoint)
    .sort((a, b) => a - b)
    .slice(-1)[0];
  checker.setAttribute(
    "style",
    "font-size: " +
      gridConfig.rem +
      "px; max-width: " +
      largestBreakpoint +
      "em;"
  );

  // rowHeight
  var rowHeight = gridConfig.rowHeight;
  grid.setAttribute(
    "style",
    "background-size: " + rowHeight + "rem " + rowHeight + "rem;"
  );

  // breakpoints
  var breakpoints = Object.values(gridConfig.breakpoints)
    .map((item, index) => {
      var result = item;
      result.name = Object.keys(gridConfig.breakpoints)[index];
      return result;
    })
    .sort((a, b) => a.breakpoint - b.breakpoint);
  for (var i = 0; i < breakpoints.length; i++) {
    var mediaQuery = 0;
    var previous = 0;
    if (i > 0) {
      previous = breakpoints[i - 1].columns;
      mediaQuery = breakpoints[i].breakpoint;
    }
    var newColumns = breakpoints[i].columns - previous;
    for (var j = 0; j < newColumns; j++) {
      layout.appendChild(createCol(breakpoints[i].name));
    }

    checkerStyle.innerHTML =
      checkerStyle.innerHTML +
      `
			@media (min-width: ${mediaQuery}rem) {
				.css-gridish-checker__layout {
						padding: 0 ${breakpoints[i].margin};
				}

				.css-gridish-checker__layout__col {
					margin: 0 ${parseInt(breakpoints[i].gutter, 10) / 2}${
        breakpoints[i].gutter.match(/[a-zA-Z]+/g)[0]
      };
				}

				.css-gridish-checker__layout__col--${breakpoints[i].name} {
					display: initial;
				}
			}
		`;
  }
}

function toggleCSSGridishChecker(e) {
  if (e.ctrlKey && e.keyCode == 71) {
    if (!checker.contains(grid)) {
      checker.appendChild(grid);
    } else {
      grid.remove();
    }
  }
  if (e.ctrlKey && e.keyCode == 76) {
    if (!checker.contains(layout)) {
      checker.appendChild(layout);
    } else {
      layout.remove();
    }
  }

  if (e.ctrlKey && (e.keyCode == 71 || e.keyCode == 76)) {
    if (checker.contains(grid) || checker.contains(layout)) {
      document.body.appendChild(checker);
    } else {
      document.body.removeChild(checker);
    }
  }
}

document.addEventListener("keydown", toggleCSSGridishChecker, false);

chrome.storage.sync.get("cssGridish", function(object) {
  var gridConfig = object.cssGridish;
  if (object.cssGridish === {} || object.cssGridish === undefined) {
    gridConfig = {
      prefix: "bx",
      breakpoints: {
        sm: {
          breakpoint: 20,
          columns: 12,
          gutter: "1.250rem",
          margin: "5vw"
        },
        xxl: {
          breakpoint: 100,
          columns: 12,
          gutter: "1.250rem",
          margin: "5vw"
        }
      },
      extraArtboards: {
        md: 48,
        lg: 62,
        xl: 75
      },
      rem: 16,
      rowHeight: 0.5,
      rows: 30,
      paths: {
        intro: "intro.md"
      }
    };
  }

  createGrid(gridConfig);
});

chrome.storage.onChanged.addListener(function(changes, area) {
  if (changes.cssGridish) {
    createGrid(changes.cssGridish.newValue);
  }
});
