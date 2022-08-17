import Component from "@ember/component";
import { inject as service } from "@ember/service";
import { defaultHomepage } from "discourse/lib/utilities";
import { and } from "@ember/object/computed";
import discourseComputed, { observes } from "discourse-common/utils/decorators";

export default Component.extend({
  router: service(),
  tagName: "",

  @discourseComputed("router.currentRouteName")
  displayForRoute(currentRouteName) {
    const showOn = settings.show_on;
    if (showOn === "homepage") {
      return currentRouteName === `discovery.${defaultHomepage()}`;
    } else if (showOn === "top_menu") {
      return this.siteSettings.top_menu
        .split("|")
        .any((m) => `discovery.${m}` === currentRouteName);
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
    this.displayChanged();    

    const titleImg1 = settings.tile_1_image;
    const titleImg2 = settings.tile_2_image;
    const titleImg3 = settings.tile_3_image;
    const titleImg4 = settings.tile_4_image;
    const img1 = this.$('#tile-img-1');
    img1.attr('src',titleImg1);

  },

  didDestroyElement() {
    document.documentElement.classList.remove("display-custom-tiles-bk");
  },
});
