import Native from "../../core/native/Native";
import { hideAll, showScreenshotShadow } from "./uiActions";
import { wait } from "../../core/helpers";
import html2canvas from "html2canvas";

export const visitWebsite = () => {
  try {
    Native.openWebsite();
  } catch (error) {
    console.log("Open website error");
  }
};

export const shareApp = () => {
  try {
    Native.shareApp();
  } catch (error) {
    console.log("Share app error");
  }
};

export const shareScreenshot = async () => {
  hideAll();
  await wait(400);
  showScreenshotShadow();
  await wait(1400);
  try {
    html2canvas(document.querySelector("#root") as any, {
      allowTaint: true,
      useCORS: true,
      foreignObjectRendering: true
    }).then(canvas => {
      const url = canvas.toDataURL("png");
      Native.shareScreenshotPwa(url);
    });

    // Native.shareScreenshot();
  } catch (error) {
    console.log("Share screenshoot error");
  }
};
