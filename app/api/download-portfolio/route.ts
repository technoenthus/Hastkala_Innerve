import puppeteer from "puppeteer";
import { generatePortfolioHTML } from "@/lib/generatePortfolioHTML";

export async function GET() {

  const html = generatePortfolioHTML();

  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdf = Buffer.from(await page.pdf({
  format: "A4",
  printBackground: true,
}));

  await browser.close();

  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=portfolio.pdf",
    },
  });

}