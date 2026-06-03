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
        concept: `VSCode is a free code editor made by Microsoft that most developers use every day.

It highlights your code in different colours, catches mistakes as you type, autocompletes as you write, and has a built-in file explorer and terminal so you never have to leave it.

You are going to download it, open it, and create the folder that every task in this stage will live inside.`,
        instruction: `1. Go to code.visualstudio.com and download VSCode for your operating system.
2. Install it and open it.
3. Go to File then Open Folder.
4. Create a new folder on your Desktop called stryd-setup and open it in VSCode.
5. Confirm you can see stryd-setup in the Explorer panel on the left.

That folder is your home base for this entire stage. Everything you create from here goes inside it.`,
        resourceUrl: 'https://code.visualstudio.com/docs/setup/setup-overview',
        youtubeUrl: 'https://www.youtube.com/watch?v=MlIzFUI1QGA',
        order: 1,
        stageId: stageLocalComfort.id,
      },
      {
        title: 'Install your extensions',
        description: 'Add three tools that will save you time and catch mistakes from day one.',
        concept: `Extensions are plugins you install into VSCode to add extra features.

Three are worth installing right now: Prettier formats your code automatically when you save, ESLint flags mistakes in your JavaScript before you run it, and Live Server refreshes your browser every time you save a file.

You are going to install all three and confirm they are working.`,
        instruction: `1. Open the Extensions panel with Ctrl+Shift+X (Cmd+Shift+X on Mac).
2. Search for and install each of these one by one:
   - Prettier by Prettier
   - ESLint by Microsoft
   - Live Server by Ritwick Dey
3. Open Settings with Ctrl+, and search for format on save.
4. Turn format on save on.
5. Inside your stryd-setup folder create a file called extensions.txt.
6. Write the names of the three extensions you installed inside it and save it.`,
        resourceUrl: 'https://code.visualstudio.com/docs/editor/extension-marketplace',
        youtubeUrl: 'https://www.youtube.com/watch?v=u21W_tfPVrY',
        order: 2,
        stageId: stageLocalComfort.id,
      },
      {
        title: 'Get comfortable in the terminal',
        description: 'Learn to navigate your computer with text commands. You will use this constantly.',
        concept: `The terminal lets you control your computer by typing commands instead of clicking around.

You will use it every day on Stryd to install tools, run projects, and push your code to GitHub — VSCode has one built in so you never have to leave your editor.

You are going to open it and run six commands that every developer uses constantly.`,
        instruction: `1. Open the integrated terminal in VSCode with Ctrl+\` (Cmd+\` on Mac).
2. Run each of these commands one at a time and read what happens:
   - pwd — shows where you are on your computer
   - ls — lists the files in your current folder
   - mkdir terminal-practice — creates a new folder
   - cd terminal-practice — moves you into that folder
   - touch notes.txt — creates an empty file
   - cd .. — moves you back up one level
3. Inside your stryd-setup folder create a file called terminal-notes.txt.
4. Write what each of those six commands does in your own words and save it.`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Command_line',
        youtubeUrl: 'https://www.youtube.com/watch?v=yz7nYlnXLfE',
        order: 3,
        stageId: stageLocalComfort.id,
      },
      {
        title: 'See your first webpage running locally',
        description: 'Wire everything together and watch your code appear live in the browser.',
        concept: `Local development means your code runs in your browser directly from your machine — no internet, no hosting required.

The moment your editor, your file, and your browser are all talking to each other automatically is when the setup clicks.

You are going to create an HTML file, open it with Live Server, and confirm the browser updates the instant you save.`,
        instruction: `1. Inside your stryd-setup folder create a new file called index.html.
2. Add a basic HTML structure with an h1 tag that says My Dev Environment Works.
3. Right click the file in the Explorer panel and click Open with Live Server.
4. Confirm your browser opens and shows the heading.
5. Change the heading text to anything you like and save the file.
6. Confirm the browser updates on its own without you refreshing.

Once you see it updating automatically you are ready. Click Complete and move to the next stage.`,
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
        description: 'Sign up for GitHub — this is your developer portfolio and where all your work lives.',
        concept: `GitHub is where your code lives online and it is the first thing anyone checks when you apply for a job or freelance work.

Every project you build on Stryd gets pushed here so your work is backed up, visible, and building into a real portfolio over time.

You are going to create your account and save your GitHub username inside Stryd so the platform can verify your work.`,
        instruction: `1. Go to github.com and sign up for a free account.
2. Choose a username that looks professional — your name or a clean variation works well.
3. Once your account is created go to Settings inside Stryd.
4. Save your GitHub username there.`,
        resourceUrl: 'https://docs.github.com/en/get-started/start-your-journey/creating-an-account-on-github',
        youtubeUrl: 'https://www.youtube.com/watch?v=8JJ101D3knE',
        order: 1,
        stageId: stageGitCommitment.id,
      },
      {
        title: 'Install Git',
        description: 'Install the tool that tracks every change you make to your code.',
        concept: `Git is a tool that runs on your machine and keeps a detailed history of every change you make to a project.

Think of it like a save system — at any point you can look back at earlier versions of your code, see exactly what changed, and undo mistakes. Git is not the same as GitHub: Git is the local tool, GitHub is the website where you store your Git history online.

You are going to install Git, configure it with your name and email, and confirm it is working.`,
        instruction: `1. Go to git-scm.com and download Git for your operating system.
2. Install it with all the default options.
3. Open your terminal in VSCode and run these two commands with your own details:
   - git config --global user.name "Your Name"
   - git config --global user.email "you@example.com"
4. Run git --version to confirm it installed correctly.
5. You should see a version number printed in the terminal.
6. Inside your stryd-setup folder create a file called git-setup.txt and paste that version number inside it.
7. Save the file.`,
        resourceUrl: 'https://git-scm.com/book/en/v2/Getting-Started-Installing-Git',
        youtubeUrl: 'https://www.youtube.com/watch?v=8JJ101D3knE',
        order: 2,
        stageId: stageGitCommitment.id,
      },
      {
        title: 'Install Node.js',
        description: 'Install the engine that powers almost every modern web development tool.',
        concept: `Node.js lets you run JavaScript on your computer outside of a browser.

You will need it even if you never build a backend because almost every frontend tool — including the ones you will use in the Frontend path — runs on top of it.

You are going to install the LTS version and confirm it is working.`,
        instruction: `1. Go to nodejs.org and download the LTS version.
2. Do not download the Current version — LTS is the stable one.
3. Install it with all the default options.
4. Open your terminal in VSCode and run:
   - node -v
   - npm -v
5. Both commands should print version numbers.
6. Inside your stryd-setup folder create a file called node-setup.txt.
7. Paste both version numbers inside it and save the file.`,
        resourceUrl: 'https://nodejs.org/en/learn/getting-started/introduction-to-nodejs',
        youtubeUrl: 'https://www.youtube.com/watch?v=TlB_eWDSMt4',
        order: 3,
        stageId: stageGitCommitment.id,
      },
      {
        title: 'Push your work to GitHub',
        description: 'Upload your stryd-setup folder to GitHub and trigger automatic verification.',
        concept: `Pushing code to GitHub means uploading your local work so it is backed up online and visible on your profile.

You do this with a short sequence of Git commands — each one does exactly one thing and together they take your folder from your machine to the internet in under two minutes.

You are going to create a GitHub repo, connect it to your local folder, and push everything you have built in this stage.`,
        instruction: `First create the repo on GitHub:
1. Go to github.com and sign in.
2. Click the + icon and select New repository.
3. Name it stryd-setup and set it to Public.
4. Leave README, gitignore, and license all unchecked.
5. Click Create repository.

Then push your local code:
6. Open your terminal in VSCode and confirm you are inside your stryd-setup folder by running pwd. The path should end in stryd-setup.
7. Run these commands one at a time:
   - git init
   - git add .
   - git commit -m "initial commit"
   - git branch -M main
   - git remote add origin https://github.com/YOUR_USERNAME/stryd-setup.git
   - git push -u origin main
8. Replace YOUR_USERNAME with your actual GitHub username.
9. Go to github.com/YOUR_USERNAME/stryd-setup in your browser and confirm your files are there.
10. Click Complete Task. Stryd will verify your repo exists and unlock the Frontend path.

If you get an error read the message carefully. Most Git errors tell you exactly what went wrong.`,
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
        concept: `HTML is the foundation of every webpage on the internet — it describes the structure of a page using tags like h1, p, and div.

It is not a programming language. It does not do logic. Its only job is to tell the browser what each piece of content is, and the browser builds a mental model called the DOM from it.

Before starting: create a new public repo on GitHub called stryd-html with no README and no gitignore, clone it to your machine, and open it in VSCode.`,
        instruction: `1. Inside your stryd-html repo create a folder called task-01.
2. Inside that folder create a file called index.html.
3. Build a basic HTML page that includes:
   - A DOCTYPE declaration at the top
   - An html element with lang set to en
   - A head with a title that says HTML Notes
   - A body with an h1 that says What is HTML
   - A paragraph where you explain in your own words what HTML is and what the DOM is
4. Open it with Live Server and confirm it shows in the browser.
5. Push your work:
   - git add .
   - git commit -m "task 01 html intro"
   - git push`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started',
        youtubeUrl: 'https://www.youtube.com/watch?v=qz0aGYrrlhU',
        order: 1,
        stageId: stageHTML.id,
      },
      {
        title: 'The HTML boilerplate',
        description: 'Learn the standard structure that every HTML file starts with.',
        concept: `Every HTML file starts with the same basic structure — DOCTYPE, html, head, and body — and once you understand each piece you will write it from memory without thinking.

Each line has a specific job: DOCTYPE tells the browser this is HTML5, lang tells screen readers what language the page is in, charset stops special characters from breaking, and viewport makes the page scale correctly on mobile.

You are going to type the full boilerplate from scratch without copying and pasting.`,
        instruction: `1. Inside your stryd-html repo create a folder called task-02.
2. Inside it create index.html.
3. Type out the full HTML boilerplate from memory — do not copy and paste:
   - DOCTYPE declaration
   - html element with lang="en"
   - head with meta charset, meta viewport, and a title
   - body
4. Inside the body add an h1 with your name.
5. Open it with Live Server and check the browser tab shows your title text.
6. Push your work:
   - git add .
   - git commit -m "task 02 boilerplate"
   - git push`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started',
        youtubeUrl: 'https://www.youtube.com/watch?v=UB1O30fR-EE',
        order: 2,
        stageId: stageHTML.id,
      },
      {
        title: 'Text, headings and links',
        description: 'Structure your content and connect pages together.',
        concept: `HTML has specific tags for text and each one carries meaning — h1 through h6 create a page outline that search engines and screen readers use, p wraps paragraphs, strong marks important text, and em marks stressed text.

The anchor tag a is what makes the web a web: it creates clickable links using the href attribute, and adding target="_blank" plus rel="noopener noreferrer" opens them safely in a new tab.

You are going to build a two-page site and link them together.`,
        instruction: `1. Inside your stryd-html repo create a folder called task-03.
2. Inside it create two files: index.html and about.html.
3. In index.html build a page about any topic you like. It must include:
   - One h1 as the main title
   - At least two h2 headings as section titles
   - At least three paragraphs of real content
   - At least one strong and one em used with genuine meaning
   - A nav with a link to about.html and a link to any external site that opens in a new tab
4. In about.html add the full boilerplate and a link back to index.html.
5. Click between the pages in Live Server and confirm all links work.
6. Push your work:
   - git add .
   - git commit -m "task 03 text and links"
   - git push`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals',
        youtubeUrl: 'https://www.youtube.com/watch?v=yTHTo28hwTQ',
        order: 3,
        stageId: stageHTML.id,
      },
      {
        title: 'Images, lists and tables',
        description: 'Embed images, mark up collections of items, and display structured data.',
        concept: `Images use the img tag with two required attributes: src for the file path and alt for a written description that screen readers read aloud and browsers show when the image fails to load.

Lists come in two types — ul for unordered items with bullet points and ol for ordered items with numbers — and tables are for grid data like comparisons or pricing.

You are going to use all three on a single page.`,
        instruction: `1. Inside your stryd-html repo create a folder called task-04.
2. Inside it create an images subfolder and download two images into it.
3. Create index.html with the full boilerplate and build a page that includes:
   - One image using a relative path to your images folder with descriptive alt text
   - One image using a full external URL with descriptive alt text
   - An unordered list of at least five things you want to learn as a developer
   - An ordered list of at least five steps to make your favourite meal
   - A table comparing HTML, CSS, and JavaScript with columns for Name, Type, and Used For
4. Open in Live Server and confirm everything renders correctly.
5. Push your work:
   - git add .
   - git commit -m "task 04 images lists tables"
   - git push`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML',
        youtubeUrl: 'https://www.youtube.com/watch?v=0xoztJCHpbQ',
        order: 4,
        stageId: stageHTML.id,
      },
      {
        title: 'HTML Forms',
        description: 'Build forms that collect user input. Every login screen and sign up flow starts here.',
        concept: `Forms are how users interact with web apps — every login screen, search bar, and checkout page is built with HTML form elements.

The input tag is the most versatile element and its type attribute controls what it becomes: text, email, password, checkbox, or radio. Every input must be paired with a label connected via matching id and for attributes — this is an accessibility requirement, not just a convention.

You are going to build a complete sign up form from scratch.`,
        instruction: `1. Inside your stryd-html repo create a folder called task-05.
2. Inside it create index.html with the full boilerplate.
3. Build a sign up form for a fictional coding bootcamp. It must include:
   - A text input for full name with a label
   - An email input with a label
   - A password input with a label
   - A select dropdown for How did you hear about us with at least four options
   - A checkbox for agreeing to terms with a label
   - A submit button that says Join the bootcamp
4. Every input must have a matching label connected via for and id. No exceptions.
5. Open in Live Server and confirm the form renders correctly.
6. Push your work:
   - git add .
   - git commit -m "task 05 html forms"
   - git push`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form',
        youtubeUrl: 'https://www.youtube.com/watch?v=fNcJuPIZ2WE',
        order: 5,
        stageId: stageHTML.id,
      },
      {
        title: 'Semantic HTML',
        description: 'Use tags that describe what your content actually is, not just what it looks like.',
        concept: `Semantic HTML means choosing tags based on the meaning of your content — header, nav, main, article, section, aside, and footer — instead of wrapping everything in divs.

Screen readers let users jump between these landmark elements directly, search engines use them to understand your page, and your code becomes far easier for other developers to read.

You are going to rebuild a full page layout using only semantic elements.`,
        instruction: `1. Inside your stryd-html repo create a folder called task-06.
2. Inside it create index.html with the full boilerplate.
3. Build a page structured entirely with semantic elements. It must include:
   - A header with the site name and a nav with at least two links
   - A main containing at least two section elements each with a heading and paragraphs
   - One article inside one of those sections with its own heading and content
   - An aside with a related tip or note
   - A footer with your name and a copyright line
4. No layout divs. Every wrapper must be a semantic element with a real purpose.
5. Open in Live Server and confirm it renders.
6. Push your work:
   - git add .
   - git commit -m "task 06 semantic html"
   - git push`,
        resourceUrl: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics',
        youtubeUrl: 'https://www.youtube.com/watch?v=kGW8Al_cga4',
        order: 6,
        stageId: stageHTML.id,
      },
      {
        title: 'Build a personal profile page',
        description: 'Put everything together and build a real page about yourself in pure HTML.',
        concept: `This is your first real project — no step-by-step instructions for what to put on the page, no starter code, no design to copy.

Your goal is a well-structured semantic HTML page using everything you have learned. It will look plain without CSS and that is completely fine — CSS comes next and will transform what you build here.

Before you submit: check every image has alt text, every input has a label, your heading hierarchy is correct, and you are using semantic elements throughout.`,
        instruction: `1. Inside your stryd-html repo create a folder called task-07.
2. Inside it build a personal profile page in index.html. The page must include:
   - Your name as the h1
   - A profile image with descriptive alt text
   - A short bio paragraph
   - A section listing your skills as an unordered list
   - A section with an ordered list of your top three goals as a developer
   - A contact form with name, email, and message inputs all properly labelled
   - A footer with your GitHub link
3. Structure everything with semantic elements: header, nav, main, sections, footer.
4. No CSS. Focus entirely on getting the structure right.
5. Review every element before you push. Fix anything that is wrong.
6. Push your work:
   - git add .
   - git commit -m "task 07 profile page"
   - git push`,
        resourceUrl: '',
        youtubeUrl: '',
        order: 7,
        stageId: stageHTML.id,
      },
      {
        title: 'Build a product landing page',
        description: 'Your HTML capstone. Build a full landing page for a fictional product from scratch.',
        concept: `Landing pages are one of the most common things you will build as a frontend developer and the structure is predictable: a hero section, a features section, some imagery, and a call to action.

In pure HTML your job is to get this structure right using semantic elements and correct heading hierarchy — the visual design comes in the CSS stage.

This is the final task in the HTML stage. Pick a fictional product and build it.`,
        instruction: `1. Inside your stryd-html repo create a folder called task-08.
2. Pick a fictional product — an app, a service, a physical product, anything.
3. Build index.html as a landing page for it. The page must include:
   - A header with the product name and a nav
   - A hero section with an h1 headline, a subheading, and a short paragraph
   - A features section with an h2 and at least three features each with a heading and description
   - An images section with at least two images and proper alt text
   - A sign up section with a form containing name, email, and a submit button all properly labelled
   - A footer
4. Review everything before you push. Check every link, every image, every label.
5. Push your work:
   - git add .
   - git commit -m "task 08 landing page capstone"
   - git push

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