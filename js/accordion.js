var acc = document.getElementsByClassName("jellybean");
var jelly = document.getElementsByClassName('jelly');

for (var i = 0; i < acc.length; i++) {
    acc[i].onclick = function () {
        var setClasses = !this.classList.contains('active');
        setClass(acc, 'active', 'remove');
        setClass(jelly, 'show', 'remove');

        if (setClasses) {
            this.classList.toggle("active");
            this.nextElementSibling.classList.toggle("show");
        }
    }
}

function setClass(els, className, fnName) {
    for (var i = 0; i < els.length; i++) {
        els[i].classList[fnName](className);
    }
}




//function checkButton() {
//    if ($('input[id=switch1]:checked').length > 0) {

//        console.log("it worked")

//    }
//};