# Designer Portfolio Site
This is a portfolio website made for [Dragos Sargu](https://dribbble.com/dragos_sargu).

My job was to recreate the UI received in a .sketch file with **HTML**, **CSS** and **JavaScript**.

## The Process
To deliver a pixel perfect page, as well as a maintainable and scalable codebase, I use the [BETMIT](https://www.jamesturneronline.net/blog/bemit-naming-convention.html) methodology. To take advantage of the component based approach it provides, I implemented it with **SCSS** preprocessor, which makes the file structure even easier to maintain.

The template engine **Pug** was added to the technology stack, taking it one step further. This allowed the code to have less repetition and be more modular. Also the Project Sections and Pages are generated based on a [file](https://github.com/CristiR24/Designer_Portfolio_Site/blob/master/src/pug/variables/_projects-content.pug) containing the needed information. This makes modifying, deleting and adding new projects a breeze, removing the need to edit every page manually.

To improve my efficiency and automate the workflow I used **Gulp** task runner.

## See Live
[www.dragossargu.com](http://www.dragossargu.com/)

## Run
To run it by yourself, do a `npm install` in the root folder, then run `gulp` in the command line.

