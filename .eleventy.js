const pluginSass = require('eleventy-plugin-sass');
const { minify } = require('terser');
const moment = require('moment');

moment.locale('en');

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(require('eleventy-plugin-link_to'));

  eleventyConfig.addFilter('dateIso', date => {
    return moment(date).toISOString();
  });

  eleventyConfig.addFilter('dateReadable', date => {
    return moment(date).utc().format('LL'); // E.g. May 31, 2019
  });

  eleventyConfig.addFilter('dateYr', date => {
    return moment(date).utc().format('Y'); // E.g. 2019
  });

  eleventyConfig.addFilter('slugify', str => {
    if (str){
      str = str.replace(/^\s+|\s+$/g, ''); // trim
      str = str.toLowerCase();
    
      // remove accents, swap ñ for n, etc
      var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
      var to   = "aaaaeeeeiiiioooouuuunc------";
      for (var i=0, l=from.length ; i<l ; i++) {
          str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
      }

      str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
          .replace(/\s+/g, '-') // collapse whitespace and replace by -
          .replace(/-+/g, '-'); // collapse dashes
    }
    return str;
  });

  eleventyConfig.addNunjucksAsyncFilter('jsmin', async function (
    code,
    callback
  ) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error('Terser error: ', err);
      // Fail gracefully.
      callback(null, code);
    }
  });
  
  eleventyConfig.addPlugin(pluginSass, {
      watch: ['src/assets/style/**/*.{scss,sass}', '!node_modules/**'],
      outputDir: 'dist/assets/style'
  });

  eleventyConfig.addPassthroughCopy('src/assets/script');
  eleventyConfig.addPassthroughCopy('src/assets/image');

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      layouts: '_layouts'
    }
  };
};