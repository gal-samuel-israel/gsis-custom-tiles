import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  const settingsOutlet = settings.plugin_outlet;
  const finalOutlet =
  settingsOutlet === "above-main-container"
      ? "below-site-header"
      : "above-main-container";

  /* DEPRECATED
  api.registerConnectorClass(finalOutlet, "custom-tiles", {
    shouldRender() {
      return false;
    },
  });
  */
 
  api.createWidget("custom-tiles-widget", {
    tagName: "div.custom-tiles-widget",
  });

});
