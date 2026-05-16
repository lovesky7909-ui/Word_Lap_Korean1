const quizData = [
    {
        word: "하늘", pos: "명사",
        hint: "사물의 이름을 나타내며 격조사와 결합합니다.",
        steps: {
            form: ["불변어", "가변어"],
            func: ["체언", "용언", "수식언", "관계언", "독립언"],
            mean: ["사물/사람의 이름", "이름을 대신함", "수량/순서", "움직임", "성질/상태"]
        },
        ans: { form: "불변어", func: "체언", mean: "사물/사람의 이름" }
    },
    {
        word: "달린다", pos: "동사",
        hint: "현재형 '-ㄴ다'가 결합하며 움직임을 나타냅니다.",
        steps: {
            form: ["불변어", "가변어"],
            func: ["체언", "용언", "수식언", "관계언", "독립언"],
            mean: ["움직임", "성질/상태", "이름을 꾸밈", "말을 연결함"]
        },
        ans: { form: "가변어", func: "용언", mean: "움직임" }
    }
    // ... 추가 단어들은 동일한 형식으로 확장 가능합니다.
];

let groupSize = 4;
let memberNames = [];
let currentQuizIdx = 0;
let score = 0;
let attemptNum = 1;
let currentMemberIdx = 0;
let currentAnswers = [];

// [초기 설정]
document.getElementById("member-count").addEventListener("change", (e) => {
    groupSize = parseInt(e.target.value);
    renderNameInputs();
});

function renderNameInputs() {
    const area = document.getElementById("name-inputs-area");
    area.innerHTML = "";
    for(let i=0; i<groupSize; i++) {
        area.innerHTML += `<input type="text" class="name-input" placeholder="모둠원 ${i+1}" value="학생${i+1}">`;
    }
}
renderNameInputs();

document.getElementById("start-quiz-btn").addEventListener("click", () => {
    memberNames = Array.from(document.querySelectorAll(".name-input")).map(i => i.value || "익명");
    document.getElementById("setup-container").classList.add("hidden");
    document.getElementById("quiz-container").classList.remove("hidden");
    initQuiz();
});

// [퀴즈 제어]
function initQuiz() {
    attemptNum = 1;
    resetRound();
    const q = quizData[currentQuizIdx];
    document.getElementById("word-display").innerText = q.word;
    document.getElementById("question-count").innerText = currentQuizIdx + 1;
    document.getElementById("attempt-count").innerText = attemptNum;
    
    // 힌트 제어
    const hintBox = document.getElementById("strong-hint-box");
    if (attemptNum >= 3) {
        hintBox.classList.remove("hidden");
        document.getElementById("strong-hint-text").innerText = "💡 힌트: " + q.hint;
    } else { hintBox.classList.add("hidden"); }
}

function resetRound() {
    currentMemberIdx = 0;
    currentAnswers = [];
    document.getElementById("anonymous-result-box").classList.add("hidden");
    document.getElementById("remedial-box").classList.add("hidden");
    document.getElementById("options-container").classList.remove("hidden");
    document.getElementById("feedback-box").classList.add("hidden");
    renderBadges();
}

function renderBadges() {
    const container = document.getElementById("member-badges-container");
    container.innerHTML = memberNames.map((name, i) => `
        <div class="member-badge ${i===currentMemberIdx?'active':(i<currentMemberIdx?'done':'')}">${name}</div>
    `).join("");
}

// [답안 선택]
document.querySelectorAll(".btn-option").forEach(btn => {
    btn.addEventListener("click", () => {
        if(currentMemberIdx >= groupSize) return;
        currentAnswers.push(btn.dataset.pos);
        currentMemberIdx++;
        renderBadges();

        if(currentMemberIdx === groupSize) {
            showAnonymousResults();
        }
    });
});

function showAnonymousResults() {
    document.getElementById("options-container").classList.add("hidden");
    const box = document.getElementById("anonymous-result-box");
    box.classList.remove("hidden");
    
    const stats = {};
    currentAnswers.forEach(a => stats[a] = (stats[a] || 0) + 1);
    
    document.getElementById("result-stat-display").innerHTML = Object.entries(stats).map(([pos, count]) => `
        <div class="stat-bar"><span>${pos}</span> <span>${count}명</span></div>
    `).join("");

    setTimeout(checkResults, 1500); // 통계를 잠시 보여준 후 채점
}

function checkResults() {
    const correctPos = quizData[currentQuizIdx].pos;
    const isAllCorrect = currentAnswers.every(a => a === correctPos);

    if(isAllCorrect) {
        score++;
        document.getElementById("score").innerText = score;
        showFeedback(true);
    } else {
        if(attemptNum >= 4) {
            showFeedback(false);
        } else {
            showRemedial();
        }
    }
}

// [보완 학습]
function showRemedial() {
    document.getElementById("anonymous-result-box").classList.add("hidden");
    const remedial = document.getElementById("remedial-box");
    remedial.classList.remove("hidden");
    
    const q = quizData[currentQuizIdx];
    setupSelect("sel-form", q.steps.form);
    setupSelect("sel-func", q.steps.func);
    setupSelect("sel-mean", q.steps.mean);

    if(attemptNum >= 2) { // 2회 틀린 시점부터 힌트 노출
        document.getElementById("strong-hint-box").classList.remove("hidden");
        document.getElementById("strong-hint-text").innerText = "💡 강력 힌트: " + q.hint;
    }
}

function setupSelect(id, list) {
    const sel = document.getElementById(id);
    sel.innerHTML = `<option value="">-- 선택 --</option>` + list.map(item => `<option value="${item}">${item}</option>`).join("");
}

document.getElementById("retry-quiz-btn").addEventListener("click", () => {
    const q = quizData[currentQuizIdx];
    const userAns = {
        form: document.getElementById("sel-form").value,
        func: document.getElementById("sel-func").value,
        mean: document.getElementById("sel-mean").value
    };

    if(userAns.form === q.ans.form && userAns.func === q.ans.func && userAns.mean === q.ans.mean) {
        alert("근거를 모두 맞혔습니다! 다시 도전하세요.");
        attemptNum++;
        document.getElementById("attempt-count").innerText = attemptNum;
        resetRound();
    } else {
        alert("틀린 근거가 있습니다. 다시 상의해 보세요!");
    }
});

// [피드백 및 이동]
function showFeedback(success) {
    document.getElementById("anonymous-result-box").classList.add("hidden");
    const fBox = document.getElementById("feedback-box");
    fBox.classList.remove("hidden");
    document.getElementById("feedback-text").innerText = success ? "🎉 모둠 전원 정답!" : "😢 다음 기회에..";
    document.getElementById("explanation-content").innerHTML = `정답은 <b>${quizData[currentQuizIdx].pos}</b>입니다.`;
}

document.getElementById("next-btn").addEventListener("click", () => {
    if(currentQuizIdx < quizData.length - 1) {
        currentQuizIdx++;
        initQuiz();
    } else {
        alert("모든 문제를 풀었습니다!");
        location.reload();
    }
});

document.getElementById("prev-btn").addEventListener("click", () => {
    if(currentQuizIdx > 0) {
        currentQuizIdx--;
        initQuiz();
    }
});
