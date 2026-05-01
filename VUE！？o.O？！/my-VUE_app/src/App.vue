<!-- ================================================================ -->
<!--                          模板 (Template)                         -->
<!-- ================================================================ -->
<template>
    <!-- ========== 背景网格动画 ========== -->
    <div class="grid-container">
        <div class="grid-line h-grid-line grid-center-h"></div>
        <div class="grid-line v-grid-line grid-center-v"></div>
        <div v-for="i in gridCount" :key="'hu'+i" class="grid-line h-grid-line"
             :style="{ top: `calc(50% - ${i * 50}px)`, animationDelay: `${2.3 + i * 0.1}s` }"></div>
        <div v-for="i in gridCount" :key="'hd'+i" class="grid-line h-grid-line"
             :style="{ top: `calc(50% + ${i * 50}px)`, animationDelay: `${2.3 + i * 0.1}s` }"></div>
        <div v-for="i in gridCount" :key="'vl'+i" class="grid-line v-grid-line"
             :style="{ left: `calc(50% - ${i * 50}px)`, animationDelay: `${2.3 + i * 0.1}s` }"></div>
        <div v-for="i in gridCount" :key="'vr'+i" class="grid-line v-grid-line"
             :style="{ left: `calc(50% + ${i * 50}px)`, animationDelay: `${2.3 + i * 0.1}s` }"></div>
    </div>

    <!-- ========== 载入动画 ========== -->
    <div v-if="isLoading" class="loading-screen">
        <div class="h-line"></div>
        <div class="welcome-text">-WELCOME-</div>
        <div class="loading-box-2"></div>
        <div class="loading-box">
            <div class="loading-blink"></div>
            <span class="loading-text">LOADING...</span>
            <div class="loading-bar">
                <span class="loading-text-dark">LOADING...</span>
            </div>
        </div>
    </div>

    <!-- ========== HUD装饰层 ========== -->
    <div class="hud-decorations">
        <div class="hud-corner hud-corner-tl"></div>
        <div class="hud-corner hud-corner-tr"></div>
        <div class="hud-corner hud-corner-bl"></div>
        <div class="hud-corner hud-corner-br"></div>
    </div>

    <!-- ========== 主内容容器 ========== -->
    <div class="container">
        <div class="left-section" ref="leftSection">
            <div class="profile">
                <div class="profile-img-wrapper">
                    <img :src="avatarImg" alt="LaiY">
                    <svg class="corner-line corner-line-tl" viewBox="0 0 120 120">
                        <polyline points="0,60 0,0 60,0" stroke="red" stroke-width="2" fill="none"/>
                    </svg>
                    <svg class="corner-line corner-line-br" viewBox="0 0 120 120">
                        <polyline points="60,120 120,120 120,60" stroke="red" stroke-width="2" fill="none"/>
                    </svg>
                </div>
                <div class="profile-text">
                    <span class="profile-name" ref="nameText">Rr_LaiY</span>
                    <span class="profile-desc"></span>
                </div>
            </div>
        </div>
    </div>
</template>


<!-- ================================================================ -->
<!--                          脚本 (Script)                           -->
<!-- ================================================================ -->
<script setup lang="ts">
    import { ref, computed, onMounted } from 'vue'
    import avatarImg from './assets/F_LaiY.png'

    const isLoading = ref(true)
    const nameText = ref<HTMLElement | null>(null)
    const leftSection = ref<HTMLElement | null>(null)

    /* 窗口尺寸 */
    const windowW = ref(window.innerWidth)
    const windowH = ref(window.innerHeight)

    /* 根据窗口大小动态计算网格线数量（间距50px，从中心向两边） */
    const gridCount = computed(() => {
        const maxDim = Math.max(windowW.value, windowH.value)
        return Math.ceil(maxDim / 2 / 50 )
    })

    /* 文字拆分为单个字符 */
    function splitTextToSpans() {
        const el = nameText.value
        if (!el) return
        const text = el.textContent || ''
        el.innerHTML = ''
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span')
            span.textContent = text[i] ?? null
            el.appendChild(span)
        }
    }

    onMounted(() => {
        document.title = '我去！这是我的网站O.o'
        setTimeout(() => { isLoading.value = false }, 10000)
        splitTextToSpans()

        /* 监听窗口大小变化，动态更新网格线数量 */
        window.addEventListener('resize', () => {
            windowW.value = window.innerWidth
            windowH.value = window.innerHeight
        })
    })
</script>


<!-- ================================================================ -->
<!--                          样式 (Style)                            -->
<!-- ================================================================ -->
<!-- 全局样式（*、html、body、body::before）在 src/assets/main.css -->
<style scoped>

/* ================================================================== */
/*  1. 载入屏幕 - CSS属性                                              */
/* ================================================================== */

.loading-screen {
    position: fixed;
    inset: 0;
    background-color: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 20;
}

.h-line {
    position: absolute;
    top: 50%;
    left: 0;
    z-index: 1;
    height: 0.02vw;
    background-color: rgb(255, 255, 255);
    transform: translateY(-50%);
    animation: h-line-anin 1.8s ease forwards;
}

.loading-box {
    position: relative;
    border: 0.05vw solid rgb(255, 255, 255);
    padding: 0.8vw 3.5vw;
    width: 3.5vw;
    z-index: 2;
    background-color: rgb(0, 0, 0);
    box-sizing: border-box;
    overflow: hidden;
    opacity: 0;
    animation:
        box-anin 1.25s ease forwards 0.6s,
        box-shrink 0.5s ease-in forwards 3.5s;
}

.loading-box-2 {
    position: absolute;
    width: 16vw;
    height: 4vw;
    background-color: #ffffff;
    border: 0.05vw solid white;
    box-sizing: border-box;
    z-index: 3;
    opacity: 0;
    right: calc(50% - 7vw - 1px);
    top: 50%;
    transform: translateY(-50%);
    animation: box-shrink-2 2s ease forwards 3.8s;
}

.loading-blink {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0);
    z-index: 9;
    opacity: 0;
    animation: blink-anin 0.08s ease 1 2.7s;
}

.loading-text {
    color: rgb(255, 255, 255);
    font-size: 0.8vw;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Courier New', monospace;
    letter-spacing: 0vw;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    animation: text-anin 0.5s ease forwards 1.5s;
}

.loading-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background-color: rgb(255, 255, 255);
    overflow: hidden;
    display: flex;
    align-items: center;
    animation: bar-anin 1s ease-in forwards 2s;
}

.loading-text-dark {
    white-space: nowrap;
    padding-left: 0.5vw;
    color: rgb(0, 0, 0);
    font-size: 0.8vw;
    font-family: 'Courier New', monospace;
    letter-spacing: 0.1vw;
    text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);
    animation: text-anin 0.01s ease forwards 2s;
}

.welcome-text {
    position: absolute;
    color: rgb(255, 255, 255);
    font-size: 2vw;
    font-family: 'Courier New', monospace;
    letter-spacing: 0.5vw;
    opacity: 0;
    animation: welcome-appear 1.25s ease forwards 5s;
}

/* ================================================================== */
/*  1. 载入屏幕 - 动画关键帧                                            */
/* ================================================================== */

@keyframes h-line-anin {
    0%   { left: -40%; right: 100%; }
    30%  { left: 0%;   right: 50%;  }
    60%  { left: 0%;   right: 50%;  }
    100% { left: 50%;  right: 50%;  }
}

@keyframes box-anin {
    0%   { opacity: 1; width: 1px;  padding: 0; }
    30%  { opacity: 1; width: 1px;  padding: 0.8vw 0; }
    100% { opacity: 1; width: 3vw;  padding: 0.8vw 3.5vw; }
}

@keyframes blink-anin {
    0%   { opacity: 0; }
    50%  { opacity: 1; }
    100% { opacity: 0; }
}

@keyframes box-shrink {
    0%   { opacity: 1; width: 3vw; padding: 0.8vw 3.5vw; }
    50%  { opacity: 1; width: 1px; padding: 0.8vw 0; }
    100% { opacity: 0; width: 1px; padding: 0; }
}

@keyframes box-shrink-2 {
    0%   { opacity: 1; clip-path: inset(0 0 0 calc(100%)); }
    40%  { opacity: 1; clip-path: inset(0 0 0 0); }
    60%  { opacity: 1; clip-path: inset(0 0 0 0); }
    99%  { opacity: 1; clip-path: inset(0 calc(100% - 1px) 0 0); }
    100% { opacity: 1; clip-path: inset(0 calc(100% - 1px) 0 0); }
}

@keyframes welcome-appear {
    0%   { opacity: 1; letter-spacing: 0vw; }
    15%  { opacity: 1; letter-spacing: 0vw; }
    100% { opacity: 1; letter-spacing: 0.5vw; }
}

@keyframes text-anin {
    0%   { letter-spacing: 0vw; }
    100% { letter-spacing: 0.1vw; }
}

@keyframes bar-anin {
    0%   { width: 0;    opacity: 1; }
    1%   { width: 0;    opacity: 1; }
    100% { width: 100%; opacity: 1; }
}


/* ================================================================== */
/*  2. HUD装饰层 - CSS属性                                             */
/* ================================================================== */

.hud-decorations {
    position: fixed;
    inset: 0;
    pointer-events: none;
}

.hud-corner {
    position: absolute;
    width: 150px;
    height: 150px;
    opacity: 0;
}

.hud-corner::before {
    position: absolute;
    font-size: 9px;
    color: rgba(255, 255, 255, 0.4);
    font-family: 'Courier New', monospace;
    letter-spacing: 1px;
}

.hud-corner::after {
    content: '';
    position: absolute;
    width: 30px;
    height: 1px;
    background: rgba(0, 255, 255, 0.5);
}

/* 左上角 */
.hud-corner-tl {
    top: 20px; left: 20px;
    border-left: 1px solid rgba(255, 255, 255, 0.3);
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    clip-path: inset(100% 100% 0 0);
    animation: hud-reveal-tl 0.8s ease forwards 1s;
}
.hud-corner-tl::before { content: 'SYS_01';       top: -15px; left: 0; }
.hud-corner-tl::after  { top: 0; left: 0; }

/* 右上角 */
.hud-corner-tr {
    top: 20px; right: 20px;
    border-right: 1px solid rgba(255, 255, 255, 0.3);
    border-top: 1px solid rgba(255, 255, 255, 0.3);
    clip-path: inset(100% 0 0 100%);
    animation: hud-reveal-tr 0.8s ease forwards 1s;
}
.hud-corner-tr::before { content: 'NET_LINK';     top: -15px; right: 0; }
.hud-corner-tr::after  { top: 0; right: 0; }

/* 左下角 */
.hud-corner-bl {
    bottom: 20px; left: 20px;
    border-left: 1px solid rgba(255, 255, 255, 0.3);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    clip-path: inset(0 100% 100% 0);
    animation: hud-reveal-bl 0.8s ease forwards 1s;
}
.hud-corner-bl::before { content: 'DATA_STREAM';  bottom: -15px; left: 0; }
.hud-corner-bl::after  { bottom: 0; left: 0; }

/* 右下角 */
.hud-corner-br {
    bottom: 20px; right: 20px;
    border-right: 1px solid rgba(255, 255, 255, 0.3);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    clip-path: inset(100% 0 0 100%);
    animation: hud-reveal-br 0.8s ease forwards 1s;
}
.hud-corner-br::before { content: 'TERMINAL_02';  bottom: -15px; right: 0; }
.hud-corner-br::after  { bottom: 0; right: 0; }

/* ================================================================== */
/*  2. HUD装饰层 - 动画关键帧                                           */
/* ================================================================== */

@keyframes hud-reveal-tl {
    0%   { opacity: 1; clip-path: inset(0 100% 100% 0); }
    100% { opacity: 1; clip-path: inset(0 0 0 0); }
}
@keyframes hud-reveal-tr {
    0%   { opacity: 1; clip-path: inset(0 0 100% 100%); }
    100% { opacity: 1; clip-path: inset(0 0 0 0); }
}
@keyframes hud-reveal-bl {
    0%   { opacity: 1; clip-path: inset(100% 100% 0 0); }
    100% { opacity: 1; clip-path: inset(0 0 0 0); }
}
@keyframes hud-reveal-br {
    0%   { opacity: 1; clip-path: inset(100% 0 0 100%); }
    100% { opacity: 1; clip-path: inset(0 0 0 0); }
}


/* ================================================================== */
/*  3. 主容器 & 个人信息 - CSS属性                                       */
/* ================================================================== */

.container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 40px;
    position: relative;
    z-index: 1;
    font-family: Arial, sans-serif;
    width: 100%;
    height: 100%;
}

.left-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    transition: transform 0.3s ease;
    position: relative;
    z-index: 2;
}

.profile {
    display: flex;
    align-items: center;
    gap: 15px;
}

.profile-img-wrapper {
    position: relative;
    width: 100px;
    height: 100px;
}

.profile img {
    width: 100px;
    height: 100px;
    z-index: 9;
    object-fit: contain;
    filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.4));
    transition: all 0.3s ease;
    opacity: 0;
    transform: scale(0.75);
    animation: avatar-appear 0.6s ease forwards 3.6s;
}

/* 头像角落装饰线 */
.corner-line {
    position: absolute;
    width: 120px;
    height: 120px;
    pointer-events: none;
    z-index: 10;
}
.corner-line polyline {
    stroke-dasharray: 180;
    stroke-dashoffset: 180;
    animation: line-draw 1s ease-out forwards 3s;
}
.corner-line-tl {
    top: 0; left: 0;
    animation: slide-tl 0.5s ease forwards 3.5s;
}
.corner-line-br {
    bottom: 0; right: 0;
    animation: slide-br 0.5s ease forwards 3.5s;
}

/* 文字区域 */
.profile-text {
    color: rgb(2, 154, 255);
    z-index: 1;
    font-size: 32px;
    font-weight: bold;
    letter-spacing: 3px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
}

.profile-name {
    display: inline-block;
    z-index: 1;
    transform: translateX(-100%);
    clip-path: inset(0 100% 0 0);
    animation: name-slide-in 1.3s cubic-bezier(0.16, 1, 0.3, 1) forwards 5s;
}
.profile-name::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: rgb(201, 92, 252);
    margin-top: 3px;
}
.profile-name :deep(span) {
    display: inline-block;
    transition: all 0.3s ease;
    cursor: default;
}
.profile-name :deep(span:hover) {
    color: rgb(0, 166, 226);
    transform: translateY(-1px);
    text-shadow: 2px 2px 6px rgba(50, 200, 255, 0.6);
}

.profile-desc {
    font-size: 12px;
    color: #5c14e4;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    letter-spacing: normal;
    font-weight: normal;
    transition: all 0.3s ease;
}
.profile-desc:hover { color: #7a3aff; }

/* 响应式 */
@media (max-width: 900px) {
    .left-section { transform: translateX(-20px); }
}
@media (max-width: 768px) {
    .profile-text { letter-spacing: 1px; transform: translateX(-10px); }
    .profile      { flex-direction: column; align-items: flex-start; }
}

/* ================================================================== */
/*  3. 主容器 & 个人信息 - 动画关键帧                                     */
/* ================================================================== */

@keyframes avatar-appear {
    0%   { opacity: 0; transform: scale(0.75); }
    100% { opacity: 1; transform: scale(1); }
}

@keyframes line-draw {
    0%   { stroke-dashoffset: 180; }
    100% { stroke-dashoffset: 0; }
}

@keyframes slide-tl {
    0%   { top: 0;    left: 0; }
    100% { top: -10px; left: -10px; }
}

@keyframes slide-br {
    0%   { bottom: 0;    right: 0; }
    100% { bottom: -10px; right: -10px; }
}

@keyframes name-slide-in {
    0%   { z-index: 1; transform: translateX(-100%); clip-path: inset(0 0 0 100%); }
    100% { z-index: 1; transform: translateX(0);     clip-path: inset(0 0 0 0); }
}


/* ================================================================== */
/*  4. 背景网格线 - CSS属性                                              */
/* ================================================================== */

.grid-container {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
}

.grid-line {
    position: absolute;
    opacity: 0;
}

/* 横线 */
.h-grid-line {
    left: 0;
    width: 100%;
    height: 1px;
    z-index: 4;
    background: rgba(255, 255, 255, 0.03);
    transform-origin: center center;
    transform: scaleX(0);
    animation: grid-h-grow 2s ease forwards;
    overflow: visible;
}
.h-grid-line::after {
    content: '';
    position: absolute;
    top: 0; left: 50%;
    width: 5vw; height: 1px;
    background: rgba(45, 213, 255, 0.8);
    opacity: 0;
    animation: trail-h-right 2s ease forwards;
    animation-delay: inherit;
}
.h-grid-line::before {
    content: '';
    position: absolute;
    top: 0; right: 50%;
    width: 5vw; height: 1px;
    background: rgba(45, 213, 255, 0.8);
    opacity: 0;
    animation: trail-h-left 2s ease forwards;
    animation-delay: inherit;
}
.grid-center-h {
    top: 50%;
    animation-delay: 1.8s;
}

/* 竖线 */
.v-grid-line {
    top: 0;
    height: 100%;
    width: 1px;
    z-index: 4;
    background: rgba(255, 255, 255, 0.03);
    transform-origin: center center;
    transform: scaleY(0);
    animation: grid-v-grow 2s ease forwards;
    overflow: visible;
}
.v-grid-line::after {
    content: '';
    position: absolute;
    left: 0; top: 50%;
    width: 1px; height: 5vh;
    background: rgba(45, 213, 255, 0.8);
    opacity: 0;
    animation: trail-v-down 2s ease forwards;
    animation-delay: inherit;
}
.v-grid-line::before {
    content: '';
    position: absolute;
    left: 0; bottom: 50%;
    width: 1px; height: 5vh;
    background: rgba(45, 213, 255, 0.8);
    opacity: 0;
    animation: trail-v-up 2s ease forwards;
    animation-delay: inherit;
}
.grid-center-v {
    left: 50%;
    animation-delay: 1.8s;
}

/* ================================================================== */
/*  4. 背景网格线 - 动画关键帧                                            */
/* ================================================================== */

@keyframes grid-h-grow {
    0%   { opacity: 1; transform: scaleX(0); }
    100% { opacity: 1; transform: scaleX(1); }
}

@keyframes grid-v-grow {
    0%   { opacity: 1; transform: scaleY(0); }
    100% { opacity: 1; transform: scaleY(1); }
}

@keyframes trail-h-right {
    0%   { opacity: 1;   transform: translateX(0); }
    90%  { opacity: 0.5; transform: translateX(50vw); }
    100% { opacity: 0;   transform: translateX(50vw); }
}

@keyframes trail-h-left {
    0%   { opacity: 1;   transform: translateX(0); }
    90%  { opacity: 0.5; transform: translateX(-50vw); }
    100% { opacity: 0;   transform: translateX(-50vw); }
}

@keyframes trail-v-down {
    0%   { opacity: 1;   transform: translateY(0); }
    90%  { opacity: 0.5; transform: translateY(50vh); }
    100% { opacity: 0;   transform: translateY(50vh); }
}

@keyframes trail-v-up {
    0%   { opacity: 1;   transform: translateY(0); }
    90%  { opacity: 0.5; transform: translateY(-50vh); }
    100% { opacity: 0;   transform: translateY(-50vh); }
}

</style>
