import prisma from '../src/utils/lib/prismaClient';

async function seedDatabase() {
  await prisma.userProgress.deleteMany({});
  await prisma.task.deleteMany({});
  await prisma.stage.deleteMany({});
  await prisma.path.deleteMany({});

  // ── 1. PATHS ──────────────────────────────────────────────────────────────
  const pathDevEnvironment = await prisma.path.create({
    data: {
      name: 'Dev Environment',
      description: 'Set up your machine before writing a single line of code',
      isLocked: false,
      requiredPlan: 'free',
      order: 1,
    }
  });

  const pathFrontend = await prisma.path.create({
    data: {
      name: 'Frontend',
      description: 'Learn frontend development from scratch',
      isLocked: true,
      requiredPlan: 'free',
      order: 2,
    }
  });

  await prisma.path.createMany({
    data: [
      { name: 'Backend', description: 'Learn backend development', isLocked: true, requiredPlan: 'pro', order: 3 },
      { name: 'Fullstack', description: 'Combine frontend and backend', isLocked: true, requiredPlan: 'pro', order: 4 },
    ]
  });

  // ── 2. DEV ENVIRONMENT STAGES ─────────────────────────────────────────────
  const stageLocalComfort = await prisma.stage.create({
    data: {
      name: 'Getting Comfortable',
      description: 'Open your editor and see your first web project working locally — no accounts or cloud setup required.',
      order: 1,
      isLocked: false,
      requiredPlan: 'free',
      expectedRepo: null,
      validationType: 'none',
      pathId: pathDevEnvironment.id,
    }
  });

  const stageGitCommitment = await prisma.stage.create({
    data: {
      name: 'Deploying Your Identity',
      description: 'Connect your work to GitHub so your progress is saved to the cloud.',
      order: 2,
      isLocked: true,
      requiredPlan: 'free',
      expectedRepo: 'stryd-setup',
      validationType: 'repo_exists',
      pathId: pathDevEnvironment.id,
    }
  });


  // ── 3. STAGE 1 TASKS: GETTING COMFORTABLE ─────────────────────────────────
  await prisma.task.createMany({
    data: [
      {
        title: 'Install VSCode',
        description: 'Download the code editor you will use every single day as a developer.',
        concept: `VSCode is a free code editor made by Microsoft. It is what most professional developers use, and it is what you will use throughout this course.

It is much more than a text editor. VSCode understands your code — it highlights different parts in different colours so it is easier to read, spots mistakes before you run anything, and autocompletes as you type. It also has a built-in file explorer, an integrated terminal, and a huge library of extensions you can install to add extra features.

You will be inside this editor every day. Getting comfortable here early makes everything else easier.`,
        instruction: `1. Go to code.visualstudio.com and download VSCode for your operating system.
2. Install it and open it.
3. Go to File > Open Folder and create a new folder on your Desktop called stryd-setup. Open that folder.
4. You should see "stryd-setup" appear in the Explorer panel on the left.

That folder is your home base for this entire stage. Every file you create will live inside it.`,
        resourceUrl: 'https://code.visualstudio.com/docs/setup/setup-overview',
        youtubeUrl: 'https://www.youtube.com/watch?v=MlIzFUI1QGA',
        order: 1,
        stageId: stageLocalComfort.id,
      },
      {
        title: 'Install essential extensions',
        description: 'Add three tools that will save you time and catch mistakes from day one.',
        concept: `Extensions are plugins that add extra features to VSCode. Three of them are worth installing right now.

Prettier automatically formats your code the moment you save a file. It fixes indentation, spacing, and quote style so you never have to think about it.

ESLint reads your JavaScript and flags problems before you even run the code — things like typos in variable names or code that will never execute.

Live Server launches your HTML file in the browser and refreshes it automatically every time you save. Without it, you would have to manually refresh the browser after every change.

These three tools together give you a much tighter, faster feedback loop.`,
        instruction: `1. Open the Extensions panel by clicking the four-squares icon in the left sidebar, or press Ctrl+Shift+X (Cmd+Shift+X on Mac).
2. Search for and install these three extensions one by one:
   - Prettier - Code formatter (by Prettier)
   - ESLint (by Microsoft)
   - Live Server (by Ritwick Dey)
3. Once installed, open Settings with Ctrl+, and search for "format on save". Turn it on.
4. Inside your stryd-setup folder, create a file called extensions.txt and write the names of the three extensions you installed. Save it.`,
        resourceUrl: 'https://code.visualstudio.com/docs/editor/extension-marketplace',
        youtubeUrl: 'https://www.youtube.com/watch?v=u21W_tfPVrY',
        order: 2,
        stageId: stageLocalComfort.id,
      },
      {
        title: 'Set up your terminal',
        description: 'Learn to navigate your computer with text commands — a skill you will use constantly.',
        concept: `The terminal lets you control your computer by typing commands instead of clicking. As a developer, you will use it all the time — to install tools, run your projects, save your code, and more.

On a Mac, the built-in Terminal app works fine. On Windows, install Windows Terminal from the Microsoft Store and set it to use Git Bash as the default shell.

VSCode has a terminal built in. You can open it any time with Ctrl+\` (the backtick key, top-left of your keyboard). This is the easiest way to use the terminal because you never have to leave your editor.

The five commands you will use most at the start: cd to move into a folder, ls to see what is inside a folder, mkdir to create a new folder, touch to create a new file, and clear to clean up the screen.`,
        instruction: `1. Open the integrated terminal in VSCode with Ctrl+\` (or Cmd+\` on Mac).
2. Run each of these commands and watch what happens:
   - pwd — shows where you are on your computer
   - ls — lists the files in the current folder
   - mkdir terminal-practice — creates a new folder
   - cd terminal-practice — moves into that folder
   - touch notes.txt — creates an empty file
   - cd .. — moves back up one level
3. Inside your stryd-setup folder, create a file called terminal-notes.txt. Write down what each of those six commands does in your own words. Save it.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line',
        youtubeUrl: 'https://www.youtube.com/watch?v=yz7nYlnXLfE',
        order: 3,
        stageId: stageLocalComfort.id,
      },
      {
        title: 'See your first webpage running locally',
        description: 'Wire everything together and watch your code appear live in the browser.',
        concept: `Before moving on, it is worth checking that your local setup is working end-to-end. This means: you write code in VSCode, save the file, and the browser updates immediately — no refreshing required.

This instant feedback loop is what makes local development fast and enjoyable. If something is broken now, it is much easier to fix before you add more tools on top.`,
        instruction: `1. Inside your stryd-setup folder, create a new file called index.html.
2. Add a basic HTML structure with an h1 that says "My Dev Environment Works".
3. Right-click the file in the Explorer panel and click Open with Live Server.
4. Your browser should open and show the heading.
5. Change the heading text to anything you like, save the file, and watch the browser update on its own.

Once you see it working, click Complete — you are ready for the next stage.`,
        resourceUrl: '',
        youtubeUrl: '',
        order: 4,
        stageId: stageLocalComfort.id,
      }
    ]
  });


  // ── 4. STAGE 2 TASKS: DEPLOYING YOUR IDENTITY ─────────────────────────────
  await prisma.task.createMany({
    data: [
      {
        title: 'Create a GitHub account',
        description: 'Sign up for the platform where your code will live online.',
        concept: `GitHub is a website where developers store and share their code. Think of it as a home for your projects — everything you build on Stryd will be saved here.

It is also your developer portfolio. When you apply for jobs or freelance work, people will look at your GitHub to see what you have built and how consistently you have been working.

You do not need to understand everything about GitHub right now. For this task, you just need an account.`,
        instruction: `1. Go to github.com and sign up for a free account.
2. Choose a username that looks professional — your name or a clean variation of it works well.
3. Once your account is created, go to Settings inside Stryd and save your GitHub username.

That is it for now. The next tasks will walk you through setting up Git on your machine and pushing your first code.`,
        resourceUrl: 'https://github.com/join',
        youtubeUrl: 'https://www.youtube.com/watch?v=iv8rSLsi1xo',
        order: 1,
        stageId: stageGitCommitment.id,
      },
      {
        title: 'Install Git',
        description: 'Install the tool that tracks every change you make to your code.',
        concept: `Git is a version control system. That just means it keeps a detailed history of every change you make to your project.

Think of it like a save system in a video game — at any point you can look back at an earlier version of your code, see exactly what changed, and undo mistakes. This becomes essential once your projects get larger.

Git is not the same as GitHub. Git is the tool that runs on your machine. GitHub is the website where you store your Git history online. You need Git installed locally before you can push anything to GitHub.`,
        instruction: `1. Go to git-scm.com and download Git for your operating system.
2. Install it with all the default options — you do not need to change anything.
3. Open your terminal in VSCode and run these two commands. Replace the values with your own name and email:
   git config --global user.name "Your Name"
   git config --global user.email "you@example.com"
4. Run git --version to confirm it installed correctly. You should see a version number.
5. Inside your stryd-setup folder, create a file called git-setup.txt and paste the version number output inside it. Save it.`,
        resourceUrl: 'https://git-scm.com/book/en/v2/Getting-Started-Installing-Git',
        youtubeUrl: 'https://www.youtube.com/watch?v=8JJ101D3knE',
        order: 2,
        stageId: stageGitCommitment.id,
      },
      {
        title: 'Install Node.js',
        description: 'Install the engine that powers almost every modern web development tool.',
        concept: `Node.js lets you run JavaScript on your computer, outside of a browser. You will need it even if you never build a backend — almost every frontend tool runs on it under the hood.

npm comes bundled with Node and is a huge library of packages you can install into your projects. When you later install things like React or Vite, npm is what fetches and sets them up for you.

Always install the LTS version. LTS stands for Long Term Support — it is the stable, well-tested version. The "Current" version has newer features but is less stable.`,
        instruction: `1. Go to nodejs.org and download the LTS version. Do not download the Current version.
2. Install it with all the default options.
3. Open your terminal in VSCode and run:
   node -v
   npm -v
4. Both commands should print version numbers. If they do, Node is installed correctly.
5. Inside your stryd-setup folder, create a file called node-setup.txt and paste both version numbers inside it. Save it.`,
        resourceUrl: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs',
        youtubeUrl: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
        order: 3,
        stageId: stageGitCommitment.id,
      },
      {
        title: 'Push your work to GitHub',
        description: 'Save your stryd-setup folder to GitHub and trigger automatic verification.',
        concept: `Pushing code to GitHub means taking the work saved on your machine and uploading it to GitHub so it is backed up online and visible to others.

You do this using a sequence of Git commands. Each command does one specific thing — they are not arbitrary, and understanding them will make Git feel much less mysterious.

Here is what each command does:
- git init — turns your folder into a Git repository (tells Git to start tracking it)
- git add . — stages all your files, marking them as ready to be saved
- git commit -m "message" — takes a snapshot of your staged files with a description
- git branch -M main — renames your default branch to "main" (GitHub's standard)
- git remote add origin [url] — connects your local repo to your GitHub repo
- git push -u origin main — uploads your commits to GitHub for the first time`,
        instruction: `First, create the GitHub repository:
1. Go to github.com and sign in.
2. Click the + icon and select New repository.
3. Name it stryd-setup. Set it to Public.
4. Do NOT add a README, .gitignore, or license — leave those unchecked.
5. Click Create repository.

Then, push your local code:
6. Open your terminal in VSCode. Make sure you are inside your stryd-setup folder. Run pwd to check — the path should end in /stryd-setup. If it does not, run cd path/to/stryd-setup.
7. Run these commands one at a time:
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/stryd-setup.git
   git push -u origin main

Replace YOUR_USERNAME with your actual GitHub username.

8. Go to github.com/YOUR_USERNAME/stryd-setup in your browser. You should see your files there.
9. Click Complete Task — Stryd will automatically check that your repo exists and unlock the next path.

If you get an error at any step, read the message carefully. Most errors tell you exactly what went wrong.`,
        resourceUrl: 'https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github',
        youtubeUrl: 'https://www.youtube.com/watch?v=iv8rSLsi1xo',
        order: 4,
        stageId: stageGitCommitment.id,
      }
    ]
  });


  // ── 5. FRONTEND PATH STAGES ───────────────────────────────────────────────
  const stageHTML = await prisma.stage.create({
    data: {
      name: 'HTML',
      description: 'The skeleton of every webpage on the internet',
      order: 1,
      isLocked: false,
      requiredPlan: 'free',
      expectedRepo: 'stryd-html',
      validationType: 'repo_exists',
      pathId: pathFrontend.id,
    }
  });

  await prisma.stage.createMany({
    data: [
      { name: 'CSS', description: 'Style and lay out your webpages', order: 2, isLocked: true, requiredPlan: 'basic', expectedRepo: 'stryd-css', validationType: 'repo_exists', pathId: pathFrontend.id },
      { name: 'JavaScript', description: 'Make your pages interactive and dynamic', order: 3, isLocked: true, requiredPlan: 'basic', expectedRepo: 'stryd-javascript', validationType: 'repo_exists', pathId: pathFrontend.id },
      { name: 'React', description: 'Build component-based UIs at scale', order: 4, isLocked: true, requiredPlan: 'basic', expectedRepo: 'stryd-react', validationType: 'repo_exists', pathId: pathFrontend.id },
      { name: 'Projects', description: 'Build real projects from scratch', order: 5, isLocked: true, requiredPlan: 'basic', expectedRepo: 'stryd-projects', validationType: 'repo_exists', pathId: pathFrontend.id },
      { name: 'Capstone', description: 'Your final project — build something real', order: 6, isLocked: true, requiredPlan: 'basic', expectedRepo: 'stryd-capstone', validationType: 'repo_exists', pathId: pathFrontend.id },
    ]
  });


  // ── 6. HTML STAGE TASKS ───────────────────────────────────────────────────
  await prisma.task.createMany({
    data: [
      {
        title: 'Introduction to HTML',
        description: 'Understand what HTML is and how a browser turns it into a webpage.',
        concept: `HTML stands for HyperText Markup Language. It is the foundation of every webpage on the internet.

HTML is not a programming language — it does not do logic or calculations. Its job is to describe the structure of a page using tags. A tag is just a keyword in angle brackets, like <p> or <h1>. Most tags come in pairs: an opening tag and a closing tag, with content sitting between them.

When a browser loads an HTML file it reads it top to bottom and builds a mental model of your page called the DOM. CSS and JavaScript both operate on top of this structure. Everything else you learn as a frontend developer builds on HTML — so getting the basics solid here matters.`,
        instruction: `Before starting: Create a new public repository on GitHub called stryd-html (no README, no .gitignore). Clone it to your machine and open it in VSCode.

1. Inside the repo, create a folder called task-01-intro.
2. Inside that folder, create a file called notes.html.
3. Build a basic HTML page that includes:
   - A DOCTYPE declaration
   - An html element with a lang attribute set to "en"
   - A head with a title that says "HTML Notes"
   - A body with an h1 that says "What is HTML"
   - A paragraph below the h1 where you explain in your own words what HTML is and what the DOM is
4. Open it with Live Server and confirm it renders.
5. Push your work:
   git add .
   git commit -m "task 01 - html intro"
   git push`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started',
        youtubeUrl: 'https://www.youtube.com/watch?v=qz0aGYrrlhU',
        order: 1,
        stageId: stageHTML.id,
      },
      {
        title: 'Your first HTML file',
        description: 'Build the standard HTML boilerplate from scratch and understand every line of it.',
        concept: `Every HTML document starts with the same basic structure. Once you understand each piece, writing it from memory becomes second nature.

DOCTYPE html — tells the browser this is modern HTML5. Always the first line.
html lang="en" — the root element. Every other element lives inside this. The lang attribute tells browsers and screen readers what language the page is in.
head — contains information about the page that is not shown to users, like the title and character encoding.
meta charset="UTF-8" — tells the browser to use UTF-8 encoding so special characters display correctly.
meta name="viewport" — controls how the page scales on mobile screens. Without this your page will look tiny on phones.
title — the text shown in the browser tab.
body — everything the user actually sees goes in here.`,
        instruction: `1. Inside your stryd-html folder, create a folder called task-02-boilerplate.
2. Inside it, create index.html.
3. Without copying and pasting, type out the full HTML boilerplate from memory using the breakdown above as a guide.
4. Inside the body, add an h1 with your name.
5. Open it with Live Server. Check the browser tab — it should show your title text.
6. Push:
   git add .
   git commit -m "task 02 - first html file"
   git push`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started',
        youtubeUrl: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
        order: 2,
        stageId: stageHTML.id,
      },
      {
        title: 'Headings, paragraphs and text formatting',
        description: 'Structure text content using headings, paragraphs, and emphasis tags.',
        concept: `HTML has specific tags for marking up text so it carries meaning, not just appearance.

Headings run from h1 to h6. h1 is the main title of the page — there should only be one per page. h2 is for major sections. h3 is for subsections within those. These heading levels create an outline of your document that screen readers can navigate and search engines use to understand your content.

Paragraphs go inside p tags. For emphasis, strong marks text as strongly important and em marks text as stressed. These are not just styling — they tell the browser that the content inside carries extra meaning.`,
        instruction: `1. Inside your stryd-html folder, create a folder called task-03-text.
2. Inside it create index.html with the full boilerplate.
3. In the body, build a page about any topic you like — a sport, a film, a person, anything. The page must include:
   - One h1 as the main title
   - At least two h2 headings as section titles
   - At least one h3 as a subsection inside one of those sections
   - At least three paragraphs of real written content
   - At least one strong and one em used with genuine meaning (not just for decoration)
4. Open in Live Server and confirm it renders.
5. Push:
   git add .
   git commit -m "task 03 - text formatting"
   git push`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals',
        youtubeUrl: 'https://www.youtube.com/watch?v=yTHTo28hwTQ',
        order: 3,
        stageId: stageHTML.id,
      },
      {
        title: 'Links and navigation',
        description: 'Connect pages together using anchor tags — the core mechanic of the entire web.',
        concept: `The anchor tag a is what makes the web a web. It creates clickable links that take you somewhere else.

The destination is set with the href attribute. Use a full URL like https://example.com to link to an external website. Use a relative path like ./about.html to link between pages in your own project.

By default, links open in the same tab. Adding target="_blank" opens the link in a new tab instead. When you do this, also add rel="noopener noreferrer" — this is a small security measure that prevents the new tab from being able to access or manipulate the page that opened it. It has become standard practice whenever you use target="_blank".`,
        instruction: `1. Inside your stryd-html folder, create a folder called task-04-links.
2. Inside it create two files: index.html and about.html.
3. In index.html: add full boilerplate, then add a nav element containing:
   - A link to ./about.html (opens in the same tab)
   - A link to https://github.com (opens in a new tab using target="_blank" and rel="noopener noreferrer")
4. In about.html: add full boilerplate and a link back to ./index.html.
5. Click between the pages in Live Server and confirm navigation works both ways.
6. Push:
   git add .
   git commit -m "task 04 - links"
   git push`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks',
        youtubeUrl: 'https://www.youtube.com/watch?v=MExJ_SaFUc0',
        order: 4,
        stageId: stageHTML.id,
      },
      {
        title: 'Images in HTML',
        description: 'Embed images into your pages correctly and accessibly.',
        concept: `The img tag embeds an image into your page. It has no closing tag — the image itself is the content.

Two attributes are required. src is the path to the image — either a relative path to a file in your project or a full URL to an image online. alt is a written description of what the image shows.

Alt text matters for two reasons. Screen readers read it aloud to users who cannot see the image. If the image fails to load, the alt text is what appears in its place. A good alt text describes the image specifically: "A tabby cat sleeping on a laptop" is better than "cat" or "image".

For purely decorative images that add no meaning, use an empty alt attribute — alt="" — so screen readers know to skip it.`,
        instruction: `1. Inside your stryd-html folder, create a folder called task-05-images. Inside that, create an images subfolder.
2. Download any two images and save them into the images folder.
3. Create index.html with the full boilerplate.
4. In the body add:
   - One image using a relative path to your local images folder, with a descriptive alt text
   - One image using a full external URL, with a descriptive alt text
   - One purely decorative image using an empty alt attribute: alt=""
5. Open in Live Server and confirm all three render.
6. Push:
   git add .
   git commit -m "task 05 - images"
   git push`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML',
        youtubeUrl: 'https://www.youtube.com/watch?v=0xoztJCHpbQ',
        order: 5,
        stageId: stageHTML.id,
      },
      {
        title: 'Lists — ordered and unordered',
        description: 'Mark up collections of items using the right list type.',
        concept: `HTML has two main types of lists.

An unordered list ul is for items where the order does not matter. It renders with bullet points by default. Use it for features, links, or any group of things that are not sequential.

An ordered list ol is for items where order does matter. It renders with numbers. Use it for steps, instructions, or rankings.

Each item in either list goes inside an li tag. Inside each li you can put almost anything — including another list. That is how multi-level structures like nested navigation menus are built.`,
        instruction: `1. Inside your stryd-html folder, create a folder called task-06-lists.
2. Inside it create index.html with the full boilerplate.
3. In the body, build three lists:
   - An unordered list of at least five things you want to learn as a developer
   - An ordered list of at least five steps to make your favourite meal
   - A nested list: an unordered list with at least two items, where each item contains its own sub-list
4. Open in Live Server and confirm all three render correctly.
5. Push:
   git add .
   git commit -m "task 06 - lists"
   git push`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals',
        youtubeUrl: 'https://www.youtube.com/watch?v=09oErCBjVns',
        order: 6,
        stageId: stageHTML.id,
      },
      {
        title: 'Tables',
        description: 'Display structured data in rows and columns using HTML tables.',
        concept: `HTML tables are for presenting data that has a grid-like structure — pricing plans, comparison charts, timetables, league standings.

The outer wrapper is table. Inside it you have rows marked with tr. Inside each row you have cells — th for header cells, td for data cells. For cleaner structure you can group rows in thead, tbody, and tfoot.

One important rule: tables are for data, not for layout. Using tables to position elements on a page is an outdated technique that causes accessibility problems. Use CSS Grid or Flexbox for layout, and keep tables strictly for data.`,
        instruction: `1. Inside your stryd-html folder, create a folder called task-07-tables.
2. Inside it create index.html with the full boilerplate.
3. Build a table that compares HTML, CSS, and JavaScript across four columns: Language, Type, Used For, and Difficulty.
4. The table must include:
   - A thead with th header cells
   - A tbody with three rows of real data
   - A tfoot with one row that says "More languages coming soon" spanning all four columns using the colspan attribute
5. Open in Live Server and confirm it renders correctly.
6. Push:
   git add .
   git commit -m "task 07 - tables"
   git push`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics',
        youtubeUrl: 'https://www.youtube.com/watch?v=dK0AptFbxvM',
        order: 7,
        stageId: stageHTML.id,
      },
      {
        title: 'HTML Forms',
        description: 'Build forms that collect user input using inputs, labels, and buttons.',
        concept: `Forms are how users interact with web applications. Every login screen, search bar, sign-up flow, and checkout page is built with HTML form elements.

The form element is the container. Inside it, input is the most versatile element — its type attribute controls what kind of input it becomes: text, email, password, checkbox, radio, file.

Every input must be paired with a label. You connect them by giving the input an id and setting the for attribute on the label to the same value. This is not just good practice — it is an accessibility requirement. When a label and input are connected, clicking the label focuses the input, which helps everyone but especially users with motor difficulties.

For longer text use textarea. For a dropdown use select with option elements inside.`,
        instruction: `1. Inside your stryd-html folder, create a folder called task-08-forms.
2. Inside it create index.html with the full boilerplate.
3. Build a sign-up form for a fictional coding bootcamp. The form must include:
   - A text input for full name with a label
   - An email input with a label
   - A password input with a label
   - A select dropdown for "How did you hear about us" with at least four options
   - A checkbox for agreeing to terms with a label
   - A submit button that says "Join the bootcamp"
4. Every single input must have a matching label connected via for and id.
5. Open in Live Server and confirm the form renders.
6. Push:
   git add .
   git commit -m "task 08 - html forms"
   git push`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form',
        youtubeUrl: 'https://www.youtube.com/watch?v=fNcJuPIZ2WE',
        order: 8,
        stageId: stageHTML.id,
      },
      {
        title: 'Semantic HTML',
        description: 'Use tags that describe what your content is, not just what it looks like.',
        concept: `Semantic HTML means choosing tags based on the meaning of your content, not just its appearance.

The alternative is using div for everything. That technically works but it tells the browser, screen readers, and search engines nothing about what each part of your page does.

HTML5 introduced landmark elements for exactly this reason. header wraps the top of the page. nav wraps navigation links. main wraps the primary content — use only one per page. article is for self-contained content like a blog post. section groups related content under a heading. aside is for secondary content like a sidebar. footer wraps the bottom of the page.

Screen readers let users jump between these landmarks directly. Search engines use them to understand your content. And your code becomes much easier for other developers to read.`,
        instruction: `1. Inside your stryd-html folder, create a folder called task-09-semantic.
2. Inside it create index.html with the full boilerplate.
3. Rebuild your task-03 page, but this time structure it entirely with semantic elements. The page must include:
   - A header with the site name and a nav with at least two links
   - A main containing at least two section elements, each with a heading and paragraphs
   - One article inside one of those sections with its own heading and content
   - An aside with a related tip or note
   - A footer with your name and a copyright line
4. No layout divs — every wrapper must be a semantic element with a real purpose.
5. Open in Live Server and confirm it renders.
6. Push:
   git add .
   git commit -m "task 09 - semantic html"
   git push`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics',
        youtubeUrl: 'https://www.youtube.com/watch?v=kGW8Al_cga4',
        order: 9,
        stageId: stageHTML.id,
      },
      {
        title: 'Build a personal profile page',
        description: 'Put everything together and build a profile page about yourself in pure HTML.',
        concept: `This is your first real project. No step-by-step instructions, no starter code, no design to copy.

Your goal is to build a well-structured, semantic HTML page from scratch. It will not look impressive without CSS — that is completely fine and expected. The point of this task is structure and correctness, not visual design. CSS comes in the next stage and will transform what you build here.

Before you submit, ask yourself: is every image labelled? Is every input linked to a label? Is the heading hierarchy correct — one h1, h2s for sections, h3s for subsections? Are you using semantic elements throughout?`,
        instruction: `1. Inside your stryd-html folder, create a folder called task-10-profile.
2. Inside it, build a personal profile page in index.html. The page must include:
   - Your name as the h1
   - A profile image with a descriptive alt text
   - A short bio paragraph
   - A section listing your skills as an unordered list
   - A section with an ordered list of your top three goals as a developer
   - A contact form with name, email, and message inputs — all properly labelled
   - A footer with your GitHub link
3. Structure everything with semantic elements: header, nav, main, sections, footer.
4. No CSS for this task — focus entirely on getting the structure right. It will look plain, and that is fine.
5. Review every element before pushing.
6. Push:
   git add .
   git commit -m "task 10 - profile page"
   git push`,
        resourceUrl: '',
        youtubeUrl: '',
        order: 10,
        stageId: stageHTML.id,
      },
      {
        title: 'Build a product landing page',
        description: 'Build a structured landing page for a fictional product with multiple sections and a form.',
        concept: `Landing pages are one of the most common things you will build as a frontend developer. Every product, app, and business has one — a page designed to explain what something is and get the visitor to take an action.

The structure is predictable: a hero section at the top with a strong headline, a features or benefits section, some imagery, and a call to action at the bottom. In pure HTML, your job is to get this structure right using semantic elements and correct heading hierarchy.

The visual design comes in the CSS stage. Right now, structure is everything.`,
        instruction: `1. Inside your stryd-html folder, create a folder called task-11-landing.
2. Pick a fictional product — an app, a service, anything you like.
3. Build index.html as a landing page for it. The page must include:
   - A header with the product name and a nav
   - A hero section with an h1 headline, a subheading, and a short paragraph
   - A features section with an h2 and at least three feature items, each with a heading and description
   - An images section with at least two images and proper alt text
   - A sign-up section with a form containing name, email, and a submit button — all properly labelled
   - A footer
4. Review every element before pushing.
5. Push:
   git add .
   git commit -m "task 11 - landing page"
   git push`,
        resourceUrl: '',
        youtubeUrl: '',
        order: 11,
        stageId: stageHTML.id,
      },
      {
        title: 'HTML Capstone — full static website',
        description: 'Build a complete multi-page website from scratch with no guidance or starter code.',
        concept: `This is the final project for the HTML stage, and it is entirely open-ended.

Pick a topic you actually care about — a hobby, a business idea, a subject you know well — and build a complete multi-page static website about it.

There is no template and no design to follow. Real projects never come with instructions. The minimum requirements below exist to make sure you cover everything from this stage, but every other decision is yours: how many pages, what the forms collect, how the navigation is organised, what the content says.

Before you submit, open every page in Live Server and test it properly. Do all links work? Are all images loading? Is every input labelled? Fix everything that is broken before you push.`,
        instruction: `1. Inside your stryd-html folder, create a folder called task-12-capstone.
2. Build a complete multi-page website on any topic you choose.

Minimum requirements:
   - At least three linked pages (home, about, and one more of your choice)
   - Every page has full HTML boilerplate
   - A consistent nav that links all pages
   - Correct heading hierarchy throughout
   - Semantic landmark elements on every page (header, nav, main, section, footer)
   - At least one image per page with descriptive alt text
   - At least one form with properly labelled inputs somewhere across the site
   - A footer on every page

3. Before pushing, check every page in Live Server:
   - Do all links work?
   - Are all images loading?
   - Is every input labelled?
   - Is the heading hierarchy correct?

4. Fix everything that is wrong, then push:
   git add .
   git commit -m "task 12 - html capstone"
   git push`,
        resourceUrl: '',
        youtubeUrl: '',
        order: 12,
        stageId: stageHTML.id,
      },
    ]
  });

  console.log('✅ Seeded successfully — Stryd is ready to launch!');
}

seedDatabase()
  .catch(console.error)
  .finally(() => prisma.$disconnect());