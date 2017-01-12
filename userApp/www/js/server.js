
angular.module("server",[])
.factory("titles",function () {
    var titls = [
        {name : "孙悟空",title : "妖怪",select : true},
        {name : "沙和尚",title : "大师兄",select : true},
        {name : "唐僧",title : "徒弟",select : true},
        {name : "白骨精",title : "救命",select : false},
        {name : "牛魔王",title : "咯啊牛",select : true},
        {name : "红孩儿",title : "哈哈哈",select : false},
        {name : "你大爷",title : "孙子",select : false},
        {name : "王老五",title : "隔壁老王",select : true},
        {name : "宝宝",title : "好苦",select : true},
        {name : "狐狸",title : "最美",select : false},
        {name : "小美人",title : "hello",select : true},
        {name : "找死",title : "你是00000",select : true},
        {name : "操蛋",title : "很时尚",select : false},
    ];
    return {
         titles : function () {
             return titls;
         } 
    }
})
    .directive('noScroll', function($document) {

    return {
        restrict: 'A',
        link: function($scope, $element, $attr) {

            $document.on('touchmove', function(e) {
                e.preventDefault();
            });
        }
    }
});