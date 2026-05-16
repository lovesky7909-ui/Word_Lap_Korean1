// 9품사 학습용 문항 데이터베이스
const quizData = [
    { word: "바다", pos: "명사", ex: "사물의 이름을 나타내는 단어예요." },
    { word: "너", pos: "대명사", ex: "이름을 대신하여 대상을 가리키는 단어예요." },
    { word: "셋", pos: "수사", ex: "사물의 수량이나 순서를 나타내는 단어예요." },
    { word: "이/가", pos: "조사", ex: "명사 뒤에 붙어 다른 말과의 문법적 관계를 도와주는 단어예요." },
    { word: "달리다", pos: "동사", ex: "사람이나 사물의 '움직임'을 나타내는 단어예요." },
    { word: "푸르다", pos: "형용사", ex: "사물의 '성질이나 상태'를 나타내는 단어예요." },
    { word: "새 (옷)", pos: "관형사", ex: "명사 바로 앞에서 체언을 자세하게 꾸며주는 단어예요." },
    { word: "매우", pos: "부사", ex: "주로 용언(동사, 형용사) 앞에 붙어 뜻을 더해주는 단어예요." },
    { word: "어머나", pos: "감탄사", ex: "말하는 이의 놀람, 느낌, 부름이나 대답을 나타내요." }
];

let currentQuiz = 0;
let score = 0;
let isAnswered = false;

// HTML 요소 가져오기
const wordDisplay = document.getElementById("word-display");
const scoreDisplay = document.getElementById("score");
const countDisplay = document.getElementById("question-count");
const feedbackBox = document.getElementById("feedback-box");
const feedbackText = document.getElementById("feedback-text");
const explanationText = document.getElementById("explanation-text");
const nextBtn = document.getElementById("next-btn");
const optionButtons = document.querySelectorAll(".btn-option");

// 퀴즈 불러오기 함수
function loadQuiz() {
    isAnswered = false;
    feedbackBox.classList.add("hidden");
    
    // 버튼 초기화
    optionButtons.forEach(btn => {
        btn.disabled = false;
        btn.style.backgroundColor = "";
        btn.style.color = "";
        btn.style.borderColor = "";
    });

    if (currentQuiz < quizData.length) {
        countDisplay.innerText = currentQuiz + 1;
        wordDisplay.innerText = quizData[currentQuiz].word;
    } else {
        // 모든 문제를 다 풀었을 때 결과 화면 전환
        document.querySelector(".question-box").innerHTML = `
            <p class="instruction">축하합니다! 퀴즈 완료!</p>
            <div id="word-display" style="font-size: 2.2rem; color: #2ecc71;">🎉 품사 마스터! 🎉</div>
        `;
        document.getElementById("options-container").classList.add("hidden");
        feedbackBox.classList.remove("hidden");
        feedbackText.innerText = `최종 점수: ${score} / ${quizData.length}점`;
        feedbackText.className = "correct";
        explanationText.innerText = "9품사 개념을 훌륭히 공부했습니다. 수업 시간에도 집중해 보아요!";
        nextBtn.innerText = "다시 도전하기 🔄";
        nextBtn.onclick = () => { location.reload(); };
    }
}

// 품사 버튼 클릭 이벤트 설정
optionButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (isAnswered) return; // 이미 답을 골랐다면 작동 방지
        isAnswered = true;

        const selectedPos = e.target.getAttribute("data-pos");
        const correctAnswer = quizData[currentQuiz].pos;

        // 다른 버튼 비활성화
        optionButtons.forEach(btn => btn.disabled = true);

        if (selectedPos === correctAnswer) {
            score++;
            scoreDisplay.innerText = score;
            feedbackText.innerText = "⭕ 정답입니다!";
            feedbackText.className = "correct";
            e.target.style.backgroundColor = "#2ecc71";
            e.target.style.color = "white";
            e.target.style.borderColor = "#2ecc71";
        } else {
            feedbackText.innerText = `❌ 아쉽습니다! (정답: ${correctAnswer})`;
            feedbackText.className = "incorrect";
            e.target.style.backgroundColor = "#e74c3c";
            e.target.style.color = "white";
            e.target.style.borderColor = "#e74c3c";
        }

        // 품사 설명 노출
        explanationText.innerText = quizData[currentQuiz].ex;
        feedbackBox.classList.remove("hidden");
    });
});

// 다음 문제 버튼 클릭 이벤트
nextBtn.addEventListener("click", () => {
    currentQuiz++;
    loadQuiz();
});

// 앱 최초 실행
loadQuiz();
