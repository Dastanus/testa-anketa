var res = [1,[1,2],[2,3],[20,40],'abc'];
var currentRes = [];
var timerId = null;
var currentQuestionIndex = 0;
var lengthTest = 0;

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
    checkResult();
});


function checkResult() {
    $('.question').each(
        function() {
            console.log($(this).data('type'));
        }
    )
}

