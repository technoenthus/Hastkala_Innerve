import fs from "fs";
import path from "path";
import { artisans, getProductsByArtisan } from "./data";

function generateProducts(products:any[]) {

  return products.map((product) => {

    return `
      <div class="product-card">

        <img src="${product.images[0]}">

        <div class="product-info">
          <h3>${product.title}</h3>
          <p>${product.craftType}</p>
        </div>

      </div>
    `;

  }).join("");

}

export function generatePortfolioHTML(){

  const artisan = artisans[0];

  const products = getProductsByArtisan(artisan.id);

  const templatePath = path.join(
    process.cwd(),
    "template",
    "template.html"
  );

  let html = fs.readFileSync(templatePath,"utf8");

    const productHTML = generateProducts(products);

  html = html
    .replace("{{name}}", artisan.name)
    .replace("{{craft}}", artisan.craft)
    .replace("{{location}}", `${artisan.region}, ${artisan.state}`)
    .replace("{{image}}", artisan.image)
    .replace("{{bio}}", artisan.bio)
    .replace("{{experience}}", "15")
    .replace("{{products}}", productHTML);

  return html;

}