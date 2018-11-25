<template>
  <div class="article-item">
    <h3 class="title">记一次前端面试的全过程</h3>
    <div class="article-info">
      <div class="info-item"><i class="fa fa-clock-o"></i>&nbsp;2018-12-12 12:11:32</div>
      <div class="info-item"><i class="fa fa-user"></i>&nbsp;majian</div>
      <div class="info-item"><i class="fa fa-eye"></i>&nbsp;12423</div>
      <div class="info-item">分类:&nbsp;JavaScript</div>
    </div>
    <div class="info-desc">
      <div class="img-wrapper">
        <img src="http://demo169.adminbuy.cn/uploads/allimg/150529/1-15052Z009560-L.png" alt="">
      </div>
        <div class="desc-box">
          <div class="desc-text">
            <p>
             有赞一面结束后过了两天就收到了二面的邀请，我回复面试邀请的短信，说最近可能请假太多，能不能约到晚上面试，对方很很爽快的答应了，就约在了晚上七点半，我回复可以的，然后第二天，收到了确切的面试的时间和地点，时间定在了晚上7点15分。
到了面试当天，我提前了五分钟下班，照着百度地图的提示路线（约1小时9分钟），到了公交站等车。。。然后等呀等，等了十五分钟公交还没来，怕自己迟到，就打了个滴滴过去，到了面试地点之后上到了公司的前台，前台没有人，可能是因为到饭点了，前台去吃饭了吧。然后看到前台那层楼好多人在打乒乓球，大家也玩得挺开心，看起来环境也很不错，当时想，诶呀，原来有赞的环境这么好。等了一会儿之后，看了一下短信，发现面试邀请里留有面试官的联系电话，果断打了过去，过了一会儿面试官到前台接我，然后找了一个会议室，开始了当天的面试。


作者：麦乐丶
链接：https://juejin.im/post/5bf8fe2ee51d452d705fee3d
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。</p>
          </div>
        </div>
      </div>
      <div class="article-tag">所属标签:
        <el-tag size="mini" type="success">Vue</el-tag>
        <el-tag size="mini" type="info">JavaScript</el-tag>
        <el-tag size="mini" type="success">ES6</el-tag>
        <el-tag size="mini" type="warning">Nodejs</el-tag>
      </div>
    </div>
</template>

<script>
export default {
  name: 'articleItem'
}
</script>

<style lang="scss" scoped>
.article-item {
  width: 100%;
  height: 220px;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 20px;
  box-sizing: border-box;
  transition-duration: 0.8s;
  border-radius: 6px;
  border-bottom: 4px dotted #eee;
  cursor:pointer;
  &:hover {
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.5);
    border-bottom: none;
  }

  .title {
    color: #333;
    font-size: 16px;
    font-weight: bold;
  }

  .article-tag {
    height: 20px;
    line-height: 20px;
    color: #aaa;
    padding-top: 0px;
    padding-left: 170px;
    padding-top: 10px;
    font-size: 14px;
  }

  .info-desc {
    margin-top: 30px;
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: row;

    .img-wrapper {
      width: 150px;
      height: 120px;

      img {
        width: 150px;
        height: 120px;
      }
    }

    .desc-box {
      flex: 1;
      padding-left: 20px;
      padding-right: 20px;
      font-size: 14px;
      color: #aaa;
      display: block;
      width: 100%;
      height: 100%;
      overflow: hidden;

      .desc-text {
        display: block;
        width: 100%;
        height: 100%;

        p {
          width: 100%;
          height: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }
      }
    }
  }

  .article-info {
    padding-left: 0px;
    height: 10px;
    width: auto;

    .info-item {
      margin-top: 10px;
      display: inline-block;
      width: auto;
      font-size: 10px;
      line-height: 10px;
      color: #ccc;
      border-right: 1px solid #ccc;
      padding-left: 10px;
      padding-right: 10px;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        border: none;
      }
    }
  }
}
</style>
