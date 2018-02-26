"use strict";

const browserSync = require("browser-sync").create(),
  gulp = require("gulp"),
  run = require("gulp-run");

gulp.task("build", function() {
  return run("npm run build").exec();
});

gulp.task("refresh", ["build"], function(done) {
  browserSync.reload();
  done();
});

gulp.task("watch", function() {
  browserSync.init({
    server: {
      baseDir: "."
    }
  });

  gulp.watch(["**/*.html"]).on("change", browserSync.reload);
  gulp.watch("src/**/*", ["refresh"]);
});
