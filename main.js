let $images = $('#slides>img')
let $buttons = $('#buttons>button')
let $slides = $('#slides')
let current = 0

makeFakeSlides()
$slides.css({transform: 'translateX(-400px)'})
bindEvents()
//上下页
$('#previous').on('click',function() {
    goToSlide(current-1)
})
$("#next").on('click',function() {
    goToSlide(current+1)
})
// 自动播放、悬停
let timer = setInterval(function() {
    goToSlide(current+1)
},2000)
$('.container').on('mouseenter',function() {
    window.clearInterval(timer)
}).on('mouseleave',function() {
    timer = setInterval(function() {
        goToSlide(current+1)
    },2000)
})

function bindEvents() {
    $('#buttons').on('click', 'button', function (e) {
        let $button = $(e.currentTarget)
        let index = $button.index()
        goToSlide(index)
    })
}
function goToSlide(index) {
    if(index > $buttons.length-1) {
        index = 0
    } else if(index < 0) {
        index = $buttons.length-1
    }
    if (current === $buttons.length - 1 && index === 0) {
        //从最后一张到第一张,经过克隆的第一张过渡到真的第一张
        $slides.css({transform: `translateX(${-($buttons.length+1)*400}px)`})
            .one('transitionend', function () {
                //将过渡过程隐藏，使用offset防止hide和show动作被合并
                $slides.hide()
                    .offset()
                $slides.css({transform: `translateX(${-(index+1)*400}px)`})
                    .show()
            })
    } else if (current === 0 && index === $buttons.length - 1) {
        //从第一张到最后一张,经过克隆的最后一张过渡到真的最后一张
        $slides.css({transform: 'translateX(0px)'})
            .one('transitionend', function () {
                $slides.hide()
                    .offset()
                $slides.css({transform: `translateX(${-(index+1)*400}px)`})
                    .show()
            })
    } else {
        $slides.css({transform: `translateX(${-(index+1)*400}px)`})
    }
    current = index
}

function makeFakeSlides() {
    let $firstCopy = $images.eq(0).clone(true)
    let $lastCopy = $images.eq($images.length - 1).clone(true)
    $slides.append($firstCopy)
    $slides.prepend($lastCopy)
}