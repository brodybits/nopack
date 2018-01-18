# nopack
This repo contains a simple react like application that works with zero dependency on npm echosystem, webpack and hacked module system like AMD and ComoonJS. The goal is to use browser's ES2015 moules during development time.

## Reqirements
- A working TypeScript compiler
- A simple web server

## How to run
```bash
npm install typescript live-server -g

git clone https://github.com/malekpour/nopack.git
cd nopack
tsc -w & live-server
```
Above steps will:
- Install the requirements globally
- Download the repo
- Compile and watch for modifications
- Run the web server and opens browser
Tested and worked with Chrome 63

## Code structure
Other than files on the root folder there is only one `src` folder which contains the simple react app and the `external` folder. In external folder there are source files for `nerv` and `mobx` projects. `nerv` is a trending `react` alternative and `mobx` is a library helps to implement observable pattern.
