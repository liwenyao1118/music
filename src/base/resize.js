function resize(n){
    let html = document.documentElement;
    let w = window.innerWidth;
    let size = parseInt(w / n * 100);
    html.style.fontSize = size + 'px';
}

window.addEventListener('DOMContentLoaded',function(){
    resize(375)
},false)
window.addEventListener('resize',function(){
    resize(375)
},false)