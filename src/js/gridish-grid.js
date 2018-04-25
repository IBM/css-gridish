var updateScrollbarWidth = function() {
  const scrollbarWidth =
    window.innerWidth - document.documentElement.clientWidth + "px";

  document.documentElement.style.setProperty(
    "--scrollbar-width",
    scrollbarWidth
  );
};

var scrollbarObserver = new MutationObserver(updateScrollbarWidth);
scrollbarObserver.observe(document.body, {
  attributes: true,
  childList: true,
  characterData: true
});

updateScrollbarWidth();
