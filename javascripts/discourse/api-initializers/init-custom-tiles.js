import { apiInitializer } from "discourse/lib/api";
import customTilesComponent from "../components/custom-tiles";

export default apiInitializer("0.8", (api) => {
  const settingsOutlet = settings.plugin_outlet;
  const selectedOutlet =
  settingsOutlet === "above-main-container"
      ? "below-site-header"
      : "above-main-container";


/* DEPRECATEDbut works 
  api.registerConnectorClass(selectedOutlet, "custom-tiles", {
    shouldRender() {
      return false;
    },
  });
*/
  /* not deprecated but does not work */
  api.renderInOutlet(selectedOutlet, customTilesComponent);

  api.createWidget("custom-tiles-widget", {
    tagName: "div.custom-tiles-widget",
  });

});
