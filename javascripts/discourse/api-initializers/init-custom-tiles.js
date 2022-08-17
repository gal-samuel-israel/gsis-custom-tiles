import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("0.8", (api) => {
  const enableConnectorName = settings.plugin_outlet;
  const disableConnectorName =
    enableConnectorName === "above-main-container"
      ? "below-site-header"
      : "above-main-container";

  api.registerConnectorClass(disableConnectorName, "custom-tiles", {
    shouldRender() {
      return false;
    },
  });

  
  api.createWidget("custom-tiles-widget", {
    tagName: "div.custom-tiles-widget",
  });

});
