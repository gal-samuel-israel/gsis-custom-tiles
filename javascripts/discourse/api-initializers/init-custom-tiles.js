import { apiInitializer } from "discourse/lib/api";
import customTilesComponent from "../components/custom-tiles";
import customTilesLegacyComponent from "../components/custom-tiles-legacy";
export default apiInitializer("1.6", (api) => {
  if (api.getCurrentUser()) {
    const currentUser = api.getCurrentUser();

    let debug = currentUser.admin && settings.enable_debug_for_admins;
    const debugForUsers = settings.enable_debug_for_user_ids;
    const debugForIDs = debugForUsers ? debugForUsers.split("|") : null;
    if (debugForIDs && debugForIDs.includes(currentUser.id.toString())) {
      debug = true;
    }

    if (settings.enable_debug_for_all) {
      debug = true;
    }

    if (debug) {
      console.log("custom-tiles-row debug is ON");
      console.log("admin:" + currentUser.admin);
      console.log("currentUser.external_id:" + currentUser.external_id);
    }
  }

  const settingsOutlet = settings.plugin_outlet;
  const selectedOutlet =
    settingsOutlet === "above-main-container"
      ? "above-main-container"
      : "below-site-header";
  const selectedComponent = settings.use_gjs
    ? customTilesComponent
    : customTilesLegacyComponent;

  api.renderInOutlet(selectedOutlet, selectedComponent);
});
