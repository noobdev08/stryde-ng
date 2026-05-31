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
      description: 'Get your machine ready before you write a single line of code',
      isLocked: false,
      requiredPlan: 'free',
      order: 1,
    }
  });

  const pathFrontend = await prisma.path.create({
    data: {
      name: 'Frontend',
      description: 'Learn how to build real things for the web from scratch',
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
      description: 'Get your editor open and see your first web project running on your own machine.',
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
      description: 'Connect your work to GitHub so your code lives in the cloud and not just on your laptop.',
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
        description: 'Download the code editor you will be living in every single day.',
        concept: `VSCode is a free code editor made by Microsoft and it is what most developers use day to day. Not because they have to but because it is genuinely great.

It does a lot more than let you type. It highlights your code in different colors so it is easier to read, spots mistakes before you even run anything, autocompletes as you type, and has a built in file explorer and terminal. You never have to leave it.

There is also a huge library of extensions you can install to add extra features. You will install a few of those in the next task.

Getting comfortable in VSCode early makes everything else on Stryd way easier. It is your home base.`,
        instruction: `1. Go to code.visualstudio.com and download VSCode for your operating system.
2. Install it and open it.
3. Go to File then Open Folder and create a new folder on your Desktop called stryd-setup. Open that folder in VSCode.
4. You should see stryd-setup appear in the Explorer panel on the left side.

That folder is your home base for this entire stage. Everything you create from here goes inside it.`,
        resourceUrl: 'https://code.visualstudio.com/docs/setup/setup-overview',
        youtubeUrl: 'https://www.youtube.com/watch?v=MlIzFUI1QGA',
        order: 1,
        stageId: stageLocalComfort.id,
      },
      {
        title: 'Install your extensions',
        description: 'Add three tools that will save you time and catch mistakes from day one.',
        concept: `Extensions are plugins you install into VSCode to add extra features. There are thousands of them but three are worth installing right now before you do anything else.

Prettier formats your code automatically when you save a file. Indentation, spacing, quotes, all fixed for you without thinking about it.

ESLint reads your JavaScript as you write it and flags problems before you even run the code. Typos in variable names, code that will never execute, things like that.

Live Server launches your HTML file in the browser and refreshes it every time you save. Without it you would have to manually refresh the browser after every single change which gets old very fast.

These three together give you a tight feedback loop that makes coding way more enjoyable.`,
        instruction: `1. Open the Extensions panel by clicking the four squares icon in the left sidebar or press Ctrl+Shift+X (Cmd+Shift+X on Mac).
2. Search for and install these three extensions one by one:
   Prettier by Prettier
   ESLint by Microsoft
   Live Server by Ritwick Dey
3. Once installed open Settings with Ctrl+, and search for format on save. Turn it on.
4. Inside your stryd-setup folder create a file called extensions.txt and write the names of the three extensions you installed. Save it.`,
        resourceUrl: 'https://code.visualstudio.com/docs/editor/extension-marketplace',
        youtubeUrl: 'https://www.youtube.com/watch?v=u21W_tfPVrY',
        order: 2,
        stageId: stageLocalComfort.id,
      },
      {
        title: 'Get comfortable in the terminal',
        description: 'Learn to navigate your computer with text commands. You will use this constantly.',
        concept: `The terminal lets you control your computer by typing commands instead of clicking around. As a developer you will use it all the time to install tools, run your projects, save your code to GitHub, and more.

On a Mac the built in Terminal app works fine. On Windows install Windows Terminal from the Microsoft Store and set it to use Git Bash as the default shell.

VSCode has a terminal built right in. You can open it any time with Ctrl and the backtick key (top left of your keyboard). This is the easiest way to use the terminal because you never have to leave your editor.

The commands you will use most at the start are cd to move into a folder, ls to see what is inside a folder, mkdir to create a new folder, touch to create a new file, and clear to clean up the screen.`,
        instruction: `1. Open the integrated terminal in VSCode with Ctrl and the backtick key (Cmd and backtick on Mac).
2. Run each of these commands one at a time and watch what happens:
   pwd shows where you are on your computer
   ls lists the files in your current folder
   mkdir terminal-practice creates a new folder
   cd terminal-practice moves you into that folder
   touch notes.txt creates an empty file
   cd .. moves you back up one level
3. Inside your stryd-setup folder create a file called terminal-notes.txt. Write down what each of those six commands does in your own words. Save it.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line',
        youtubeUrl: 'https://www.youtube.com/watch?v=yz7nYlnXLfE',
        order: 3,
        stageId: stageLocalComfort.id,
      },
      {
        title: 'See your first webpage running locally',
        description: 'Wire everything together and watch your code appear live in the browser.',
        concept: `Before moving on it is worth making sure your local setup actually works end to end. That means you write code in VSCode, save the file, and the browser updates immediately without you doing anything.

That instant feedback loop is what makes local development fast and enjoyable. If something is broken now it is way easier to fix before you add more tools on top of it.

This is also a small but real milestone. You are about to run a webpage on your own machine, no hosting, no internet required. Just your code, your editor, and your browser talking to each other.`,
        instruction: `1. Inside your stryd-setup folder create a new file called index.html.
2. Add a basic HTML structure with an h1 tag that says My Dev Environment Works.
3. Right click the file in the Explorer panel and click Open with Live Server.
4. Your browser should open and show that heading.
5. Change the heading text to anything you like, save the file, and watch the browser update on its own.

Once you see it updating automatically you are good to go. Click Complete and move to the next stage.`,
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
        title: 'Create a GitHub account and install Git',
        description: 'Sign up for GitHub and install the tool that tracks every change you make to your code.',
        concept: `GitHub is where your code lives online. Think of it as a home for every project you build on Stryd. It is also your developer portfolio. When you apply for jobs or freelance work, people will check your GitHub to see what you have built and how consistently you have been working.

Git is a different thing. Git is a tool that runs on your machine and keeps a detailed history of every change you make to a project. Think of it like a save system in a video game. At any point you can look back at an earlier version of your code, see exactly what changed, and undo mistakes.

Git is not the same as GitHub. Git is the local tool. GitHub is the website where you store your Git history online. You need both.`,
        instruction: `First set up GitHub:
1. Go to github.com and sign up for a free account.
2. Choose a username that looks professional. Your name or a clean variation of it works well.
3. Once your account is created go to Settings inside Stryd and save your GitHub username.

Then install Git:
4. Go to git-scm.com and download Git for your operating system.
5. Install it with all the default options.
6. Open your terminal in VSCode and run these two commands with your own details:
   git config --global user.name "Your Name"
   git config --global user.email "you@example.com"
7. Run git --version to confirm it installed. You should see a version number printed.
8. Inside your stryd-setup folder create a file called git-setup.txt and paste that version number inside it. Save it.`,
        resourceUrl: 'https://git-scm.com/book/en/v2/Getting-Started-Installing-Git',
        youtubeUrl: 'https://www.youtube.com/watch?v=8JJ101D3knE',
        order: 1,
        stageId: stageGitCommitment.id,
      },
      {
        title: 'Install Node.js',
        description: 'Install the engine that powers almost every modern web development tool.',
        concept: `Node.js lets you run JavaScript on your computer outside of a browser. You will need it even if you never build a backend because almost every frontend tool runs on top of it.

npm comes bundled with Node and is a huge library of packages you can install into your projects. When you later install things like React, npm is what fetches and sets them up for you.

Always install the LTS version. LTS stands for Long Term Support which means it is the stable well tested version. The Current version has newer features but is less stable. Stick with LTS.`,
        instruction: `1. Go to nodejs.org and download the LTS version. Do not download the Current version.
2. Install it with all the default options.
3. Open your terminal in VSCode and run:
   node -v
   npm -v
4. Both commands should print version numbers. If they do Node is installed correctly.
5. Inside your stryd-setup folder create a file called node-setup.txt and paste both version numbers inside it. Save it.`,
        resourceUrl: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs',
        youtubeUrl: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
        order: 2,
        stageId: stageGitCommitment.id,
      },
      {
        title: 'Push your work to GitHub',
        description: 'Upload your stryd-setup folder to GitHub and trigger automatic verification.',
        concept: `Pushing code to GitHub means taking the work saved on your machine and uploading it so it is backed up online and visible to anyone you share it with.

You do this with a sequence of Git commands. Each one does one specific thing and they are not arbitrary. Understanding what each command does will make Git feel way less mysterious.

git init turns your folder into a Git repository and tells Git to start tracking it.
git add . stages all your files and marks them as ready to be saved.
git commit -m "message" takes a snapshot of your staged files with a description.
git branch -M main renames your default branch to main which is GitHub's standard.
git remote add origin [url] connects your local repo to your GitHub repo.
git push -u origin main uploads your commits to GitHub for the first time.`,
        instruction: `First create the GitHub repo:
1. Go to github.com and sign in.
2. Click the plus icon and select New repository.
3. Name it stryd-setup and set it to Public.
4. Do not add a README, gitignore, or license. Leave those unchecked.
5. Click Create repository.

Then push your local code:
6. Open your terminal in VSCode. Make sure you are inside your stryd-setup folder. Run pwd to check. The path should end in stryd-setup.
7. Run these commands one at a time:
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/stryd-setup.git
   git push -u origin main

Replace YOUR_USERNAME with your actual GitHub username.

8. Go to github.com/YOUR_USERNAME/stryd-setup in your browser. You should see your files there.
9. Click Complete Task. Stryd will automatically check that your repo exists and unlock the next path.

If you get an error at any step read the message carefully. Most Git errors tell you exactly what went wrong.`,
        resourceUrl: 'https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github',
        youtubeUrl: 'https://www.youtube.com/watch?v=iv8rSLsi1xo',
        order: 3,
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
      { name: 'React', description: 'Build component based UIs at scale', order: 4, isLocked: true, requiredPlan: 'basic', expectedRepo: 'stryd-react', validationType: 'repo_exists', pathId: pathFrontend.id },
      { name: 'Projects', description: 'Build real projects from scratch', order: 5, isLocked: true, requiredPlan: 'basic', expectedRepo: 'stryd-projects', validationType: 'repo_exists', pathId: pathFrontend.id },
      { name: 'Capstone', description: 'Your final project. Build something real.', order: 6, isLocked: true, requiredPlan: 'basic', expectedRepo: 'stryd-capstone', validationType: 'repo_exists', pathId: pathFrontend.id },
    ]
  });


  // ── 6. HTML STAGE TASKS ───────────────────────────────────────────────────
  await prisma.task.createMany({
    data: [
      {
        title: 'What is HTML and how does it work',
        description: 'Understand what HTML actually is before you write a single tag.',
        concept: `HTML stands for HyperText Markup Language. It is the foundation of every single webpage on the internet and it has been since the beginning.

Here is the thing though. HTML is not a programming language. It does not do logic or calculations. Its only job is to describe the structure of a page using tags. A tag is just a keyword in angle brackets like p or h1. Most tags come in pairs, an opening tag and a closing tag, with content sitting between them.

When a browser loads an HTML file it reads it top to bottom and builds a mental model of your page called the DOM. CSS and JavaScript both operate on top of this structure. Everything you learn as a frontend developer from here builds on HTML so getting this solid matters.

Before starting: Create a new public repository on GitHub called stryd-html with no README and no gitignore. Clone it to your machine and open it in VSCode.`,
        instruction: `1. Inside your stryd-html repo create a folder called task-01.
2. Inside that folder create a file called index.html.
3. Build a basic HTML page that includes:
   A DOCTYPE declaration at the top
   An html element with a lang attribute set to en
   A head with a title that says HTML Notes
   A body with an h1 that says What is HTML
   A paragraph below where you explain in your own words what HTML is and what the DOM is
4. Open it with Live Server and confirm it shows up in the browser.
5. Push your work:
   git add .
   git commit -m "task 01 html intro"
   git push`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started',
        youtubeUrl: 'https://www.youtube.com/watch?v=qz0aGYrrlhU',
        order: 1,
        stageId: stageHTML.id,
      },
      {
        title: 'The HTML boilerplate',
        description: 'Learn the standard structure that every HTML file starts with and understand every single line of it.',
        concept: `Every HTML file starts with the same basic structure. Once you understand each piece writing it from memory becomes second nature and you will do it hundreds of times.

DOCTYPE html tells the browser this is modern HTML5. It is always the first line.

html lang="en" is the root element. Every other element on the page lives inside this. The lang attribute tells browsers and screen readers what language the page is in.

head contains information about the page that is not shown to users, like the title and character encoding.

meta charset="UTF-8" tells the browser to use UTF-8 encoding so special characters display correctly.

meta name="viewport" controls how the page scales on mobile. Without this your page will look tiny on phones.

title is the text shown in the browser tab.

body is where everything the user actually sees goes.`,
        instruction: `1. Inside your stryd-html repo create a folder called task-02.
2. Inside it create index.html.
3. Without copying and pasting type out the full HTML boilerplate from memory using the breakdown above as your guide.
4. Inside the body add an h1 with your name.
5. Open it with Live Server. Check the browser tab. It should show your title text.
6. Push:
   git add .
   git commit -m "task 02 boilerplate"
   git push`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started',
        youtubeUrl: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
        order: 2,
        stageId: stageHTML.id,
      },
      {
        title: 'Text, headings and links',
        description: 'Structure your content and connect pages together using the most used HTML tags.',
        concept: `HTML has specific tags for text content and each one carries meaning beyond just how it looks.

Headings run from h1 to h6. h1 is the main title of the page and there should only be one per page. h2 is for major sections. h3 is for subsections. These heading levels create an outline of your page that screen readers can navigate and search engines use to understand your content.

Paragraphs go inside p tags. strong marks text as strongly important and em marks text as stressed. These are not just styling choices. They tell the browser the content inside carries extra meaning.

The anchor tag a is what makes the web a web. It creates clickable links. The destination goes in the href attribute. Use a full URL like https://example.com for external sites. Use a relative path like ./about.html for other pages in your own project.

Adding target="_blank" opens a link in a new tab. When you do this always add rel="noopener noreferrer" as well. It is a small security measure and has become standard practice.`,
        instruction: `1. Inside your stryd-html repo create a folder called task-03.
2. Inside it create two files: index.html and about.html.
3. In index.html add the full boilerplate then build a page about any topic you like. It must include:
   One h1 as the main title
   At least two h2 headings as section titles
   At least three paragraphs of real content
   At least one strong and one em used with genuine meaning
   A nav element with a link to about.html and a link to any external site that opens in a new tab
4. In about.html add the full boilerplate and a link back to index.html.
5. Click between the pages in Live Server and confirm everything works.
6. Push:
   git add .
   git commit -m "task 03 text and links"
   git push`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals',
        youtubeUrl: 'https://www.youtube.com/watch?v=yTHTo28hwTQ',
        order: 3,
        stageId: stageHTML.id,
      },
      {
        title: 'Images, lists and tables',
        description: 'Embed images, mark up collections of items, and display structured data.',
        concept: `Images use the img tag. It has no closing tag because the image itself is the content. Two attributes are required. src is the path to the image and alt is a written description of what the image shows.

Alt text matters for two reasons. Screen readers read it aloud to users who cannot see the image. If the image fails to load the alt text shows in its place. Be specific. "A tabby cat sleeping on a laptop" is better than "cat". For purely decorative images that add no meaning use an empty alt attribute so screen readers know to skip it.

HTML has two types of lists. An unordered list ul is for items where the order does not matter, it renders with bullet points. An ordered list ol is for items where order matters, it renders with numbers. Each item in either list goes inside an li tag.

Tables are for data that has a grid structure like pricing plans or comparison charts. The outer wrapper is table. Inside it you have rows marked with tr. Inside each row you have cells, th for header cells and td for data cells.`,
        instruction: `1. Inside your stryd-html repo create a folder called task-04.
2. Inside it create an images subfolder and download two images into it.
3. Create index.html with the full boilerplate and build a page that includes:
   One image using a relative path to your images folder with a descriptive alt text
   One image using a full external URL with a descriptive alt text
   An unordered list of at least five things you want to learn as a developer
   An ordered list of at least five steps to make your favourite meal
   A table comparing HTML CSS and JavaScript with columns for Name, Type, and Used For
4. Open in Live Server and confirm everything renders.
5. Push:
   git add .
   git commit -m "task 04 images lists tables"
   git push`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML',
        youtubeUrl: 'https://www.youtube.com/watch?v=0xoztJCHpbQ',
        order: 4,
        stageId: stageHTML.id,
      },
      {
        title: 'HTML Forms',
        description: 'Build forms that collect user input. Every login screen and sign up flow starts here.',
        concept: `Forms are how users interact with web apps. Every login screen, search bar, sign up flow, and checkout page is built with HTML form elements.

The form element is the container. Inside it input is the most versatile element. Its type attribute controls what kind of input it becomes: text, email, password, checkbox, radio, file.

Every input must be paired with a label. You connect them by giving the input an id and setting the for attribute on the label to the same value. This is not just good practice. It is an accessibility requirement. When a label and input are connected properly clicking the label focuses the input which helps everyone especially users with motor difficulties.

For longer text use textarea. For a dropdown use select with option elements inside.`,
        instruction: `1. Inside your stryd-html repo create a folder called task-05.
2. Inside it create index.html with the full boilerplate.
3. Build a sign up form for a fictional coding bootcamp. The form must include:
   A text input for full name with a label
   An email input with a label
   A password input with a label
   A select dropdown for How did you hear about us with at least four options
   A checkbox for agreeing to terms with a label
   A submit button that says Join the bootcamp
4. Every single input must have a matching label connected via for and id. No exceptions.
5. Open in Live Server and confirm the form renders correctly.
6. Push:
   git add .
   git commit -m "task 05 html forms"
   git push`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form',
        youtubeUrl: 'https://www.youtube.com/watch?v=fNcJuPIZ2WE',
        order: 5,
        stageId: stageHTML.id,
      },
      {
        title: 'Semantic HTML',
        description: 'Use tags that describe what your content actually is, not just what it looks like.',
        concept: `Semantic HTML means choosing tags based on the meaning of your content not just its appearance.

The alternative is using div for everything. That technically works but it tells the browser, screen readers, and search engines absolutely nothing about what each part of your page does.

HTML5 introduced landmark elements for exactly this reason. header wraps the top of the page. nav wraps navigation links. main wraps the primary content and you should only have one per page. article is for self contained content like a blog post. section groups related content under a heading. aside is for secondary content like a sidebar. footer wraps the bottom of the page.

Screen readers let users jump between these landmarks directly. Search engines use them to understand your content. Your code becomes much easier for other developers to read. There is no reason not to use them.`,
        instruction: `1. Inside your stryd-html repo create a folder called task-06.
2. Inside it create index.html with the full boilerplate.
3. Build a page structured entirely with semantic elements. It must include:
   A header with the site name and a nav with at least two links
   A main containing at least two section elements each with a heading and paragraphs
   One article inside one of those sections with its own heading and content
   An aside with a related tip or note
   A footer with your name and a copyright line
4. No layout divs. Every wrapper must be a semantic element with a real purpose.
5. Open in Live Server and confirm it renders.
6. Push:
   git add .
   git commit -m "task 06 semantic html"
   git push`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics',
        youtubeUrl: 'https://www.youtube.com/watch?v=kGW8Al_cga4',
        order: 6,
        stageId: stageHTML.id,
      },
      {
        title: 'Build a personal profile page',
        description: 'Put everything together and build a real page about yourself in pure HTML.',
        concept: `This is your first real project. No step by step instructions for what to put on the page, no starter code, no design to copy.

Your goal is to build a well structured semantic HTML page from scratch using everything you have learned. It will not look impressive without CSS and that is completely fine. CSS comes in the next stage and will transform what you build here. The point of this task is structure and correctness not visual design.

Before you submit ask yourself a few things. Is every image labelled? Is every input linked to a label? Is the heading hierarchy correct with one h1, h2s for sections, h3s for subsections? Are you using semantic elements throughout?

If you can answer yes to all of those you are done.`,
        instruction: `1. Inside your stryd-html repo create a folder called task-07.
2. Inside it build a personal profile page in index.html. The page must include:
   Your name as the h1
   A profile image with a descriptive alt text
   A short bio paragraph
   A section listing your skills as an unordered list
   A section with an ordered list of your top three goals as a developer
   A contact form with name, email, and message inputs all properly labelled
   A footer with your GitHub link
3. Structure everything with semantic elements: header, nav, main, sections, footer.
4. No CSS for this task. Focus entirely on getting the structure right. It will look plain and that is fine.
5. Review every element before you push. Fix anything that is wrong.
6. Push:
   git add .
   git commit -m "task 07 profile page"
   git push`,
        resourceUrl: '',
        youtubeUrl: '',
        order: 7,
        stageId: stageHTML.id,
      },
      {
        title: 'Build a product landing page',
        description: 'Your HTML capstone. Build a full landing page for a fictional product from scratch.',
        concept: `Landing pages are one of the most common things you will build as a frontend developer. Every product, app, and business has one.

The structure is pretty predictable. A hero section at the top with a strong headline, a features or benefits section, some imagery, and a call to action at the bottom. In pure HTML your job is to get this structure right using semantic elements and correct heading hierarchy.

This is the final task in the HTML stage. There are no instructions for what to put on the page. Pick a fictional product, anything you like, and build a landing page for it. The visual design comes in the CSS stage. Right now structure is everything.

When you complete this task you have officially finished HTML. That is a real milestone.`,
        instruction: `1. Inside your stryd-html repo create a folder called task-08.
2. Pick a fictional product. An app, a service, a physical product, anything.
3. Build index.html as a landing page for it. The page must include:
   A header with the product name and a nav
   A hero section with an h1 headline, a subheading, and a short paragraph
   A features section with an h2 and at least three features each with a heading and description
   An images section with at least two images and proper alt text
   A sign up section with a form containing name, email, and a submit button all properly labelled
   A footer
4. Review everything before you push. Check every link, every image, every label.
5. Push:
   git add .
   git commit -m "task 08 landing page capstone"
   git push

You just finished HTML. On to CSS.`,
        resourceUrl: '',
        youtubeUrl: '',
        order: 8,
        stageId: stageHTML.id,
      },
    ]
  });

  console.log('Seeded successfully. Stryd is ready.');
}

seedDatabase()
  .catch(console.error)
  .finally(() => prisma.$disconnect());