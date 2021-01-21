# next-compute-first-load
A tiny node.js script to recompute Next.js first load build metric

## Why
Next.js first load metric can be seen when building your Next.js app.
It's a powerful analytics, that can be used to track your app performances.
Unfortunatly, Next does not offer a way to get this data yet, and parsing the build output seems like a bad idea.

I implemented this small script to compute this metric myself.

## How to use
- Copy next-compute-first-load.js to your project root

- Give him correct rights
```console
  chmod u+x next-compute-first-load.js
```
  
- Build your Next.js app
```console
next build
```

- Launch script and compare results (stored within new file `./first-load-stats.json`)

```console
./next-compute-first-load.js
cat ./first-load-stats.json
```
