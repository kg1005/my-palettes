const nowProjects = [
  {
    title:'Retail Promotion Intelligence',
    categoryLabel:'RETAIL ANALYTICS + CONSUMER BEHAVIOR',
    description:'A retail decision-support prototype connecting transaction patterns, customer segments, and psychology-informed promotion tests.',
    tools:['Excel','Power Query','Python','Pandas','SQL','Power BI'],
    question:'How can retailers identify different customer purchasing patterns and decide which promotional strategies are worth testing without encouraging constant discount-seeking?',
    method:[
      'Examine the UCI Online Retail transaction dataset.',
      'Document data-quality checks using Excel and Power Query.',
      'Clean and validate records using Python and Pandas.',
      'Calculate revenue and recency-frequency-monetary (RFM) features.',
      'Use SQLite and SQL to analyze customer segments and purchasing patterns.',
      'Build a three-page Power BI dashboard: Executive Overview, Customer Behavior, and Promotion Strategy Lab.',
      'Develop promotion hypotheses and proposed A/B tests with guardrail metrics.'
    ],
    results:[
      'Reproducible cleaning and segmentation pipeline.',
      'Documented SQL queries and analytical summaries.',
      'Three-page interactive Power BI dashboard.',
      'Psychology research brief and three testable promotion recommendations.',
      'Clear limitations: no verified campaign exposure, discount depth, margins, or causal promotion lift.'
    ],
    github:''
  },
  {
    title:'Obsession Review Lens',
    categoryLabel:'AUDIENCE INSIGHTS + APPLIED AI',
    description:'An AI-assisted study of how viewers discuss autonomy, obsessive control, and moral responsibility in reactions to Curry Barker’s Obsession.',
    tools:['Python','Pandas','VADER','AI Classification','JavaScript','Plotly.js'],
    question:'How do consent and autonomy, fixation and control, and character empathy and moral responsibility appear in audience reactions to Obsession—and how do trailer comments compare with post-release reviews?',
    method:[
      'Collect approximately 100 de-identified public reactions: roughly 60 reviews and 40 trailer comments.',
      'Clean and document sources using Python and Pandas.',
      'Calculate baseline sentiment with VADER.',
      'Classify reactions using a fixed three-theme psychology codebook with AI assistance.',
      'Manually evaluate 25 AI-generated labels.',
      'Compare theme prevalence, sentiment, and empathy-versus-blame patterns.',
      'Export verified JSON summaries for an interactive JavaScript and Plotly.js dashboard.'
    ],
    results:[
      'Cleaned and sentiment-scored response dataset.',
      'Documented psychology theme codebook.',
      'Human evaluation of 25 AI-generated labels.',
      'Interactive audience-insights dashboard.',
      'One-page findings summary, AI-use log, and reproducible GitHub repository.',
      'Limitations on self-selected samples, generalization, and causal interpretations.'
    ],
    github:''
  },
  {
    title:'My Palettes — Personal Portfolio Website',
    categoryLabel:'WEB DESIGN + CREATIVE DEVELOPMENT',
    description:'An evolving watercolor-inspired portfolio that brings together data science, psychology, photography, and personal design.',
    tools:['HTML','CSS','JavaScript','Responsive Design','UI/UX'],
    question:'How can a personal website communicate both analytical work and creative identity through an intuitive, cohesive visual experience?',
    questionHeading:'Design question',
    methodHeading:'Design & development approach',
    resultsHeading:'Ongoing improvements',
    method:[
      'Build the page structure and semantic navigation using HTML.',
      'Develop responsive layouts, watercolor-inspired backgrounds, typography, and hover effects with CSS.',
      'Use JavaScript to render interactive project cards and open accessible details drawers.',
      'Organize the website around different color palettes representing different parts of my life.',
      'Refine layout, spacing, mobile usability, and content through iterative testing and feedback.'
    ],
    results:[
      'Maintain and refine the Home, Profile, Projects, Now, and Creative Works pages.',
      'Improve mobile layouts, navigation, and keyboard accessibility.',
      'Expand the Creative Works gallery and document the color psychology behind the design.',
      'Continue developing practical HTML, CSS, and JavaScript skills as the site evolves.'
    ],
    github:'' // Add the real portfolio repository URL once public.
  }
];

const nowGrid=document.getElementById('now-projects-grid');
const nowOverlay=document.getElementById('now-overlay');
const nowDrawer=document.getElementById('now-drawer');
let lastFocused=null;

// Create HTML elements without injecting HTML strings.
function nowElement(tag,className,text){
  const element=document.createElement(tag);
  if(className) element.className=className;
  if(text!==undefined) element.textContent=text;
  return element;
}

function nowList(id,items){
  const ul=nowElement('ul','project-detail-list');
  items.forEach(item=>ul.append(nowElement('li','',item)));
  document.getElementById(id).replaceChildren(ul);
}

function openNowProject(project){
  lastFocused=document.activeElement;
  document.getElementById('now-drawer-category').textContent=project.categoryLabel;
  document.getElementById('now-drawer-title').textContent=project.title;
  document.getElementById('now-drawer-summary').textContent=project.description;
  // Some projects are design-oriented, so their drawer headings can differ.
  document.getElementById('now-question-heading').textContent=project.questionHeading || 'Research question';
  document.getElementById('now-method-heading').textContent=project.methodHeading || 'Methods & technical approach';
  document.getElementById('now-results-heading').textContent=project.resultsHeading || 'Planned deliverables';
  document.getElementById('now-drawer-question').textContent=project.question;
  nowList('now-drawer-method',project.method);
  nowList('now-drawer-results',project.results);
  document.getElementById('now-drawer-tags').replaceChildren(...project.tools.map(t=>nowElement('span','project-tag',t)));
  const source=document.getElementById('now-drawer-source');
  const note=document.getElementById('now-drawer-source-note');
  const validGitHub=/^https:\/\/github\.com\//i.test(project.github);
  source.hidden=!validGitHub;
  note.hidden=validGitHub;
  if(validGitHub) source.href=project.github;
  else source.removeAttribute('href');
  nowOverlay.hidden=false;
  document.body.style.overflow='hidden';
  document.getElementById('now-close').focus();
}

function closeNowProject(){
  nowOverlay.hidden=true;
  document.body.style.overflow='';
  if(lastFocused) lastFocused.focus();
}

// Create all three cards automatically from the project data.
nowProjects.forEach(project=>{
  const card=nowElement('button','project-card');
  card.type='button';
  card.setAttribute('aria-label',`View details for ${project.title}`);
  const top=nowElement('div','project-card-top');
  top.append(nowElement('span','project-category',project.categoryLabel),nowElement('span','project-arrow','↗'));
  card.append(top,nowElement('h2','project-card-title',project.title),nowElement('p','project-card-description',project.description));
  const tags=nowElement('div','project-tags');
  project.tools.forEach(tool=>tags.append(nowElement('span','project-tag',tool)));
  card.append(tags);
  card.addEventListener('click',()=>openNowProject(project));
  nowGrid.append(card);
});

document.getElementById('now-close').addEventListener('click',closeNowProject);
document.getElementById('now-backdrop').addEventListener('click',closeNowProject);
document.addEventListener('keydown',event=>{
  if(nowOverlay.hidden) return;
  if(event.key==='Escape') closeNowProject();
  if(event.key==='Tab'){
    const focusable=[...nowDrawer.querySelectorAll('button:not([disabled]),a[href]')].filter(el=>!el.hidden);
    if(!focusable.length) return;
    const first=focusable[0],last=focusable[focusable.length-1];
    if(event.shiftKey && document.activeElement===first){event.preventDefault();last.focus();}
    else if(!event.shiftKey && document.activeElement===last){event.preventDefault();first.focus();}
  }
});
