

//SLIDER
$('#homeSlider').owlCarousel({
    loop:true,
    items: 1,
    autoplay:true,
    autoplayTimeout:5000,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut'
    // onInitialized: progressBar,
    // onTranslated: moved
});
// $('#serviceSlider').owlCarousel({
//     loop:true,
//     nav: true,
//     dots: false,
//     items: 1,
//     autoplay:true,
//     autoplayTimeout:5000,
//     autoplayHoverPause:true,
//     navText:["&lsaquo;","&rsaquo;"]
// });
$('#serviceGallery').owlCarousel({
    items:1,
    loop:false,
    center:true,
    dots: false,
    callbacks:true,
    URLhashListener:true,
    autoplayHoverPause:true,
    startPosition: 'URLHash'
});
$('#blogBanner').owlCarousel({
    items:1,
    loop:true,
    dots: true,
    autoplayHoverPause:true,
    autoplay:true,
    autoplayTimeout:5000,
});
$('#partnerLogo').owlCarousel({
    loop:true,
    margin:10,
    nav: false,
    dots: false,
    autoWidth:true,
    responsiveClass:true,
    autoplay:true,
    autoplayTimeout:3000,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:10
        }
    }
});
//END SLIDER