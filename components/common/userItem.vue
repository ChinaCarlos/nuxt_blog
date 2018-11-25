<template>
  <el-row class="user-item">
    <el-col :span="24" class="userinfo">
      <div class="avatar">
        <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2644376996,3207514192&fm=26&gp=0.jpg" alt="">
          </div>
        <div class="desc">
          <p class="name">明若清渊</p>
          <p class="sign">我对你是遥遥无期的喜欢。</p>
          <p class="icons">
            <el-popover placement="top-start" title="标题" width="200" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
              <i class="fa fa-qq" slot="reference"></i>
            </el-popover>
            <el-popover placement="top-start" title="标题" width="200" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            </el-popover>
            <el-popover placement="top-start" title="标题" width="200" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
              <i class="fa fa-weibo" slot="reference"></i>
            </el-popover>
            <el-popover placement="top-start" title="标题" width="200" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
              <i class="fa fa-wechat" slot="reference"></i>
            </el-popover>
            <el-popover placement="top-start" title="标题" width="200" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
              <i class="fa fa-github" slot="reference"></i>
            </el-popover>

          </p>
        </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'userItem'
}
</script>

<style lang="scss" scoped>
.user-item {
  background: #fff;
  height: 220px;
  border-radius: 6px;
  cursor: pointer;
  transition-duration: 1s;

  &:hover {
    box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.3);
  }

  .userinfo {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .avatar {
      height: 110px;
      text-align: center;
      padding-top: 20px;

      img {
        height: 80px;
        width: 80px;
        border-radius: 50%;
      }
    }

    .desc {
      flex: 1;

      .name {
        text-align: center;
      }

      .sign {
        font-size: 14px;
        text-align: center;
        color: gray;
        padding-top: 5px;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .icons {
        display: flex;
        flex-direction: row;
        padding-top: 10px;
        height: 50px;
        width: 120px;
        margin: 0 auto;
        justify-content: center;
        align-items: center;
        .fa {
          flex: 1;
          text-align: center;
          font-size: 20px;
          color: gray;
          transition-duration: 0.5s;
          padding-left: 5px;
          padding-right: 5px;
        }

        .fa-qq {
          &:hover {
            color: #409eff;
          }
        }

        .fa-weibo {
          &:hover {
            color: red;
          }
        }

        .fa-wechat {
          &:hover {
            color: #52b705;
          }
        }

        .fa-github {
          &:hover {
            color: black;
          }
        }
      }
    }
  }
}
</style>
