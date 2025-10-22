import pluginRss from "@11ty/eleventy-plugin-rss";
import { minify } from "terser";
import moment from "moment";
import link_to from "eleventy-plugin-link_to";
import path from "node:path";
import * as sass from "sass";

moment.locale("en");

export default function (eleventyConfig) {
  
  eleventyConfig.setInputDirectory("src");
  //eleventyConfig.setIncludesDirectory("_includes"); // default
  //eleventyConfig.setDataDirectory("_data"); // default
  eleventyConfig.setLayoutsDirectory("_layouts");
  eleventyConfig.setOutputDirectory("dist");

  eleventyConfig.addPassthroughCopy("src/assets/script");
  eleventyConfig.addPassthroughCopy("src/assets/image");

  eleventyConfig.addPlugin(link_to);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addFilter("dateIso", date => {
    return moment(date).toISOString();
  });

  eleventyConfig.addFilter("dateReadable", date => {
    return moment(date).utc().format("LL"); // E.g. May 31, 2019
  });

  eleventyConfig.addFilter("dateYr", date => {
    return moment(date).utc().format("Y"); // E.g. 2019
  });

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
  
  eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",

		// opt-out of Eleventy Layouts
		//useLayouts: false,

		compile: async function (inputContent, inputPath) {
			let parsed = path.parse(inputPath);

      if(parsed.name.startsWith("_") || parsed.dir.includes("node_modules")) {
				return;
			}

			let result = sass.compileString(inputContent, {
				loadPaths: [
					parsed.dir || ".",
					this.config.dir.includes,
				]
			});

			// Map dependencies for incremental builds
			this.addDependencies(inputPath, result.loadedUrls);

			return async (data) => {
				return result.css;
			};
		},
	});
  eleventyConfig.addTemplateFormats("scss")
};