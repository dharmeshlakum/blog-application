import { createCanvas } from "canvas";
import { writeFileSync } from "fs";
import { join } from "path";

// Function : Generate Default Color
const generateDefaultBgColorFN = (): string => {

    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);

    return `rgb(${red}, ${green}, ${blue})`
}

// Function : Create Default Image For User
const createDefaultImgFN = (name: string): string => {
    const firstWord = name[0].toUpperCase();

    // Set Canvas Size
    const height = 400;
    const width = 400;

    // Create A New Canvas
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext("2d");

    // Fill The Background Color
    ctx.fillStyle = generateDefaultBgColorFN();
    ctx.fillRect(0, 0, width, height);

    // Set The Font Style
    ctx.font = "250px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Write The Text In Image
    ctx.fillText(firstWord, width / 2, height / 2);

    // Save The file
    const fileName = name.replaceAll(" ", "-") + "-" + Date.now() + ".png";
    const filePath = join(__dirname, "../../assets/user", fileName);
    const buffer = canvas.toBuffer("image/png");
    writeFileSync(fileName, buffer);

    return fileName;
}

export default createDefaultImgFN;