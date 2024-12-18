import { createCanvas } from "canvas";
import { writeFileSync } from "fs";
import { join } from "path";

// Function : Generate Random Color
const genRandomColorFN = (): string => {
    const red = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${green}, ${blue})`
}

// Function : Generate Default Image
const genDefaultImgFN = (name: string): string => {

    const firstWord = name.trim()[0];
    const path = join(__dirname, "../../assets/users");
    const fileName = name.replaceAll(" ", "-") + "-" + Date.now() + ".png";
    const filePath = join(path, fileName);

    // Size Of Image
    const width = 500
    const height = 500

    // Create New Canvas
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Set Background Color
    ctx.fillStyle = genRandomColorFN();
    ctx.fillRect(0, 0, width, height);

    // Set The Font
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 200px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Write The Text Inside Image
    ctx.fillText(firstWord, width / 2, height / 2);

    // save image to the directory
    const imgBuffer = canvas.toBuffer("image/png");
    writeFileSync(filePath, imgBuffer);

    return fileName;
}

export default genDefaultImgFN;