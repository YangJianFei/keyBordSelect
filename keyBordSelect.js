/**
 *
 */
/*
.selectContain{
 border: 1px solid rgb(204, 204, 204);
 border-radius: 2px;
 position: absolute;
 z-index: 1000;
 width: 100%;
 background: white;
 max-height: 222px;
 overflow: auto;
 display: block;
}
.selectSingle{
 margin: 0;
 padding-left: 12px;
 cursor: pointer;
}
.selectActive{
 background: #ddd;
}
*/
;
(function ($, window, document, undefined) {

    var SearchDrop = function (inputelement, value, opt) {
        this.$element = inputelement;//输入框
        this.inputValue = value;//输入框输入的值
        this.defaluts = {
            'hideCallBack': function () {
            },//当选中某一选项后执行的函数
            'selectsContain': 'dropContain',//存放所有下拉列表选项的容器
            'selectsChild': '_sel',//下拉列表的每个选项class
            'selectActive': '_selActive'//当前选中的选项class
        };
        this.options = $.extend({}, this.defaluts, opt);
    };
    SearchDrop.prototype = {
        init: function () {//初始化
            var thisSearchDrop = this;
            //响应键盘事件
            thisSearchDrop.$element.on('keyup', function (e) {//响应键盘按下事件
                if (e.keyCode == 13) {//enter

                } else if (e.keyCode == 40) {//down
                    thisSearchDrop.down(thisSearchDrop);
                } else if (e.keyCode == 38) {//up
                    thisSearchDrop.up(thisSearchDrop);
                }
            }).on('input propertychange', function () {//响应输入值改变事件
                var value = this.value;
                thisSearchDrop.setInputValue(thisSearchDrop, value);
            }).on('click', function (e) {//输入框点击事件
                thisSearchDrop.showSelectAll(thisSearchDrop);
                var a = e || window.event;
                a.stopPropagation();
            });

            $(document).on("click", function () {
                thisSearchDrop.$element.parent().find('.' + thisSearchDrop.options.selectsContain).hide();
            });

            //响应选项点击事件
            thisSearchDrop.$element.parent().find('.' + thisSearchDrop.options.selectsContain).on('click', '.' + thisSearchDrop.options.selectsChild, function () {
                thisSearchDrop.hideSelectAll(thisSearchDrop);
            });
        },
        down: function (instance) {//选中选项下移
            var $selAll = instance.$element.parent();
            var activeClass = instance.options.selectActive;
            var selectsChild = instance.options.selectsChild;
            var $active = $selAll.find('.' + activeClass);
            if ($active.size()) {//已经选中
                var index = $active.index();
                if ((index + 1) == $selAll.find('.' + selectsChild + ':visible').size()) {//选中了最后一个
                    $active.removeClass(activeClass);
                    instance.$element.val(instance.inputValue);
                } else {//没有选中最后一个
                    instance.$element.val($active.removeClass(activeClass).next().addClass(activeClass).text());
                }
            } else {//没有选中
                instance.$element.val($selAll.find('.' + selectsChild + ':eq(0)').addClass(activeClass).text());
            }
        },
        up: function (instance) {//选中选项下移
            var $selAll = instance.$element.parent();
            var activeClass = instance.options.selectActive;
            var selectsChild = instance.options.selectsChild;
            var $active = $selAll.find('.' + activeClass);
            if ($active.size()) {//已经选中
                var index = $active.index();
                if (index == 0) {//选中了第一个
                    $active.removeClass(activeClass);
                    instance.$element.val(instance.inputValue);
                } else {//没有选中最后一个
                    instance.$element.val($active.removeClass(activeClass).prev().addClass(activeClass).text());
                }
            } else {//没有选中
                instance.$element.val($selAll.find('.' + selectsChild + ':last-child').addClass(activeClass).text());
            }
        },
        enter: function () {//键盘回车

        },
        setInputValue: function (instance, value) {//设置输入框输入值
            instance.inputValue = value;
        },
        showSelectAll: function (instance) {//展示所有选项
            var activeClass = instance.options.selectActive;
            var selectsChild = instance.options.selectsChild;
            instance.$element.parent().find('.' + instance.options.selectsContain).show().find('.' + selectsChild).show().end()
                .find('.' + activeClass).removeClass(activeClass);
        },
        hideSelectAll: function (instance) {//隐藏所有选项
            instance.$element.parent().find('.' + instance.options.selectsContain).hide();
            instance.options.hideCallBack();
        }
    };

    $.fn.keyBordSelect = function (options) {
        this.each(function () {
            //功能实体
            var mySearchDrop = new SearchDrop($(this), "", options);
            mySearchDrop.init();
        });
        return this;
    };
})(jQuery, window, document);
