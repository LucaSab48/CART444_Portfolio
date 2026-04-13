import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

const root = process.cwd();

const projectConfigs = [
  {
    page: "partial-perception.html",
    title: "Partial Perception",
    folder: "Works/PartialPerception",
    processText:
      "I developed this installation by connecting a Raspberry Pi Pico W and multiple environmental sensors to a Python pipeline that interprets live data from the room. Through iterative testing, I translated motion, distance, sound, and atmospheric readings into prompts for image generation, refining how the system inferred human presence and projected its shifting perception back into the space. This refinement involved an iterative testing process of different seed values, image generation speed cycling, and cognition text honing. The prototyping stage also involved fine-tuning the smoothing of sensor data to produce more adequate results.",
  },
  {
    page: "lynch-dream-machine.html",
    title: "Lynch Dream Machine",
    folder: "Works/Lynch_Dream_Machine",
    processText:
      "I built this web application in Flask and shaped its behavior through prompt design, using Jungian dream analysis as the interpretive framework. The process involved testing how text generation and image generation could work together so that users would receive both a symbolic written reading and a Lynch-inspired visual response. There was an issue that every dream imputed would flag the image generation model safety guidelines, so a middleman interpreter was added to extract key terms and ambience of the imputed dream to significantly reduce this. The website design was also developed through an iterative process for aesthetics, user navigation, and interactability.",
  },
  {
    page: "bogey.html",
    title: "BOGEY",
    folder: "Works/BOGEY",
    processText:
      "This film was made through a hands-on process of writing, shooting, and editing, with the visual direction evolving through collaboration on set. I developed the work by experimenting with framing, repetition, and performance to create an inward, psychological sense of tension. The VHS tape played in the video is real, the video was recorded onto it to keep the authentic analog vibes. The sound design of the short film was an iterative process of layering different audios and filters till I felt it was visceral enough.",
    relatedLinks: [
      { label: "Behind the Scenes Video 1", href: "https://youtu.be/KyVMeQsppgA" },
      { label: "Behind the Scenes Video 2", href: "https://youtu.be/xa0JD-I_4lo" },
    ],
  },
  {
    page: "unnatural.html",
    title: "un|natural",
    folder: "Works/Unnatural",
    processText:
      "I created this video by filming fragments of nature embedded within urban Montreal over a 2 week period and then assembling them through rhythmic editing. The process focused on collecting visuals that felt quietly unnatural on their own, then using pacing and sound to intensify their relationship to the city. The selection of the clips was done in an iterative way until a proper increase of intensity was present.",
  },
  {
    page: "sentient-sandwich.html",
    title: "Sentient Sandwich",
    folder: "Works/SentientSandwich",
    processText:
      "This project was made by recording food preparation footage and layering it with compositing, sound design, and absurd visual interventions. I developed the piece through experimentation in editing, especially by testing how timing, face superimposition, and audio could give ordinary ingredients a strange sense of life. There were multiple versions of clips, specifically the bleeding tomato scene, which required careful curation.",
  },
  {
    page: "i-can-make-it.html",
    title: "I Can Make It",
    folder: "Works/I_can_make_it",
    processText:
      "I built this game through iterative prototyping in Unity, focusing on movement, obstacle timing, and comedic pacing. The process combined found and custom-made assets, using local references and repeated playtesting to shape a chaotic but recognizable Montreal scenario. There was also a user playtest session to refine the gameplay.",
    pdfLabels: {
      Icanmakeit_UserFeedback: "Download User Playtest Feedback (PDF)",
    },
  },
  {
    page: "hesperides-garden.html",
    title: "Hesperides Garden",
    folder: "Works/Hesperides_Garden",
    processText:
      "This game was developed through a cycle of prototyping, testing, and refining interactions to balance multiple tasks at once. I used playtesting to adjust difficulty, pacing, and feedback so the game could feel both playful and increasingly stressful over time. During the user playtest session, I gathered essential feedback to modify the coherence of the game and made important and impactful changes to the game.",
    pdfLabels: {
      HesperidesGardenPlaytestFeedback: "Download Playtest Feedback (PDF)",
    },
  },
  {
    page: "seasons-greetings.html",
    title: "Seasons Greetings",
    folder: "Works/Seasons_Greetings",
    processText:
      "I created this animation entirely in Blender, building the scene, objects, and loop structure from scratch. The process centered on repetition and timing, with careful attention to motion so the piece could function as a seamless loop while reinforcing the monotony of holiday retail labor. The process required a lot of refinement and testing to produce a final version I was satisfied with.",
  },
  {
    page: "i-got-too-many-cars.html",
    title: "I Got Too Many Cars",
    folder: "Works/I_Got_Too_Many_Cars",
    processText:
      "This piece was made through green screen recording and chroma key experimentation in Premiere Pro. I developed it by pushing exaggeration in performance, timing, and editing to imitate the energy and visual language of over-the-top 1980s car commercials. While filming the greenscreen footage, I had a loose plan of what I was going to put in the video. However, I had to improvise a lot of the editing as the footage was not perfect.",
  },
  {
    page: "sensory-overload.html",
    title: "Sensory Overload",
    folder: "Works/Sensory_Overload",
    processText:
      "I made this video by capturing footage and sound from daily life in the city, then layering them into a dense audiovisual composition. The editing process was driven by accumulation, contrast, and collision, using montage to recreate the feeling of overstimulation. The final version was achieved through visual refinement, specifically for the superimposed body parts.",
  },
  {
    page: "echo-maps.html",
    title: "EchoMaps",
    folder: "Works/EchoMaps",
    processText:
      "This project was developed through a design process that moved from research and ideation to wireframing and video prototyping. I refined the app by thinking through user experience, testing how the interface and narrative framing could support themes of cultural reconnection and self-discovery.",
    relatedLinks: [
      {
        label: "View Figma Prototype",
        href: "https://www.figma.com/proto/6bB39oFElrS20vcnJLADiA/Prototype-1--Map-Based-App-?t=NsZaahPQOXQHaf3v-1",
      },
    ],
    pdfLabels: {
      EchoMaps_Process_UserResearch: "Download User Research Document (PDF)",
    },
  },
  {
    page: "welcome-to-the-family.html",
    title: "Welcome to the Family",
    folder: "Works/Welcome_to_the_Family",
    processText:
      "I created this poster series through digital illustration and compositing, using repetition across three designs to build a shared visual language. The process involved exploring how typography, color, and imagery could mimic the artificial warmth of workplace culture while making that surface feel unsettling. The final results required many iterations to see the best version possible.",
    processSectionClass: "project-process--welcome-family",
    processImageClasses: {
      "Welcome_to_the_Family_ProcessPic3.png": "project-process__item--raise",
    },
  },
];

const processMarkers = {
  start: "<!-- PROCESS_SECTION_START -->",
  end: "<!-- PROCESS_SECTION_END -->",
};

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function humanizeBaseName(baseName) {
  return baseName
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\s+/g, " ")
    .trim();
}

function titleCase(value) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatPdfLabel(baseName, labels = {}) {
  if (labels[baseName]) {
    return labels[baseName];
  }

  const humanized = titleCase(humanizeBaseName(baseName));
  return `Download ${humanized} (PDF)`;
}

function getSortedFiles(folderPath, matcher) {
  return readdirSync(folderPath)
    .filter((name) => matcher.test(name))
    .sort((a, b) => {
      const aMatch =
        a.match(/Process(?:Pic|Video)(\d+)/i) ??
        a.match(/(\d+)(?=\.[^.]+$)/);
      const bMatch =
        b.match(/Process(?:Pic|Video)(\d+)/i) ??
        b.match(/(\d+)(?=\.[^.]+$)/);
      const aNum = aMatch ? Number(aMatch[1]) : 0;
      const bNum = bMatch ? Number(bMatch[1]) : 0;
      return aNum - bNum || a.localeCompare(b);
    });
}

function buildProcessSection(config) {
  const folderPath = path.join(root, config.folder);
  const processImages = getSortedFiles(folderPath, /_ProcessPic\d+\.(png|jpe?g|webp|gif)$/i);
  const processVideos = getSortedFiles(
    folderPath,
    /_Process(?:Pic|Video)\d+\.(mp4|webm|mov|m4v)$/i
  );
  const pdfFiles = getSortedFiles(folderPath, /\.pdf$/i);
  const processHeadingId = `process-heading-${path.parse(config.page).name}`;

  const parts = [];
  parts.push(processMarkers.start);
  parts.push('<section class="section section--tight section--bordered">');
  const processSectionClass = config.processSectionClass
    ? ` project-process ${config.processSectionClass}`
    : " project-process";
  parts.push(`<div class="container${processSectionClass}" aria-labelledby="${processHeadingId}">`);
  parts.push('<div class="section-heading">');
  parts.push("<p class=\"eyebrow\">Process</p>");
  parts.push(`<h2 id="${processHeadingId}">Process</h2>`);
  parts.push("</div>");
  parts.push('<div class="project-process__body">');
  parts.push(`<p>${escapeHtml(config.processText)}</p>`);
  parts.push("</div>");

  if (processImages.length > 0 || processVideos.length > 0) {
    parts.push('<div class="project-process__gallery">');
    processImages.forEach((fileName, index) => {
      const imagePath = `${config.folder}/${fileName}`.replaceAll("\\", "/");
      const alt = `${config.title} process documentation image ${index + 1}`;
      const extraClass = config.processImageClasses?.[fileName]
        ? ` ${config.processImageClasses[fileName]}`
        : "";
      parts.push(
        `<figure class="project-process__item${extraClass}"><img src="${encodeURI(imagePath)}" alt="${escapeHtml(alt)}"></figure>`
      );
    });
    processVideos.forEach((fileName, index) => {
      const videoPath = `${config.folder}/${fileName}`.replaceAll("\\", "/");
      const label = `${config.title} process documentation video ${index + 1}`;
      parts.push(
        `<figure class="project-process__item project-process__item--video"><video controls preload="metadata" playsinline aria-label="${escapeHtml(label)}"><source src="${encodeURI(videoPath)}" type="video/mp4">Your browser does not support the video tag.</video></figure>`
      );
    });
    parts.push("</div>");
  }

  const hasResources = pdfFiles.length > 0 || (config.relatedLinks?.length ?? 0) > 0;
  if (hasResources) {
    parts.push('<div class="project-process__resources">');

    if (pdfFiles.length > 0) {
      parts.push('<div class="project-process__group">');
      parts.push("<h3>Downloads</h3>");
      parts.push('<div class="project-process__links">');
      pdfFiles.forEach((fileName) => {
        const baseName = path.parse(fileName).name;
        const label = formatPdfLabel(baseName, config.pdfLabels);
        const href = `${config.folder}/${fileName}`.replaceAll("\\", "/");
        parts.push(
          `<a class="project-process__link" href="${encodeURI(href)}" download>${escapeHtml(label)}</a>`
        );
      });
      parts.push("</div>");
      parts.push("</div>");
    }

    if ((config.relatedLinks?.length ?? 0) > 0) {
      parts.push('<div class="project-process__group">');
      parts.push("<h3>Related Links</h3>");
      parts.push('<div class="project-process__links">');
      config.relatedLinks.forEach((link) => {
        parts.push(
          `<a class="project-process__link" href="${escapeHtml(link.href)}" target="_blank" rel="noreferrer">${escapeHtml(link.label)}</a>`
        );
      });
      parts.push("</div>");
      parts.push("</div>");
    }

    parts.push("</div>");
  }

  parts.push("</div>");
  parts.push("</section>");
  parts.push(processMarkers.end);
  return parts.join("");
}

function upsertProcessSection(config) {
  const pagePath = path.join(root, config.page);
  let html = readFileSync(pagePath, "utf8");
  const processSection = buildProcessSection(config);

  const processBlockRegex = new RegExp(
    `${processMarkers.start}[\\s\\S]*?${processMarkers.end}`,
    "g"
  );

  html = html.replace(processBlockRegex, "");
  html = html.replace(
    /(<section class="section section--tight section--bordered"><div class="container project-story">[\s\S]*?<\/section>)(<section class="section(?: section--tight)? section--bordered">)/,
    `$1${processSection}$2`
  );

  if (config.page === "hesperides-garden.html") {
    html = html.replaceAll("Works/Hesperides_Garden/GameplayExample1.png", "Works/Hesperides_Garden/Hesperides_Garden_Pic1.png");
    html = html.replaceAll('alt="Hesperides Garden media: GameplayExample1"', 'alt="Hesperides Garden media: Hesperides Garden Pic1"');
  }

  writeFileSync(pagePath, html);
}

function updateContactPage() {
  const contactPath = path.join(root, "contact.html");
  let html = readFileSync(contactPath, "utf8");
  html = html.replace(
    '<a href="#">LinkedIn</a>',
    '<a href="Works/LucaSabelliResume_May2026.pdf" download>Download Resume (PDF)</a>'
  );
  writeFileSync(contactPath, html);
}

function updateWorkArchive() {
  const workPath = path.join(root, "work.html");
  let html = readFileSync(workPath, "utf8");
  html = html.replaceAll(
    "Works/Hesperides_Garden/GameplayExample1.png",
    "Works/Hesperides_Garden/Hesperides_Garden_Pic1.png"
  );
  html = html.replaceAll(
    'alt="Hesperides Garden media: GameplayExample1"',
    'alt="Hesperides Garden media: Hesperides Garden Pic1"'
  );
  writeFileSync(workPath, html);
}

function updateProjectTemplate() {
  const templatePath = path.join(root, "project-template.html");
  let html = readFileSync(templatePath, "utf8");
  html = html.replace(
    "Duplicate this file, rename it for a specific project, then replace the title, year, media, stills, credits, and process notes. The shared CSS is already prepared for editorial project pages.",
    "Duplicate this file, rename it for a specific project, then replace the title, year, media, stills, credits, and process notes. The shared CSS is already prepared for editorial project pages, including the Process section layout used across the archive."
  );
  writeFileSync(templatePath, html);
}

function auditCriticalPaths() {
  const criticalPaths = [
    "Works/LucaSabelliResume_May2026.pdf",
    "Works/Hesperides_Garden/Hesperides_Garden_Pic1.png",
  ];

  criticalPaths.forEach((relativePath) => {
    if (!existsSync(path.join(root, relativePath))) {
      throw new Error(`Missing required asset: ${relativePath}`);
    }
  });
}

auditCriticalPaths();
projectConfigs.forEach(upsertProcessSection);
updateContactPage();
updateWorkArchive();
updateProjectTemplate();
