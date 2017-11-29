$(function() {
    //判断当前时间
    var nowTime = new Date();
    var hour = nowTime.getHours();
    if(hour >= 6 && hour < 11) {
        $('.greet span').text('早上');
        $('.greet p').text('愿你今天能有一个好心情');
    }else if(hour >= 11 && hour < 14) {
        $('.greet span').text('中午');
    }else if(hour >= 14 && hour < 19) {
        $('.greet span').text('下午');
    }else if(hour >= 19 && hour < 24) {
        $('.greet span').text('晚上');
    }else {
        $('.greet span').text('凌晨');
        $('.greet p').text('注意休息 , 身体最重要');
    }

    $('.greet').slideDown(600);
    setTimeout(function() {
        $('.greet p').slideUp(600);
    }, 3000);

    var contextArr = null; // 定义一个保存context的数组, 不能定义在afterLoad里面, 不然每次加载新的屏就会重置
    var starId = null; // 星星计时器id
    $("#fullpage").fullpage({
        sectionsColor: ["rgb(28,203,174)", "rgb(28,120,135)", "rgb(150,239,230)", "rgb(136,199,190)", "rgb(190,232,231)", "rgb(190,232,231)"], //设置每个屏的背景色
        navigation: true, //显示导航点
        afterLoad: function(anchor, index) { //当每滚动到一个屏时
            // count = 0;
            // move_flag = true;
            //第三屏
            if(index === 3) {
                // li边框颜色
                var colorArr = ['rgba(254, 67, 101, .3)', 'rgba(252, 157, 154, .3)', 'rgba(249, 205, 173, .3)', 'rgba(200, 200, 169, .3)', 'rgba(131, 175, 155, .3)', 'rgba(130, 57, 53, .3)']
                // 画布画笔颜色
                var cavColorArr = ['rgb(254, 67, 101)', 'rgb(252, 157, 154)', 'rgb(249, 205, 173)', 'rgb(200, 200, 169)', 'rgb(131, 175, 155)', 'rgb(130, 57, 53)'];
                // 百分比
                var percentArr = [0.7, 0.7, 0.75, 0.8, 0.8, 0.75];

                contextArr = [];
            
                $('.section3 ul li').each(function(index, value) {
                    $(value).css('border', '4px solid ' + colorArr[index]).attr('draggable', true);
                })
            
                var canvas_all = $('.section3 li canvas');
                canvas_all.each(function(index, value) {
                    var context = value.getContext('2d');
            
                    context.lineWidth = 4;
                    context.lineCap='round';
                    context.strokeStyle = cavColorArr[index];
            
                    var end = 0;
                    value.timerID = setInterval(function() { //给每个标签设置一个存储计时器id的属性    
                        end += 0.01;
                        if(end > percentArr[index]) { // 如果end大于对应百分比, 就停止当前计时器
                            clearInterval(value.timerID);
                            // console.log(value.timerID);
                            // console.log(contextArr);
                            return contextArr[index] = context; // 闭包, 保存所有context
                        }
                        context.clearRect(0, 0, 110, 110); // 清除
                        context.beginPath();

                        context.translate(55, 55); // 移动位置
                        context.rotate(-Math.PI / 180 * 90);
                        
                        $(value).siblings('span').html(parseInt(end * 100) + 1); //设置百分比显示
                        context.arc(0, 0, 52, Math.PI / 180 * 0, 2 * Math.PI * end); //画圆弧
                        context.stroke(); //描边
                        
                        //回到原位
                        context.rotate(Math.PI / 180 * 90);
                        context.translate(-55, -55);
                    }, 10);
                });

                // 设置一个计时器， 每隔5s钟, 出现星星
                starId = setInterval(function() {
                    var left = Math.random() * 500 + 1000;
                    $('.section3 .line').css('left', left).toggleClass('animate');
                }, 3000);
            }else if(index !== 3){
                end = 0;
                $('.section3 li span').text('');
                if(contextArr) {
                    contextArr.forEach(function(value) {
                        value.beginPath();
                        value.clearRect(0, 0, 110, 110);
                    });
                }

                $('.section3 .line').removeClass('animate');
                clearInterval(starId);
            }

            if(index === 6) {
                $('.next a i').removeClass('icon-xia');
            }else {
                $('.next a i').addClass('icon-xia');
            }
        }
    });

    //第一屏轮播图 - 自动轮播
    var pic_index = 0;
    var imgs = $('.slide_pic img');
    setInterval(function() {
        pic_index++;
        if(pic_index === imgs.length) {
            pic_index = 0;
        }
        imgs.eq(pic_index).fadeIn(1000).siblings().fadeOut(1000);
    }, 5000);

    // 个人信息, 跟随鼠标轻微转动
    var info_width = $(".my_infos").innerWidth() / 2; // 获取盒子的宽高, 含padding
    var info_height = $(".my_infos").innerHeight() / 2;
    var x = y = xDeg = yDeg = count = 0;
    // var move_flag = true;
    var offsetX = $('.my_infos')[0].offsetLeft; // 离父元素的偏移
    var offsetY = $('.my_infos')[0].offsetTop;
    $('.my_infos').on('mouseenter', function() {
        $(this).on('mousemove', function(e) {
            // if(move_flag) {
                // count++;
            x = e.pageX - offsetX;
            y = e.pageY - offsetY;
            xDeg = (x - info_width) / 26;
            yDeg = (info_height - y) / 16;
            $(this).css('transform', `rotateY(${xDeg}deg) rotateX(${yDeg}deg)`);
            //     if(count > 1000) {
            //         move_flag = false;
            //         $('.my_infos .pause').slideDown(600);
            //         setTimeout(function() {
            //             move_flag = true;
            //             count = 0;
            //             $('.my_infos .pause').slideUp(600);
            //         }, 3000);
            //     }
            // }
        });
    });
    $('.my_infos').on('mouseleave', function() {
        $(this).css('transform', 'rotateY(0) rotateX(0)');
        $(this).off('mousemove'); // 解绑
    });


    // 第六屏
    var othersColor = ['rgb(36, 41, 46)', 'rgb(15, 136, 235)', 'rgb(230, 22, 45)'];
    // 改变hover颜色
    $('.section6 .others li').on("mouseenter", function() {
        // 根据当前鼠标所在的li的index, 获取对应的数组中的颜色
        $(this).find('i').stop(true, true).animate({'color': othersColor[$(this).index()]}, 200, 'linear').parent().stop(true, true).animate({'border-color': othersColor[$(this).index()]}, 200, 'linear');
    });
    $('.section6 .others li').on("mouseleave", function() {
        $(this).find('i').animate({'color': '#fff'}).parent().animate({'border-color': '#fff'});
    });
    
});