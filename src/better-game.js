const BUILD = 'Strategic village v5 — dilemmas, projects, villagers, consequences';
const SAVE_KEY = 'spiritual-civilization-v5';

const names = ['Aru','Liora','Nima','Sahar','Talin','Mira','Oren','Ziva','Ruhan','Selah','Kian','Ayla','Sorin','Noura','Tova','Darian'];
const callings = ['Teacher','Gardener','Builder','Healer','Mediator','Artist','Scholar','Steward'];
const glyphs = ['✦','☉','☾','✧','❋','✺','◌','✶','◆','◇','☼','✹'];
const virtues = ['love','justice','courage','humility','patience','truthfulness','generosity','detachment'];

const places = {
  council: { name: 'Council Fire', icon: '🔥', x: 50, y: 48, project: 'consultation' },
  school: { name: 'School Circle', icon: '📜', x: 24, y: 30, project: 'knowledge' },
  grove: { name: 'Sacred Grove', icon: '✦', x: 73, y: 27, project: 'spirit' },
  gardens: { name: 'Gardens', icon: '🌿', x: 24, y: 70, project: 'food' },
  workshop: { name: 'Workshop', icon: '🛠', x: 72, y: 69, project: 'tools' },
  arts: { name: 'Arts Hall', icon: '🎶', x: 86, y: 48, project: 'beauty' },
  homes: { name: 'Homes', icon: '☾', x: 15, y: 50, project: 'wellbeing' },
  bridge: { name: 'Peace Bridge', icon: '◇', x: 48, y: 75, project: 'justice' }
};

const actions = {
  consult: { label: 'Consult on a dilemma', place: 'council', stat: 'unity', virtue: 'humility', cost: { energy: 12, food: 1 }, payoff: { unity: 6, justice: 3, trust: 2 }, text: 'The village searches for truth without clinging to ego.' },
  teach: { label: 'Teach children and youth', place: 'school', stat: 'knowledge', virtue: 'truthfulness', cost: { energy: 10, food: 1 }, payoff: { knowledge: 7, unity: 1, trust: 1 }, text: 'Capacity grows across generations.' },
  pray: { label: 'Hold devotional gathering', place: 'grove', stat: 'spirit', virtue: 'detachment', cost: { energy: 5 }, payoff: { spirit: 8, morale: 6, unity: 2 }, text: 'The village remembers why it serves.' },
  farm: { label: 'Tend gardens', place: 'gardens', stat: 'food', virtue: 'patience', cost: { energy: 13 }, payoff: { food: 9, ecology: 4, morale: 1 }, text: 'Care for the land becomes care for the people.' },
  build: { label: 'Build an institution', place: 'workshop', stat: 'tools', virtue: 'courage', cost: { energy: 15, food: 2 }, payoff: { tools: 7, material: 5 }, text: 'The community turns aspiration into structure.' },
  serve: { label: 'Serve the vulnerable', place: 'homes', stat: 'service', virtue: 'generosity', cost: { energy: 16, food: 2 }, payoff: { service: 8, unity: 3, trust: 3 }, text: 'Needs are met through sacrifice.' },
  mediate: { label: 'Mediate conflict', place: 'bridge', stat: 'justice', virtue: 'justice', cost: { energy: 14 }, payoff: { justice: 8, unity: 2, trust: 2 }, text: 'Painful difference becomes a path to maturity.' },
  create: { label: 'Make art and stories', place: 'arts', stat: 'beauty', virtue: 'love', cost: { energy: 9, food: 1 }, payoff: { beauty: 8, morale: 5, spirit: 2 }, text: 'The soul of the village becomes visible.' },
  rest: { label: 'Rest and visit homes', place: 'homes', stat: 'morale', virtue: 'detachment', cost: {}, payoff: { morale: 7, spirit: 3 }, rest: true, text: 'Renewal protects service from becoming exhaustion.' }
};

const dilemmas = [
  {
    title: 'A hungry family arrives',
    text: 'The storehouse is already low, but a family from beyond the hills asks for shelter.',
    choices: [
      { label: 'Share food now', effects: { food: -8, unity: 4, service: 6, trust: 3 }, note: 'Generosity deepens unity, but scarcity becomes sharper.' },
      { label: 'Offer shelter, delay food', effects: { food: -2, justice: -4, morale: -3, material: 3 }, note: 'Resources are preserved, but the vulnerable feel unseen.' },
      { label: 'Consult with everyone', effects: { unity: 3, justice: 3, food: -4, knowledge: 2 }, note: 'A slower answer creates shared ownership.' }
    ]
  },
  {
    title: 'A gifted builder wants status',
    text: 'A talented villager demands authority because their work is useful.',
    choices: [
      { label: 'Grant authority', effects: { tools: 6, justice: -5, unity: -4 }, note: 'Work accelerates, but hierarchy wounds trust.' },
      { label: 'Invite humble service', effects: { justice: 4, unity: 3, tools: -2 }, note: 'The village protects equality, though progress slows.' },
      { label: 'Create accountable roles', effects: { tools: 3, justice: 3, knowledge: 2, food: -2 }, note: 'Institutional structure turns talent toward service.' }
    ]
  },
  {
    title: 'The young are bored',
    text: 'Youth attend gatherings, but they feel no ownership of village life.',
    choices: [
      { label: 'Give them real responsibility', effects: { service: 4, knowledge: 3, morale: 4, food: -2 }, note: 'Trust awakens capacity.' },
      { label: 'Entertain them', effects: { beauty: 5, morale: 4, spirit: -3 }, note: 'The mood improves, but purpose remains thin.' },
      { label: 'Pair them with mentors', effects: { knowledge: 5, unity: 3, morale: 2 }, note: 'Learning becomes relational.' }
    ]
  },
  {
    title: 'The land is tired',
    text: 'The gardens produce food, but the soil is losing vitality.',
    choices: [
      { label: 'Keep producing', effects: { food: 8, ecology: -8, spirit: -2 }, note: 'Immediate needs are met at ecological cost.' },
      { label: 'Let fields recover', effects: { ecology: 7, food: -5, morale: -2 }, note: 'The future is protected, but today feels harder.' },
      { label: 'Redesign the gardens', effects: { ecology: 5, knowledge: 3, food: -2, tools: -2 }, note: 'Learning helps the village adapt.' }
    ]
  },
  {
    title: 'A quiet prejudice appears',
    text: 'Some callings are being praised while others are treated as lesser.',
    choices: [
      { label: 'Name the injustice publicly', effects: { justice: 6, unity: -2, trust: 2 }, note: 'Truth causes discomfort before it heals.' },
      { label: 'Avoid tension', effects: { unity: 2, justice: -7, trust: -4 }, note: 'Surface peace hides deeper harm.' },
      { label: 'Create mixed service teams', effects: { justice: 4, unity: 4, service: 3, energy: -3 }, note: 'Shared work dissolves false separation.' }
    ]
  }
];

function freshState() {
  const villagers = Array.from({ length: 6 }, (_, index) => makeVillager(index));
  return {
    day: 1,
    actionsLeft: 3,
    metrics: { unity: 38, justice: 35, knowledge: 31, spirit: 36, service: 34, beauty: 27, ecology: 42, material: 33, food: 24, tools: 16, morale: 48, trust: 42 },
    projects: { council: 0, school: 0, grove: 0, gardens: 0, workshop: 0, arts: 0, homes: 0, bridge: 0 },
    villagers,
    selectedId: villagers[0].id,
    currentDilemma: pick(dilemmas),
    lastPlace: 'council',
    message: 'Choose a villager, assign them meaningful work, face dilemmas, and end each day before exhaustion ruins the village.',
    log: ['A village begins with capacity, not conquest.']
  };
}

function makeVillager(index = 0) {
  const calling = pick(callings);
  const virtue = pick(virtues);
  return {
    id: `v-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}-${index}`,
    name: names[index % names.length],
    glyph: glyphs[index % glyphs.length],
    calling,
    virtue,
    energy: rand(58, 88),
    morale: rand(42, 74),
    trust: rand(35, 70),
    growth: rand(0, 10),
    place: Object.keys(places)[index % Object.keys(places).length],
    memory: `${calling} learning ${virtue}`
  };
}

let state = load() || freshState();
render();

function selectedVillager() {
  return state.villagers.find(v => v.id === state.selectedId) || state.villagers[0];
}

function doAction(actionId) {
  if (state.actionsLeft <= 0) return setMessage('No attention left today. End the day to continue.');
  const villager = selectedVillager();
  const action = actions[actionId];
  if (!action || !villager) return;

  if (!action.rest && villager.energy < (action.cost.energy || 0)) {
    return setMessage(`${villager.name} is too tired for ${action.label.toLowerCase()}. Choose rest or another villager.`);
  }
  if ((action.cost.food || 0) > state.metrics.food) {
    return setMessage(`Not enough food for ${action.label.toLowerCase()}. Tend gardens, share wisely, or end the day carefully.`);
  }

  state.actionsLeft -= 1;
  state.lastPlace = action.place;
  villager.place = action.place;

  for (const [key, value] of Object.entries(action.cost)) apply(key, -value);

  const match = callingMatch(villager.calling, actionId) ? 18 : 0;
  const virtueMatch = villager.virtue === action.virtue ? 14 : 0;
  const energyPenalty = villager.energy < 35 ? -18 : 0;
  const projectBonus = Math.floor((state.projects[action.place] || 0) / 25) * 5;
  const chance = clamp(48 + match + virtueMatch + projectBonus + energyPenalty + Math.floor((villager.trust - 45) / 5), 15, 92);
  const roll = rand(1, 100);
  const success = roll <= chance || action.rest;
  const multiplier = success ? 1 : 0.35;

  for (const [key, value] of Object.entries(action.payoff)) apply(key, Math.round(value * multiplier));
  if (!action.rest) state.projects[action.place] = clamp((state.projects[action.place] || 0) + (success ? rand(8, 15) : rand(2, 6)), 0, 100);

  villager.energy = clamp(villager.energy + (action.rest ? rand(18, 28) : -(action.cost.energy || 6)), 0, 100);
  villager.morale = clamp(villager.morale + (success ? rand(1, 5) : -rand(2, 7)) + (action.rest ? 5 : 0), 0, 100);
  villager.trust = clamp(villager.trust + (success ? 2 : -3), 0, 100);
  villager.growth = clamp(villager.growth + (success ? rand(2, 5) : 1), 0, 100);
  villager.memory = success ? `${action.label} strengthened ${action.stat}.` : `${action.label} struggled; capacity is not automatic.`;

  const result = success ? 'succeeded' : 'partly failed';
  const line = `${villager.name} ${result}: ${action.text} Success chance ${chance}%, roll ${roll}.`;
  state.log.unshift(line);
  state.message = line;
  afterPressure();
  save();
  render();
  showFlash(success ? 'Capacity grew' : 'A hard lesson', line);
}

function chooseDilemma(index) {
  const choice = state.currentDilemma.choices[index];
  if (!choice) return;
  for (const [key, value] of Object.entries(choice.effects)) apply(key, value);
  state.log.unshift(`${state.currentDilemma.title}: ${choice.label}. ${choice.note}`);
  state.message = choice.note;
  state.currentDilemma = pick(dilemmas);
  state.actionsLeft = Math.max(0, state.actionsLeft - 1);
  afterPressure();
  save();
  render();
  showFlash(choice.label, choice.note);
}

function endDay() {
  const foodNeeded = state.villagers.length * 2;
  apply('food', -foodNeeded);
  if (state.metrics.food <= 0) {
    apply('morale', -8); apply('trust', -6); apply('unity', -4);
    state.message = 'Food ran out. Hunger damaged trust and unity.';
  } else {
    state.message = `Day ${state.day} ended. The village consumed ${foodNeeded} food.`;
  }
  for (const villager of state.villagers) {
    villager.energy = clamp(villager.energy + rand(14, 24) + Math.floor(state.metrics.morale / 25), 0, 100);
    villager.morale = clamp(villager.morale + (state.metrics.food > 5 ? 2 : -5), 0, 100);
  }
  if (Math.random() < 0.45) state.currentDilemma = pick(dilemmas);
  state.day += 1;
  state.actionsLeft = 3;
  apply('spirit', -1); apply('material', -1);
  state.log.unshift(state.message);
  save();
  render();
  showFlash('New day', state.message);
}

function addVillager() {
  if (state.metrics.food < 8) return setMessage('You need at least 8 food before welcoming another villager.');
  const villager = makeVillager(state.villagers.length);
  state.villagers.push(villager);
  state.selectedId = villager.id;
  apply('food', -4); apply('unity', -2); apply('service', 3);
  state.log.unshift(`${villager.name} joined the village. More capacity, but more needs.`);
  save(); render(); showFlash('A new soul arrives', `${villager.name} joins as a ${villager.calling}.`);
}

function afterPressure() {
  const min = Math.min(...coreMetrics().map(k => state.metrics[k]));
  const max = Math.max(...coreMetrics().map(k => state.metrics[k]));
  if (max - min > 42) {
    apply('trust', -2); apply('unity', -2);
    state.log.unshift('Imbalance creates strain: one dimension is outrunning the others.');
  }
  const exhausted = state.villagers.filter(v => v.energy < 18).length;
  if (exhausted) {
    apply('morale', -exhausted * 2); apply('service', -exhausted);
  }
}

function score() {
  const core = coreMetrics().map(k => state.metrics[k]);
  const projectAverage = average(Object.values(state.projects));
  return Math.round(average(core) * 0.75 + projectAverage * 0.25);
}

function stage() {
  const s = score();
  const min = Math.min(...coreMetrics().map(k => state.metrics[k]));
  if (s >= 76 && min >= 55) return 'Spiritual Civilization';
  if (s >= 62) return 'Culture of Service';
  if (s >= 48) return 'Learning Village';
  return 'Fragile Settlement';
}

function render() {
  const selected = selectedVillager();
  const weakest = Object.entries(state.metrics).sort((a,b) => a[1]-b[1])[0];
  document.querySelector('#app').innerHTML = `
    <header class="hero">
      <div>
        <span class="build">${BUILD}</span>
        <h1>Build a spiritual civilization through hard choices.</h1>
        <p>Not every good action is wise right now. Choose who acts, manage food and energy, build institutions, and face dilemmas with consequences.</p>
      </div>
      <div class="stage-card"><span>Day ${state.day} · ${state.actionsLeft} actions left</span><strong>${stage()}</strong><small>Score ${score()} · Weakest: ${label(weakest[0])} ${weakest[1]}</small></div>
    </header>
    <main class="game-grid">
      <section class="panel map-panel">
        <div class="panel-head"><div><span>Village map</span><h2>Living settlement</h2></div><button data-end>End day</button></div>
        ${mapView()}
      </section>
      <section class="panel selected-panel">
        <div class="panel-head"><div><span>Selected villager</span><h2>${selected.name}</h2></div><button data-add>Add villager</button></div>
        ${villagerDetail(selected)}
      </section>
      <section class="panel actions-panel">
        <div class="panel-head"><div><span>Meaningful work</span><h2>Assign ${selected.name}</h2></div></div>
        <div class="action-grid">${Object.entries(actions).map(([id, action]) => actionButton(id, action, selected)).join('')}</div>
      </section>
      <section class="panel dilemma-panel">
        <div class="panel-head"><div><span>Dilemma</span><h2>${state.currentDilemma.title}</h2></div></div>
        <p>${state.currentDilemma.text}</p>
        <div class="choice-grid">${state.currentDilemma.choices.map((choice, i) => `<button data-choice="${i}"><strong>${choice.label}</strong><small>${effectsText(choice.effects)}</small></button>`).join('')}</div>
      </section>
      <section class="panel metrics-panel"><div class="panel-head"><div><span>Village health</span><h2>Metrics</h2></div></div><div class="metrics">${Object.entries(state.metrics).map(metric).join('')}</div></section>
      <section class="panel projects-panel"><div class="panel-head"><div><span>Institutions</span><h2>Project progress</h2></div></div><div class="projects">${Object.entries(places).map(([id, place]) => project(id, place)).join('')}</div></section>
      <section class="panel log-panel"><div class="panel-head"><div><span>Memory</span><h2>Recent consequences</h2></div></div><p class="message">${state.message}</p><ol>${state.log.slice(0,8).map(item => `<li>${item}</li>`).join('')}</ol></section>
    </main>`;

  document.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => doAction(button.dataset.action)));
  document.querySelectorAll('[data-villager]').forEach(button => button.addEventListener('click', () => { state.selectedId = button.dataset.villager; save(); render(); }));
  document.querySelectorAll('[data-choice]').forEach(button => button.addEventListener('click', () => chooseDilemma(Number(button.dataset.choice))));
  document.querySelector('[data-end]').addEventListener('click', endDay);
  document.querySelector('[data-add]').addEventListener('click', addVillager);
}

function mapView() {
  return `<div class="map ${state.actionsLeft === 0 ? 'night' : ''}">
    <div class="glow"></div><div class="road r1"></div><div class="road r2"></div><div class="road r3"></div>
    ${Object.entries(places).map(([id, place]) => `<div class="place ${state.lastPlace === id ? 'active' : ''}" style="left:${place.x}%;top:${place.y}%"><b>${place.icon}</b><span>${place.name}</span></div>`).join('')}
    ${state.villagers.map((v, index) => mapVillager(v, index)).join('')}
  </div>`;
}

function mapVillager(v, index) {
  const place = places[v.place] || places.council;
  const angle = index * 57;
  const x = clamp(place.x + Math.cos(angle) * 5, 7, 93);
  const y = clamp(place.y + Math.sin(angle) * 5, 10, 90);
  return `<button class="map-villager ${v.id === state.selectedId ? 'selected' : ''} ${v.energy < 25 ? 'tired' : ''}" data-villager="${v.id}" style="left:${x}%;top:${y}%;--delay:${(index % 5) * -0.22}s" title="${v.name}"><i>${v.glyph}</i><span>${v.name}</span></button>`;
}

function villagerDetail(v) {
  return `<div class="big-soul"><span>${v.glyph}</span><div><h3>${v.name}</h3><p>${v.calling} · practicing ${v.virtue}</p></div></div>
    <div class="mini-bars">${mini('Energy', v.energy)}${mini('Morale', v.morale)}${mini('Trust', v.trust)}${mini('Growth', v.growth)}</div>
    <p class="memory">${v.memory}</p>
    <div class="villagers">${state.villagers.map(x => `<button data-villager="${x.id}" class="tiny ${x.id === state.selectedId ? 'selected' : ''}">${x.glyph} ${x.name}</button>`).join('')}</div>`;
}

function actionButton(id, action, villager) {
  const match = callingMatch(villager.calling, id);
  const virtue = villager.virtue === action.virtue;
  const disabled = state.actionsLeft <= 0 || (!action.rest && villager.energy < (action.cost.energy || 0)) || (action.cost.food || 0) > state.metrics.food;
  return `<button data-action="${id}" class="work ${match ? 'match' : ''} ${virtue ? 'virtue' : ''}" ${disabled ? 'disabled' : ''}><strong>${action.label}</strong><span>${places[action.place].icon} ${places[action.place].name}</span><small>${match ? 'Calling fit. ' : ''}${virtue ? 'Virtue fit. ' : ''}Costs ${costText(action.cost)} → ${effectsText(action.payoff)}</small></button>`;
}

function metric([key, value]) {
  return `<div class="metric ${value < 25 ? 'danger' : value > 70 ? 'strong' : ''}"><div><span>${label(key)}</span><b>${value}</b></div><meter min="0" max="100" value="${value}"></meter></div>`;
}

function project(id, place) {
  const value = state.projects[id] || 0;
  return `<div class="project"><div><span>${place.icon} ${place.name}</span><b>${value}%</b></div><meter min="0" max="100" value="${value}"></meter></div>`;
}

function mini(labelText, value) {
  return `<div><span>${labelText}</span><meter min="0" max="100" value="${value}"></meter><b>${value}</b></div>`;
}

function callingMatch(calling, actionId) {
  const fits = {
    Teacher: ['teach','consult'], Gardener: ['farm'], Builder: ['build'], Healer: ['serve','rest'], Mediator: ['mediate','consult'], Artist: ['create','pray'], Scholar: ['teach','consult'], Steward: ['farm','build','serve']
  };
  return (fits[calling] || []).includes(actionId);
}

function effectsText(effects) {
  return Object.entries(effects || {}).map(([key, value]) => `${value > 0 ? '+' : ''}${value} ${label(key)}`).join(' · ') || 'no direct cost';
}

function costText(cost) {
  const text = Object.entries(cost || {}).map(([key, value]) => `${value} ${label(key)}`).join(' · ');
  return text || 'none';
}

function coreMetrics() { return ['unity','justice','knowledge','spirit','service','beauty','ecology','material']; }
function apply(key, amount) { state.metrics[key] = clamp((state.metrics[key] || 0) + amount, 0, 100); }
function setMessage(text) { state.message = text; save(); render(); showFlash('Not yet', text); }
function showFlash(title, text) { const node = document.createElement('div'); node.className = 'flash'; node.innerHTML = `<strong>${title}</strong><span>${text}</span>`; document.body.appendChild(node); setTimeout(() => node.remove(), 1600); }
function save() { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); }
function load() { try { return JSON.parse(localStorage.getItem(SAVE_KEY)); } catch { return null; } }
function pick(list) { return list[rand(0, list.length - 1)]; }
function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function clamp(value, min = 0, max = 100) { return Math.max(min, Math.min(max, Math.round(value))); }
function average(values) { return Math.round(values.reduce((sum, value) => sum + value, 0) / Math.max(1, values.length)); }
function label(text) { return String(text).replace(/([A-Z])/g, ' $1').replace(/^./, letter => letter.toUpperCase()); }
