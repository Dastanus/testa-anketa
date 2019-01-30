var rightAnswers = [1,[1,2],[2,3],[20,40],'abc'];
var currentRes = [];
var timerId = null;
var currentQuestionIndex = 0;
var lengthTest = 0;
var countOfRightAnswers = 0;

$(".start").on("click", function(){
    $(".description").css('display','none');
    $(".test").css('display','flex');
    $(".question").css("display","none");
    $(".button-result").css("display","none");
    $(".question").eq(currentQuestionIndex).css("display","flex");
    $(".prev").css("display","none")
    lengthTest = $(".question").length - 1;
    initializeTimer(300);
});

$(".next").on("click", function(){
    if(currentQuestionIndex==0) {
        $(".prev").css("display","flex")
    }
    if(currentQuestionIndex<(lengthTest)&&currentQuestionIndex>=0){
    $(".question").eq(currentQuestionIndex).css("display","none");
    currentQuestionIndex++;
    $(".question").eq(currentQuestionIndex).css("display","flex");
    }
    if(currentQuestionIndex==lengthTest){
        $(".next").css("display","none");
        $(".button-result").css("display","flex");
    }
});

$(".prev").on("click", function(){
    if(currentQuestionIndex==lengthTest){
        $(".button-result").css("display","none");
        $(".next").css("display","flex");
    } 
    if(currentQuestionIndex<=lengthTest&&currentQuestionIndex>0){
    $(".question").eq(currentQuestionIndex).css("display","none");
    currentQuestionIndex--;
    $(".question").eq(currentQuestionIndex).css("display","flex");
    }
    if(currentQuestionIndex==0){
        $(".prev").css("display","none");
    }
});

function initializeTimer(timeLeft) {
    if (timeLeft > 0) {
        secOut();
        function secOut() {
            if(!timeLeft){
                clearInterval(timerId);
                setResult();
                checkResult();
            }
            var minutes = Math.floor(timeLeft/60);
            var seconds = timeLeft % 60;
            setTimePage(minutes, seconds);
            timeLeft--;
        }   
        timerId = setInterval(secOut, 1000); // устанавливаем вызов функции через каждую секунду
    }
}
function setTimePage(m,s) { // функция выставления таймера на странице
    $("#timer").text(m + ' : ' + ('0'+s).slice(-2));
}
var skipSlider = document.getElementById('skipstep');
noUiSlider.create(skipSlider, {
    range: {
        'min': 0,
        '10%': 10,
        '20%': 20,
        '30%': 30,
        '40%': 40,
        '50%': 50,
        '60%': 60,
        '70%': 70,
        '80%': 80,
        '90%': 90,
        'max': 100
    },
    snap: true,
    start: [0, 100]
});

var skipValues = [
    document.getElementById('skip-value-lower'),
    document.getElementById('skip-value-upper')
];

skipSlider.noUiSlider.on('update', function (values, handle) {
    skipValues[handle].innerHTML = values[handle];
});

$('#result').on('click', function() {
    currentRes = [];
    countOfRightAnswers = 0;
    setResult();
    $(".timer").css("display","none");
    messageOfResult(countOfRightAnswers);
    $(".question").css("display","flex");
    $(".test").css("display","flex");
    $(".navigation").css("display","none");
    $(".button-result").css("display","none");
    document.getElementById("fieldset").disabled = true;
    toColorAnswers();
});


function setResult() {
    let numberOfQuestion = 0;
    $('.question').each(
        function() {
            if($(this).data('type')=='radio'){
                let checkQuestionResult = $(this).find('input');
                let index;
                for (index = 0; index < checkQuestionResult.length; ++index) {
                    if(checkQuestionResult[index].checked){
                        currentRes.push(index+1);
                    }
                }
                if(currentRes[numberOfQuestion]==rightAnswers[numberOfQuestion]) {
                    countOfRightAnswers++;
                }
                numberOfQuestion++;
            }
            if($(this).data('type')=='checkbox'){
                let checkQuestionResult = $(this).find('input');
                let index;
                let choice = true;
                let temporaryRes = [];
                for (index = 0; index < checkQuestionResult.length; ++index) {
                    if(checkQuestionResult[index].checked){
                        temporaryRes.push(index+1);
                    }
                }
                for(i=0; i<temporaryRes.length; i++){
                    if(!(temporaryRes[i]==rightAnswers[numberOfQuestion][i])){
                        choice=false;
                    }
                }
                if(choice){
                    countOfRightAnswers++;
                }
                currentRes.push(temporaryRes);
                numberOfQuestion++;
            }
            if($(this).data('type')=='range'){
                let temporaryRes = [];
                let choice = true;
                temporaryRes.push(Number(document.getElementById('skip-value-lower').textContent));
                temporaryRes.push(Number(document.getElementById('skip-value-upper').textContent));
                for(i=0; i<temporaryRes.length; i++){
                    if(!(temporaryRes[i]==rightAnswers[numberOfQuestion][i])){
                        choice=false;
                    }
                }
                if(choice){
                    countOfRightAnswers++;
                }
                numberOfQuestion++;
                currentRes.push(temporaryRes);
            }
            if($(this).data('type')=='input-text'){
                let checkQuestionResult = $(this).find('input');
                currentRes.push(checkQuestionResult[0].value);
                if(currentRes[numberOfQuestion]==rightAnswers[numberOfQuestion]) {
                    countOfRightAnswers++;
                }
                numberOfQuestion++;
            }
        }
    )
}
function messageOfResult(s) {
    let par = document.createElement('div');
    par.innerHTML = 'Количество верных ответов: ' + s + '/5' +'\nВерные ответы пользователя окрашены зеленым\nНеверные ответы пользователя окрашены красным\nВерные ответы окрашены синим';
    let parent = document.getElementById("test");
    let theFirstChild = parent.firstChild;
    parent.insertBefore(par, theFirstChild);
}
function toColorAnswers() {
    let numberOfQuestion = 0;
    $('.question').each(
        function() {
            if($(this).data('type')=='radio'){
                let checkQuestionResult = $(this).find('label');
                if(currentRes[numberOfQuestion]==rightAnswers[numberOfQuestion]){
                    checkQuestionResult[rightAnswers[numberOfQuestion]-1].style.border = "1px solid green";
                } else {
                    checkQuestionResult[rightAnswers[numberOfQuestion]-1].style.border = "1px solid blue";
                    checkQuestionResult[currentRes[numberOfQuestion]-1].style.border = "1px solid red";
                }
                numberOfQuestion++;
            }
            if($(this).data('type')=='checkbox') {
                let checkQuestionResult = $(this).find('label');
                for(i=0; i<rightAnswers[numberOfQuestion].length; i++){
                    if(currentRes[numberOfQuestion][i]==rightAnswers[numberOfQuestion][i]){
                        checkQuestionResult[rightAnswers[numberOfQuestion][i]-1].style.border = "1px solid green";
                    } else {
                        checkQuestionResult[rightAnswers[numberOfQuestion][i]-1].style.border = "1px solid blue";
                        checkQuestionResult[currentRes[numberOfQuestion][i]-1].style.border = "1px solid red";
                    }
                }
                numberOfQuestion++;
            }
            if($(this).data('type')=='range'){
                for(i=0; i<rightAnswers[numberOfQuestion].length; i++){
                    if(!(currentRes[numberOfQuestion][i]==rightAnswers[numberOfQuestion][i])){
                        let par = document.createElement('div');
                        par.innerHTML = 'Верный ответ: 20-40';
                        let parent = document.getElementById("range");
                        parent.appendChild(par);
                        break;
                    }
                }
                numberOfQuestion++;
            }
            if($(this).data('type')=='input-text'){
                if(!(currentRes[numberOfQuestion]==rightAnswers[numberOfQuestion])){
                    let par = document.createElement('div');
                    par.innerHTML = 'Верный ответ: abc';
                    let parent = document.getElementById("inptext");
                    parent.appendChild(par);
                }
            }
        }
    )
}