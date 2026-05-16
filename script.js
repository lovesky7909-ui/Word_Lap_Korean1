// 9품사 퀴즈 및 객관식 근거 시스템 데이터베이스
const quizData = [
    { 
        word: "바다", pos: "명사", 
        praise: "사물의 이름을 뜻하는 '명사'를 모둠원 전원이 힘을 합쳐 멋지게 찾아냈군요!",
        strongHint: "이 단어는 격조사 '가/를/에서' 등이 아주 자연스럽게 결합할 수 있고, 구체적인 자연 사물의 명칭(이름)을 뜻합니다.",
        reasons: [
            { text: "형태가 고정되어 변하지 않으며, 사물의 이름을 나타내는 체언이다.", isCorrect: true },
            { text: "형태가 고정되어 변하지 않으며, 체언 뒤에 붙어 관계를 나타내는 관계언이다.", isCorrect: false },
            { text: "형태가 유연하게 변하며, 주어의 움직임을 주체적으로 나타내는 용언이다.", isCorrect: false },
            { text: "명사 앞에서 뜻을 자세하게 제한하여 꾸며주는 수식언이다.", isCorrect: false }
        ]
    },
    { 
        word: "너", pos: "대명사", 
        praise: "이름을 대신하여 대상을 가리키는 '대명사'임을 모든 조원이 완벽히 판별했습니다!",
        strongHint: "앞에 있는 친구의 실제 이름을 직접 부르지 않고, '말듣이(청자)'를 가리키는 대표적인 대칭 체언입니다.",
        reasons: [
            { text: "형태가 변하지 않으며, 문장에서 주로 주어를 도와주는 관계언이다.", isCorrect: false },
            { text: "사람이나 사물의 이름을 직접 부르지 않고 대신하여 가리키는 체언이다.", isCorrect: true },
            { text: "형태가 활용하여 변하며, 대상의 성질이나 상태를 묘사하는 용언이다.", isCorrect: false },
            { text: "독립적으로 쓰여 말하는 이의 놀람이나 느낌을 표현하는 독립언이다.", isCorrect: false }
        ]
    },
    { 
        word: "셋", pos: "수사", 
        praise: "수량이나 순서를 뜻하는 체언인 '수사'의 개념을 모두 척척 맞춰주었습니다!",
        strongHint: "하나, 둘, 다음으로 이어지는 숫자의 크기나 수량을 확정해 주는 명확한 체언 계열입니다.",
        reasons: [
            { text: "수량이나 순서를 나타내며 격조사와 결합할 수 있는 체언이다.", isCorrect: true },
            { text: "용언(동사/형용사) 앞에 붙어서 그 뜻을 정밀하게 한정하는 수식언이다.", isCorrect: false },
            { text: "문장 내에서 형태가 다양하게 변화(활용)하는 가변어이다.", isCorrect: false },
            { text: "단어 자체에 특별한 문법적 자격을 부여하는 조사이다.", isCorrect: false }
        ]
    },
    { 
        word: "이 / 가", pos: "조사", 
        praise: "앞말에 착 붙어 문법적 자격을 더해주는 '조사'를 전원 훌륭히 마스터했습니다!",
        strongHint: "혼자서는 절대 문장 앞에 올 수 없으며, '하늘(이) 푸르다'처럼 명사 뒤에 밀착하여 주어로 만들어 줍니다.",
        reasons: [
            { text: "체언 뒤에 결합하여 문장 안에서의 문법적 관계를 나타내는 관계언이다.", isCorrect: true },
            { text: "명사의 의미를 실감 나게 꾸며주는 독립적인 수식언이다.", isCorrect: false },
            { text: "사물의 움직임을 서술하는 핵심적인 용언(동사)이다.", isCorrect: false },
            { text: "형태가 다양하게 바뀌면서 문장을 끝맺어주는 가변어이다.", isCorrect: false }
        ]
    },
    { 
        word: "달리다", pos: "동사", 
        praise: "움직임과 행동을 생생하게 표현하는 '동사'를 모둠원 모두가 정확히 이해했네요!",
        strongHint: "'달린다', '달려라'처럼 현재형 어미 '-ㄴ다'나 명령형 어미가 아주 매끄럽게 결합하는 주어의 동작 단어입니다.",
        reasons: [
            { text: "대상의 성질이나 고요한 상태를 표현하는 용언(형용사)이다.", isCorrect: false },
            { text: "문장에서 활용하여 형태가 변하며, 주어의 역동적인 움직임을 나타내는 용언(동사)이다.", isCorrect: true },
            { text: "형태가 전혀 변하지 않으며 다른 독립된 문장을 수식하는 부사이다.", isCorrect: false },
            { text: "사물의 이름을 가리키는 불변어이자 체언이다.", isCorrect: false }
        ]
    },
    { 
        word: "푸르다", pos: "형용사", 
        praise: "성질이나 상태를 묘사하는 '형용사' 분류를 낙오자 없이 전원 통과했습니다!",
        strongHint: "'푸른다(X)', '푸르러라(X)'는 불가능합니다. 현재 움직이는 행동이 아니라, 색채나 상태를 고스란히 유지하고 있습니다.",
        reasons: [
            { text: "시간의 흐름에 따른 움직임을 직접적으로 기술하는 용언이다.", isCorrect: false },
            { text: "활용 능력이 있어 형태가 변하며, 대상의 성질이나 현재 상태를 나타내는 용언(형용사)이다.", isCorrect: true },
            { text: "체언과 융합하여 특별한 문법적 연결을 돕는 관계언이다.", isCorrect: false },
            { text: "다른 말의 간섭을 일절 받지 않는 문장 속 독립언이다.", isCorrect: false }
        ]
    },
    { 
        word: "새 (옷)", pos: "관형사", 
        praise: "체언 앞에서 뜻을 자세히 꾸며주는 '관형사'라는 고난도 개념을 정복했네요!",
        strongHint: "'새가(X)', '새다(X)'처럼 형태를 절대 바꿀 수 없으며, 오로지 명사(옷, 신발, 집) 바로 앞에서만 수식합니다.",
        reasons: [
            { text: "주로 동사나 형용사 등의 용언을 전문적으로 수식하는 부사이다.", isCorrect: false },
            { text: "조사가 붙지 않으며, 오직 체언(명사 등) 앞에 놓여 이를 꾸며주는 수식언(관형사)이다.", isCorrect: true },
            { text: "말하는 사람의 본능적인 감정을 드러내는 독립언이다.", isCorrect: false },
            { text: "형태가 '새고', '새니'와 같이 규칙적으로 변형되는 가변어이다.", isCorrect: false }
        ]
    },
    { 
        word: "매우", pos: "부사", 
        praise: "주로 동사와 형용사를 꾸며주는 '부사'의 역할을 모둠 전체가 명확히 파악했습니다!",
        strongHint: "'매우 푸르다', '매우 잘 달린다'처럼 주로 뒤에 오는 서술어(용언)들의 정도를 힘껏 강조해 줍니다.",
        reasons: [
            { text: "체언을 주로 수식하며 문법적으로 고정된 관형사이다.", isCorrect: false },
            { text: "형태가 고정되어 있으며, 주로 용언(동사/형용사)이나 다른 부사를 꾸며주는 수식언(부사)이다.", isCorrect: true },
            { text: "앞 문장과 뒤 문장을 끈끈하게 이어주는 관계언이다.", isCorrect: false },
            { text: "형태가 변하면서 서술어 역할을 독립적으로 수행하는 용언이다.", isCorrect: false }
        ]
    },
    { 
        word: "어머나", pos: "감탄사", 
        praise: "독립적으로 감정과 놀람을 표현하는 문장 성분인 '감탄사'까지 전원 정답입니다!",
        strongHint: "문장 맨 앞에서 콤마(,)와 함께 단독으로 분리되어 쓰이며, 놀람의 감정을 듬뿍 담은 말입니다.",
        reasons: [
            { text: "문장의 다른 성분들에 얽매이지 않고 독립적으로 감정, 놀람, 응답을 나타내는 독립언이다.", isCorrect: true },
            { text: "체언에 들러붙어 자격을 실어주는 의존적인 관계언이다.", isCorrect: false },
            { text: "사물의 순서나 명칭을 체계화하여 보조하는 체언이다.", isCorrect: false },
            { text: "어미를 변형시켜 다양한 감정을 표현하는 활용 가능한 가변어이다.", isCorrect: false }
        ]
    }
];

let groupSize = 4;
let memberNames = [];
let currentMemberIndex = 0;
let memberAnswers = [];
let currentQuiz = 0;
let score = 0;

// 도전 기회 관련 핵심 상태변수 (최대 4회 제한)
let attemptNum = 1; 

// DOM Elements
const setupContainer = document.getElementById("setup-container");
const quizContainer = document.getElementById("quiz-container");
const memberCountSelect = document.getElementById("member-count");
const nameInputsArea = document.getElementById("name-inputs-area");
const startQuizBtn = document.getElementById("start-quiz-btn");
const memberBadgesContainer = document.getElementById("member-badges-container");
const wordDisplay = document.getElementById("word-display");
const scoreDisplay = document.getElementById("score");
const attemptDisplay = document.getElementById("attempt-count");
const optionsContainer = document.getElementById("options-container");

// 피드백 및 강력 힌트 관련 DOM
const strongHintBox = document.getElementById("strong-hint-box");
const strongHintText = document.getElementById("strong-hint-text");
const remedialBox = document.getElementById("remedial-box");
const reasonOptionsArea = document.getElementById("reason-options-area");
const retryQuizBtn = document.getElementById("retry-quiz-btn");

const feedbackBox = document.getElementById("feedback-box");
const feedbackText = document.getElementById("feedback-text");
const explanationContent = document.getElementById("explanation-content");
const nextBtn = document.getElementById("next-btn");

// 인원 선택 시 입력 폼 자동 갱신
function generateNameInputs() {
    groupSize = parseInt(memberCountSelect.value);
    const existingInputs = nameInputsArea.querySelectorAll(".input-name-field");
    existingInputs.forEach(el => el.remove());

    for (let i = 1; i <= groupSize; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "input-name-field";
        input.placeholder = `모둠원 ${i} 이름`;
        input.value = `학생 ${i}`;
        nameInputsArea.appendChild(input);
    }
}
memberCountSelect.addEventListener("change", generateNameInputs);
generateNameInputs();

// 퀴즈 시작 단계 진입
startQuizBtn.addEventListener("click", () => {
    memberNames = [];
    const inputs = nameInputsArea.querySelectorAll(".input-name-field");
    inputs.forEach(input => {
        const name = input.value.trim();
        if (name) memberNames.push(name);
    });

    if (memberNames.length !== groupSize) {
        alert("모든 모둠원의 이름을 입력해 주세요!");
        return;
    }

    setupContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    loadQuiz();
});

// 문항 초기화 함수
function loadQuiz() {
    feedbackBox.classList.add("hidden");
    feedbackBox.classList.remove("fail-theme");
    remedialBox.classList.add("hidden");
    retryQuizBtn.classList.add("hidden");
    optionsContainer.classList.remove("hidden");
    
    currentMemberIndex = 0;
    memberAnswers = [];
    attemptNum = 1; // 도전 기회 1번으로 원점 리셋
    attemptDisplay.innerText = attemptNum;

    // 2번 이상 틀렸을 때만 켜야 하므로 첫 시작엔 강력힌트 무조건 숨김
    strongHintBox.classList.add("hidden"); 

    // 배지 생성
    memberBadgesContainer.innerHTML = "";
    memberNames.forEach((name, idx) => {
        const badge = document.createElement("div");
        badge.className = "member-badge";
        badge.id = `badge-${idx}`;
        badge.innerHTML = `${name}<br><span class="status">대기</span>`;
        memberBadgesContainer.appendChild(badge);
    });
    updateActiveMemberBadge();

    if (currentQuiz < quizData.length) {
        wordDisplay.innerText = quizData[currentQuiz].word;
    } else {
        // 프로그램 최종 종료 화면
        document.querySelector(".question-box").innerHTML = `
            <p class="instruction">축하합니다! 모둠 협동 퀘스트가 끝났습니다.</p>
            <div id="word-display" style="font-size: 2rem; color: #3182ce;">🏆 품사 정복 모둠 등극 🏆</div>
        `;
        memberBadgesContainer.classList.add("hidden");
        optionsContainer.classList.add("hidden");
        feedbackBox.classList.remove("hidden");
        feedbackText.innerText = `최종 획득 점수: ${score}점`;
        explanationContent.innerHTML = `<div class="praise-box" style="text-align:center;">실패해도 포기하지 않고 힌트와 문법 근거를 찾으며 끝까지 완주한 여러분이 자랑스럽습니다! 👏🎉</div>`;
        nextBtn.innerText = "처음 화면으로 돌아가기 🔄";
        nextBtn.onclick = () => { location.reload(); };
    }
}

function updateActiveMemberBadge() {
    memberNames.forEach((_, idx) => {
        const badge = document.getElementById(`badge-${idx}`);
        if (!badge) return;
        if (idx === currentMemberIndex) {
            badge.className = "member-badge active";
            badge.querySelector(".status").innerText = "선택 중..";
        } else if (idx < currentMemberIndex) {
            badge.className = "member-badge done";
            badge.querySelector(".status").innerText = "완료";
        } else {
            badge.className = "member-badge";
            badge.querySelector(".status").innerText = "대기";
        }
    });
}

// 9품사 선택 버튼 핸들러
const optionButtons = document.querySelectorAll(".btn-option");
optionButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (currentMemberIndex >= groupSize) return;

        const selectedPos = e.target.getAttribute("data-pos");
        memberAnswers.push(selectedPos);
        currentMemberIndex++;

        if (currentMemberIndex < groupSize) {
            updateActiveMemberBadge();
        } else {
            updateActiveMemberBadge();
            checkGroupResults();
        }
    });
});

// 정오답 심사 및 도전기회 제어 로직
function checkGroupResults() {
    const correctAnswer = quizData[currentQuiz].pos;
    const isAllCorrect = memberAnswers.every(ans => ans === correctAnswer);

    if (isAllCorrect) {
        // [케이스 1] 완벽 성공
        score++;
        scoreDisplay.innerText = score;
        optionsContainer.classList.add("hidden");
        feedbackText.innerText = "⭕ 전원 정답 축하합니다!";
        explanationContent.innerHTML = `<div class="praise-box"><strong>🎉 모둠 특별 칭찬</strong><br>${quizData[currentQuiz].praise}</div>`;
        feedbackBox.classList.remove("hidden");
    } else {
        // [케이스 2] 오답 발생 -> 도전 카운트 소진 판단
        if (attemptNum >= 4) {
            // 4번째 도전마저 실패한 경우 -> 기회 완전 박탈 및 강제 이동
            optionsContainer.classList.add("hidden");
            remedialBox.classList.add("hidden");
            feedbackBox.classList.add("fail-theme");
            feedbackText.innerText = "❌ 도전 기회 소진 (최대 4회)";
            explanationContent.innerHTML = `
                <div class="praise-box">
                    아쉽게도 4번의 기회 안에 전원 정답에 도달하지 못했습니다.<br>
                    <strong>정답은 [${correctAnswer}]입니다.</strong><br>
                    모둠원들과 정답 근거를 다시 검토한 뒤 다음 문제로 이동하세요!
                </div>
            `;
            feedbackBox.classList.remove("hidden");
        } else {
            // 아직 기회가 남아있을 때 -> 문법 근거 객관식 학습 유도
            attemptNum++;
            optionsContainer.classList.add("hidden");
            remedialBox.classList.remove("hidden");
            retryQuizBtn.classList.add("hidden"); // 근거 정답을 맞추기 전엔 다시풀기 숨김

            // ★ [추가 요건] 2번 이상 틀린 상태(즉, 3번째 혹은 4번째 도전 기회)일 때 강력 힌트 노출
            if (attemptNum >= 3) {
                strongHintText.innerText = quizData[currentQuiz].strongHint;
                strongHintBox.classList.remove("hidden");
            }

            // 객관식 보기 렌더링
            buildReasonOptions();
        }
    }
}

// 문법 근거 객관식 버튼 팩토리
function buildReasonOptions() {
    reasonOptionsArea.innerHTML = "";
    const currentReasons = quizData[currentQuiz].reasons;

    currentReasons.forEach(reason => {
        const btn = document.createElement("button");
        btn.className = "btn-reason";
        btn.innerText = reason.text;
        
        btn.addEventListener("click", () => {
            // 이미 채점된 버튼 클릭 방지
            if (btn.classList.contains("correct") || btn.classList.contains("wrong")) return;

            if (reason.isCorrect) {
                btn.classList.add("correct");
                // 모둠원 전체가 보는 앞에서 오답 버튼 차단
                const allReasonBtns = reasonOptionsArea.querySelectorAll(".btn-reason");
                allReasonBtns.forEach(b => { if(!b.classList.contains("correct")) b.style.opacity = 0.4; });
                
                // 올바른 근거를 찾았으므로 "다시 도전하기" 잠금 해제
                retryQuizBtn.classList.remove("hidden");
            } else {
                btn.classList.add("wrong");
                alert("이 근거는 단어의 문법적 특성과 일치하지 않습니다. 다시 상의해 보세요!");
            }
        });
        reasonOptionsArea.appendChild(btn);
    });
}

// 근거 확인 완료 후 투표 하드 리셋 및 재조정
retryQuizBtn.addEventListener("click", () => {
    remedialBox.classList.add("hidden");
    optionsContainer.classList.remove("hidden");
    
    attemptDisplay.innerText = attemptNum;
    currentMemberIndex = 0;
    memberAnswers = [];
    updateActiveMemberBadge();
});

// 다음 문제 가기 버튼
nextBtn.addEventListener("click", () => {
    currentQuiz++;
    loadQuiz();
});
