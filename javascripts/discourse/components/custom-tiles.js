import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { defaultHomepage } from "discourse/lib/utilities";
import { and } from "@ember/object/computed";
import { observes } from "@ember-decorators/object";
import discourseComputed from "discourse-common/utils/decorators";

export default Component.extend({

  router: service(),
  tagName: "",

  @discourseComputed("router.currentRouteName")
  displayForRoute(currentRouteName) {
    const showOn = settings.show_on;
    if (showOn === "homepage") {
      return currentRouteName === `discovery.${defaultHomepage()}`;
    } else {
      // "all"
      return (
        currentRouteName !== "full-page-search" &&
        !currentRouteName.startsWith("admin.")
      );
    }
  },

  @discourseComputed("currentUser")
  displayForUser(currentUser) {
    const showFor = settings.show_for;
    if (showFor === "everyone") {
      return true;
    } else if (showFor === "logged_out" && !currentUser) {
      return true;
    } else if (showFor === "logged_in" && currentUser) {
      return true;
    }
    return false;
  },

  shouldDisplay: and("displayForUser", "displayForRoute"),

  enableTilesImages: false,
  enableBanner: false,


  // Setting a class on <html> from a component is not great
  // but we need it for backwards compatibility
  @observes("shouldDisplay")
  displayChanged() {
    document.documentElement.classList.toggle(
      "display-custom-tiles-bk",
      this.shouldDisplay
    );
  },

  didInsertElement() {
    this._super(...arguments);

    const assets = settings.theme_uploads;
    //console.log(assets);
    
    this.set("enableTilesImages", settings.enable_tile_images);

    if(settings.enable_tile_images){
      //Uploads or Assets
      const img1 = (settings.tile_1_image!=='' && settings.tile_1_image!==null) ? settings.tile_1_image:assets.img_get_started;
      const img2 = (settings.tile_2_image!=='' && settings.tile_2_image!==null) ? settings.tile_2_image:assets.img_ask_the_community;
      const img3 = (settings.tile_3_image!=='' && settings.tile_3_image!==null) ? settings.tile_3_image:assets.img_announcements;
      const img4 = (settings.tile_4_image!=='' && settings.tile_4_image!==null) ? settings.tile_4_image:assets.img_show_and_tell;
      const img5 = (settings.tile_5_image!=='' && settings.tile_5_image!==null) ? settings.tile_5_image:assets.img_product_road_map;

      jQuery('#tile-img-1 img.tile-img-thumb').attr('src',img1);
      jQuery('#tile-img-2 img.tile-img-thumb').attr('src',img2);
      jQuery('#tile-img-3 img.tile-img-thumb').attr('src',img3);
      jQuery('#tile-img-4 img.tile-img-thumb').attr('src',img4);
      jQuery('#tile-img-5 img.tile-img-thumb').attr('src',img5);
    }

    this.set("enableBanner", settings.enable_banner_above_tiles);
    if(settings.enable_banner_above_tiles){
      const imgBanner = (settings.banner_image!=='' && settings.banner_image!==null) ? settings.banner_image:assets.img_show_and_tell;
      jQuery('#custom-tiles-banner').attr('src', imgBanner);
    }

    this.displayChanged();

  },
  didRender(){
    this._super(...arguments);
    const assets = settings.theme_uploads;
    //console.log(assets);

    const vEnableTilesImages = this.get("enableTilesImages");
    const vEnableBanner = this.get("enableBanner");

    if(vEnableTilesImages){
      //Uploads or Assets
      const img1 = (settings.tile_1_image!=='' && settings.tile_1_image!==null) ? settings.tile_1_image:assets.img_get_started;
      const img2 = (settings.tile_2_image!=='' && settings.tile_2_image!==null) ? settings.tile_2_image:assets.img_ask_the_community;
      const img3 = (settings.tile_3_image!=='' && settings.tile_3_image!==null) ? settings.tile_3_image:assets.img_announcements;
      const img4 = (settings.tile_4_image!=='' && settings.tile_4_image!==null) ? settings.tile_4_image:assets.img_show_and_tell;
      const img5 = (settings.tile_5_image!=='' && settings.tile_5_image!==null) ? settings.tile_5_image:assets.img_product_road_map;

      jQuery('#tile-img-1 img.tile-img-thumb').attr('src',img1);
      jQuery('#tile-img-2 img.tile-img-thumb').attr('src',img2);
      jQuery('#tile-img-3 img.tile-img-thumb').attr('src',img3);
      jQuery('#tile-img-4 img.tile-img-thumb').attr('src',img4);
      jQuery('#tile-img-5 img.tile-img-thumb').attr('src',img5);
    }

    if(vEnableBanner){
      const imgBanner = (settings.banner_image!=='' && settings.banner_image!==null) ? settings.banner_image:assets.img_show_and_tell;
      jQuery('#custom-tiles-banner').attr('src', imgBanner);
    }
    
  },
  didDestroyElement() {
    document.documentElement.classList.remove("display-custom-tiles-bk");
  },
});
