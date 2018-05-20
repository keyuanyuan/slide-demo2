let $images = $('#slides>img')
//console.log($images)常用console打印检查是否取到
let $buttons = $('#buttons>button')
let $slides = $('#slides')

let $firstCopy = $images.eq(0).clone(true)
let $lastCopy = $images.eq(2).clone(true)
$slides.append($firstCopy)
$slides.prepend($lastCopy)

let current = 0
$slides.css({transform:'translateX(-400px)'})
$buttons.eq(0).on('click',function() {
    if(current == 2) {
        console.log('从最后一张到第一张')
        $slides.css({transform:'translateX(-1600px)'})
            .one('transitionend',function() {
                $slides.hide()
                    .offset()
                $slides.css({transform:'translateX(-400px)'})
                    .show()
            //hide和show之间加offset防止两个动作被合并，产生bug
            })
    } else {
        $slides.css({transform:'translateX(-400px)'})
    }
    current = 0
})
$buttons.eq(1).on('click',function() {
    $slides.css({transform:'translateX(-800px)'})
    current = 1
})
$buttons.eq(2).on('click',function() {
    if(current == 0) {
        console.log('从第一张到最后一张')
        $slides.css({transform:'translateX(0px)'})
            .one('transitionend',function() {
                $slides.hide()
                    .offset()
                $slides.css({transform:'translateX(-1200px)'})
                    .show()
            })
    } else {
        $slides.css({transform:'translateX(-1200px)'})
    }
    current = 2
})