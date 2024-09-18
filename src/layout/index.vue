<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <div class="banner">
        <div class="title">
          <h1>海上风电易损性评估工具</h1>
          <br>
          <h2>四川大学工程结构韧性防灾研究团队</h2>
        </div>
        <!-- <img class="img-wrapper" :src="'/logo2.png'"> -->
      </div>
      <app-main />
      <div class="footer">
        <div class="content">
          <div class="info-wrapper">
            <div>
              <b>通讯地址</b>
              <a href="#"> 四川大学中国西部抗震防灾研究中心 </a>
            </div>
            <div style="margin-top: 5px;">
              <b>联系方式</b>
              <a href="#"> 王健泽, jzwang@scu.edu.cn</a>
            </div>
          </div>
          <div class="copyright-wrapper">
            <p>Copyright &copy; 2024 四川大学工程结构韧性防灾研究团队版权持有</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AppMain } from './components'
import { Navbar } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Navbar
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  @function makelongshadow($color) {
    $val: 0px 0px $color;
    @for $i from 1 through 200 {
      $val: #{$val}, #{$i}px #{$i}px #{$color};
    }
    @return $val;
  }

  @mixin longshadow($color) {
    text-shadow: makelongshadow($color);
  }

  $color: #2171b5;

  .banner {
    padding: 15px;
    text-align: center;
    overflow: hidden;
    background-color: $color;
    .title {
      float: center;
      width: 100%;
      text-align: center;
    }
    
    h1, h2 {
      line-height: 1;
      margin: 0;
      color: #fff;
    }
    
    h1 {
      font-size: 28px;
      @include longshadow(darken($color, 5% ));
    }
    
    h2 {
      font-size: 20px;
      @include longshadow(darken($color, 8% ));
    }

    // .img-wrapper {
    //   width: 270px;
    //   height: 90px;
    //   position: relative;
    //   float: right;
    //   margin-right: 20px
    // }
  }

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }

  .footer {
    z-index: 1;
    --footer-background:#2171b5;
    display:grid;
    position: relative;
    grid-area: footer;
    // margin-top: 1.5rem;
    background: linear-gradient(to bottom, var(--footer-background) 50%, #f5f9ff 50%);
    .content {
        z-index: 2;
        display:grid;
        font-family: "STFangsong";
        grid-template-columns: 1fr auto;
        grid-gap: 4rem;
        padding: 1rem;
        background:var(--footer-background);
        .info-wrapper {
          font-size:16px;
        }
        a, p {
            color:#F5F7FA;
            text-decoration:none;
            
        }
        b {
            color:white;
        }
        p {
            margin-top: 25px;
            font-size: 12px;
        }
    }
  }

</style>