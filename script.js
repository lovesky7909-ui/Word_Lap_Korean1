// 9품사 분류 기준 (형태, 기능, 의미) 데이터베이스
const quizData = [
    { 
        word: "바다", 
        pos: "명사", 
        praise: "참 잘했어요! 사물이나 사람의 이름을 나타내는 '명사'를 완벽하게 찾았군요! 👍",
        form: "<strong>불변어</strong> : 문장에서 쓰일 때 형태가 변하지 않아요.",
        function: "<strong>체언</strong> : 문장에서 주어나 목적어, 보어 자리에 주로 쓰여요.",
        meaning: "<strong>명사</strong> : 구체적인 사물이나 개념의 '이름'을 나타내는 말이에요."
    },
    { 
        word: "너", 
        pos: "대명사", 
        praise: "훌륭합니다! 이름을 직접 부르지 않고 대신하여 가리키는 '대명사'의 특징을 정확히 아는군요! ⭐️",
        form: "<strong>불변어</strong> : 문장에서 쓰일 때 형태가 변하지 않아요.",
        function: "<strong>체언</strong> : 명사처럼 문장에서 주어, 목적어 등의 자리에 쓰여요.",
        meaning: "<strong>대명사</strong> : 사람이나 사물, 장소의 '이름을 대신하여 가리키는' 말이에요."
    },
    { 
        word: "셋", 
        pos: "수사", 
        praise: "정답이에요! 수량이나 순서를 나타내는 체언인 '수사'를 멋지게 맞췄습니다! 🎉",
        form: "<strong>불변어</strong> : 문장에서 사용할 때 단어의 모습이 바뀌지 않아요.",
        function: "<strong>체언</strong> : 문장의 중심이 되는 자리에 주어로 자주 쓰여요.",
        meaning: "<strong>수사</strong> : 사물의 '수량(하나, 둘, 셋)'이나 '순서(첫째, 둘째)'를 나타내는 말이에요."
    },
    { 
        word: "이 / 가", 
        pos: "조사", 
        praise: "와우! 문장에서 말과 말 사이의 문법적 관계를 맺어주는 '조사'를 아주 잘 이해하고 있네요! 👏",
        form: "<strong>불변어</strong> : 형태가 변하지 않아요. (단, 서술격 조사 '이다'만 예외적으로 변해요)",
        function: "<strong>관계언</strong> : 주로 체언(명사 등) 뒤에 붙어서 다른 말과의 문법적 관계를 나타내요.",
        meaning: "<strong>조사</strong> : 혼자 쓰이지 못하고 앞말에 붙어 뜻을 더하거나 자격을 부여하는 말이에요."
    },
    { 
        word: "달리다", 
        pos: "동사", 
        praise: "딩동댕! 주어의 역동적인 움직임을 나타내는 문장 성분인 '동사'를 정확히 골랐어요! 🏃‍♂️",
        form: "<strong>가변어</strong> : '달리고, 달리니, 달려서'처럼 문장 속 역할에 따라 형태가 변해요(활용).",
        function: "<strong>용언</strong> : 문장에서 주어의 행동이나 상태를 서술(설명)하는 역할을 해요.",
        meaning: "<strong>동사</strong> : 사람이나 사물의 구체적인 '움직임이나 행동'을 나타내는 말이에요."
    },
    { 
        word: "푸르다", 
        pos: "형용사", 
        praise: "눈썰미가 아주 좋네요! 대상의 성질이나 아름다운 상태를 표현하는 '형용사'입니다! 🎨",
        form: "<strong>가변어</strong> : '푸르고, 푸르니, 푸르러'처럼 쓸 때마다 형태가 변해요.",
        function: "<strong>용언</strong> : 주어가 어떠한지 서술해 주는 역할을 담당해요.",
        meaning: "<strong>형용사</strong> : 사물이나 사람의 '성질이나 상태(모양, 색깔 등)'를 나타내는 말이에요."
    },
    { 
        word: "새 (옷)", 
        pos: "관형사", 
        praise: "어려운 문제였는데 대단해요! 명사 앞에 놓여 뒤의 체언을 꾸며주는 '관형사'를 잘 구별했군요! 🔍",
        form: "<strong>불변어</strong> : 어떤 경우에도 단어의 형태가 절대 변하지 않아요.",
        function: "<strong>수식언</strong> : 뒤에 오는 다른 말을 일방적으로 꾸며주는 역할을 해요.",
        meaning: "<strong>관형사</strong> : 체언(특히 명사)의 바로 앞에 놓여 그 내용을 '자세하게 꾸며주는' 말이에요."
    },
    { 
        word: "매우", 
        pos: "부사", 
        praise: "완벽합니다! 동사나 형용사 앞에 붙어 의미를 더 풍부하게 해주는 '부사'를 정확하게 이해했네요! 💡",
        form: "<strong>불변어</strong> : 문장에서 어떻게 쓰이든 형태가 변하지 않아요.",
        function: "<strong>수식언</strong> : 주로 뒤에 오는 용언(동사, 형용사)이나 다른 부사를 꾸며줘요.",
        meaning: "<strong>부사</strong> : '매우, 빨리, 잘'처럼 주로 용언의 뜻을 '세밀하게 제한하거나 꾸며주는' 말이에요."
    },
    { 
        word: "어머나", 
        pos: "감탄사", 
        praise: "감탄사까지 마스터했군요! 9품사를 완벽하게 정복한 우리 학생, 아주 자랑스럽습니다! 🏆",
        form: "<strong>불변어</strong> : 형태가 변하지 않는 단어예요.",
        function: "<strong>독립언</strong> : 문장의 다른 성분들과 직접적인 관계를 맺지 않고 독립적으로 쓰여요.",
        meaning: "<strong>감탄사</strong> : 말하는 이의 '놀람, 느낌, 부름이나 대답'을 나타내는 말이에요."
    }
];

let currentQuiz = 0;
let score = 0;
let isAnswered = false;

// HTML 요소 연결
const wordDisplay = document.getElementById("word-display");
const scoreDisplay = document.getElementById("score");
const countDisplay = document.getElementById("question-count");
const feedbackBox = document.getElementById("feedback-box");
const feedbackText = document.getElementById("feedback-text");
const explanationContent = document.getElementById("explanation-content");
const nextBtn = document.getElementById("next-btn");
const optionButtons = document.querySelectorAll(".btn-option");

// 문제 로드 함수
function loadQuiz() {
    isAnswered = false;
    feedbackBox.classList.add("hidden");
    
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
        // 결과 화면 전환
        document.querySelector(".question-box").innerHTML = `
            <p class="instruction">축하합니다! 9품사 퀴즈를 모두 완료했습니다!</p>
            <div id="word-display" style="font-size: 2.2rem; color: #2ecc71;">🎉 국어 품사 박사 탄생! 🎉</div>
        `;
        document.getElementById("options-container").classList.add("hidden");
        feedbackBox.classList.remove("hidden");
        feedbackText.innerText = `최종 점수: ${score} / ${quizData.length}점`;
        feedbackText.className = "correct-title";
        explanationContent.innerHTML = `<div class="praise-box">교과서 기준을 완벽히 마스터했습니다. 수업 시간에도 힘차게 참여해 보아요!</div>`;
        nextBtn.innerText = "다시 처음부터 도전하기 🔄";
        nextBtn.onclick = () => { location.reload(); };
    }
}

// 품사 선택 시 반응 처리
optionButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (isAnswered) return;
        isAnswered = true;

        const selectedPos = e.target.getAttribute("data-pos");
        const correctAnswer = quizData[currentQuiz].pos;

        optionButtons.forEach(btn => btn.disabled = true);

        // 맞췄을 때와 틀렸을 때의 처리 분기
        if (selectedPos === correctAnswer) {
            score++;
            scoreDisplay.innerText = score;
            
            feedbackText.innerText = "⭕ 정답입니다!";
            feedbackText.className = "correct-title";
            
            // 정답일 때: 오직 칭찬 상자만 제시
            explanationContent.innerHTML = `
                <div class="praise-box">
                    ${quizData[currentQuiz].praise}
                </div>
            `;
            
            e.target.style.backgroundColor = "#2ecc71";
            e.target.style.color = "white";
            e.target.style.borderColor = "#2ecc71";
        } else {
            feedbackText.innerText = `❌ 아쉽습니다! (정답: ${correctAnswer})`;
            feedbackText.className = "incorrect-title";
            
            // 틀렸을 때: 형태, 기능, 의미의 3단 구조 해설 박스 제시
            explanationContent.innerHTML = `
                <div class="analysis-box">
                    <p>💡 선생님의 친절한 품사 분류 기준 설명</p>
                    <ul>
                        <li><strong>[형태]</strong> ${quizData[currentQuiz].form}</li>
                        <li><strong>[기능]</strong> ${quizData[currentQuiz].function}</li>
                        <li><strong>[의미]</strong> ${quizData[currentQuiz].meaning}</li>
                    </ul>
                </div>
            `;
            
            e.target.style.backgroundColor = "#e74c3c";
            e.target.style.color = "white";
            e.target.style.borderColor = "#e74c3c";
        }

        feedbackBox.classList.remove("hidden");
    });
});

nextBtn.addEventListener("click", () => {
    currentQuiz++;
    loadQuiz();
});

// 첫 실행
loadQuiz();
