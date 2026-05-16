// 9품사 문항 및 칭찬 템플릿 데이터베이스
const quizData = [
    { word: "바다", pos: "명사", praise: "사물의 이름을 뜻하는 '명사'를 모둠원 전원이 힘을 합쳐 멋지게 찾아냈군요!" },
    { word: "너", pos: "대명사", praise: "이름을 대신하여 대상을 가리키는 '대명사'임을 모든 조원이 완벽히 판별했습니다!" },
    { word: "셋", pos: "수사", praise: "수량이나 순서를 뜻하는 체언인 '수사'의 개념을 모두 척척 맞춰주었습니다!" },
    { word: "이 / 가", pos: "조사", praise: "앞말에 착 붙어 문법적 자격을 더해주는 '조사'를 전원 훌륭히 마스터했습니다!" },
    { word: "달리다", pos: "동사", praise: "움직임과 행동을 생생하게 표현하는 '동사'를 모둠원 모두가 정확히 이해했네요!" },
    { word: "푸르다", pos: "형용사", praise: "성질이나 아름다운 상태를 묘사하는 '형용사' 분류를 낙오자 없이 전원 통과했습니다!" },
    { word: "새 (옷)", pos: "관형사", praise: "체언(명사) 앞에서 뜻을 자세히 제한해 주는 '관형사'라는 고난도 개념을 정복했네요!" },
    { word: "매우", pos: "부사", praise: "주로 동사와 형용사를 멋지게 꾸며주는 '부사'의 역할을 모둠 전체가 명확히 파악했습니다!" },
    { word: "어머나", pos: "감탄사", praise: "독립적으로 감정과 놀람을 표현하는 문장 성분인 '감탄사'까지 전원 정답입니다!" }
];

// 모둠 설정 관련 상태 변수
let groupSize = 4;
let memberNames = [];
let currentMemberIndex = 0;
let memberAnswers = [];

let currentQuiz = 0;
let score = 0;

// HTML DOM 요소 연결
const setupContainer = document.getElementById("setup-container");
const quizContainer = document.getElementById("quiz-container");
const memberCountSelect = document.getElementById("member-count");
const nameInputsArea = document.getElementById("name-inputs-area");
const startQuizBtn = document.getElementById("start-quiz-btn");
const memberBadgesContainer = document.getElementById("member-badges-container");

const wordDisplay = document.getElementById("word-display");
const scoreDisplay = document.getElementById("score");
const countDisplay = document.getElementById("question-count");
const optionsContainer = document.getElementById("options-container");
const discussionBox = document.getElementById("discussion-box");
const discussionInput = document.getElementById("discussion-input");
const submitDiscussionBtn = document.getElementById("submit-discussion-btn");
const feedbackBox = document.getElementById("feedback-box");
const feedbackText = document.getElementById("feedback-text");
const explanationContent = document.getElementById("explanation-content");
const nextBtn = document.getElementById("next-btn");

// [기능 1] 인원 선택 변경 시 이름 입력칸 동적 생성 함수
function generateNameInputs() {
    groupSize = parseInt(memberCountSelect.value);
    // 기존 입력창 제거 후 재구성
    const existingInputs = nameInputsArea.querySelectorAll(".input-name-field");
    existingInputs.forEach(el => el.remove());

    for (let i = 1; i <= groupSize; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.className = "input-name-field";
        input.placeholder = `모둠원 ${i} 이름`;
        input.value = `학생 ${i}`; // 입력 편의상 기본값 제공
        nameInputsArea.appendChild(input);
    }
}

// 최초 실행 및 이벤트 리스너 등록
memberCountSelect.addEventListener("change", generateNameInputs);
generateNameInputs(); // 초기 4인 기준 세팅 실행

// [기능 2] 퀴즈 시작 버튼 클릭 이벤트
startQuizBtn.addEventListener("click", () => {
    memberNames = [];
    const inputs = nameInputsArea.querySelectorAll(".input-name-field");
    
    // 이름 수집 및 유효성 검사
    inputs.forEach(input => {
        const name = input.value.trim();
        if (name) memberNames.push(name);
    });

    if (memberNames.length !== groupSize) {
        alert("모든 모둠원의 이름을 빠짐없이 입력해 주세요!");
        return;
    }

    // 설정창 숨기고 퀴즈창 오픈
    setupContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    
    loadQuiz();
});

// [기능 3] 퀴즈 문제 로드 및 실명 배지판 생성
function loadQuiz() {
    feedbackBox.classList.add("hidden");
    discussionBox.classList.add("hidden");
    optionsContainer.classList.remove("hidden");
    discussionInput.value = "";
    
    currentMemberIndex = 0;
    memberAnswers = [];

    // 동적 이름 배지 생성
    memberBadgesContainer.innerHTML = "";
    memberNames.forEach((name, idx) => {
        const badge = document.createElement("div");
        badge.className = "member-badge";
        badge.id = `member-badge-${idx}`;
        badge.innerHTML = `${name}<br><span class="status">대기</span>`;
        memberBadgesContainer.appendChild(badge);
    });

    // 첫 번째 사람 활성화
    updateActiveMemberBadge();

    if (currentQuiz < quizData.length) {
        countDisplay.innerText = currentQuiz + 1;
        wordDisplay.innerText = quizData[currentQuiz].word;
    } else {
        // 완전 종료
        document.querySelector(".question-box").innerHTML = `
            <p class="instruction">축하합니다! 우리 모둠의 도전이 모두 끝났습니다.</p>
            <div id="word-display" style="font-size: 2.1rem; color: #38a169;">🏆 품사 대박 모둠 탄생 🏆</div>
        `;
        memberBadgesContainer.classList.add("hidden");
        optionsContainer.classList.add("hidden");
        feedbackBox.classList.remove("hidden");
        feedbackText.innerText = `최종 성공 문항: ${score}개`;
        explanationContent.innerHTML = `<div class="praise-box" style="text-align:center;">서로 지식을 나누며 9품사를 완벽히 정복한 멋진 모둠입니다! 다 함께 하이파이브를 해보세요! 🖐🎉</div>`;
        nextBtn.innerText = "새로운 모둠으로 다시 도전하기 🔄";
        nextBtn.onclick = () => { location.reload(); };
    }
}

// 배지 시각적 상태 업데이트 함수
function updateActiveMemberBadge() {
    memberNames.forEach((_, idx) => {
        const badge = document.getElementById(`member-badge-${idx}`);
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

// 품사 옵션 선택 시 작동
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
            // 마지막 인원까지 누르면 일괄 비교
            updateActiveMemberBadge(); // 마지막 배지 완료 처리용
            checkGroupResults();
        }
    });
});

// 정답 및 오답 판정 알고리즘
function checkGroupResults() {
    const correctAnswer = quizData[currentQuiz].pos;
    const isAllCorrect = memberAnswers.every(ans => ans === correctAnswer);

    if (isAllCorrect) {
        score++;
        scoreDisplay.innerText = score;
        optionsContainer.classList.add("hidden");
        feedbackText.innerText = "⭕ 전원 정답 축하합니다!";
        explanationContent.innerHTML = `
            <div class="praise-box">
                <strong>👏 [교사 격려 멘트]</strong><br>${quizData[currentQuiz].praise}
            </div>
        `;
        feedbackBox.classList.remove("hidden");
    } else {
        optionsContainer.classList.add("hidden");
        discussionBox.classList.remove("hidden");
    }
}

// 모둠 협의 근거 서술형 제출 버튼
submitDiscussionBtn.addEventListener("click", () => {
    const textContent = discussionInput.value.trim();
    if (textContent.length < 5) {
        alert("모둠원들과 상의하여 품사 분류 근거를 조금 더 구체적으로 적어주세요! (5자 이상 요구)");
        return;
    }

    alert(`제출되었습니다!\n작성한 근거를 참고하여 모둠원들은 처음부터 신중하게 다시 골라보세요.`);
    
    // 현재 문제 재도전을 위한 라운드 초기화
    discussionBox.classList.add("hidden");
    optionsContainer.classList.remove("hidden");
    currentMemberIndex = 0;
    memberAnswers = [];
    updateActiveMemberBadge();
});

nextBtn.addEventListener("click", () => {
    currentQuiz++;
    loadQuiz();
});
