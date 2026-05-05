import prisma from '../src/utils/lib/prismaClient';

async function seedDatabase() {

  // ── Paths ──────────────────────────────────────────────
  const pathVSCode = await prisma.path.create({
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

  // ── Dev Environment ────────────────────────────────────
  const stageSetup = await prisma.stage.create({
    data: {
      name: 'Setup',
      description: 'Install everything you need to start coding',
      order: 1,
      isLocked: false,
      requiredPlan: 'free',
      expectedRepo: 'stryd-setup',
      pathId: pathVSCode.id,
    }
  });

  await prisma.task.createMany({
    data: [
      {
        title: 'Create a GitHub account',
        description: 'Sign up for GitHub to establish your professional developer identity',
        concept: `GitHub is the industry standard for storing and sharing code. Think of it as your developer portfolio—it's where employers see your progress, your consistency, and your ability to collaborate. Before you can track your journey on STRYD, you need a place for your code to live online.`,
        instruction: `1. Go to github.com and sign up for a free account.
2. Choose a professional username (e.g., your name or a clean variation).
3. Once created, leave this task, go to settings enter it and come back here and click 'Complete' to unlock the rest of your environment setup.`,
        resourceUrl: 'https://github.com/join',
        youtubeUrl: 'https://www.youtube.com/watch?v=iv8rSLsi1xo',
        order: 0,
        stageId: stageSetup.id,
      },
      {
        title: 'Install VSCode',
        description: 'Download and install Visual Studio Code — the editor you will spend most of your time in',
        concept: `Visual Studio Code (VSCode) is a free, open-source code editor built by Microsoft. It has become the industry standard for web development — the vast majority of frontend, backend, and fullstack developers use it daily. Unlike a basic text editor like Notepad, VSCode understands your code. It highlights syntax in different colours so the structure is easy to read, flags errors before you even run anything, autocompletes variable names and functions as you type, and lets you navigate large codebases without getting lost. Under the hood it is built on Electron, which means it runs the same way on Mac, Windows, and Linux. It also has a built-in file explorer on the left, an integrated terminal so you never need to leave the editor, and a Git panel that shows you exactly what you have changed. The extension marketplace has tens of thousands of plugins that add support for every language and framework imaginable. You will be inside this editor every single day — it is worth getting comfortable with it from the start.`,
        instruction: `Go to code.visualstudio.com and download VSCode for your operating system. Install it and open it. Once it is open, create a new folder on your Desktop called stryd-setup. Open that folder in VSCode using File > Open Folder. You should see the folder name appear in the Explorer panel on the left. That is your working folder for this entire stage — every task you complete will go inside it.`,
        resourceUrl: 'https://code.visualstudio.com/docs/setup/setup-overview',
        youtubeUrl: 'https://www.youtube.com/watch?v=MlIzFUI1QGA',
        order: 1,
        stageId: stageSetup.id,
      },
      {
        title: 'Install essential extensions',
        description: 'Add Prettier, ESLint, and Live Server to VSCode before you write a single line of code',
        concept: `Extensions are plugins that bolt extra functionality directly into VSCode. Three of them are non-negotiable for web development. Prettier is an opinionated code formatter — the moment you save a file it automatically reformats your code to be consistent: correct indentation, consistent quote style, trailing commas where they belong. You never think about formatting again. ESLint is a static analysis tool that reads your JavaScript and flags problems before you run the code — things like using a variable before declaring it or leaving a console.log in production code. Live Server launches a local development server for your HTML files and watches them for changes — the moment you save, the browser refreshes automatically. Without it you would have to manually refresh the browser every single time you changed anything.`,
        instruction: `Open the Extensions panel in VSCode by clicking the four-squares icon on the left sidebar or pressing Ctrl+Shift+X. Search for and install these three extensions one by one: Prettier - Code formatter (by Prettier), ESLint (by Microsoft), Live Server (by Ritwick Dey). Once installed, open your VSCode settings with Ctrl+, and search for "format on save" — enable it. Create a file called extensions.txt inside your stryd-setup folder and write the names of the three extensions you installed. Save it.`,
        resourceUrl: 'https://code.visualstudio.com/docs/editor/extension-marketplace',
        youtubeUrl: 'https://www.youtube.com/watch?v=u21W_tfPVrY',
        order: 2,
        stageId: stageSetup.id,
      },
      {
        title: 'Set up your terminal',
        description: 'Learn to navigate your computer from the command line — this is a skill you will use forever',
        concept: `The terminal is how you talk to your computer without clicking anything. As a developer you will use it constantly — to install packages, run servers, commit code, push to GitHub, run scripts, and much more. Most developer tools have no graphical interface at all and only work from the terminal, so being comfortable here is not optional. On a Mac, the built-in Terminal app works fine. On Windows, install Windows Terminal from the Microsoft Store and configure it to use Git Bash as the default shell — this gives you a Unix-style environment that matches what most tutorials and documentation assume. VSCode has a terminal built in that you can open at any time with Ctrl+\` on Windows or Cmd+\` on Mac. Using the integrated terminal means you never need to switch windows. The most important commands to learn first are: cd to change directory, ls to list files, mkdir to create a folder, touch to create a file, and clear to clean up the screen.`,
        instruction: `Open the integrated terminal in VSCode with Ctrl+\` (backtick). Run the following commands one by one and observe what each one does: pwd (shows your current location), ls (lists files in the current folder), mkdir terminal-practice (creates a new folder), cd terminal-practice (moves into it), touch notes.txt (creates a file), cd .. (moves back up). Create a file called terminal-notes.txt inside your stryd-setup folder and write down what each of those six commands does in your own words. Save it.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line',
        youtubeUrl: 'https://www.youtube.com/watch?v=yz7nYlnXLfE',
        order: 3,
        stageId: stageSetup.id,
      },
      {
        title: 'Install Git',
        description: 'Install Git and configure it with your name and email so you can start tracking your code',
        concept: `Git is a version control system — it tracks every change you make to your code over time. Think of it like a detailed save history for your entire project. At any point you can look back at what the code looked like a week ago, see exactly what lines changed and why, or undo a mistake that broke everything. Git works by taking snapshots of your project called commits. Each commit has a message describing what changed, who changed it, and when. Git is not the same as GitHub — Git is the tool that runs on your machine, GitHub is a website where you store and share your Git repositories online. You need Git installed locally before you can use GitHub.`,
        instruction: `Go to git-scm.com and download Git for your operating system. Install it with all the default options. Once installed, open your terminal in VSCode and run these two commands — replace the values with your own: git config --global user.name "Your Name" and git config --global user.email "you@example.com". Then run git --version to confirm Git installed correctly. Create a file called git-setup.txt inside your stryd-setup folder and paste your git --version output inside it. Save it.`,
        resourceUrl: 'https://git-scm.com/book/en/v2/Getting-Started-Installing-Git',
        youtubeUrl: 'https://www.youtube.com/watch?v=8JJ101D3knE',
        order: 4,
        stageId: stageSetup.id,
      },
      {
        title: 'Set up your GitHub account',
        description: 'Log into GitHub and push your first repository so your code lives online',
        concept: `GitHub is the platform where developers store, share, and collaborate on code. It is built on top of Git — you push your local Git repository to GitHub and it becomes accessible online, backed up, and shareable with anyone. GitHub is also where your portfolio lives. Employers and collaborators will look at your GitHub profile to see what you have built, how consistently you code, and how you write commit messages. Every project you complete on this path should be pushed to GitHub. To get started: create a free account at github.com, create a new repository, connect it to a local folder, and push your first commit.`,
        instruction: `Go to github.com and create a free account if you do not already have one. Once signed in, create a new public repository called stryd-setup. Back in VSCode, open the terminal and navigate to your stryd-setup folder. Run these commands in order: git init, git add ., git commit -m "initial commit", git branch -M main, git remote add origin https://github.com/YOUR_USERNAME/stryd-setup.git, git push -u origin main. Replace YOUR_USERNAME with your actual GitHub username. Go to github.com/YOUR_USERNAME/stryd-setup in your browser and confirm your files are there.`,
        resourceUrl: 'https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github',
        youtubeUrl: 'https://www.youtube.com/watch?v=iv8rSLsi1xo',
        order: 5,
        stageId: stageSetup.id,
      },
      {
        title: 'Install Node.js',
        description: 'Install Node.js and npm — the engine that powers almost every modern web development tool',
        concept: `Node.js is a runtime that lets you execute JavaScript on your machine outside of a browser. Even if you never write server-side code, you still need Node installed because virtually every frontend tool runs on it. npm comes bundled with Node and is the world's largest software registry. When you install a library like React, a build tool like Vite, or a formatter like Prettier via the command line, npm is what fetches and installs it. You will run npm install to add dependencies, npm run dev to start a development server, and npm run build to compile your project for production. Always install the LTS version.`,
        instruction: `Go to nodejs.org and download the LTS version — do not download the Current version. Install it with all default options. Once installed, open your terminal in VSCode and run node -v and npm -v. Both should print version numbers. Create a file called node-setup.txt inside your stryd-setup folder and paste both version numbers inside it. Then push everything to GitHub: git add ., git commit -m "add node setup notes", git push.`,
        resourceUrl: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs',
        youtubeUrl: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
        order: 6,
        stageId: stageSetup.id,
      },
      {
        title: 'Dev environment capstone',
        description: 'Wire everything together and confirm your full setup works end to end',
        concept: `Before moving on to writing real code, verify that all the tools you just installed actually work together as a system. This is the final task of the setup stage. Everything you have installed — VSCode, extensions, terminal, Git, GitHub, Node — needs to work as one connected workflow. If anything breaks here, debug it before moving forward. A shaky environment causes problems that are hard to diagnose later when you are also learning a new language on top of it.`,
        instruction: `Inside your stryd-setup folder, create a new file called index.html and add a basic HTML boilerplate with an h1 that says "My Dev Environment Works". Right-click the file in the Explorer panel and click Open with Live Server. Your browser should open and show the heading. Change the heading text to anything else, save, and watch the browser update automatically. Then commit: git add ., git commit -m "add index.html — environment verified", git push. Go to your GitHub repo and confirm the file is there. If every step worked without errors your environment is fully operational.`,
        order: 7,
        stageId: stageSetup.id,
      },
    ]
  });

  // ── Frontend Path: HTML stage ──────────────────────────
  const stageHTML = await prisma.stage.create({
    data: {
      name: 'HTML',
      description: 'The skeleton of every webpage on the internet',
      order: 1,
      isLocked: false,
      requiredPlan: 'free',
      expectedRepo: 'stryd-html',
      pathId: pathFrontend.id,
    }
  });

  await prisma.stage.createMany({
    data: [
      { name: 'CSS', description: 'Style and lay out your webpages', order: 2, isLocked: true, requiredPlan: 'basic', expectedRepo: 'stryd-css', pathId: pathFrontend.id },
      { name: 'JavaScript', description: 'Make your pages interactive and dynamic', order: 3, isLocked: true, requiredPlan: 'basic', expectedRepo: 'stryd-javascript', pathId: pathFrontend.id },
      { name: 'React', description: 'Build component-based UIs at scale', order: 4, isLocked: true, requiredPlan: 'basic', expectedRepo: 'stryd-react', pathId: pathFrontend.id },
      { name: 'Projects', description: 'Build real projects from scratch', order: 5, isLocked: true, requiredPlan: 'basic', expectedRepo: 'stryd-projects', pathId: pathFrontend.id },
      { name: 'Capstone', description: 'Your final project — build something real', order: 6, isLocked: true, requiredPlan: 'basic', expectedRepo: 'stryd-capstone', pathId: pathFrontend.id },
    ]
  });

  await prisma.task.createMany({
    data: [
      {
        title: 'Introduction to HTML',
        description: 'Understand what HTML actually is and how a browser turns it into a webpage',
        concept: `HTML stands for HyperText Markup Language and it is the raw material of every single webpage on the internet. When you visit any website your browser downloads an HTML file and uses it to construct what you see on screen. HTML is not a programming language — it is a markup language, which means its job is to describe the structure and meaning of content using tags. A tag is a keyword wrapped in angle brackets like <p> or <h1>. Most tags come in pairs: an opening tag and a closing tag, with content sitting between them. When a browser loads your HTML it reads it from top to bottom and constructs something called the DOM — a tree-like representation of your page in memory. This is the structure that CSS styles and JavaScript manipulates. Every web technology you learn from here operates on top of the HTML foundation.`,
        instruction: `Create a new public repository on GitHub called stryd-html. Clone it to your machine and open it in VSCode. Inside it, create a folder called task-01-intro. Inside that folder create a file called notes.html. Build a basic HTML page that includes: a DOCTYPE declaration, an html element with a lang attribute, a head with a title that says "HTML Notes", and a body containing an h1 with the text "What is HTML" followed by a paragraph in your own words explaining what HTML is and what the DOM is. Open it with Live Server and confirm it renders. Then push: git add ., git commit -m "task 01 - html intro", git push.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started',
        youtubeUrl: 'https://www.youtube.com/watch?v=qz0aGYrrlhU',
        order: 1,
        stageId: stageHTML.id,
      },
      {
        title: 'Your first HTML file',
        description: 'Create an HTML file from scratch and understand every line of the boilerplate',
        concept: `Every HTML document starts with the same boilerplate structure. The first line is always <!DOCTYPE html> — this tells the browser you are writing modern HTML5. After the doctype comes the <html> element, which is the root of the entire document. Inside <html> are two children: <head> and <body>. The <head> element is for metadata — information about the page that is not displayed to users. This includes the <title>, the charset meta tag which tells the browser to use UTF-8 encoding so special characters render correctly, and the viewport meta tag which controls how the page scales on mobile. The <body> element contains everything the user actually sees. Think of <head> as the behind-the-scenes configuration and <body> as the stage.`,
        instruction: `Inside your stryd-html folder, create a folder called task-02-boilerplate. Inside it, create index.html. Without copying and pasting, type out the full HTML boilerplate from memory: DOCTYPE, html with lang attribute, head with charset meta, viewport meta, and a title, then a body with an h1 that says your name. Open it with Live Server and confirm it renders. Check the browser tab — it should show your title text. Push: git add ., git commit -m "task 02 - first html file", git push.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started',
        youtubeUrl: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
        order: 2,
        stageId: stageHTML.id,
      },
      {
        title: 'Headings, paragraphs and text formatting',
        description: 'Structure text content correctly using headings, paragraphs, and emphasis tags',
        concept: `HTML gives you a precise set of tools for marking up text with meaning. Headings run from <h1> to <h6> and represent a hierarchy of importance. <h1> is the main title of the page — there should typically be only one per page. <h2> is used for major sections, <h3> for subsections within those. These heading levels are not just about visual size — they create an outline of your document that screen readers navigate, and search engines use them to understand your page. Paragraphs go inside <p> tags. For emphasis, <strong> marks text as strongly important and <em> marks text as stressed. These are semantic tags — when you use them you are telling the browser that this text carries extra meaning, not just a different appearance.`,
        instruction: `Inside your stryd-html folder, create a folder called task-03-text. Inside it create index.html with the full boilerplate. In the body, build a page about any topic you like — a sport, a movie, a person, anything. The page must include: one h1 as the main title, at least two h2 headings as section titles, at least one h3 as a subsection inside one of those sections, at least three paragraphs of real written content, at least one <strong> and one <em> used with genuine meaning. Open in Live Server, confirm it renders, push: git add ., git commit -m "task 03 - text formatting", git push.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals',
        youtubeUrl: 'https://www.youtube.com/watch?v=yTHTo28hwTQ',
        order: 3,
        stageId: stageHTML.id,
      },
      {
        title: 'Links and navigation',
        description: 'Connect pages together using anchor tags — the core mechanic of the entire web',
        concept: `The anchor element <a> is arguably the most important tag in HTML. It is the mechanic that turns a collection of separate pages into the web. The destination is specified with the href attribute. An absolute URL like https://example.com is used to link to external websites. A relative URL like ./about.html is used to link between pages within your own project. By default, clicking a link navigates the current tab to the new page. Adding target="_blank" opens the link in a new tab. When you use target="_blank" you should also add rel="noopener noreferrer" for security. The <a> tag can wrap almost any element — text, image, button — to make it clickable.`,
        instruction: `Inside your stryd-html folder, create a folder called task-04-links. Inside it create two files: index.html and about.html. In index.html add full boilerplate and a nav element containing two links — one to ./about.html (internal link) and one to https://github.com (external, opens in new tab with rel="noopener noreferrer"). In about.html add full boilerplate and a link back to ./index.html. Click between the pages in Live Server and confirm navigation works both ways. Push: git add ., git commit -m "task 04 - links", git push.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks',
        youtubeUrl: 'https://www.youtube.com/watch?v=MExJ_SaFUc0',
        order: 4,
        stageId: stageHTML.id,
      },
      {
        title: 'Images in HTML',
        description: 'Embed images into your pages correctly and accessibly using the img tag',
        concept: `The <img> tag embeds an image into your page. It is a void element — it has no closing tag because the image itself is the content. It has two attributes you must always include. The src attribute is the path or URL pointing to the image file — this can be a relative path to a local file or a full URL to an image hosted online. The alt attribute is alternative text — a written description of what the image shows. Screen readers read the alt text aloud. Search engines use it to understand the image. If the image fails to load, the alt text is what appears. A good alt text is specific and descriptive. For purely decorative images that add no meaning, use an empty alt attribute alt="" — this tells screen readers to skip it.`,
        instruction: `Inside your stryd-html folder, create a folder called task-05-images. Inside it create an images subfolder and download any two images into it. Create index.html with full boilerplate. In the body add: one image using a relative path to your local images folder with a descriptive alt text, one image using a full external URL with a descriptive alt text, and one purely decorative image with an empty alt attribute. Open in Live Server and confirm all three render. Push: git add ., git commit -m "task 05 - images", git push.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML',
        youtubeUrl: 'https://www.youtube.com/watch?v=0xoztJCHpbQ',
        order: 5,
        stageId: stageHTML.id,
      },
      {
        title: 'Lists — ordered and unordered',
        description: 'Mark up collections of related items using ordered and unordered lists',
        concept: `HTML gives you two main list types. An unordered list <ul> is for items where the sequence does not matter — it renders with bullet points by default. Use it for features, links, or any collection where order is irrelevant. An ordered list <ol> is for items where sequence matters — it renders with numbers. Use it for steps or rankings. Each item goes inside an <li> tag. The only valid direct child of a <ul> or <ol> is an <li>. Inside each <li> you can put anything — including another list. Nested lists create hierarchical structures, which is how multi-level navigation menus are commonly built in HTML.`,
        instruction: `Inside your stryd-html folder, create a folder called task-06-lists. Inside it create index.html with full boilerplate. In the body build three lists: an unordered list of at least five things you want to learn as a developer, an ordered list of at least five steps to make your favourite meal, and a nested list — an unordered list with at least two items that each contain their own sub-list. Open in Live Server, confirm all three render correctly, push: git add ., git commit -m "task 06 - lists", git push.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals',
        youtubeUrl: 'https://www.youtube.com/watch?v=09oErCBjVns',
        order: 6,
        stageId: stageHTML.id,
      },
      {
        title: 'Tables',
        description: 'Display structured, relational data in rows and columns using HTML tables',
        concept: `HTML tables are for presenting data with a grid-like structure — pricing plans, league standings, comparison charts, timetables. The outer wrapper is <table>. Inside it you have rows marked with <tr>. Inside each row you have cells — either <th> for header cells or <td> for data cells. For better structure wrap groups of rows in <thead>, <tbody>, and <tfoot>. One critical rule: tables are for data, not for layout. Using tables for layout is completely outdated and inaccessible — use CSS Grid or Flexbox for layout and reserve tables strictly for data.`,
        instruction: `Inside your stryd-html folder, create a folder called task-07-tables. Inside it create index.html with full boilerplate. Build a table that compares three technologies — HTML, CSS, and JavaScript — across four columns: Language, Type, Used For, and Difficulty. The table must include a <thead> with <th> header cells, a <tbody> with three rows of real data, and a <tfoot> with a row that says "More languages coming soon" spanning all four columns using the colspan attribute. Open in Live Server, confirm it renders correctly, push: git add ., git commit -m "task 07 - tables", git push.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics',
        youtubeUrl: 'https://www.youtube.com/watch?v=dK0AptFbxvM',
        order: 7,
        stageId: stageHTML.id,
      },
      {
        title: 'HTML Forms',
        description: 'Build forms that collect user input using inputs, labels, and buttons',
        concept: `Forms are the primary mechanism through which users interact with web applications — every login screen, search bar, sign-up flow, and checkout page is built with HTML form elements. The <form> element is the container. Inside it, <input> is the most versatile element — its type attribute determines what kind of input renders: text, email, password, checkbox, radio, file. Every input must be associated with a <label> using the for attribute on the label matching the id on the input — critical for accessibility. For longer text use <textarea>. For a dropdown use <select> with <option> elements inside. The <button type="submit"> triggers form submission.`,
        instruction: `Inside your stryd-html folder, create a folder called task-08-forms. Inside it create index.html with full boilerplate. Build a sign-up form for a fictional coding bootcamp. The form must include: a text input for full name with a label, an email input with a label, a password input with a label, a select dropdown for "How did you hear about us" with at least four options, a checkbox for agreeing to terms with a label, and a submit button that says "Join the bootcamp". Every single input must have a matching label using for and id. Open in Live Server and confirm the form renders. Push: git add ., git commit -m "task 08 - html forms", git push.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form',
        youtubeUrl: 'https://www.youtube.com/watch?v=fNcJuPIZ2WE',
        order: 8,
        stageId: stageHTML.id,
      },
      {
        title: 'Semantic HTML',
        description: 'Use meaningful tags that describe your content — not just divs for everything',
        concept: `Semantic HTML means choosing tags that describe the meaning and role of your content, not just its appearance. The opposite is using <div> for everything — technically it works but it tells the browser, screen readers, and search engines nothing about what each part of the page does. HTML5 introduced semantic landmark elements: <header> wraps the top of a page, <nav> wraps navigation links, <main> wraps the primary content with only one per page, <article> is for self-contained content like a blog post, <section> groups related content with its own heading, <aside> is for tangentially related content like a sidebar, and <footer> wraps the bottom of the page. Screen readers navigate by these landmarks, search engines weight content based on structure, and your code becomes readable and maintainable.`,
        instruction: `Inside your stryd-html folder, create a folder called task-09-semantic. Inside it create index.html with full boilerplate. Rebuild your task-03 page but structure it entirely with semantic elements. The page must include: a <header> with the site name and a <nav> with at least two links, a <main> containing at least two <section> elements each with a heading and paragraphs, one <article> inside one of those sections with its own heading and content, an <aside> with a related tip or note, and a <footer> with your name and a copyright line. No layout divs — every wrapper must be a semantic element. Open in Live Server, confirm it renders, push: git add ., git commit -m "task 09 - semantic html", git push.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics',
        youtubeUrl: 'https://www.youtube.com/watch?v=kGW8Al_cga4',
        order: 9,
        stageId: stageHTML.id,
      },
      {
        title: 'Build a personal profile page',
        description: 'Put everything together and build a profile page about yourself in pure HTML',
        concept: `This is your first real project. No tutorials to follow, no starter code, no step-by-step instructions beyond the minimum requirements. You are going to build a static personal profile page using only HTML — combining everything you have learned in this stage. The goal is not to build something that looks impressive without CSS. The goal is to prove you can construct a well-structured, semantic, accessible HTML document from a blank file with no hand-holding. Every element should be chosen intentionally. Ask yourself: is this the right tag for this content? Is every image labelled? Is every input linked to a label? Is the heading hierarchy correct?`,
        instruction: `Inside your stryd-html folder, create a folder called task-10-profile. Inside it build a personal profile page in index.html. The page must include: your name as the h1, a profile image with a descriptive alt text, a short bio paragraph, a section listing your skills as an unordered list, a section with an ordered list of your top three goals as a developer, a contact form with name, email, and message inputs all properly labelled, and a footer with your GitHub link. Structure everything with semantic elements — header, nav, main, sections, footer. No CSS. Review every element before pushing. Push: git add ., git commit -m "task 10 - profile page", git push.`,
        order: 10,
        stageId: stageHTML.id,
      },
      {
        title: 'Build a product landing page',
        description: 'Build a structured product landing page with multiple sections, images, and a form',
        concept: `Landing pages are one of the most common page types you will build as a frontend developer. Every SaaS product, app, and business has one — a page designed to communicate what something is and convince the visitor to take an action. The structure of a good landing page is predictable: a hero section at the top with a strong headline, a features or benefits section, some imagery, and a call to action at the bottom. In pure HTML this structure is built entirely with semantic elements and good heading hierarchy. The visual design comes later with CSS — your job right now is to get the structure right.`,
        instruction: `Inside your stryd-html folder, create a folder called task-11-landing. Pick a fictional product — an app, a service, anything. Build index.html as a landing page for it. The page must include: a <header> with the product name and nav, a hero <section> with an h1 headline, a subheading, and a short paragraph, a features <section> with an h2 and at least three feature items each with a heading and description, an images <section> with at least two images and proper alt text, a sign-up <section> with a form containing name, email, and a submit button all properly labelled, and a <footer>. Review every element before pushing. Push: git add ., git commit -m "task 11 - landing page", git push.`,
        order: 11,
        stageId: stageHTML.id,
      },
      {
        title: 'HTML Capstone — full static website',
        description: 'Build a complete multi-page website from scratch with no guidance or starter code',
        concept: `This is the final project for the HTML stage and it is entirely open-ended. Pick a topic you actually care about — a hobby, a business idea, a subject you know well — and build a complete multi-page static website about it. There is no template and no design to copy. This is deliberate. Real projects do not come with instructions. The minimum requirements exist to ensure you demonstrate everything you have learned — but within those requirements all decisions are yours. Structure, content, how many pages beyond the minimum, what the forms collect, how the navigation is organised — all of it is your call.`,
        instruction: `Inside your stryd-html folder, create a folder called task-12-capstone. Build a complete multi-page website on any topic. Minimum requirements: at least three linked pages (home, about, and one more of your choice), every page must have full boilerplate, a consistent <nav> that links all pages, correct heading hierarchy, semantic landmark elements throughout, at least one image per page with alt text, at least one form with properly labelled inputs somewhere across the site, and a footer on every page. Before pushing, open every page in Live Server and check: do all links work, are all images loading, is every input labelled, is the heading hierarchy correct? Fix everything that is wrong. Push: git add ., git commit -m "task 12 - html capstone", git push.`,
        order: 12,
        stageId: stageHTML.id,
      },
    ]
  });

  console.log('Seeded successfully 🔒');
}

seedDatabase()
  .catch(console.error)
  .finally(() => prisma.$disconnect());