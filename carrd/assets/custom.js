// https://www.w3schools.com/howto/howto_js_active_element.asp

var header = document.getElementById("toolbar");
var btns = header.getElementsByClassName("tab");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function () {
    var current = document.getElementsByClassName("active");
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }
    this.className += " active";
  });
}


// https://codepen.io/jaystephens3/pen/eYbOQx

window.onload = function () {
  clock();
  function clock() {
    var now = new Date();
    var TwentyFourHour = now.getHours();
    var hour = now.getHours();
    var min = now.getMinutes();
    var mid = 'pm';
    if (min < 10) {
      min = "0" + min;
    }
    if (hour > 12) {
      hour = hour - 12;
    }
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (hour == 0) {
      hour = 12;
    }
    if (TwentyFourHour < 12) {
      mid = 'am';
    }
    document.getElementById('time').innerHTML = hour + ':' + min + mid;
    setTimeout(clock, 1000);
  }
}


// https://stackoverflow.com/a/50432906/16581955

// const openTab = (() => {
//   let hidden = false;
//   return (click, openTabId) => {
//     document.querySelectorAll('.content').forEach(
//       content => content.style.display = hidden ? 'block' : 'none'
//     );
//     document.querySelectorAll('.links').forEach(link => {
//       if (hidden) link.classList.add('active');
//       else link.classList.remove('active');
//     });
// 
//     document.getElementById(openTabId).style.display = "block";
//     click.currentTarget.classList.toggle('active');
//     hidden = !hidden;
//   }
// })();