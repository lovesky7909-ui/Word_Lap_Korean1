const quizData = [
    { word: "사과", pos: "명사", hint: "사물의 이름을 나타냅니다.", ans: {form:"불변어", func:"체언", mean:"이름"} },
    { word: "그녀", pos: "대명사", hint: "이름을 대신하여 가리킵니다.", ans: {form:"불변어", func:"체언", mean:"대신함"} },
    { word: "다섯", pos: "수사", hint: "수량이나 순서를 나타냅니다.", ans: {form:"불변어", func:"체언", mean:"수량/순서"} },
    { word: "먹는다", pos: "동사", hint: "움직임을 나타내며 활용합니다.", ans: {form:"가변어", func:"용언", mean:"움직임"} },
    { word: "예쁘다", pos: "형용사", hint: "상태나 성질을 나타냅니다.", ans: {form:"가변어", func:"용언", mean:"상태/성질"} },
    { word: "헌 (신발)", pos: "관형사", hint: "체언을 꾸며주며 변하지 않습니다.", ans: {form:"불변어", func:"수식언", mean:"체언 꾸밈"} },
    { word: "매우", pos: "부사", hint: "용언이나 문장을 꾸며줍니다.", ans: {form:"불변어", func:"수식언", mean:"용언 꾸밈"} },
    { word: "이/가", pos: "조사", hint: "관계언으로 체언 뒤에 붙습니다.", ans: {form:"불변어", func:"관계언", mean:"관계 표시"} },
    { word: "세상에", pos: "감탄사", hint: "놀람이나 느낌을 나타냅니다.", ans: {form:"불변어", func:"독립언", mean:"놀람/느낌"} }
];

const criteria = {
    form: ["불변어", "가변어"],
    func: ["체언", "용언", "수식언", "관계언", "독립언"],
    mean: ["이름", "대신함", "수량/순서", "움직임", "상태/성질", "체언 꾸밈", "용언 꾸밈", "관계 표시", "놀람/느낌"]
};

let groupSize = 4;
let memberNames = [];
let teamName = "";
let currentQuizIdx = 0;
let score = 0;
let attemptNum = 1;
let currentMemberIdx = 0;
let currentAnswers = [];
let personalScores = {}; // 개인별 정답 횟수 기록
let history = []; // 전체 풀이 기록 저장

// [1] 초기화 및 팀 생성
const teamSelect = document.getElementById("team-select");
for(let i=1; i<=10; i++) {
    const opt = document.createElement("option");
    opt.value = i + "모둠";
    opt.innerText = i + "모둠";
    teamSelect.appendChild(opt);
}

function renderNameInputs() {
    const area = document.getElementById("name-inputs-area");
    area.innerHTML = "";
    groupSize = parseInt(document.getElementById("member-count").value);
    for(let i=0; i<groupSize; i++) {
        area.innerHTML += `<input type="text" class="name-input" placeholder="학생 ${i+1}" value="학생${i+1}">`;
    }
}
document.getElementById("member-count").addEventListener("change", renderNameInputs);
renderNameInputs();

document.getElementById("start-quiz-btn").addEventListener("click", () => {
    teamName = teamSelect.value;
    memberNames = Array.from(document.querySelectorAll(".name-input")).map(i => i.value || "익명");
    memberNames.forEach(name => personalScores[name] = 0);
    document.getElementById("setup-container").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    initQuiz();
});

// [2] 퀴즈 로직
function initQuiz() {
    attemptNum = 1;
    resetRound();
    const q = quizData[currentQuizIdx];
    document.getElementById("word-display").innerText = q.word;
    document.getElementById("question-count").innerText = currentQuizIdx + 1;
    document.getElementById("team-display-tag").innerText = teamName;
    document.getElementById("attempt-count").innerText = attemptNum;
}

function resetRound() {
    currentMemberIdx = 0;
    currentAnswers = [];
    document.getElementById("options-container").classList.remove("hidden");
    document.getElementById("anonymous-result-box").classList.add("hidden");
    document.getElementById("remedial-box").classList.add("hidden");
    document.getElementById("strong-hint-box").classList.add("hidden");
    renderBadges();
}

function renderBadges() {
    const container = document.getElementById("member-badges-container");
    container.innerHTML = memberNames.map((name, i) => `
        <div class="member-badge ${i===currentMemberIdx?'active':(i<currentMemberIdx?'done':'')}">${name}</div>
    `).join("");
}

document.querySelectorAll(".btn-option").forEach(btn => {
    btn.addEventListener("click", () => {
        if(currentMemberIdx >= groupSize) return;
        currentAnswers.push(btn.dataset.pos);
        currentMemberIdx++;
        renderBadges();
        if(currentMemberIdx === groupSize) finishVoting();
    });
});

function finishVoting() {
    document.getElementById("options-container").classList.add("hidden");
    const resBox = document.getElementById("anonymous-result-box");
    resBox.classList.remove("hidden");
    
    const stats = {};
    currentAnswers.forEach(a => stats[a] = (stats[a] || 0) + 1);
    document.getElementById("result-stat-display").innerHTML = Object.entries(stats).map(([pos, count]) => `
        <div class="stat-bar"><span>${pos}</span> <span>${count}명</span></div>
    `).join("");

    const correctPos = quizData[currentQuizIdx].pos;
    const isAllCorrect = currentAnswers.every(a => a === correctPos);

    const nextDirect = document.getElementById("go-to-next-direct-btn");
    const remedialBtn = document.getElementById("go-to-remedial-btn");

    if(isAllCorrect) {
        nextDirect.classList.remove("hidden");
        remedialBtn.classList.add("hidden");
    } else {
        remedialBtn.classList.remove("hidden");
        nextDirect.classList.add("hidden");
    }
}

// [3] 보완 학습 및 근거 입력
document.getElementById("go-to-remedial-btn").addEventListener("click", () => {
    if(attemptNum >= 4) {
        alert("도전 기회를 모두 소진했습니다. 다음 문제로 넘어갑니다.");
        nextQuestion();
        return;
    }
    document.getElementById("anonymous-result-box").classList.add("hidden");
    document.getElementById("remedial-box").classList.remove("hidden");
    
    // 힌트 제공
    if(attemptNum >= 2) {
        const hintBox = document.getElementById("strong-hint-box");
        hintBox.classList.remove("hidden");
        hintBox.innerText = "💡 강력 힌트: " + quizData[currentQuizIdx].hint;
    }

    setupSelect("sel-form", criteria.form);
    setupSelect("sel-func", criteria.func);
    setupSelect("sel-mean", criteria.mean);
});

function setupSelect(id, list) {
    const sel = document.getElementById(id);
    sel.innerHTML = `<option value="">--선택--</option>` + list.map(v => `<option value="${v}">${v}</option>`).join("");
}

document.getElementById("retry-quiz-btn").addEventListener("click", () => {
    const q = quizData[currentQuizIdx];
    const form = document.getElementById("sel-form").value;
    const func = document.getElementById("sel-func").value;
    const mean = document.getElementById("sel-mean").value;

    if(form === q.ans.form && func === q.ans.func && mean === q.ans.mean) {
        alert("근거를 맞혔습니다! 다시 투표하세요.");
        attemptNum++;
        document.getElementById("attempt-count").innerText = attemptNum;
        resetRound();
    } else {
        alert("틀린 근거가 있습니다. 다시 상의하세요!");
    }
});

document.getElementById("go-to-next-direct-btn").addEventListener("click", () => {
    // 개인 점수 합산 (정답을 맞힌 사람만)
    const correctPos = quizData[currentQuizIdx].pos;
    currentAnswers.forEach((ans, idx) => {
        if(ans === correctPos) personalScores[memberNames[idx]]++;
    });
    score++;
    document.getElementById("score").innerText = score;
    nextQuestion();
});

function nextQuestion() {
    history.push({ word: quizData[currentQuizIdx].word, pos: quizData[currentQuizIdx].pos });
    if(currentQuizIdx < quizData.length - 1) {
        currentQuizIdx++;
        initQuiz();
    } else {
        showFinalResult();
    }
}

// [4] 결과 보고서 및 순위
function showFinalResult() {
    document.getElementById("quiz-container").classList.add("hidden");
    document.getElementById("result-container").classList.remove("hidden");

    // 순위 로직 (실제 DB가 없으므로 가상 순위 계산: 점수 기반)
    const virtualRank = Math.max(1, 11 - score); 
    document.getElementById("team-rank").innerText = virtualRank;

    // 개인 통계
    const personalArea = document.getElementById("personal-stats");
    personalArea.innerHTML = Object.entries(personalScores).map(([name, s]) => `
        <div class="stat-bar"><span>${name}</span> <span>${s}문제 정답</span></div>
    `).join("");

    // 문항 리뷰
    const reviewArea = document.getElementById("review-list");
    reviewArea.innerHTML = history.map((h, i) => `
        <div class="review-item">${i+1}. <b>${h.word}</b> → 정답: ${h.pos}</div>
    `).join("");
}

document.getElementById("prev-btn").addEventListener("click", () => {
    if(currentQuizIdx > 0) {
        currentQuizIdx--;
        initQuiz();
    }
});
