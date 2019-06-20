/* eslint-disable no-undef */
// import { _t } from '../translate';

class Native {
  /**
   * Open hydranome website
   */
  static openWebsite(url = "https://hydranome.com/order"): void {
    try {
      // @ts-ignore
      cordova.plugins.browsertab.isAvailable(
        result => {
          if (!result) {
            // @ts-ignore
            cordova.InAppBrowser.open(url, "_system");
          } else {
            // @ts-ignore
            cordova.plugins.browsertab.openUrl(
              url,
              successResp => {},
              failureResp => {}
            );
          }
        },
        isAvailableError => {
          /* Just ignore error, there is no typings */
          // @ts-ignore
          cordova.InAppBrowser.open(url, "_system");
        }
      );
    } catch (error) {
      return console.log("Share app error", error);
    }
  }

  /**
   * Share app on social media
   */
  static shareApp(): void {
    try {
      const options = {
        message: "Try this app", // not supported on some apps (Facebook, Instagram)
        subject: "Hydranome", // fi. for email
        url: "http://hydranome.com/mobile-app"
        // files: ['', ''], // an array of filenames either locally or remotely
        // chooserTitle: 'Share app' // Android only, you can override the default share sheet title
      };

      const onSuccess = result => {};
      const onError = msg => {};

      // no typings. Just ignore and handle error if thrown
      // @ts-ignore
      window.plugins.socialsharing.shareWithOptions(
        options,
        onSuccess,
        onError
      );
    } catch (error) {
      return console.log("Share app error,", error);
    }
  }

  static shareScreenshotPwa(img: any) {
    try {
      // @ts-ignore
      window.plugins.socialsharing.shareWithOptions(
        { files: [img] },
        () => console.log("Share succes"),
        () => console.log("Share error")
      );
    } catch (error) {
      console.log("Plugin problme", error);
    }
  }
  /**
   * Share screenshot
   */
  static shareScreenshot(): void {
    try {
      // There should be screenshot property because of plugin, but TS
      // doesn't know, it will handle error if not available

      // @ts-ignore
      navigator.screenshot.URI((error, res) => {
        if (error) {
          return console.log("Screenshot not taken: " + error);
        }

        const options = {
          // message: 'Look at my progress',
          // subject: 'Hydronome',
          files: [res.URI]
          // url: null
        };

        const onSuccess = result => {
          console.log("Share screenshoot success");
        };
        const onError = msg => {
          console.error("Share screenshoot error");
        };

        // Try to fix iphone whatsapp problem where it does not share image
        // @ts-ignore
        window.plugins.socialsharing.shareWithOptions(
          options,
          onSuccess,
          onError
        );
      });
    } catch (error) {
      return console.log("Share screenshot error", error);
    }
  }
}

// @ts-ignore
window.Native = Native;
export default Native;
