!function(){var e=$(".youtube-frame");e.length&&e.each(function(){var e=$(this),a=e.data("embed");a&&e.click(function(){$(".youtube-frame iframe").each(function(){$(this).remove()});$("<iframe>",{frameborder:0,allowfullscreen:"",src:"https://www.youtube.com/embed/"+a+"?rel=0&showinfo=0&autoplay=1"}).appendTo(e)})})}();