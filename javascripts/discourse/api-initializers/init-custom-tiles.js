import { apiInitializer } from "discourse/lib/api";
import customTilesComponent from "../components/custom-tiles";

export default apiInitializer("1.6", (api) => {


  if (api.getCurrentUser()) {
    const currentUser = api.getCurrentUser()

    var debug = currentUser.admin && settings.enable_debug_for_admins;
    var debugForUsers = settings.enable_debug_for_user_ids;
    var debugForIDs = (debugForUsers) ? debugForUsers.split("|") : null;
    if (debugForIDs && debugForIDs.includes(currentUser.id.toString())) { debug = true; }

    var debug4All = settings.enable_debug_for_all;  if(debug4All){ debug = true; } 

    if(debug){          
      console.log('custom-tiles-row debug is ON');
      console.log('admin:' + currentUser.admin); 
      console.log('currentUser.external_id:' + currentUser.external_id); 
    }
  }

  const settingsOutlet = settings.plugin_outlet;
  const selectedOutlet = settingsOutlet === "above-main-container" ? "above-main-container" : "below-site-header";
  api.renderInOutlet(selectedOutlet, customTilesComponent);

});
