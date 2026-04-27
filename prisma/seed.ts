import prisma from '../src/utils/lib/prismaClient';

async function seedDatabase() {
  const pathMake = await prisma.path.create({
    data: {
      name: 'Frontend',
      description: 'Learn frontend development from scratch',
      isLocked: false,
      order: 1,
    }
  });

  await prisma.path.createMany({
    data: [
      { name: 'Backend', description: 'Learn backend development', isLocked: true, order: 2 },
      { name: 'Fullstack', description: 'Combine frontend and backend', isLocked: true, order: 3 },
    ]
  });

  const stageMake = await prisma.stage.create({
    data: {
      name: 'HTML',
      description: 'The foundation of every webpage',
      order: 1,
      isLocked: false,
      pathId: pathMake.id,
    }
  });

  await prisma.stage.createMany({
    data: [
      { name: 'CSS', description: 'Style your webpages', order: 2, isLocked: true, pathId: pathMake.id },
      { name: 'JavaScript', description: 'Make your pages interactive', order: 3, isLocked: true, pathId: pathMake.id },
      { name: 'React', description: 'Build component-based UIs', order: 4, isLocked: true, pathId: pathMake.id },
      { name: 'Projects', description: 'Build real projects', order: 5, isLocked: true, pathId: pathMake.id },
      { name: 'Capstone', description: 'Final project', order: 6, isLocked: true, pathId: pathMake.id },
    ]
  });

  await prisma.task.createMany({
    data: [
      { title: 'Introduction to HTML', description: 'Learn what HTML is and how browsers render pages', order: 1, stageId: stageMake.id, resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started' },
      { title: 'Your first HTML file', description: 'Create your first HTML file with proper boilerplate structure', order: 2, stageId: stageMake.id, resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started' },
      { title: 'Headings, paragraphs and text formatting', description: 'Use h1-h6, p, strong, em and other text tags', order: 3, stageId: stageMake.id, resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals' },
      { title: 'Links and navigation', description: 'Create links between pages using anchor tags', order: 4, stageId: stageMake.id, resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks' },
      { title: 'Images in HTML', description: 'Add images to your webpage using the img tag', order: 5, stageId: stageMake.id, resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Images_in_HTML' },
      { title: 'Lists — ordered and unordered', description: 'Create bullet point and numbered lists', order: 6, stageId: stageMake.id, resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals' },
      { title: 'Tables', description: 'Structure data using HTML tables', order: 7, stageId: stageMake.id, resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Tables/Basics' },
      { title: 'HTML Forms', description: 'Build forms with inputs, buttons and labels', order: 8, stageId: stageMake.id, resourceUrl: 'https://developer.mozilla.org/en-US/docs/Learn/Forms/Your_first_form' },
      { title: 'Semantic HTML', description: 'Use header, nav, main, footer and other semantic tags', order: 9, stageId: stageMake.id, resourceUrl: 'https://developer.mozilla.org/en-US/docs/Glossary/Semantics' },
      { title: 'Build a personal profile page', description: 'Build a static personal profile page using everything you have learned', order: 10, stageId: stageMake.id, resourceUrl: null },
      { title: 'Build a product landing page', description: 'Build a product landing page with sections, images and a form', order: 11, stageId: stageMake.id, resourceUrl: null },
      { title: 'HTML Capstone — full static website', description: 'Build a complete multi-page static website from scratch with no guidance', order: 12, stageId: stageMake.id, resourceUrl: null },
    ]
  });

  console.log('Seeded successfully 🔒');
}

seedDatabase()
  .catch(console.error)
  .finally(() => prisma.$disconnect());