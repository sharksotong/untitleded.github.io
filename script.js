// [] - create a list
// {} - create a dictionary that stores key-value pairs


const database1 = [
    {
        question : "i am _____.",
        options : ["not smart","un-smart","not bright","all of the above"],
        answer : "all of the above"
    },

    {
        question : "what is this? B",
        options : ["a letter B","the color black","a half drawn butterfly","idk man"],
        answer : "a half drawn butterfly"
    },

    {
        question : "which is diffrent",
        options : ["cat","loaf","feline","kitten"],
        answer : "feline"
    },

    {
        question : "what number is this: XI",
        options : ["27 cats","69 people","34 those guys","11"],
        answer : "11"
    },

    {
        question : "how to pronounce 1111",
        options : ["oneidi onidi one","one to the power of four","eleven thousand eleven hundred and eleven","eleven leveni leven"],
        answer : "eleven thousand eleven hundred and eleven"
    },
];



let timer;
let question_index = 0;
let score = 0;


const DropDown = document.getElementById("drop-down")
const StartButton = document.getElementById("start-btn");
const TimerText = document.getElementById("timer-text");
const QuestionLabel = document.getElementById("question");
const OptionContainer = document.getElementById("option-container");
const ProgressBarFill = document.getElementById("progress-bar-fill");
const ScoreLabel = document.getElementById("score-label")
const FeedbackLabel = document.getElementById("feedback-label")
const BgmDropdown = document.getElementById("bgm-selector");
const BgmButton = document.getElementById("music-btn");

let CurrentSong = null;
let IsBgmPlaying = false;

// what happens when people select a soundtrack
BgmDropdown.addEventListener("change", () => {
    const SelectedSong = BgmDropdown.value;

    // if the song cannot be found, abort function
    if(!SelectedSong) return;

    // stop and reset previous song if it exists
    if(CurrentSong)
    {
        CurrentSong.pause();
        CurrentSong.currentTime = 0;
    } 

    // load and play the SelectedSong
    CurrentSong = new Audio(SelectedSong);
    CurrentSong.loop = true;
    CurrentSong.volume = 0.2;
    CurrentSong.play();
    IsBgmPlaying = true;
    BgmButton.textContent = "🔊 Music On";
    BgmButton.style.backgroundColor = "lime";
});


BgmButton.addEventListener("click", () => {
    if(IsBgmPlaying)
    {
        CurrentSong.pause();
        BgmButton.textContent = "🔇Music Off";
        BgmButton.style.backgroundColor = "red";
        IsBgmPlaying = false;
    } else 
    {
        CurrentSong.play();
        BgmButton.textContent = "🔊 Music On";
        BgmButton.style.backgroundColor = "lime";
        IsBgmPlaying = true;
    }
});

StartButton.addEventListener("click", StartQuiz);

function StartQuiz()
{
    StartButton.style.display = 'none';
    DropDown.style.display = 'none';
    LoadQuestion();
}


function LoadQuestion()
{
    // check if there're questions in the database that are yet to be loaded
    if(question_index < database1.length)
    {
        TimerText.textContent = 15; 

        //clear feedback label
        FeedbackLabel.textContent = "";

        //update the progress bar//
        ProgressBarFill.style.width = `${ ( (question_index + 1) / database1.length ) * 100 }%`;

        // load a question from the database
        const CurrentQuestionSet = database1[question_index];
        QuestionLabel.textContent = CurrentQuestionSet.question;

        // erase previous option buttons//
        OptionContainer.innerHTML = '';

        //clone all option buttons associated to a question//
        CurrentQuestionSet.options.forEach((item) => {
            const button = document.createElement('button');
            button.textContent = item;
            button.classList.add('option-btn');
            OptionContainer.appendChild(button);

            button.addEventListener('click', ()  => {
                DisableAllOptionButtons();
                CheckAnswer(item);
            })
        });


        // turn on the timer
        timer = setInterval(() => {
            // reduce timer text by 1
            TimerText.textContent = parseInt(TimerText.textContent) - 1;    

            if(parseInt(TimerText.textContent) === 0)
            {
                clearInterval(timer); // to stop timer
                DisableAllOptionButtons();
                CheckAnswer(null)
            }

        }, 1000);
    } else
    {
        EndQuiz();
    }
}

function EndQuiz()
{
    clearInterval(timer);
    QuestionLabel.textContent = "nooooo u beat the quizz"
    FeedbackLabel.style.display = "none"
    OptionContainer.style.display = "none"
    TimerText.textContent = "saddddd"
}

function DisableAllOptionButtons()
{
    const all_option_buttons = document.querySelectorAll('.option-btn');
    all_option_buttons.forEach (button => {
        button.disabled = true;
    });
}

// item -> player selected option
function CheckAnswer(item)
{
    clearInterval(timer)
    const actual_ans = database1[question_index].answer;
    let message;

    if(item === actual_ans)
    {
        score = score + 1;
        message = "thats correct! i reluctantly give u 1 point :("
    }else if (item === null)
    {
        message = "ARE U SLOW MAN? so easy this question and u cant even do anything"
    }else
    {
        message = "HA U NOOB I BET EVEN MY MOM COULD DO THIS"
    }

    FeedbackLabel.textContent = message;

    ScoreLabel.textContent = `You scored ${score} point(s)`;

    //hold for 3 secs before loading next question
    setTimeout(() => {
        question_index = question_index + 1;    
        LoadQuestion();
    }, 3000);
    
}

