#!/usr/bin/env node

const fs = require('fs-extra');
const gzipSize = require('gzip-size');


const run = async () => {

  const sumGzipSizes = (chunkList) => {
    let sum = 0;

    for (j = 0; j < chunkList.length; j++) {
      const currentSize = gzipSize.fileSync(`.next/${chunkList[j]}`);
      sum += currentSize;
    };

    return Math.round(sum/1000);
  }


  const manifest_json = JSON.parse(fs.readFileSync('.next/build-manifest.json',
    'utf8'));

  const build_id = fs.readFileSync('.next/BUILD_ID', 'utf8');

  const pages = manifest_json.pages;

  // Remove polyfill size check
  const pagesKeys = Object.keys(pages).filter(key => key !== '/_polyfills');

  let firstLoads = {};

  for (i = 0; i < pagesKeys.length; i++) {
    const currentPage = pagesKeys[i];

    const pageBundlePath = `/static/${build_id}/pages${currentPage}.js`;
    const appBundlePath = `/static/${build_id}/pages/_app.js`;

    // Page first load = page chunks + app chunks + page bundle + app bundle
    const pageChunks = [...new Set([...pages[currentPage], ...pages['/_app'], pageBundlePath, appBundlePath])];

    firstLoads[currentPage] = sumGzipSizes(pageChunks);
  }

  // Write bundleStats.json
  fs.writeFileSync(
    './first-load-stats.json',
    JSON.stringify(firstLoads, null, 2)  + "\n",
    'utf-8'
  );
};


run();
