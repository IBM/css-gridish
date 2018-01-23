function configChange() {
  var fileReader = new FileReader();
  var success = function(content) {
    chrome.storage.sync.set({ cssGridish: JSON.parse(content) }, function() {
      console.log("Storage Succesful");
    });
  };

  fileReader.onload = function(evt) {
    success(evt.target.result);
  };
  fileReader.readAsText(document.getElementById("upload").files[0]);
}

document.getElementById("upload").addEventListener("change", configChange);

chrome.storage.sync.get("cssGridish", function(object) {
  var gridConfig = object.cssGridish;
  if (object.cssGridish === {} || object.cssGridish === undefined) {
    chrome.storage.sync.set({
      cssGridish: {
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
      }
    });
  }

  document.getElementById("currentGrid").innerText =
    "Current grid: " + gridConfig.prefix + "-grid";
});

chrome.storage.onChanged.addListener(function(changes, area) {
  if (changes.cssGridish) {
    document.getElementById("currentGrid").innerText =
      "Current grid: " + changes.cssGridish.newValue.prefix + "-grid";
  }
});
