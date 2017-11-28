/* Created By Yarkın ÜÇERLER on date 22.11.2017 */

$('document').ready(function () {
    $('#campaign-area').slider({
        controlWidth: 227
    });
});

(function ( $ ) {
    
    $.fn.slider = function(options) {
        
        var oldHtml = '',
            component = this,
            isOldHtml = false;

        var settings = $.extend({
            controlWidth: null,
            contentSlides: [],
            slideSizePrice: {},
            currentItems : 0,
            currentSlide : 0,
            totalSlides: 0,
            itemWidth:  0
        }, options);

        /*
        * @params elm
        * @date 22.11.2017 
        * 
        * Size Adjusting
        * If It find slider items according to parent's parameter, the slider and the slider's items are adjusted to size parent's element size.
        * The measure and item information of the items found are returned by json.
        * 
        */

        function sizeAdjusting(elm) {
            itemWidth = elm.width();
            totalSlides = elm.find('.item').length;
            settings.itemWidth = itemWidth;
            settings.totalSlides = totalSlides;
            settings.totalWidth = itemWidth * totalSlides;
            return settings;
        }

        /*
        * @params elm
        * @date 22.11.2017 
        * 
        * Create Slider Control
        * It creates slider according to parameter element.
        * 
        */
        function createSlider(elm, option) {
            contentSlides = $(elm);
            slideSizePrice = sizeAdjusting(contentSlides);
            if(!isOldHtml) {
                isOldHtml = true;
                oldHtml = contentSlides.children().html();
            }
            contentSlides.html('');
            contentSlides.html('<div class="slider-container">' +
                                    '<div class="slider-wrapper">'+
                                        '<div class="slider" style="width:'+ settings.totalWidth + 'px" >'
                                            + oldHtml +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="slider-control">' +
                                    '</div>' +
                                '</div');
            contentSlides.children().find('.item').each(function (i) {
                if(i == 0) {
                    $(this).addClass('active');
                }
                $(this).width(slideSizePrice.itemWidth);
            });
            createControl(contentSlides);
            updateContentHolder();                
        }

        /*
        * @params elm
        * @date 22.11.2017 
        * 
        * Create Slider Control
        * It creates control elements according to slider on parameter element.
        * 
        */
        function createControl(elm) {
            contentSlides = $(elm);
            contentSlides.find('.slider-control').html(
                '<div id="prev" class="slider-previous"></div>' +
                '<div id="next" class="slider-next"></div>'
            );
            
            if(settings.controlWidth) {
                if(slideSizePrice.itemWidth < settings.controlWidth) {
                    contentSlides.find('.slider-control').css('width', settings.itemWidth + 'px');
                }
                else {
                    contentSlides.find('.slider-control').css('width', settings.controlWidth + 'px');
                }
            }

            contentSlides.find('#prev').bind('click', function() {
                showPreviousSlide();
            });

            contentSlides.find('#next').bind('click', function() {
                showNextSlide();
            });
        }

        /*
        * @date 23.11.2017 
        * 
        * Slide Changing Action
        * It updates slider's content at slide's changing. 
        * 
        */
        function updateContentHolder() {
            var scrollAmount = 0;
            if (settings.currentSlide < settings.totalSlides)
                scrollAmount = settings.itemWidth * settings.currentSlide;
            else
                settings.currentSlide = 0;
            
            if (settings.currentSlide < settings.totalSlides)
                contentSlides.find('#next').show();
            else
                contentSlides.find('#next').hide();

            if (settings.currentSlide > 0)
                contentSlides.find('#prev').show();
            else
                contentSlides.find('#prev').hide();

            contentSlides.find('.slider-wrapper').animate({ scrollLeft: scrollAmount }, 100);
        }

        /*
        * @date 23.11.2017 
        * 
        * Previous Slide Action
        * it shows previous slider.
        * 
        */
        function showPreviousSlide() {
            settings.currentSlide--;
            updateContentHolder();
        }

        /*
        * @date 23.11.2017 
        * 
        * Next Slide Action
        * it shows next slider.
        * 
        */
        function showNextSlide() {    
            settings.currentSlide++;
            updateContentHolder();
        }
        
        /*
        * @date 23.11.2017 
        * 
        * Window ReSize Control
        * It edits silder's width at window size changing.
        * 
        */
        $(window).resize(function () {
            createSlider(component);
        });

        //
        createSlider(component);
        
        return this;
    };
    
}( jQuery ));