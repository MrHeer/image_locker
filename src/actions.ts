import { map } from "rxjs";
import { imageData$, imageState$ } from "./state";
import { grayscale } from "./grayscale";

const grayButton: HTMLButtonElement = document.querySelector("#gray")!;
const downloadButton: HTMLButtonElement = document.querySelector("#download")!;
const copyButton: HTMLButtonElement = document.querySelector("#copy")!;
const compressButton: HTMLButtonElement = document.querySelector("#compress")!;
const restoreButton: HTMLButtonElement = document.querySelector("#restore")!;

export const setupActions = () => {
  grayButton.addEventListener("click", () => {
    const image = imageData$.value!;
    const newImage = grayscale(image);
    imageData$.next(newImage);
    imageState$.next("gray");
  });
  downloadButton.addEventListener("click", () => {
    console.log("download");
  });
  copyButton.addEventListener("click", () => {
    console.log("copy");
  });
  compressButton.addEventListener("click", () => {
    console.log("compress");
  });
  restoreButton.addEventListener("click", () => {
    console.log("restore");
  });

  imageState$.pipe(map((state) => state !== "origin")).subscribe((disabled) => {
    grayButton.disabled = disabled;
  });
  imageState$.pipe(map((state) => state !== "gray")).subscribe((disabled) => {
    downloadButton.disabled = disabled;
    copyButton.disabled = disabled;
  });
  imageState$.pipe(map((state) => state !== "copied")).subscribe((disabled) => {
    compressButton.disabled = disabled;
  });
  imageState$
    .pipe(map((state) => state !== "compressed"))
    .subscribe((disabled) => {
      restoreButton.disabled = disabled;
    });
};