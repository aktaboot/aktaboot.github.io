# Aoe IV infos



A website project that aims to display all kind of Aoe IV information with a neat interface !

The website is hosted [here](https://aktaboot.github.io/)



# Contributing

## Contributing to the website



To access the source files, checkout to the dev branch

### Using the dev branch

1. clone the repo

2. `git checkout dev` to checkout to the dev branch, where the source files are.

3. `npm install`



###  Available npm scripts

`npm start` to start the server on localhost:8080

`npm run build` to apply the changes to the **dist/** directory 

`npm run build-dev` for more dev-friendly output in the **dist/** directory

`npm run clean` to delete the dist/ directory



### Pushing your changes

Since the website is hosted on **Github Pages**, the repo's **main** branch should have the production files which are located in the *dist/* directory.

To do so, we have to push the files in the **dist/** directory onto the main branch:

`git checkout main` to go the the main branch

`git checkout dev dist/` to copy **dist/** from the **dev** branch into the current branch

`mv dist/* ./`

`rm -rf dist/`

**git add, commit & push**
