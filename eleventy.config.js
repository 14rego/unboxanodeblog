import { minify } from "terser";
import link_to from "eleventy-plugin-link_to";
import fs from "fs";
import path from "path";
import cssnano from "cssnano";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

export default function (eleventyConfig) {  
  eleventyConfig.setInputDirectory("src");
  //eleventyConfig.setIncludesDirectory("_includes"); // default
  //eleventyConfig.setDataDirectory("_data"); // default
  eleventyConfig.setLayoutsDirectory("_layouts");
  eleventyConfig.setOutputDirectory("docs");

  eleventyConfig.on("eleventy.before", async () => {
    const tailwindInputPath = path.resolve("./src/assets/style/unboxanodeblog.css");
    const tailwindOutputPath = "./docs/assets/style/unboxanodeblog.css";
    const cssContent = fs.readFileSync(tailwindInputPath, "utf8");
    const outputDir = path.dirname(tailwindOutputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    const result = await processor.process(cssContent, {
      from: tailwindInputPath,
      to: tailwindOutputPath,
    });
    fs.writeFileSync(tailwindOutputPath, result.css);
  });

  const processor = postcss([
    tailwindcss(),
    cssnano({
      preset: "default",
    }),
  ]);

  eleventyConfig.addPassthroughCopy("src/assets/script");
  eleventyConfig.addPassthroughCopy("src/assets/image");

  eleventyConfig.addPlugin(link_to);

  eleventyConfig.addFilter("slugify", str => {
    if (str){
      str = str.replace(/^\s+|\s+$/g, ""); // trim
      str = str.toLowerCase();
    
      // remove accents, swap ñ for n, etc
      var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
      var to   = "aaaaeeeeiiiioooouuuunc------";
      for (var i=0, l=from.length ; i<l ; i++) {
        str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
      }

      str = str.replace(/[^a-z0-9 -]/g, "") // remove invalid chars
        .replace(/\s+/g, "-") // collapse whitespace and replace by -
        .replace(/-+/g, "-"); // collapse dashes
    }
    return str;
  });

  eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (
    code,
    callback
  ) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      // Fail gracefully.
      callback(null, code);
    }
  });
};