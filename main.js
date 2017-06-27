$(document).ready(function() {
    var pom = $(".pomodoro").text();
    var pause = $(".pause").text();
    var totalSeconds = pom * 60;
    var radians = 0,
        counter = 0;
    var started = false,
        ispause = true;
    var sesionTime = true,
        breakTime = false;
    var sesionColor = "#fa0",
        breakcolor = "#cc0",
        color = sesionColor;

    function main(totalSeconds) {
        var can = document.getElementById('canvas'),
            spanProcent = document.getElementById('procent'),
            c = can.getContext('2d');

        var posX = can.width / 2,
            posY = can.height / 2,
            fps = 1000 //1000 / 200,
        oneMinute = (Math.PI * 2 / 60) / (totalSeconds / 60),
            result = (oneMinute * 60) * (totalSeconds / 60);

        arcMove();

        function arcMove() {
            var acrInterval = setInterval(function() {
                radians += oneMinute;
                counter += 1;
                c.clearRect(0, 0, canvas.width, canvas.height);
                c.beginPath();
                c.arc(posX, posY, 70, 0, 2 * Math.PI);
                c.strokeStyle = '#b1b1b1';
                c.lineWidth = '15';
                c.stroke();

                c.beginPath();
                c.strokeStyle = color;
                c.lineWidth = '15';
                c.arc(posX, posY, 70, Math.PI * 1.5, Math.PI * 1.5 + radians);
                c.stroke();
                c.font = "20px Arial";
                c.fillStyle = "#bbb";
                var str = manyHours(totalSeconds, counter);
                c.fillText(str, posX - 30, posY + 5);
                console.log("pause is " + ispause);
                console.log("radians we have " + radians);
                console.log("result we have " + result);
                console.log("totalSeconds " + totalSeconds);
                console.log("counter " + counter);
                console.log("sesionTime is " + sesionTime);

                // BREAKS THE LOOP OR INIIATES NEXT LOOP STATE WICH IS EITHER sesionTime OR breakTime
                if (radians >= result || ispause) {
                    clearInterval(acrInterval);
                    if (!ispause) {
                        document.getElementById("alert").play();
                        if (sesionTime) {
                            sesionTime = false;
                            breakTime = true;
                            totalSeconds = pause * 60;
                            started = true;
                            ispause = false;
                            radians = counter = 0;
                            color = breakcolor;
                            console.log("breakTime initiation");
                            main(parseInt(totalSeconds));
                        } else {
                            sesionTime = true;
                            breakTime = false;
                            totalSeconds = pom * 60;
                            started = true;
                            ispause = false;
                            radians = counter = 0;
                            color = sesionColor;
                            console.log("sesionTime initiation");
                            main(parseInt(totalSeconds));
                        }


                    }
                }
            }, fps);

        }


    }

    // CHECKS IF THERE IS LESS THEN ONE HOUR OR MORE TO CREATE A DISPLAY STRING
    function manyHours(total, counter) {
        if ((total - counter) / 60 / 60 < 1) {
            return timerDisplay(total, counter);
        } else {
            // console.log(total);
            var stri = Math.floor((total - counter) / 60 / 60);
            total = total - 60 * 60 * stri;
            // console.log(stri);
            stri = stri.toString();
            return stri + ":" + timerDisplay(total, counter);
        }
    }

    // CREATES THE STRING TO DISPLAY INSIDE THE CIRCLE
    function timerDisplay(total, counter) {
        total = total - counter;
        var str = ""
        if (total % 60 === 0 & total >= 0) {
            str = has2digits(total / 60);
            str = str + ":00";
            return str;
        } else if (total >= 0) {
            // console.log(total);
            str = has2digits(Math.floor(total / 60));
            str = str + ":" + has2digits(total % 60);
            return str;
        } else {
            return "00:00"
        }
    }

    // CONVERTS ANY NUMBER BETWEEN 0 AND 59 INTO A 2 DIGIT STRING
    function has2digits(numb) {
        var newstr = ""
        if (numb.toString().length == 1) {
            newstr = "0" + numb.toString()
            return newstr;
        } else {
            newstr = numb.toString();
            return newstr;
        }
    }

    // EVENT LISTENERS FOR ALL PLUS AND MINUS BUTTONS
    $(".plus").click(function() {
        // console.log(this);
        if (ispause) {
            console.log(parseInt(pom));
            pom++;
            $(".pomodoro").text(pom);
            totalSeconds = pom * 60;
            radians = 0;
            counter = 0;
        }

    });
    $(".minus").click(function() {
        if (ispause & pom > 1) {
            pom--;
            $(".pomodoro").text(pom);
            totalSeconds = pom * 60;
            radians = 0;
            counter = 0;
        }

    });
    $(".pluss").click(function() {
        if (ispause) {
            pause++;
            $(".pause").text(pause);
            totalSeconds = pom * 60;
            radians = 0;
            counter = 0;
        }

    });
    $(".minuss").click(function() {
        if (ispause & pause > 1) {
            pause--;
            $(".pause").text(pause);
            totalSeconds = pom * 60;
            radians = 0;
            counter = 0;
        }

    });
    // STARTS AND PAUSES THE LOOP
    $(".start").click(function() {
        if (!started) {
            started = true;
            ispause = false;
            console.log("====");
            console.log(totalSeconds);
            console.log("====");
            main(parseInt(totalSeconds));
            $(".start").text("PAUSE");
        } else {
            ispause = true;
            started = false;
            $(".start").text("START");
        }
    });

})
