var tenths = 0
var seconds = 0
var minutes = 0
var time = document.querySelector('#stopwatch')
// function to add a 0 before numbers below 10
function twoDigits(n) {
    return (n < 10 ? '0' : '') + n
}
// function to format the time correctly
function setTime(m, s, t) {
    time.innerHTML = (twoDigits(m)+':'+twoDigits(s)+':'+t)
}
// function to create a string to pass to style.color with a dynamic number for the values
function rgb(r, g, b) {
    return ["rgba(",(r),",",(g),",",(b),",","0.8",")"].join('')
}

// change color in stopwatch each second
var coloredCircle = document.querySelector('#colored_circle')
var coloredCircleCounter =  60

// increase timer numbers and reset at 10 for tenths of seconds and 60 for seconds
function stopwatchCounter() {
    tenths++
    if (tenths <= 9) {
        setTime(minutes, seconds, (tenths + '0'))
    } else if (tenths === 10) {
        console.log(getComputedStyle(coloredCircle).backgroundColor)
        seconds++
        setTime(minutes, seconds, '00')
        tenths = 0
        // change width of circle border each second
        if (coloredCircleCounter > 1) {
            coloredCircleCounter--
            coloredCircle.style.borderWidth = coloredCircleCounter + 'px'
            console.log(getComputedStyle(coloredCircle).borderWidth)
            console.log(coloredCircleCounter)
        } else if (coloredCircleCounter === 1) {
            coloredCircle.style.borderWidth = '60px'
            coloredCircleCounter = 60
        }
        // change color of circle each second
        if (coloredCircleCounter === 0) {
            coloredCircle.style.backgroundColor = rgb(0,0,0)
        } else if (coloredCircleCounter >= 40) {
            coloredCircle.style.backgroundColor = rgb((100 + coloredCircleCounter * 2), 0, 0)
        } else if (coloredCircleCounter >= 20) {
            coloredCircle.style.backgroundColor = rgb((218 - coloredCircleCounter), (100 + coloredCircleCounter * 2), 0)
        } else if (coloredCircleCounter > 0) {
            coloredCircle.style.backgroundColor= rgb((159 - coloredCircleCounter), (218 - coloredCircleCounter), (100 + coloredCircleCounter * 2))
        }
    }
    if (seconds === 60) {
        minutes++
        seconds = 0
        setTime(minutes, seconds, (tenths + '0'))
    }
    if (minutes < 1) {
        time.style.color = rgb((100 + seconds * 2), 0, 0)
    } else if (minutes === 1) {
        time.style.color = rgb((218 - seconds), (100 + seconds * 2), 0)
    } else if (minutes === 2) {
        time.style.color = rgb((159 - seconds), (218 - seconds), (100 + seconds * 2))
    } else if (minutes > 2){
        time.style.color = rgb(255, 255, 255)
    }
}

// speficy how quickly to increase timer number and color change
var stopWatchTimer
var increase
function start() {
    stopWatchTimer = setInterval(stopwatchCounter, 100)
}

// reset values
function reset() {
    startButton.innerHTML = 'Start'
    time.innerHTML = '00:00:00'
    time.style.color = rgb(255, 255, 255)
    tenths = 0
    seconds = 0
    minutes = 0
    coloredCircleCounter = 60
    coloredCircle.style.borderWidth = 60
    coloredCircle.style.backgroundColor = 'rgb(0,0,0)'
}

// clear intervals
function clear() {
    clearInterval(stopWatchTimer)
}

// add flash classes
function addFlash() {
    time.classList.add('animated')
    time.classList.add('infinite')
    time.classList.add('flash')
}
// remove flash classes
function removeFlash() {
    time.classList.remove('animated')
    time.classList.remove('infinite')
    time.classList.remove('flash')
}
// add and remove styles for clicking buttons
function addStartClick() {
    startButton.style.top = '130px'
    startButton.style.left = '-160px'
}
function removeStartClick() {
    startButton.style.top = '120px'
    startButton.style.left = '-170px'
}
var clickAction
function startClickTiming() {
    clickAction = setTimeout(removeStartClick, 200)
}
function addStopClick() {
    stopButton.style.top = '80px'
    stopButton.style.left = '160px'
}
function removeStopClick() {
    stopButton.style.top = '70px'
    stopButton.style.left = '170px'
}
var clickAction
function stopClickTiming() {
    clickAction = setTimeout(removeStopClick, 200)
}

// start button
var startButton = document.querySelector('#start_button')
var pauseTimer

// stop button
var stopButton = document.querySelector('#stop_button')

// click events for start button
startButton.addEventListener('click', function() {
    // clear intervals if they exist
    clear()
    // evnet listener to reset on double click
    startButton.addEventListener('dblclick', function() {
        clear()
        removeFlash()
        addStartClick()
        startClickTiming()
        reset()
    })
    // start interval when clicked the first time or when Continue is pressed, change button to Pause
    if (startButton.innerHTML === 'Start' || startButton.innerHTML === 'Continue') {
        start()
        removeFlash()
        addStartClick()
        startClickTiming()
        startButton.innerHTML = 'Pause'
    }
    // if button currently says Pause and is clicked, change to Continue. if button stays unclicked for 15 seconds, reset timer
    else {
        startButton.innerHTML = 'Continue'
        addFlash()
        addStartClick()
        startClickTiming()
        pauseTimer = setTimeout(() => {
            reset()
            removeFlash()
        }, 15000)
    }
})

// stop button. clear timer when clicked
stopButton.addEventListener('click', function() {
    clear()
    addStopClick()
    stopClickTiming()
    removeFlash()
    reset()
})






//
