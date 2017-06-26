# keyBordSelect
通过键盘上下剪头选择下拉列表选项
效果图：
```
<div class="col-xs-10 info-right">
    <input type="text" class="form-control selectInput " placeholder="请输入地址信息" autocomplete="off">
    <div class="selectContain" style="display: none">
        <p class="selectSingle">sfsdfdsfs1</p>
        <p class="selectSingle">sfsdfdsfs2</p>
        <p class="selectSingle">sfsdfdsfs3</p>
        <p class="selectSingle">sfsdfdsfs4</p>
        <p class="selectSingle">sfsdfdsfs5</p>
        <p class="selectSingle">sfsdfdsfs6</p>
    </div>
</div>

```
### use way

```
$(".selectInput").keyBordSelect({'selectsContain':'selectContain','selectsChild':'selectSingle','selectActive':'selectActive'});
```
