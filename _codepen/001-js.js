const steps = [
  { line:0, stack:["console.log('A')"], api:[], queue:[], out:[],
    narr:"<strong>Line 1.</strong> console.log('A') is pushed onto the call stack. The chef starts cooking it." },
  { line:0, stack:[], api:[], queue:[], out:["A"],
    narr:"It prints <strong>A</strong> and pops off. The stack is empty again." },
  { line:1, stack:["setTimeout(cb, 0)"], api:[], queue:[], out:["A"],
    narr:"<strong>Line 2.</strong> setTimeout goes on the stack — but JS doesn't babysit the timer itself." },
  { line:1, stack:[], api:["⏱ timer (0ms)"], queue:[], out:["A"],
    narr:"The timer is handed off to the <strong>browser's Web API</strong>. The chef is instantly free again — that's the whole trick of async." },
  { line:2, stack:["console.log('C')"], api:["⏱ timer (0ms)"], queue:[], out:["A"],
    narr:"<strong>Line 3</strong> doesn't wait. console.log('C') jumps straight onto the now-empty stack." },
  { line:2, stack:[], api:["⏱ timer (0ms)"], queue:[], out:["A","C"],
    narr:"<strong>C prints before B</strong> — even though the timer was 0ms. Synchronous code never waits for timers." },
  { line:-1, stack:[], api:[], queue:["() => log('B')"], out:["A","C"],
    narr:"The timer fires. But the callback can't interrupt anyone — it queues up at the <strong>pickup window</strong> and waits." },
  { line:-1, stack:["() => log('B')"], api:[], queue:[], out:["A","C"],
    narr:"The <strong>event loop</strong> checks: stack empty? Yes. Queue has something? Yes. It pushes the callback onto the stack." },
  { line:-1, stack:[], api:[], queue:[], out:["A","C","B"],
    narr:"<strong>B finally prints.</strong> Final order: A → C → B. setTimeout(0) means “as soon as the stack is clear” — never “right now.”" }
];
let i = -1, timer = null;
const $ = id => document.getElementById(id);
const outClass = { A:"oa", C:"oc", B:"ob" };

function fill(zone, items, cls){
  const z = $(zone);
  z.querySelectorAll('.chip').forEach(c => c.remove());
  items.forEach(t => {
    const d = document.createElement('div');
    d.className = 'chip ' + cls;
    d.textContent = t;
    z.appendChild(d);
  });
}
function render(){
  const s = i < 0
    ? { line:-1, stack:[], api:[], queue:[], out:[], narr:"Press <strong>Step</strong> to walk through one move at a time, or <strong>Auto play</strong> to watch the whole run." }
    : steps[i];
  [0,1,2].forEach(n => $('l'+n).classList.toggle('active', s.line === n));
  fill('z-stack', s.stack, 'stack');
  fill('z-api',   s.api,   'api');
  fill('z-queue', s.queue, 'queue');
  $('out').innerHTML = s.out.map(c => `<span class="${outClass[c]}">${c}</span>`).join('');
  $('narr').innerHTML = s.narr;
}
function stopPlay(){
  if (timer){ clearInterval(timer); timer = null; $('playBtn').textContent = '▶ Auto play'; }
}
function step(){
  if (i < steps.length - 1){ i++; render(); }
  else stopPlay();
}
$('stepBtn').onclick = () => { stopPlay(); step(); };
$('playBtn').onclick = () => {
  if (timer){ stopPlay(); return; }
  if (i >= steps.length - 1) i = -1;
  $('playBtn').textContent = '⏸ Pause';
  timer = setInterval(step, 2000);
  step();
};
$('resetBtn').onclick = () => { stopPlay(); i = -1; render(); };
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight'){ stopPlay(); step(); }
});
render();
