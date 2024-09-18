<template>
    <div class="shell">
        <div class="shell-main">
            <div class="shell-main-nav">
                <div class="logo">
                    <img src="/image/logo.png" alt="">
                    <span>四川大学工程结构韧性防灾研究团队</span>
                </div>
                <ul>
                    <li><a href="#">主页</a></li>
                    <li><a href="#">工程应用与推广</a></li>
                    <li><a href="#">参考资料</a></li>
                    <li @click="toLogin"><a href="#">{{ this.userName }}</a></li>
                    <div class="nav-box"></div>
                </ul>
            </div>
            <div class="shell-main-bottom">
                <div class="shell-main-bottom-left">

                </div>
                <div class="shell-main-bottom-bottom">
                    <ul>
                        <li>
                            <img src="@/assets/btn_images/clean-energy-with-wind-power-plant.jpg" alt="">
                            <h2>超高风电支撑结构智能设计模块</h2>
                        </li>
                        <li @click="toDashboard">
                            <img src="@/assets/btn_images/low-angle-shot-windmill-sunlight-blue-sky-daytime.jpg" alt="">
                            <h2>风电多灾风险量化模型计算模块</h2>
                        </li>
                        <li>
                            <img src="@/assets/btn_images/3d-solar-pannels-project-energy-saving.jpg" alt="">
                            <h2>风电支撑结构减载抑振设计模块</h2>
                        </li>
                        <li>
                            <img src="@/assets/btn_images/wind-power-plant-solar-pannels-low-angle.jpg" alt="">
                            <h2>风电支撑结构智慧运维管理模块</h2>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="shell-main-footer">
                <div class="content">
                    <div class="info-wrapper">
                        <div>
                            <b>通讯地址</b>
                            <a href="#"> 四川大学中国西部抗震防灾研究中心 </a>
                        </div>
                        <div style="margin-top: 5px;">
                            <b>联系方式</b>
                            <a href="#"> 戴靠山, kdai@scu.edu.cn</a>
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
export default {
    data() {
        return {
            isHidden: false,
            lastScrollY: 0,
            userName: this.$store.state.user.name ? '当前用户: ' + this.$store.state.user.name : '登录 / 注册'
        };
    },
    methods: {
        toLogin() {
            if (this.userName != '登录 / 注册') {
                // console.log(this.userName)
                return;
            }
            this.$router.push({ name: 'Dashboard' });
        },
        toDashboard() {
            this.$router.push({ name: 'Dashboard' });
        }
    },

};
</script>

<style lang="scss" scoped>
@font-face {
    font-family: 'font';
    src: url('../../styles/优设标题黑_猫啃网.ttf');
}
@font-face {
    font-family: 'cktk';
    src: url('../../styles/CKTKingkong.ttf');
}

.shell {
    &-main {
        width: 100%;
        height: 100vh;
        background-image: url('/image/background.jpg');
        background-size: cover; 
        background-position: center;
        position: relative;
        transition: .2s;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 0px;

        &::before {
            content: '';
            width: 250px;
            height: 50%;
            background-image: linear-gradient(to bottom, rgb(161, 230, 255), #4ea5f1, rgb(161, 230, 255));
            position: absolute;
            transform: translate(-145%, 0);
            z-index: -999;
            bottom: 0;
        }

        &::after {
            content: '';
            width: 250px;
            height: 50%;
            background-image: linear-gradient(to bottom, rgb(161, 230, 255), #4ea5f1, rgb(161, 230, 255));
            position: absolute;
            transform: translate(145%);
            z-index: -999;
        }

        &-nav {
            width: 100%;
            height: 60px;
            position: sticky;
            z-index: 999;
            top: 0;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            background: linear-gradient(to right bottom,
                    rgba(255, 255, 255, .8),
                    rgba(255, 255, 255, .7),
                    rgba(255, 255, 255, .6));
            backdrop-filter: blur(13px);

            .logo {
                width: 420px;
                height: 100%;
                position: absolute;
                left: 5%;
                justify-content: space-between;
                display: flex;
                align-items: center;

                img {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                }

                span {
                    font: 100 22px 'font';
                    letter-spacing: 2px;
                }
            }

            ul {
                width: 600px;
                height: 100%;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                position: absolute;
                margin: 0;
                padding: 0;
                right: 5%;

                .nav-box {
                    position: absolute;
                    bottom: 1px;
                    left: 0;
                    width: 150px;
                    height: 5px;
                    border-radius: 2px;
                    background-color: rgb(180, 68, 255);
                    z-index: -999;
                    transition: .5s;
                }

                li {
                    width: 150px;
                    text-align: center;

                    a {
                        color: #000;
                        display: block;
                        width: 100%;
                        height: 100%;
                        line-height: 60px;
                        text-align: center;
                        font-size: 18px;
                    }
                }

                li:nth-child(2):hover~.nav-box {
                    left: (150px*1);
                    background-color: rgb(255, 0, 0);
                }

                li:nth-child(3):hover~.nav-box {
                    left: (150px*2);
                    background-color: #8da1f8;
                }

                li:nth-child(4):hover~.nav-box {
                    left: (150px*3);
                    background-color: #5433e6;
                }
            }
        }

        &-bottom {
            display: flex;
            flex-direction: row;
            justify-content: center;
            width: 100%;
            height: 790px;
            overflow: hidden;
            h2{
                font: 100 34px 'font';
                letter-spacing: 5px;
                margin-left: 100px;
                span{
                    font-size: 80px;
                }
            }

            &-left {
                width: 50%;
                padding: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;

                h2 {
                    font: 100 34px 'font';
                    letter-spacing: 5px;
                    margin-left: 100px;

                    span {
                        font-size: 80px;
                    }
                }
            }

            &-bottom {
                width: 600px;
                height: 100%;
                // background: linear-gradient(to right bottom,
                //         rgba(255, 255, 255, .9),
                //         rgba(255, 255, 255, .7),
                //         rgba(255, 255, 255, .6));
                // backdrop-filter: blur(30px);
                position: relative;

                ul {
                    width: 100%;
                    height: 100%;
                    max-height: 600px;
                    display: flex;
                    justify-content: space-evenly;
                    align-items: center;
                    flex-wrap: wrap;
                    margin-top: 40px;

                    li {
                        width: 200px;
                        height: 200px;
                        border-radius: 50%;
                        border: 12px solid rgba(0, 0, 0, 0.2);
                        display: flex;
                        padding: 10px;
                        flex-direction: column;
                        transition: .3s;
                        box-sizing: border-box;

                        &:hover {
                            padding: 2px;
                            margin: 8px;
                        }

                        &:hover h2 {
                            letter-spacing: 3px;
                        }

                        img {
                            width: 100%;
                            border-radius: 50%;
                        }

                        h2 {
                            margin: 30px 0 10px 0;
                            font-size: 24px;
                            transition: .3s;
                            color: rgb(0, 0, 0);
                            text-align: center;
                            letter-spacing: 0;
                        }

                        span {
                            color: rgb(82, 82, 82);
                        }
                    }
                }
            }
        }

        &-footer {
            width: 100%;
            position: absolute;
            height: 80px;
            display: grid;
            bottom: 0;

            .content {
                display: grid;
                font-family: 'cktk';
                grid-template-columns: 1fr auto;
                grid-gap: 4rem;
                padding: 1rem;

                .info-wrapper {
                    font-size: 16px;
                }

                a,
                p {
                    color: #000000;
                    text-decoration: none;

                }

                b {
                    color: #000000;
                }

                p {
                    margin-top: 25px;
                    font-size: 12px;
                }
            }
        }
    }

}
</style>