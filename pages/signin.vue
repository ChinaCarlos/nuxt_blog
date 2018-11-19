<template>
  <div class="container">
    <el-carousel :interval="5000" indicator-position="none" arrow="never" class="carouselBox">
      <el-carousel-item v-for="item in imgs" :key="item.src">
        <img :src="item.src" :alt="item.alt">
      </el-carousel-item>
    </el-carousel>
    <div class="signInContainer">
      <div class="box">
        <div class="loginTitle">
          <span class="line"></span>
          <span class="txt"><i class="fa fa-slideshare" aria-hidden="true"></i>&nbsp;用户登录</span>
          <span class="line"></span>
        </div>
        <div class="loginForm">
          <el-input v-model="email" type="text" placeholder="请输入您的邮箱">
            <i slot="prefix" class="el-input__icon fa fa-envelope-o"></i>
          </el-input>
          <el-input v-model="password" type="password" placeholder="请输入您的密码">
            <i slot="prefix" class="el-input__icon fa fa-lock"></i>
            <i slot="suffix" class="el-input__icon fa fa-eye"  v-if="!isShow"></i>
            <i slot="suffix" class="el-input__icon fa fa-slash"  v-else></i>
          </el-input>
          <el-input v-model="code" type="text" placeholder="请输入您的验证码">
            <!-- 应该是后台传过来，此处做法不对！ 学习使用，切勿模仿！-->
            <canvas id="canvas" width="90" height="38" slot="append" @click="drawVerifyCode"></canvas>
          </el-input>
          <el-button type="primary" class="submitBtn">登录</el-button>
        </div>
      </div>
      <div class="logoContainer">
        <div id="mysvg" ref="mysvg" />
      </div>
    </div>
    <div class="power">
      <p class="text">Copyright ©2017-2018 [ Nuxt_Blog ] Powered By <a href="https://github.com/maliaoMJ/nuxt_blog">maliaoMJ</a> Version 1.0.0</p>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'signIn',
  data() {
    return {
      imgs: [{
          src: 'http://pic1.win4000.com/wallpaper/8/52d380be33951.jpg',
          alt: "冲浪"
        },
        {
          src: 'http://pic.3h3.com/up/2018-9/201896153356542640_804.jpg',
          alt: "蜘蛛侠"
        },
        {
          src: 'http://p17.qhimg.com/bdr/__/d/_open360/fj0906/5.jpg',
          alt: "风景"
        },
        {
          src: 'http://p19.qhimg.com/bdr/__/d/_open360/pet0411/52.jpg',
          alt: "猫"
        },
        {
          src: 'http://www.3dmgame.com/uploads/allimg/140620/153_140620153629_2.jpg',
          alt: '科技感'
        },
        {
          src: 'http://pic1.win4000.com/wallpaper/d/58747f2edb1ec.jpg?down',
          alt: 'earth'
        }
      ],
      email: '',
      password: '',
      code: '',
      isShow: false
    }
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    randomColor(min, max) {
      let r = this.randomNum(min, max);
      let g = this.randomNum(min, max);
      let b = this.randomNum(min, max);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    drawVerifyCode() {
      let canvas = document.getElementById("canvas");
      let width = canvas.width;
      let height = canvas.height;
      let ctx = canvas.getContext('2d');
      ctx.textBaseline = 'bottom';

      /**绘制背景色**/
      ctx.fillStyle = this.randomColor(180, 240); //颜色若太深可能导致看不清
      ctx.fillRect(0, 0, width, height);
      /**绘制文字**/
      let str = 'ABCEFGHJKLMNPQRSTWXY123456789';
      for (let i = 0; i < 4; i++) {
        let txt = str[this.randomNum(0, str.length)];
        ctx.fillStyle = this.randomColor(50, 160); //随机生成字体颜色
        ctx.font = this.randomNum(18, 30) + 'px SimHei'; //随机生成字体大小
        let x = 10 + i * 25;
        let y = this.randomNum(25, 45);
        let deg = this.randomNum(-45, 45);
        //修改坐标原点和旋转角度
        ctx.translate(x, y);
        ctx.rotate(deg * Math.PI / 180);
        ctx.fillText(txt, 0, 0);
        //恢复坐标原点和旋转角度
        ctx.rotate(-deg * Math.PI / 180);
        ctx.translate(-x, -y);
      }
      /**绘制干扰线**/
      for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = this.randomColor(40, 180);
        ctx.beginPath();
        ctx.moveTo(this.randomNum(0, width), this.randomNum(0, height));
        ctx.lineTo(this.randomNum(0, width), this.randomNum(0, height));
        ctx.stroke();
      }
      /**绘制干扰点**/
      for (let i = 0; i < 50; i++) {
        ctx.fillStyle = this.randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(this.randomNum(0, width), this.randomNum(0, height), 1, 0, 2 * Math.PI);
        ctx.fill();
      }
    },
    playSvg() {
      let Vivus = this.$Vivus
      const test = new Vivus('mysvg', {
        file: 'images/tiger.svg',
        duration: 1000,
        type: 'oneByOne',
        animTimingFunction: Vivus.EASE
      })
      test.play()
      setTimeout(() => {
        test.play(2)
      }, 20)
    }
  },
  mounted() {
    this.drawVerifyCode();
    this.playSvg();
  }
}
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}

.signInContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* background: rgba(0, 0, 0, 0.25); */
  z-index: 99;
  overflow: hidden;

  .box {
    position: absolute;
    top: 50%;
    right: 12%;
    width: 300px;
    height: 300px;
    margin-top: -175px;
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 10px 10px 80px rgba(35, 34, 34, 0.5);

    .loginForm {
      width: 240px;
      height: 200px;
      margin-top: 0px;
      margin-left: 30px;

      .el-input-group__append {
        width: 90px;
        height: 100%;
        padding: 0;
        margin: 0;
        font-size: 0;

        .verfiyCode {
          display: block;
          width: 100%;
          height: 38px;
          border-bottom-right-radius: 6px;
          border-top-right-radius: 6px;
        }
      }

      .el-input {
        margin-bottom: 12px;
      }

      .submitBtn {
        width: 100%;
      }
    }
  }
}
.power {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  color: #fff;
  text-align: center;
  line-height: 60px;
  z-index: 100;

  p {
    font-size: 14px;
  }

  a {
    color: #3a8ee6;
  }
}
.carouselBox {
  width: 100%;
  height: 100%;
}

.el-carousel__container {
  width: 100%;
  height: 100%;
}

.el-carousel__item {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;

  img {
    width: 100%;
    height: 100%;
  }
}

.loginTitle {
  height: 60px;
  line-height: 60px;
  text-align: center;
}

.loginTitle .line {
  display: inline-block;
  width: 80px;
  border-top: 1px solid #ccc;
  vertical-align: middle;
}

.loginTitle .txt {
  color: #686868;
  vertical-align: middle;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.logoContainer {
  position: absolute;
  top: 10%;
  left: 5%;
  right: 5%;
  width: 100%;
  height: 100%;
  transform: rotate(-6deg);
  z-index: -1;
}
</style>
