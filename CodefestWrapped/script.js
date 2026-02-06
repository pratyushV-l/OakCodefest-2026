const wrappedData = {
    commits: 0,
    loc: 0,
    semicolons: 0,
    languages: [],
    contributors: []
};

document.getElementById('total-commits').innerText = wrappedData.commits.toLocaleString();
document.getElementById('lines-of-code').innerText = wrappedData.loc.toLocaleString();
document.getElementById('semicolons').innerText = wrappedData.semicolons.toLocaleString();

const langChart = document.getElementById('languages-chart');
wrappedData.languages.forEach(l => {
    langChart.innerHTML += `
        <div class="bar-group">
            <div class="bar-info"><span>${l.name}</span><span>${l.pct}%</span></div>
            <div class="bar-track"><div class="bar-fill" style="width: 0%; transition: width 3s ease-out;" data-w="${l.pct}%" style="background: ${l.color};"></div></div>
        </div>`;
    langChart.lastElementChild.querySelector('.bar-fill').style.backgroundColor = l.color;
});

const contribList = document.getElementById('contributors-list');
wrappedData.contributors.forEach(c => {
    contribList.innerHTML += `
        <div class="contributor-item">
            <div class="avatar" style="background: ${c.color};">${c.initial}</div> <span class="name">${c.name}</span>
        </div>`;
});

const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
let current = 0;

function update() {
    slides.forEach((s, i) => {
        s.classList.toggle('active', i === current);
        if (i === current) animate(s);
    });
    
    prevBtn.style.display = current === 0 ? 'none' : 'block';
    nextBtn.innerText = current === 0 ? "Start Wrapped" : (current === slides.length - 1 ? "Replay" : "Next");
}

function animate(slide) {
    slide.querySelectorAll('.stat-value').forEach(c => {
        let end = parseInt(c.innerText.replace(/,/g,''));
        let start = 0;
        let timer = setInterval(() => {
            start += Math.ceil(end / 100);
            if (start >= end) { start = end; clearInterval(timer); }
            c.innerText = start.toLocaleString();
        }, 30);
    });

    slide.querySelectorAll('.bar-fill').forEach(b => {
        let w = b.dataset.w;
        b.style.width = '0%';
        setTimeout(() => b.style.width = w, 100);
    });
}

nextBtn.onclick = () => {
    current = (current + 1) % slides.length;
    update();
};

prevBtn.onclick = () => {
    current = Math.max(0, current - 1);
    update();
};

update();