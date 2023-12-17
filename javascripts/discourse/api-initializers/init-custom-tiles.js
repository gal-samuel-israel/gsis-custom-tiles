import { apiInitializer } from "discourse/lib/api";
import customTilesComponent from "../components/custom-tiles";

export default apiInitializer("0.8", (api) => {
  const settingsOutlet = settings.plugin_outlet;
  const selectedOutlet = settingsOutlet === "above-main-container" ? "above-main-container" : "below-site-header";
  api.renderInOutlet(selectedOutlet, customTilesComponent);
/* 
api.registerConnectorClass was DEPRECTAED
231217 - Solution Found with help of Discourse Support.
the  custom.tiles.hbs file moved into the components directory with its custom.tiles.js related file.
api.createWidget directive was also disabled - seems that it is not required any more
the outlet selection was updated into a simple 1 of 2 options
*/
/* 
  api.registerConnectorClass(selectedOutlet, "custom-tiles", {
    shouldRender() {
      return false;
    },
  });

  api.createWidget("custom-tiles-widget", {
    tagName: "div.custom-tiles-widget",
  });

*/  

});
