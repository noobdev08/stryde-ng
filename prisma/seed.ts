import prisma from '../src/utils/lib/prismaClient';

async function seedDatabase() {

  // ── Paths ──────────────────────────────────────────────
  const pathVSCode = await prisma.path.create({
    data: {
      name: 'Dev Environment',
      description: 'Set up your machine before writing a single line of code',
      isLocked: false,
      order: 1,
    }
  });

  const pathFrontend = await prisma.path.create({
    data: {
      name: 'Frontend',
      description: 'Learn frontend development from scratch',
      isLocked: true,
      order: 2,
    }
  });

  await prisma.path.createMany({
    data: [
      { name: 'Backend', description: 'Learn backend development', isLocked: true, order: 3 },
      { name: 'Fullstack', description: 'Combine frontend and backend', isLocked: true, order: 4 },
    ]
  });

  // ── Dev Environment ────────────────────────────────────
  const stageSetup = await prisma.stage.create({
    data: {
      name: 'Setup',
      description: 'Install everything you need to start coding',
      order: 1,
      isLocked: false,
      pathId: pathVSCode.id,
    }
  });

  await prisma.task.createMany({
    data: [
      {
        title: 'Install VSCode',
        description: 'Download and install Visual Studio Code — the editor you will spend most of your time in',
        concept: `Visual Studio Code (VSCode) is a free, open-source code editor built by Microsoft. It has become the industry standard for web development — the vast majority of frontend, backend, and fullstack developers use it daily. Unlike a basic text editor like Notepad, VSCode understands your code. It highlights syntax in different colours so the structure is easy to read, flags errors before you even run anything, autocompletes variable names and functions as you type, and lets you navigate large codebases without getting lost. Under the hood it is built on Electron, which means it runs the same way on Mac, Windows, and Linux. It also has a built-in file explorer on the left, an integrated terminal so you never need to leave the editor, and a Git panel that shows you exactly what you have changed. The extension marketplace has tens of thousands of plugins that add support for every language and framework imaginable. You will be inside this editor every single day — it is worth getting comfortable with it from the start.`,
        resourceUrl: 'https://code.visualstudio.com/docs/setup/setup-overview',
        youtubeUrl: 'https://www.youtube.com/watch?v=MlIzFUI1QGA',
        order: 1,
        stageId: stageSetup.id,
      },
      {
        title: 'Install essential extensions',
        description: 'Add Prettier, ESLint, and Live Server to VSCode before you write a single line of code',
        concept: `Extensions are plugins that bolt extra functionality directly into VSCode. Three of them are non-negotiable for web development. Prettier is an opinionated code formatter — the moment you save a file it automatically reformats your code to be consistent: correct indentation, consistent quote style, trailing commas where they belong. You never think about formatting again, which means you also never argue about it with teammates. ESLint is a static analysis tool that reads your JavaScript and flags problems before you run the code — things like using a variable before declaring it, calling a function that does not exist, or leaving a console.log in production code. It enforces rules that keep your codebase clean and catches bugs early. Live Server launches a local development server for your HTML files and watches them for changes — the moment you save, the browser refreshes automatically. Without it you would have to manually refresh the browser every single time you changed anything, which adds up to hundreds of interruptions per day. To install any of these, click the Extensions icon on the left sidebar (it looks like four squares), search the name, and click Install.`,
        resourceUrl: 'https://code.visualstudio.com/docs/editor/extension-marketplace',
        youtubeUrl: 'https://www.youtube.com/watch?v=u21W_tfPVrY',
        order: 2,
        stageId: stageSetup.id,
      },
      {
        title: 'Set up your terminal',
        description: 'Learn to navigate your computer from the command line — this is a skill you will use forever',
        concept: `The terminal (also called the command line or shell) is a text-based interface for controlling your computer. Instead of clicking icons and dragging files, you type commands. As a developer you will use it constantly — to navigate between folders, create and delete files, install packages, start and stop servers, commit code, push to GitHub, run scripts, and much more. Most developer tools have no graphical interface at all and only work from the terminal, so being comfortable here is not optional. On a Mac, the built-in Terminal app works fine. On Windows, install Windows Terminal from the Microsoft Store and configure it to use Git Bash as the default shell — this gives you a Unix-style environment that matches what most tutorials and documentation assume. VSCode has a terminal built in that you can open at any time with the keyboard shortcut Ctrl+ (backtick) on Windows or Cmd+ (backtick) on Mac. Using the integrated terminal means you never need to switch windows — you write code and run commands in the same place. The most important commands to learn first are: cd to change directory, ls (or dir on Windows) to list files, mkdir to create a folder, touch to create a file, and clear to clean up the screen.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line',
        youtubeUrl: 'https://www.youtube.com/watch?v=yz7nYlnXLfE',
        order: 3,
        stageId: stageSetup.id,
      },
      {
        title: 'Install Git',
        description: 'Install Git and configure it with your name and email so you can start tracking your code',
        concept: `Git is a version control system — it tracks every change you make to your code over time. Think of it like a detailed save history for your entire project. At any point you can look back at what the code looked like a week ago, see exactly what lines changed and why, undo a mistake that broke everything, or work on a new feature without touching your stable code. Git works by taking snapshots of your project called commits. Each commit has a message describing what changed, who changed it, and when. Over time these commits build up into a timeline of your entire project history. Git is not the same as GitHub — Git is the tool that runs on your machine, GitHub is a website where you store and share your Git repositories online. You need Git installed locally before you can use GitHub. To install, go to git-scm.com and download the installer for your OS. After installing, you need to configure it with your identity: run git config --global user.name "Your Name" and git config --global user.email "you@example.com" in your terminal. Git uses this information to label every commit you make, so collaborators know who changed what.`,
        resourceUrl: 'https://git-scm.com/book/en/v2/Getting-Started-Installing-Git',
        youtubeUrl: 'https://www.youtube.com/watch?v=8JJ101D3knE',
        order: 4,
        stageId: stageSetup.id,
      },
      {
        title: 'Create a GitHub account',
        description: 'Sign up for GitHub and push your first repository so your code lives online',
        concept: `GitHub is the platform where developers store, share, and collaborate on code. It is built on top of Git — you push your local Git repository to GitHub and it becomes accessible online, backed up, and shareable with anyone. GitHub is also where your portfolio lives. Employers and collaborators will look at your GitHub profile to see what you have built, how consistently you code, and how you write commit messages. Every project you complete on this path should be pushed to GitHub. Beyond storage, GitHub has features like pull requests (a structured way to propose code changes), issues (for tracking bugs and tasks), and GitHub Pages (free hosting for static websites). To get started: create a free account at github.com, then create a new repository, follow the instructions to connect it to a local folder on your machine, and push your first commit. The commands you need are git remote add origin [url], git branch -M main, and git push -u origin main. After that first setup, pushing new commits is just git push.`,
        resourceUrl: 'https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github',
        youtubeUrl: 'https://www.youtube.com/watch?v=iv8rSLsi1xo',
        order: 5,
        stageId: stageSetup.id,
      },
      {
        title: 'Install Node.js',
        description: 'Install Node.js and npm — the engine that powers almost every modern web development tool',
        concept: `Node.js is a runtime that lets you execute JavaScript on your machine outside of a browser. Before Node existed, JavaScript could only run inside a browser tab. Node changed that — it brought JavaScript to the server side and to local tooling. Even if you never write server-side code, you still need Node installed because virtually every frontend tool runs on it. npm (Node Package Manager) comes bundled with Node and is the world's largest software registry. When you install a library like React, a build tool like Vite, or a formatter like Prettier via the command line, npm is what fetches and installs it. You will run npm install to add dependencies to a project, npm run dev to start a development server, and npm run build to compile your project for production. To install Node, go to nodejs.org and download the LTS (Long Term Support) version — LTS means it is the stable, well-tested release recommended for most users. Avoid the Current version for now as it may have bugs. After installing, open your terminal and run node -v and npm -v to confirm both installed correctly. You should see version numbers printed back.`,
        resourceUrl: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs',
        youtubeUrl: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
        order: 6,
        stageId: stageSetup.id,
      },
      {
        title: 'Dev environment capstone',
        description: 'Wire everything together and confirm your full setup works end to end',
        concept: `Before moving on to writing real code, you need to verify that all the tools you just installed actually work together as a system. Here is what to do: open VSCode and create a new folder called dev-test somewhere on your machine. Open that folder in VSCode using File > Open Folder. Open the integrated terminal with Ctrl+\` and run git init to initialise a Git repository inside it. Create a new file called index.html and add a basic HTML boilerplate — just the DOCTYPE, html, head, and body tags with a heading inside. Right-click the file in the explorer and click Open with Live Server — your browser should open and show the heading. Now go back to VSCode, change the heading text, and save the file. The browser should update automatically without you refreshing. Next, go back to the terminal and run git add . followed by git commit -m "initial commit" to make your first commit. Finally, create a new empty repository on GitHub and push your local repo to it using the commands GitHub shows you. If every one of those steps worked without errors, your environment is fully operational and you are ready to start building.`,
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
      pathId: pathFrontend.id,
    }
  });

  await prisma.stage.createMany({
    data: [
      { name: 'CSS', description: 'Style and lay out your webpages', order: 2, isLocked: true, pathId: pathFrontend.id },
      { name: 'JavaScript', description: 'Make your pages interactive and dynamic', order: 3, isLocked: true, pathId: pathFrontend.id },
      { name: 'React', description: 'Build component-based UIs at scale', order: 4, isLocked: true, pathId: pathFrontend.id },
      { name: 'Projects', description: 'Build real projects from scratch', order: 5, isLocked: true, pathId: pathFrontend.id },
      { name: 'Capstone', description: 'Your final project — build something real', order: 6, isLocked: true, pathId: pathFrontend.id },
    ]
  });

  await prisma.task.createMany({
    data: [
      {
        title: 'Introduction to HTML',
        description: 'Understand what HTML actually is and how a browser turns it into a webpage',
        concept: `HTML stands for HyperText Markup Language and it is the raw material of every single webpage on the internet. When you visit any website — a news article, an online store, a social media feed — your browser downloads an HTML file and uses it to construct what you see on screen. HTML is not a programming language. It does not have variables, loops, or logic. It is a markup language, which means its job is to describe the structure and meaning of content using tags. A tag is a keyword wrapped in angle brackets like <p> or <h1>. Most tags come in pairs: an opening tag like <p> and a closing tag like </p>, with content sitting between them. Together they form an element. Elements can be nested inside each other to build hierarchy — a list item inside a list, a link inside a paragraph, an image inside a figure. When a browser loads your HTML, it reads it from top to bottom and constructs something called the DOM (Document Object Model) — a tree-like representation of your page in memory. This is the structure that CSS styles and JavaScript manipulates. Every web technology you learn from here — CSS, JavaScript, React — operates on top of the HTML foundation. If the HTML is wrong or poorly structured, everything built on top of it is compromised. Understanding HTML deeply is not optional — it is the bedrock.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started',
        youtubeUrl: 'https://www.youtube.com/watch?v=qz0aGYrrlhU',
        order: 1,
        stageId: stageHTML.id,
      },
      {
        title: 'Your first HTML file',
        description: 'Create an HTML file from scratch and understand every line of the boilerplate',
        concept: `Every HTML document starts with the same boilerplate structure — a set of required lines that tell the browser what kind of file it is and how to handle it. The first line is always <!DOCTYPE html>. This declaration tells the browser you are writing modern HTML5 and not an older version of the standard. Without it, browsers fall into what is called quirks mode — where they make assumptions about your markup based on old, inconsistent rules from the early web. After the doctype comes the <html> element, which is the root of the entire document. Everything else lives inside it. The lang attribute on the html tag (for example lang="en") tells browsers and screen readers what language the page is written in. Inside <html> are two children: <head> and <body>. The <head> element is for metadata — information about the page that is not displayed to users. This includes the <title> (what appears in the browser tab), the charset meta tag (which tells the browser to use UTF-8 encoding so special characters render correctly), and the viewport meta tag (which controls how the page scales on mobile devices). The <body> element contains everything the user actually sees — your headings, paragraphs, images, links, forms. Think of <head> as the behind-the-scenes configuration and <body> as the stage. This boilerplate is not optional or stylistic — it is the correct, standards-compliant way to begin every HTML document you will ever write.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started',
        youtubeUrl: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
        order: 2,
        stageId: stageHTML.id,
      },
      {
        title: 'Headings, paragraphs and text formatting',
        description: 'Structure text content correctly using headings, paragraphs, and emphasis tags',
        concept: `Text is the primary content of most webpages, and HTML gives you a precise set of tools for marking it up with meaning. Headings run from <h1> to <h6> and represent a hierarchy of importance. <h1> is the main title of the page — there should typically be only one per page. <h2> is used for major sections, <h3> for subsections within those, and so on down to <h6>. These heading levels are not just about visual size — they create an outline of your document that screen readers navigate, and search engines use them to understand what your page is about. A well-structured heading hierarchy is important for accessibility and SEO. Paragraphs go inside <p> tags. The browser automatically adds spacing between paragraphs, and any extra whitespace or line breaks you add inside a <p> in your code are collapsed to a single space — so you control spacing through CSS, not by hammering the enter key. For inline text emphasis, <strong> marks text as strongly important (rendered bold by default) and <em> marks text as stressed emphasis (rendered italic by default). The key thing to understand is that these are semantic tags, not visual ones. If you want bold text for purely decorative reasons, you would use CSS instead. When you use <strong> and <em>, you are telling the browser — and anything else reading the page — that this text has extra meaning, not just a different look.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals',
        youtubeUrl: 'https://www.youtube.com/watch?v=yTHTo28hwTQ',
        order: 3,
        stageId: stageHTML.id,
      },
      {
        title: 'Links and navigation',
        description: 'Connect pages together using anchor tags — the core mechanic of the entire web',
        concept: `The anchor element <a> is arguably the most important tag in HTML. It is the mechanic that turns a collection of separate pages into the web — the ability to click something and go somewhere else. The destination is specified with the href (hypertext reference) attribute. There are two types of href values you will use constantly. An absolute URL is a full web address like https://example.com/about — you use these to link to external websites. A relative URL is a path relative to the current file like /about or ../contact.html — you use these to link between pages within your own project. By default, clicking a link navigates the current tab to the new page. Adding target="_blank" opens the link in a new tab instead, which is typically used for external links so the user does not leave your site. When you use target="_blank", you should also add rel="noopener noreferrer" for security reasons — without it, the page you link to can access and manipulate your page via JavaScript. The <a> tag is an inline element, which means it flows with surrounding text. But it can wrap almost any other element — an image, a button, a div — to make that element into a clickable link. Navigation menus are typically built as an unordered list of anchor tags inside a <nav> element.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks',
        youtubeUrl: 'https://www.youtube.com/watch?v=MExJ_SaFUc0',
        order: 4,
        stageId: stageHTML.id,
      },
      {
        title: 'Images in HTML',
        description: 'Embed images into your pages correctly and accessibly using the img tag',
        concept: `The <img> tag embeds an image into your page. Unlike most HTML elements, it is a void element — it has no closing tag and no content between tags, because the image itself is the content. It has two attributes you must always include. The src attribute is the source — the path or URL pointing to the image file. This can be a relative path to a local file like images/photo.jpg or a full URL to an image hosted online. The alt attribute is alternative text — a written description of the image. This is not optional. Screen readers read the alt text aloud to users who cannot see the image. Search engines use it to understand what the image shows. And if the image fails to load — because of a broken URL, a slow connection, or a user who has disabled images — the alt text is what appears instead. A good alt text describes what is in the image specifically enough to be useful: "a red bicycle leaning against a brick wall" is good, "image" or "photo" is useless. For purely decorative images that add no meaning, you can use an empty alt attribute alt="" — this tells screen readers to skip the image rather than announcing it. Images are inline elements by default, meaning they sit within the flow of text. You will almost always control their sizing, spacing, and layout with CSS rather than the width and height HTML attributes, though setting those attributes still matters for preventing layout shift while the page loads.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML',
        youtubeUrl: 'https://www.youtube.com/watch?v=0xoztJCHpbQ',
        order: 5,
        stageId: stageHTML.id,
      },
      {
        title: 'Lists — ordered and unordered',
        description: 'Mark up collections of related items using ordered and unordered lists',
        concept: `Lists are one of the most common patterns on the web — navigation menus, feature lists, step-by-step instructions, ingredients, search results, social media feeds. HTML gives you two main list types. An unordered list <ul> is for items where the sequence does not matter. It renders with bullet points by default. You would use it for a list of features, a set of links, or any collection where the items are equally important and interchangeable. An ordered list <ol> is for items where sequence matters. It renders with numbers by default. You would use it for numbered steps in a tutorial, a ranked list, or instructions that must be followed in order. In both cases, each item in the list goes inside an <li> (list item) tag. The only valid direct child of a <ul> or <ol> is an <li>. Inside each <li> you can put anything — text, links, images, even another list. That last point is important: lists can be nested. To create a sub-list, you place a new <ul> or <ol> inside an <li>. This is how multi-level navigation menus are commonly structured in HTML. The visual appearance of lists — the bullet style, the numbering format, the indentation — is all controlled by CSS, not by the HTML tags themselves. The HTML just establishes the structure and meaning.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals',
        youtubeUrl: 'https://www.youtube.com/watch?v=09oErCBjVns',
        order: 6,
        stageId: stageHTML.id,
      },
      {
        title: 'Tables',
        description: 'Display structured, relational data in rows and columns using HTML tables',
        concept: `HTML tables are for presenting data that has a relational, grid-like structure — the kind of data you might put in a spreadsheet. Think pricing plans, sports league standings, comparison charts, or timetables. A table is built from several nested elements. The outer wrapper is <table>. Inside it you have rows, each marked with <tr> (table row). Inside each row you have cells — either <th> (table header) for heading cells, or <td> (table data) for regular data cells. Header cells are bold and centred by default and are used in the first row or first column to label what each column or row represents. For better structure and accessibility, you can also wrap groups of rows in <thead> (the header section), <tbody> (the main data), and <tfoot> (totals or summaries at the bottom). These semantic groupings help screen readers announce the table correctly and give you CSS hooks for styling sections differently. One critical rule: tables are for data, not for layout. In the early web, developers used tables to control page layout because CSS support was poor. That practice is now completely outdated and considered bad practice — screen readers announce table cells as data cells, which makes table-based layouts confusing and inaccessible. Use CSS Grid or Flexbox for layout, and reserve tables strictly for data that genuinely belongs in rows and columns.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics',
        youtubeUrl: 'https://www.youtube.com/watch?v=dK0AptFbxvM',
        order: 7,
        stageId: stageHTML.id,
      },
      {
        title: 'HTML Forms',
        description: 'Build forms that collect user input using inputs, labels, and buttons',
        concept: `Forms are the primary mechanism through which users interact with web applications — every login screen, search bar, sign-up flow, checkout page, and settings panel is built with HTML form elements. The <form> element is the container. It has two important attributes: action (the URL the form data is sent to when submitted) and method (either GET for passing data in the URL or POST for sending it in the request body — POST is used for sensitive data like passwords). Inside the form, <input> is the most versatile element. Its type attribute determines what kind of input it renders: type="text" for a single line of text, type="email" for an email address with built-in validation, type="password" for hidden characters, type="checkbox" for a tick box, type="radio" for a single choice from a group, type="file" for uploading a file, and type="hidden" for data you want to submit but not show. Every input must be associated with a <label> element. Labels are critical for accessibility — they tell screen readers what an input is for, and clicking a label focuses the associated input. You link them using the for attribute on the label and the id attribute on the input — the values must match exactly. For longer text, use <textarea> instead of an input. For a dropdown selector, use <select> with <option> elements inside. The <button type="submit"> element triggers the form submission. Proper form structure — correct labels, logical tab order, appropriate input types — is one of the most overlooked but important aspects of building usable, accessible web applications.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form',
        youtubeUrl: 'https://www.youtube.com/watch?v=fNcJuPIZ2WE',
        order: 8,
        stageId: stageHTML.id,
      },
      {
        title: 'Semantic HTML',
        description: 'Use meaningful tags that describe your content — not just divs for everything',
        concept: `Semantic HTML means choosing tags that describe the meaning and role of your content, not just its appearance. The opposite of semantic HTML is using <div> for everything — technically it works, but it tells the browser, screen readers, and search engines absolutely nothing about what each part of the page is or does. HTML5 introduced a set of semantic landmark elements specifically for page structure. <header> wraps the top of a page or section — typically contains the logo, site title, and primary navigation. <nav> wraps navigation links — the browser and screen readers recognise this as the navigation region of the page. <main> wraps the primary content of the page — there should be only one per page, and it should not include headers, footers, or sidebars. <article> is for self-contained content that would make sense in isolation — a blog post, a news article, a product card, a comment. <section> groups related content together and typically has its own heading. <aside> is for content that is tangentially related to the main content — a sidebar, a pull quote, related links. <footer> wraps the bottom of the page or section — typically contains copyright info, secondary links, and contact details. Beyond layout, other semantic choices matter too: use <button> for interactive controls (not a styled div), use <time> for dates, use <figure> and <figcaption> for images with captions. The payoff of writing semantic HTML is significant — screen readers navigate by landmarks, search engines weight content based on structure, browsers apply sensible default styling, and your code becomes readable and maintainable.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics',
        youtubeUrl: 'https://www.youtube.com/watch?v=kGW8Al_cga4',
        order: 9,
        stageId: stageHTML.id,
      },
      {
        title: 'Build a personal profile page',
        description: 'Put everything together and build a profile page about yourself in pure HTML',
        concept: `This is your first real project — no tutorials to follow step by step, no starter code to fill in. You are going to build a static personal profile page using only HTML. The page should include your name as an h1 heading, a short bio as a paragraph, a profile image with proper alt text, a list of your skills or interests, and at least one link to somewhere — your GitHub, a project, anything. Every element should be chosen intentionally: use the right tag for the right job, structure the document with proper boilerplate, and use semantic tags to divide the page into meaningful sections. The goal of this project is not to build something that looks impressive — it will not look like much without CSS and that is fine. The goal is to prove to yourself that you can construct a well-structured HTML document from a blank file with no hand-holding. When you are done, open it in your browser, check that everything renders correctly, then push it to a GitHub repository. This is the start of your portfolio.`,
        order: 10,
        stageId: stageHTML.id,
      },
      {
        title: 'Build a product landing page',
        description: 'Build a structured product landing page with multiple sections, images, and a form',
        concept: `Landing pages are one of the most common page types you will build as a frontend developer. Every SaaS product, app, or business has one — a page designed to communicate what something is and convince the visitor to take an action. For this project you are going to build one in pure HTML. Your page should have a hero section at the top with a headline and a subheading, a features or benefits section that uses a list or a set of grouped elements, at least one image with correct alt text, and a sign-up or contact form at the bottom with properly labelled inputs and a submit button. Use semantic HTML throughout — wrap the top in a <header>, use <main> for the content, divide sections with <section> tags, and close with a <footer>. Think carefully about the heading hierarchy: the product name or headline should be an h1, section titles should be h2s. Do not worry about how it looks — no CSS yet. Focus entirely on the structure. A page with clean, semantic, well-organised HTML is infinitely easier to style later than one that was built carelessly. When done, push it to GitHub.`,
        order: 11,
        stageId: stageHTML.id,
      },
      {
        title: 'HTML Capstone — full static website',
        description: 'Build a complete multi-page website from scratch with no guidance or starter code',
        concept: `This is the final project for the HTML stage and it is entirely open-ended. Pick a topic you actually care about — a hobby, a business idea, a subject you know well, a person you admire — and build a complete multi-page static website about it. You need at least three pages: a home page, an about page, and a third page of your choice (a contact page, a gallery, a blog post, a product page — anything). Every page must have the correct HTML boilerplate, a consistent navigation structure using <nav> and anchor tags, semantic landmark elements, a <footer>, and at least one form somewhere across the site. The pages need to be linked to each other — clicking a nav link should actually take you to that page. There is no template, no checklist to tick off, no design to copy. You decide the structure, you decide the content, you decide how to organise it. This is deliberate. Real projects do not come with instructions. When you are done, review every page: is the heading hierarchy correct, is every image labelled, is every input linked to a label, are the right semantic elements in the right places? Fix anything that is not right. Then push the whole thing to GitHub. This is the centrepiece of your HTML portfolio.`,
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