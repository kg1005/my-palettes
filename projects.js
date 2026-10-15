const projects = [
  {
    id: 'retail-promotion-intelligence',
    title: 'Retail Pricing & Business Analytics Platform',
    category: 'data', categoryLabel: 'RETAIL ANALYTICS + CONSUMER BEHAVIOR',
    description: 'A end-to-end retail decision-support prototype connecting transaction patterns, customer segments, and psychology-informed promotion tests.',
    tools: ['Excel', 'Power Query', 'Python', 'Pandas', 'SQL', 'Power BI'],
    question: 'How can retailers identify different customer purchasing patterns and decide which promotional strategies are worth testing without encouraging constant discount-seeking?',
    method: [
      "Planned workflow: ", 
      "Examine the UCI Online Retail transaction dataset.",
      "Document data-quality checks using Excel and Power Query.",
      "Clean and validate transaction records using Python and Pandas.",
      "Calculate revenue and Recency, Frequency, Monetary (RFM) features.",
      "Use SQLite and SQL to analyze customer segments and purchasing patterns.",
      "Build a three-page Power BI dashboard: Executive Overview, Customer Behavior, and Promotion Strategy Lab.",
      "Develop promotion hypotheses and proposed A/B tests for loyal, at-risk, and occasional customers."
    ],
    results: [ 
    'Planned deliverables: ', 
    "Reproducible data cleaning and customer segmentation pipeline.",
    "Documented SQL queries and analytical summaries.",
    "Three-page interactive Power BI dashboard.",
    "Psychology research brief connecting consumer behavior with promotional strategies.",
    "Three testable promotion recommendations with guardrail metrics.",
    "Documented limitations: no verified campaign exposure, discount depth, margins, or causal promotion lift."
    ], 
    github: '' // Paste GitHub repository URL when published.
  },

  {
    id: 'obsession-review-lens',
    title: 'Obsession 2025 Movie Review Lens',
    category: 'behavior', categoryLabel: 'AUDIENCE INSIGHTS + APPLIED AI',
    description: 'An AI-assisted study of how viewers discuss autonomy, obsessive control, and moral responsibility in reactions to Curry Barker’s Obsession.',
    tools: ['Python', 'Pandas', 'VADER', 'AI Classification', 'JavaScript', 'Plotly.js'],
    question: 'How do consent and autonomy, fixation and control, and character empathy and moral responsibility appear in audience reactions to Obsession—and how do trailer comments compare with post-release reviews?',
    method: [
        "Planned workflow: ", 
        "Collect approximately 100 de-identified public reactions: 60 post-release reviews and 40 official-trailer comments.",
        "Clean, organize, and document sources using Python and Pandas.",
        "Calculate baseline sentiment scores using VADER.",
        "Classify reactions using an AI-assisted three-theme psychology codebook.",
        "Manually evaluate 25 AI-generated theme labels.",
        "Compare theme prevalence, sentiment, and empathy-versus-blame patterns.",
        "Export verified JSON summaries for an interactive HTML, CSS, JavaScript, and Plotly.js dashboard."
      ],
    results: [
        "Planned deliverables: ", 
        "Cleaned and sentiment-scored audience-response dataset.",
        "Documented codebook covering consent and autonomy, fixation and control, and character empathy and moral responsibility.",
        "Human evaluation of 25 AI-generated labels.",
        "Interactive audience-insights dashboard.",
        "One-page findings summary and documented AI-use log.",
        "Reproducible GitHub repository and discussion of sampling and interpretation limitations."
    ],
    github: '' // Paste GitHub repository URL when published.
  }
];

const grid = document.getElementById('projects-grid');
const overlay = document.getElementById('project-overlay');
const drawer = document.getElementById('project-drawer');
let previousFocus = null;

/* Create elements safely using textContent (not injected HTML). */
function makeElement(tag, className, content) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (content !== undefined) el.textContent = content;
  return el;
}
function renderProjects() {
  grid.replaceChildren();
  projects.forEach(project => {
    const card = makeElement('button', 'project-card');
    card.type = 'button';
    card.setAttribute('aria-label', `View details for ${project.title}`);
    const top = makeElement('div', 'project-card-top');
    top.append(makeElement('span', 'project-category', project.categoryLabel), makeElement('span', 'project-arrow', '↗'));
    card.append(top, makeElement('h2', 'project-card-title', project.title), makeElement('p', 'project-card-description', project.description));
    const tags = makeElement('div', 'project-tags');
    project.tools.forEach(tool => tags.append(makeElement('span', 'project-tag', tool)));
    card.append(tags);
    card.addEventListener('click', () => openProject(project));
    grid.append(card);
  });
}

/*
  Render an array as a bullet list.
  replaceChildren() removes old bullets before
  displaying the newly selected project.
  use textContent through makeElement()
  to insert text safely.
*/
function renderBulletList(elementId, items) {
    const container = document.getElementById(elementId);
    const list = makeElement('ul', 'project-detail-list');
    items.forEach(item => {
        list.append(makeElement('li', '', item));
    });
    container.replaceChildren(list);
}

function openProject(project) {
  previousFocus = document.activeElement;
  document.getElementById('drawer-category').textContent = project.categoryLabel;
  document.getElementById('drawer-title').textContent = project.title;
  document.getElementById('drawer-summary').textContent = project.description;
  document.getElementById('drawer-question').textContent = project.question;

  // Populate the two sections .
  renderBulletList('drawer-method', project.method);
  renderBulletList('drawer-results', project.results);

  const tags = document.getElementById('drawer-tags');
  tags.replaceChildren(...project.tools.map(tool => makeElement('span', 'project-tag', tool)));
  const source = document.getElementById('drawer-source');
  const note = document.getElementById('drawer-source-note');
  // Only enable the GitHub link for a real HTTPS URL supplied above.
  const validGitHub = /^https:\/\/github\.com\//i.test(project.github);
  source.hidden = !validGitHub;
  note.hidden = validGitHub;
  if (validGitHub) source.href = project.github;
  else source.removeAttribute('href');
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
  document.getElementById('project-close').focus();
}
function closeProject() {
  overlay.hidden = true;
  document.body.style.overflow = '';
  if (previousFocus) previousFocus.focus();
}
document.getElementById('project-close').addEventListener('click', closeProject);
document.getElementById('project-backdrop').addEventListener('click', closeProject);
document.addEventListener('keydown', event => {
  if (overlay.hidden) return;
  if (event.key === 'Escape') closeProject();
  // Keep keyboard focus inside the open dialog.
  if (event.key === 'Tab') {
    const focusables = [...drawer.querySelectorAll('button:not([disabled]), a[href]')].filter(el => !el.hidden);
    if (!focusables.length) return;
    const first = focusables[0], last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
renderProjects();
