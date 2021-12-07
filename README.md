# Aoe IV infos

A website project that aims to display all kind of Aoe IV information with a neat interface !

The website is hosted [here](https://aktaboot.github.io/)

## Contributing


- clone the repo

- checkout to the dev branch, where the source files are:
`git checkout dev`

- npm install

**npm scripts**

`npm start` to start the server accessible on localhost:8080
`npm run build` to apply the changes to the dist/ directory 
`npm run build-dev` for more dev-friendly output in the dist/ directory
`npm run clean` to delete the dist/ directory

Since the website is hosted on Github Pages, the main branch should have the production files which are in the dist/ directory

To do so, we have to push the files in the dist/ directory onto the main branch:
`git checkout main` to go the the main branch
`git checkout dev dist/` to copy dist/ from the dev branch into the current branch
`mv dist/* ./`
`rm -rf dist/`
then *git add, commmit, push*
