$('document').ready(function () {
    init();
});

function init() {
    slider.init();
}

var slider = function () {

    //Default Variable
    var contentSlides = [];
        slideSizePrice = {};
        currentItems = 0,
        totalSlides = 0,
        itemWidth = 0;

    /*
    * @params elm
    * @author Yarkın ÜÇERLER <yarkinucerler@gmail.com>
    * @date 22.11.2017 
    * 
    * Size Adjusting
    * Before the slider and the slider's items adjusting to size. It find slider items according to parent parameter.
    * The measure and item information of the items found are returned by json.
    * 
    */
    function sizeAdjusting(elm) {
        itemWidth = elm.width();
        
        elm.find('.item').each(function (i) {
            totalSlides++;
        });

        return { 'itemWidth': itemWidth, 'totalWidth': itemWidth * totalSlides, 'totalSlides' : totalSlides }
    }

     /*
    * @params elm
    * @author Yarkın ÜÇERLER <yarkinucerler@gmail.com>
    * @date 22.11.2017 
    * 
    * Create Slider Control
    * It create slider according to parameter element.
    * 
    */
    function createSlider(elm) {
        contentSlides = $(elm);
        slideSizePrice = sizeAdjusting(contentSlides);
        var oldHtml = contentSlides.children().html();
        contentSlides.html('<div class="slider-container"><div class="slider" style="width:'+ slideSizePrice.totalWidth + 'px" >'+ oldHtml +'</div></div');
        contentSlides.children().find('.item').each(function (i) {
            $(this).css({'width': slideSizePrice.itemWidth + 'px', 'float': 'left'});
        });
        createControl(contentSlides);
    }

     /*
    * @params elm
    * @author Yarkın ÜÇERLER <yarkinucerler@gmail.com>
    * @date 22.11.2017 
    * 
    * Create Slider Control
    * It create control elements according to slider on parameter element.
    * 
    */
    function createControl(elm) {
        contentSlides = $(elm);
        contentSlides.find('.slider-container').append(
           '<div class="slider-control">' +
                '<div class="slider-previous"></div>' +
                '<div class="slider-next"></div>' +
           '</div>'
        );
    }

    return {

        init: function () {        
            createSlider('#campaign-area');
        }
    }
}();