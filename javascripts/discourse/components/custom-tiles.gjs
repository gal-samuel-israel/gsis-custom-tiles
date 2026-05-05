import Component from "@glimmer/component";
import { action } from "@ember/object";
import { service } from "@ember/service";
import { defaultHomepage } from "discourse/lib/utilities";
import didInsert from "@ember/render-modifiers/modifiers/did-insert";
import didUpdate from "@ember/render-modifiers/modifiers/did-update";
import willDestroy from "@ember/render-modifiers/modifiers/will-destroy";
import { htmlSafe } from "@ember/template";
import { i18n } from "discourse-i18n";

const TILE_IMAGE_FALLBACKS = [
  "img_get_started",
  "img_ask_the_community",
  "img_announcements",
  "img_show_and_tell",
  "img_product_road_map",
];

export default class CustomTiles extends Component {
  @service router;
  @service currentUser;

  get user() {
    const service = this.currentUser;

    if (!service) {
      return null;
    }

    if ("currentUser" in service) {
      return service.currentUser;
    }

    if ("user" in service) {
      return service.user;
    }

    if (
      "id" in service ||
      "admin" in service ||
      "username" in service ||
      "external_id" in service
    ) {
      return service;
    }

    return null;
  }

  get shouldDisplay() {
    return this.displayForUser && this.displayForRoute;
  }

  get displayForRoute() {
    const currentRouteName = this.router.currentRouteName;

    if (settings.show_on === "homepage") {
      return currentRouteName === `discovery.${defaultHomepage()}`;
    }

    return (
      currentRouteName !== "full-page-search" &&
      !currentRouteName?.startsWith("admin.")
    );
  }

  get displayForUser() {
    const showFor = settings.show_for;

    if (showFor === "everyone") {
      return true;
    }

    if (showFor === "logged_out") {
      return !this.user;
    }

    if (showFor === "logged_in") {
      return Boolean(this.user);
    }

    return false;
  }

  get enableTilesImages() {
    return settings.enable_tile_images;
  }

  get enableBanner() {
    return settings.banner_enabled;
  }

  get bannerPosition() {
    return settings.banner_position === "above" ? "above" : "below";
  }

  get bannerClasses() {
    return `wrap tile-wrap banner-wrap banner-wrap--${this.bannerPosition}`;
  }

  get bannerStyle() {
    return htmlSafe(
      `margin-top: ${this.pixelSetting(
        "banner_margin_top"
      )}px; margin-bottom: ${this.pixelSetting("banner_margin_bottom")}px;`
    );
  }

  get bannerImage() {
    return this.uploadOrFallback("banner_image", "img_banner");
  }

  get arrowWhiteImage() {
    return settings.theme_uploads?.img_arrow_white;
  }

  get tile1Image() {
    return this.tileImage(1);
  }

  get tile2Image() {
    return this.tileImage(2);
  }

  get tile3Image() {
    return this.tileImage(3);
  }

  get tile4Image() {
    return this.tileImage(4);
  }

  get tile5Image() {
    return this.tileImage(5);
  }

  t(key) {
    return i18n(themePrefix(key));
  }

  tileImage(index) {
    return this.uploadOrFallback(
      `tile_${index}_image`,
      TILE_IMAGE_FALLBACKS[index - 1]
    );
  }

  uploadOrFallback(settingName, fallbackAssetName) {
    const upload = settings[settingName];

    if (upload) {
      return upload;
    }

    return settings.theme_uploads?.[fallbackAssetName];
  }

  pixelSetting(settingName) {
    const value = Number(settings[settingName]);

    if (Number.isFinite(value) && value >= 0) {
      return Math.round(value);
    }

    return 0;
  }

  @action
  syncDisplayClass() {
    document.documentElement.classList.toggle(
      "display-custom-tiles-bk",
      this.shouldDisplay
    );
  }

  @action
  cleanupDisplayClass() {
    document.documentElement.classList.remove("display-custom-tiles-bk");
  }

  <template>
    <div
      {{didInsert this.syncDisplayClass}}
      {{didUpdate this.syncDisplayClass this.shouldDisplay}}
      {{willDestroy this.cleanupDisplayClass}}
    >
      {{#if this.shouldDisplay}}
        <div class="custom-tiles-wrap">
          <div class="custom-tiles-panel-grid">
            <div class="wrap tile-wrap">
              <a
                href={{this.t "tile_1.link"}}
                alt={{this.t "tile_1.link_alt"}}
                title={{this.t "tile_1.link_alt"}}
              >
                {{#if this.enableTilesImages}}
                  <div id="tile-img-1" class="tile-img">
                    <img class="tile-img-thumb" src={{this.tile1Image}} />
                    <div class="tile-link"><img src={{this.arrowWhiteImage}} /></div>
                  </div>
                {{else}}
                  <div class="tile-link"><img src={{this.arrowWhiteImage}} /></div>
                {{/if}}
                <div class="tile-headline">{{this.t "tile_1.headline"}}</div>
                <div class="tile-subhead">{{this.t "tile_1.subhead"}}</div>
              </a>
            </div>

            <div class="wrap tile-wrap">
              <a
                href={{this.t "tile_2.link"}}
                alt={{this.t "tile_2.link_alt"}}
                title={{this.t "tile_2.link_alt"}}
              >
                {{#if this.enableTilesImages}}
                  <div id="tile-img-2" class="tile-img">
                    <img class="tile-img-thumb" src={{this.tile2Image}} />
                    <div class="tile-link"><img src={{this.arrowWhiteImage}} /></div>
                  </div>
                {{else}}
                  <div class="tile-link"><img src={{this.arrowWhiteImage}} /></div>
                {{/if}}
                <div class="tile-headline">{{this.t "tile_2.headline"}}</div>
                <div class="tile-subhead">{{this.t "tile_2.subhead"}}</div>
              </a>
            </div>

            <div class="wrap tile-wrap">
              <a
                href={{this.t "tile_3.link"}}
                alt={{this.t "tile_3.link_alt"}}
                title={{this.t "tile_3.link_alt"}}
              >
                {{#if this.enableTilesImages}}
                  <div id="tile-img-3" class="tile-img">
                    <img class="tile-img-thumb" src={{this.tile3Image}} />
                    <div class="tile-link"><img src={{this.arrowWhiteImage}} /></div>
                  </div>
                {{else}}
                  <div class="tile-link"><img src={{this.arrowWhiteImage}} /></div>
                {{/if}}
                <div class="tile-headline">{{this.t "tile_3.headline"}}</div>
                <div class="tile-subhead">{{this.t "tile_3.subhead"}}</div>
              </a>
            </div>

            <div class="wrap tile-wrap">
              <a
                href={{this.t "tile_4.link"}}
                alt={{this.t "tile_4.link_alt"}}
                title={{this.t "tile_4.link_alt"}}
              >
                {{#if this.enableTilesImages}}
                  <div id="tile-img-4" class="tile-img">
                    <img class="tile-img-thumb" src={{this.tile4Image}} />
                    <div class="tile-link"><img src={{this.arrowWhiteImage}} /></div>
                  </div>
                {{else}}
                  <div class="tile-link"><img src={{this.arrowWhiteImage}} /></div>
                {{/if}}
                <div class="tile-headline">{{this.t "tile_4.headline"}}</div>
                <div class="tile-subhead">{{this.t "tile_4.subhead"}}</div>
              </a>
            </div>

            {{#if (this.t "tile_5.headline")}}
              <div class="wrap tile-wrap">
                <a
                  href={{this.t "tile_5.link"}}
                  alt={{this.t "tile_5.link_alt"}}
                  title={{this.t "tile_5.link_alt"}}
                >
                  {{#if this.enableTilesImages}}
                    <div id="tile-img-5" class="tile-img">
                      <img class="tile-img-thumb" src={{this.tile5Image}} />
                      <div class="tile-link"><img src={{this.arrowWhiteImage}} /></div>
                    </div>
                  {{else}}
                    <div class="tile-link"><img src={{this.arrowWhiteImage}} /></div>
                  {{/if}}
                  <div class="tile-headline">{{this.t "tile_5.headline"}}</div>
                  <div class="tile-subhead">{{this.t "tile_5.subhead"}}</div>
                </a>
              </div>
            {{/if}}
          </div>

          {{#if this.enableBanner}}
            <div class={{this.bannerClasses}} style={{this.bannerStyle}}>
              <a
                href={{this.t "banner_target.link"}}
                title={{this.t "banner_target.link_alt"}}
                target={{this.t "banner_target.link_target"}}
              ><img
                  id="custom-tiles-banner"
                  src={{this.bannerImage}}
                  alt={{this.t "banner_target.link_alt"}}
                /></a>
            </div>
          {{/if}}
        </div>
      {{/if}}
    </div>
  </template>
}
