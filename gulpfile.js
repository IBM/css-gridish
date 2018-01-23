"use strict";

const gulp = require("gulp"),
  browserSync = require("browser-sync").create();

gulp.task("watch", function() {
  browserSync.init({
    server: {
      baseDir: "."
    }
  });

  gulp.watch(["index.html", "examples/**/*"]).on("change", browserSync.reload);
});
