//const { assert } = require("console");

/****************************
 * catch
 ****************************/
const CACHE_NAME = "The_snooker_shop";

const ASSETS_TO_CACHE = [
  "style.css",
  "images/banner.jpg",
  "images/case.png",
  "images/Classic_Brass_Bridge_Head_Cue.png",
  "images/cue_bag.png",
  "images/cue_chalk.png",
  "images/cue_tips.png",
  "images/cue.png",
  "images/pool_table.png",
  "images/pool_ball_set.png",
  "images/triangle.png",
  "javascript.js",
];
let number = 0;
//listen for the browser to start downloading the date
self.addEventListener("install", (e) => {
  //for debugging
  console.log("run function");
  //waits until this happens before loading page
  e.waitUntil(
    //runs this for each item in the array
    ASSETS_TO_CACHE.forEach((e) => {
      caches.open(CACHE_NAME).then((cache) => {
        console.log("run");
        return cache.add(ASSETS_TO_CACHE[number++]);
      });
    })
  );
});
//deletes old caches
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((check) => {
      const old = check.filter((name) => name !== CACHE_NAME);
      old.forEach((e) => {
        caches.delete(e);
        return promise.all();
      });
    })
  );
});

/*tells brows to open the CACHE_NAMe file in the cache*/
/* caches.open(CACHE_NAME).then((cache) => {
      console.log(caches.open(CACHE_NAME));
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});
*/
