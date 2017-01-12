angular.module("starter")
    .controller("HeaderController",function ($scope,$timeout,$ionicScrollDelegate,$ionicModal,$state,$ionicSideMenuDelegate,titles,$ionicBackdrop) {
        //$scope.items = ["孙悟空","沙和尚","唐僧","白骨精","牛魔王","红孩儿","你大爷","王老五","宝宝","狐狸","小美人","找死","操蛋"];
        $scope.items2 = ["孙悟空","沙和尚","唐僧","白骨精","牛魔王","红孩儿","你大爷","王老五","宝宝","狐狸","小美人","找死","操蛋"];
        $scope.items = titles.titles();
        // console.log( $scope.items)
        $scope.doRefresh = function () {
            //发送请求
            console.log("ddddd");
            $timeout(function () {
                $scope.$broadcast('scroll.refreshComplete');//停止刷新
            },1000)
        };
        //用法一
        // $scope.scro = function () {
        //     // console.log("dddd")
        //     $ionicScrollDelegate.scrollTop()
        // }
        $scope.scro = function () {
            // console.log("dddd")
            $ionicScrollDelegate.$getByHandle('maxScroll').scrollTop()
        };
        $scope.scro2 = function () {
            // console.log("dddd")
            $ionicScrollDelegate.$getByHandle('minScroll').scrollTop()
        };
        $ionicModal.fromTemplateUrl("user/modle.html",{
            scope : $scope,
            animation: 'slide-in-up'
        }).then(function (model) {
            $scope.model = model
        });
        $scope.mod = function () {
            $scope.model.show();
        };
        $scope.close = function () {
            $scope.model.hide()
        };
        //完成后清理模态 页面发生跳转是触发
        $scope.$on("$destroy",function () {
            $scope.model.remove();
            console.log("已完成")
        });
        $scope.$on('modal.hidden', function() {
            // Execute action
            console.log("隐藏")
        });
        $scope.stateContact = function () {
            $state.go('contact')
        };
        $scope.dynamic = function () {
            $state.go('dynamic')
        };
        $scope.menuToggle = function () {
            $ionicSideMenuDelegate.toggleLeft()
        };

        $scope.action = function () {
            $ionicBackdrop.retain();
            $timeout(function() {
                $ionicBackdrop.release();
            }, 1000);
        };
        var page=0;

        $scope.loadMore = function () {
            console.log("加载中");
            $timeout(function () {
                page +=1;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            },1000)

        };
        $scope.load = function () {
            console.log("已加载全部")
            return page < 5;

        };

    //    重排
        $scope.state = {
            reordering : false
        };
        $scope.$on("$stateChangeStart",function () {
            $scope.state.reordering = false;
            console.log("ddd")
        });
        $scope.move = function (item ,fromIndex,toIndex) {
            $scope.items.splice(fromIndex-1,1);
            console.log(fromIndex)
            $scope.items.splice(toIndex-1,0,item)
        }
    })
    .controller("ContactController",function ($scope,$timeout,$ionicScrollDelegate,$ionicModal,$state,titles,$ionicPopup) {
        $scope.doRefresh = function () {
            //发送请求
            console.log("ddddd");
            $timeout(function () {
                $scope.$broadcast('scroll.refreshComplete');//停止刷新
            },1000)

        };
        $scope.items = titles.titles();
        $scope.message = function () {
            $state.go('hea')
        };
        $scope.dynamic = function () {
            $state.go('dynamic')
        };
        $scope.mod = function () {
            $ionicPopup.confirm({
                title : "Are you sure",
                template : "This will remove?"
            }).then(function (res) {
                console.log(res);
                if (res){
                     $ionicPopup.alert({
                        title : "HELLO WORLD MSEF"
                    }).then(function (res) {
                        if (res){
                            var popup = $ionicPopup.show({
                                title : "LIDSDF",
                                cssClass : "active",
                                template : "<h1>自定义弹框</h1>",
                                buttons : [{
                                    text : "Concel",
                                    type : "button-positive",
                                    onTap:function (e) {
                                        e.preventDefault()
                                        console.log("concel")
                                    }
                                },{
                                    text : "close",
                                    type : "button-assertive",
                                    onTap : function (e) {
                                        e.preventDefault();
                                        popup.close()
                                    }
                                }]

                            })
                        }
                    })
                }
            })
        };

       $scope.remove = function(item) {
           $scope.items.splice($scope.items.indexOf(item), 1);
        }

    })
    .controller("DynamicController",function ($scope,$timeout,$ionicScrollDelegate,$ionicModal,$state,titles) {
        $scope.doRefresh = function () {
            //发送请求
            console.log("ddddd");
            $timeout(function () {
                $scope.$broadcast('scroll.refreshComplete');//停止刷新
            },1000)

        };
        $scope.items = titles.titles();
        $scope.message = function () {
            $state.go('hea')
        };
        $scope.stateContact = function () {
            $state.go('contact')
        };

    })
    .controller("CardsCtrl",function ($scope,TDCardDelegate,$ionicPlatform,$http) {
        console.log("CARDS CTRL");
        var cardTypes = [
            {
                image : "img/adam.jpg"
            },
            {
                image : "img/adam.jpg"
            },
            {
                image : "img/adam.jpg"
            },
            {
                image : "img/adam.jpg"
            }
        ];
        $scope.cards = Array.prototype.slice.call(cardTypes,0);
        $scope.cardDestroyed = function (index) {
            $scope.cards.splice(index, 1)
        };
        $scope.addCard = function () {
            var newCard = cardTypes[Math.floor(Math.random()*cardTypes.length)];
            newCard.id = Math.random();
            $scope.cards.push(angular.extend({}, newCard));
        };

        $ionicPlatform.ready(function () {
            // console.log( navigator.geolocation)
            navigator.geolocation.getCurrentPosition(function (location) {
                // $scope.location = location.coords.latitude;
                $scope.$apply();
                $http.get('https://maps.googleapis.com/maps/api/geocode/json',
                    {params:{latlng: location.coords.latitude+','+location.coords.longitude}})
                    .success(function (data) {
                      // var locations = {
                      //     lat : location.coords.latitude,
                      //     latlng : location.coords.longitude,
                      //     city : data.ressults[0].formatted_address,
                      //     current : true
                      // }
                      $scope.city = data.results[1].formatted_address;
                        console.log(data);

                        alert($scope.city)
                    })
                    .error(function (err) {
                        alert(err)
                    })
                alert("获取地理位置")
            })
        })

    })
    .controller('CardCtrl', function($scope,TDCardDelegate) {
        $scope.cardSwipedLeft = function(index) {
            console.log('LEFT SWIPE');
            $scope.addCard();
        };
        $scope.cardSwipedRight = function(index) {
            console.log('RIGHT SWIPE');
            $scope.addCard();
        };
    });






;
