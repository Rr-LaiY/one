<template>
    <!-- ========== 载入动画 ========== -->
    <!-- 这个div覆盖整个屏幕，载入完成后隐藏 -->
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
    <!-- 固定在屏幕四角和中央的科幻风格装饰元素 -->
    <div class="hud-decorations">
        <!-- 四个角落的HUD框架 -->
        <div class="hud-corner hud-corner-tl"></div>  <!-- 左上角 -->
        <div class="hud-corner hud-corner-tr"></div>  <!-- 右上角 -->
        <div class="hud-corner hud-corner-bl"></div>  <!-- 左下角 -->
        <div class="hud-corner hud-corner-br"></div>  <!-- 右下角 -->
        
    </div>

    <!-- ========== 主内容容器 ========== -->
    <div class="container">
        <!-- ========== 左侧内容区域 ========== -->
        <div class="left-section" ref="leftSection">
            <!-- 个人信息卡片 -->
            <div class="profile">
                <!-- 头像区域 -->
                <div class="profile-img-wrapper">
                    <!-- 头像图片：Vue中用import导入+:src绑定 -->
                    <img :src="avatarImg" alt="LaiY">
                    <!-- SVG装饰折线：左上角 -->
                    <svg class="corner-line corner-line-tl" viewBox="0 0 120 120">
                        <polyline points="0,60 0,0 60,0" stroke="red" stroke-width="2" fill="none"/>
                    </svg>
                    <!-- SVG装饰折线：右下角 -->
                    <svg class="corner-line corner-line-br" viewBox="0 0 120 120">
                        <polyline points="60,120 120,120 120,60" stroke="red" stroke-width="2" fill="none"/>
                    </svg>
                </div>
                <!-- 文字信息区域 -->
                <div class="profile-text">
                    <!-- 名字（会被JS拆分为单个字符） -->
                    <span class="profile-name" ref="nameText">Rr_LaiY</span>
                    <!-- 个人描述 -->
                    <span class="profile-desc">我喜欢你！</span>
                </div>
            </div>
        </div>
        
    </div>


</template>
<script setup lang="ts">
    const isLoading = ref(true)  // 载入状态，初始为true

    // ========================================
    // Vue 3 导入：使用组合式API
    // ========================================
    import { ref, onMounted } from 'vue'
    // 导入头像图片（Vue中需要用import导入静态资源）
    import avatarImg from './assets/F_LaiY.png'

    // ========================================
    // 模板引用（Vue的ref代替原来的getElementById）
    // ========================================
    const nameText = ref<HTMLElement | null>(null)
    const leftSection = ref<HTMLElement | null>(null)

    // ========================================
    // 功能1：文字拆分为单个字符
    // ========================================
    // 将名字文字拆分为单个span元素，以便实现单字符悬停效果
    function splitTextToSpans() {
        // 获取名字元素（通过Vue的ref模板引用）
        const el = nameText.value
        if (!el) return  // 如果元素不存在，直接返回
        
        // 获取原始文字内容
        const text = el.textContent || ''
        // 清空原有内容
        el.innerHTML = ''
        
        // 遍历每个字符，包装在span标签中
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span')  // 创建span元素
            span.textContent = text[i] ?? null           // 设置字符内容
            el.appendChild(span)                         // 添加到容器中
        }
    }
    
    // ========================================
    // Vue生命周期：组件挂载后执行（相当于原来的页面加载）
    // ========================================
    // 【重要】在Vue中，<script setup>执行时DOM还没渲染，
    // 所以所有操作DOM的代码必须放在onMounted里
    onMounted(() => {
        // 设置页面标题
        document.title = '我去！这是我的网站O.o'

        // 模拟载入过程
        setTimeout(() => {
            isLoading.value = false  // 载入完成，隐藏载入屏幕
        }, 10000)  // 10秒后载入完成

        // 功能1：文字拆分
        splitTextToSpans()
    })

</script>


<style scoped>
        /* ========== 注意 ========== */
        /* 全局样式（*、html、body、body::before）已移至 src/assets/main.css */
        /* 这里只保留组件级别的scoped样式 */
        /*载入动画需要的元素*/
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
        .h-line
        {
            position: absolute;
            top: 50%;
            left: 0;
            z-index: 1;
            height: 0.02vw;
            background-color: rgb(255, 255, 255);
            transform: translateY(-50%);
        }
        .h-line {
            animation: h-line-anin 1.8s ease forwards; /* 应用载入动画 */
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
                box-anin 1.25s ease forwards 0.6s,  /* 0.6秒后开始，持续1.75秒 */
                box-shrink 2s ease-in-out forwards 3.2s ;
        }
        .loading-box-2 {
            position: absolute;
            width: 16vw;          /* 展开后的总宽度（到welcome左边缘的距离） */
            height: 4vw;
            background-color: #ffffff;
            border: 0.05vw solid white;
            box-sizing: border-box;
            z-index: 3;
            opacity: 0;
            
            right: calc(50% - 7vw - 1px);  
            top: 50%;
            transform: translateY(-50%);
            animation: box-shrink-2 1.5s ease forwards 4.5s;
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

            animation: text-anin 0.5s ease forwards 1.5s; /* 与loading-bar动画同步 */
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
            animation: bar-anin 1s ease-in forwards 2s
            
        }
        .loading-text-dark {
            white-space: nowrap;
            padding-left: 0.5vw;
            /* top: 50%;
            left: 50%; */
            /* transform: translate(-50%, -50%); */
            color: rgb(0, 0, 0);
            font-size: 0.8vw;                                                                       
            font-family: 'Courier New', monospace;
            letter-spacing: 0.1vw;
            text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.5);

            animation: text-anin 0.01s ease forwards 2s; /* 与loading-bar动画同步 */
        }  
        
        .welcome-text {
            position: absolute;
            color: rgb(255, 255, 255);
            font-size: 2vw;
            font-family: 'Courier New',monospace;
            letter-spacing: 0.5vw;
            opacity: 0;
            animation: welcome-appear 1s ease forwards 5s;
        }
        
        /* ========== 载入动画 ========== */
        @keyframes h-line-anin {
            0% { 
                left: -40%; /* 从屏幕左侧外开始 */
                right: 100%;  /* 初始宽度 */
            }
            30% { 
                left: 0%;   /* 移动到屏幕中间 */
                right: 50%;  /* 保持宽度 */
            }
            60% { 
                left: 0%;  /* 保持在中间 */
                right: 50%;  /* 保持宽度 */
            }
            100% {
                left: 50%;   /* 保持在中间 */
                right: 50%;  /* 保持宽度 */            
            }

        }

        /* @keyframes box-anin {
            0% {
                opacity: 1; 
                transform: scaleX(0) scaleY(0);
            }
            15% {
                opacity: 1; 
                transform: scaleX(0) scaleY(1);
            }
            30% {
                opacity: 1; 
                transform: scaleX(0) scaleY(1);
            }
            100% {
                opacity: 1; 
                transform: scaleX(1) scaleY(1);
            }
        } */

        @keyframes box-anin {
            0% {
                opacity: 1; 
                width:1px;
                
                padding: 0;
            }
            30% {
                opacity: 1; 
                width: 1px;
                
                padding: 0.8vw 0;
            }
            100% {
                opacity: 1; 
                width: 3vw;
                
                padding: 0.8vw 3.5vw;
            }
        }

        @keyframes blink-anin {
            0% {
                opacity: 0;
            }
            50% {
                opacity: 1;
            }
            100% {
                opacity: 0;
            }
        }

        /* box-shrink：全 padding 版本，你自己试试 */
        @keyframes box-shrink{
            /* 框缩成竖线 */
            0% {
                opacity: 1; 
                width: 3vw;
                
                padding: 0.8vw 3.5vw;
                transform: translateX(0);


            }
            19.9%{
                opacity: 1; 
                width: 1px;
                padding: 0.8vw 0;
                transform: translateX(7vw);

            }
            20% {
                opacity: 1; 
                width: 1px;
                height: 1.6vw;
                padding: 0;
                transform: translateX(7vw);
            }
            /* 竖线变高 */
            40% {
                opacity: 1; 
                width: 1px;
                height: 4vw;
                padding: 0;
                transform: translateX(7vw);
                
            }
            /* 停留 */
            99% {
                opacity: 1; 
                width: 1px;
                height: 4vw;
                padding: 0;
                transform: translateX(7vw);
            }
            
            100% {
                opacity: 0; 
                width: 1px;
                padding: 0;
                transform: translateX(7vw);
            }
        }
        @keyframes box-shrink-2 {
            0% {
                opacity: 1; 
                clip-path: inset(0 0 0 calc(100%));
            }
            40% {
                opacity: 1; 
                clip-path: inset(0 0 0 0);

            }   
            50% {
                opacity: 1; 
                clip-path: inset(0 0 0 0);

            }
            99%{
                opacity: 1;
                clip-path: inset(0 calc(100% - 1px) 0 0);
            }
            100% {
                opacity: 1; 
                clip-path: inset(0 calc(100% - 1px) 0 0);
            }
        }
        @keyframes welcome-appear{
            0% {
                opacity: 1;
            }
            100% {
                opacity: 1;
                
            }
        }

        @keyframes text-anin {
            0% {
                letter-spacing: 0vw;
            }
                
            100% {
                letter-spacing: 0.1vw;

            }
        }

        @keyframes bar-anin {
            0% {
                width: 0;
                opacity: 1;
                
            }
            1% {
                width: 0;
                opacity: 1;

                
            }
            100% {
                width: 100%;
                opacity: 1;
            }
        }
        
        /* ========== HUD装饰容器 ========== */
        /* 固定在屏幕上的科幻HUD界面装饰层 */
        .hud-decorations {
            position: fixed;            /* 固定定位 */
            inset: 0;                   /* 占满整个视口 */
            pointer-events: none;       /* 不响应鼠标事件 */
        }

        /* ========== HUD角落框架 - 基础样式 ========== */
        /* 四个角落的HUD框架共用样式 */
        .hud-corner {
            position: absolute;         /* 绝对定位 */
            width: 150px;               /* 宽度150像素 */
            height: 150px;              /* 高度150像素 */
        }

        /* HUD角落框架的文字标签（使用before伪元素） */
        .hud-corner::before {
            position: absolute;                         /* 绝对定位 */
            font-size: 9px;                             /* 小字体 */
            color: rgba(255, 255, 255, 0.4);            /* 半透明白色 */
            font-family: 'Courier New', monospace;      /* 等宽字体，科技感 */
            letter-spacing: 1px;                        /* 字符间距 */
        }

        /* HUD角落框架的装饰线（使用after伪元素） */
        .hud-corner::after {
            content: '';                                /* 创建伪元素 */
            position: absolute;                         /* 绝对定位 */
            width: 30px;                                /* 宽度30像素 */
            height: 1px;                                /* 高度1像素（细线） */
            background: rgba(0, 255, 255, 0.5);         /* 半透明青色 */
        }

        /* ========== 左上角HUD框架 ========== */
        .hud-corner-tl {
            top: 20px;                                      /* 距顶部20像素 */
            left: 20px;                                     /* 距左侧20像素 */
            border-left: 1px solid rgba(255, 255, 255, 0.3);  /* 左边框 */
            border-top: 1px solid rgba(255, 255, 255, 0.3);   /* 上边框 */
        }

        .hud-corner-tl::before {
            content: 'SYS_01';          /* 显示文字"SYS_01" */
            top: -15px;                 /* 位于框架上方 */
            left: 0;                    /* 左对齐 */
        }

        .hud-corner-tl::after {
            top: 0;                     /* 位于顶部 */
            left: 0;                    /* 位于左侧 */
        }

        /* ========== 右上角HUD框架 ========== */
        .hud-corner-tr {
            top: 20px;                                      /* 距顶部20像素 */
            right: 20px;                                    /* 距右侧20像素 */
            border-right: 1px solid rgba(255, 255, 255, 0.3); /* 右边框 */
            border-top: 1px solid rgba(255, 255, 255, 0.3);   /* 上边框 */
        }

        .hud-corner-tr::before {
            content: 'NET_LINK';        /* 显示文字"NET_LINK" */
            top: -15px;                 /* 位于框架上方 */
            right: 0;                   /* 右对齐 */
        }

        .hud-corner-tr::after {
            top: 0;                     /* 位于顶部 */
            right: 0;                   /* 位于右侧 */
        }

        /* ========== 左下角HUD框架 ========== */
        .hud-corner-bl {
            bottom: 20px;                                   /* 距底部20像素 */
            left: 20px;                                     /* 距左侧20像素 */
            border-left: 1px solid rgba(255, 255, 255, 0.3);  /* 左边框 */
            border-bottom: 1px solid rgba(255, 255, 255, 0.3); /* 下边框 */
        }

        .hud-corner-bl::before {
            content: 'DATA_STREAM';     /* 显示文字"DATA_STREAM" */
            bottom: -15px;              /* 位于框架下方 */
            left: 0;                    /* 左对齐 */
        }

        .hud-corner-bl::after {
            bottom: 0;                  /* 位于底部 */
            left: 0;                    /* 位于左侧 */
        }

        /* ========== 右下角HUD框架 ========== */
        .hud-corner-br {
            bottom: 20px;                                   /* 距底部20像素 */
            right: 20px;                                    /* 距右侧20像素 */
            border-right: 1px solid rgba(255, 255, 255, 0.3); /* 右边框 */
            border-bottom: 1px solid rgba(255, 255, 255, 0.3); /* 下边框 */
        }

        .hud-corner-br::before {
            content: 'TERMINAL_02';     /* 显示文字"TERMINAL_02" */
            bottom: -15px;              /* 位于框架下方 */
            right: 0;                   /* 右对齐 */
        }

        .hud-corner-br::after {
            bottom: 0;                  /* 位于底部 */
            right: 0;                   /* 位于右侧 */
        }

        /* ========== 主容器 ========== */
        /* 页面主要内容容器，使用弹性布局 */
        .container {
            display: flex;                  /* 弹性布局 */
            justify-content: space-between; /* 两端对齐 */
            align-items: flex-start;        /* 顶部对齐 */
            padding: 40px;                  /* 内边距40像素 */
            position: relative;             /* 相对定位 */
            z-index: 1;                     /* 层级1，在背景装饰上方 */
            font-family: Arial, sans-serif; /* 字体 */
            width: 100%;                    /* 宽度100% */
            height: 100%;                   /* 高度100% */
        }

        /* ========== 左侧内容区域 ========== */
        /* 包含个人信息的左侧区域 */
        .left-section {
            display: flex;                  /* 弹性布局 */
            flex-direction: column;         /* 纵向排列 */
            gap: 20px;                      /* 子元素间距20像素 */
            transition: transform 0.3s ease; /* 过渡动画 */
            position: relative;             /* 相对定位 */
            z-index: 2;                     /* 层级2，在装饰面板上方 */
        }

        /* 响应式：中等屏幕 */
        @media (max-width: 900px) {
            .left-section {
                transform: translateX(-20px); /* 向左移动20像素 */
            }
        }

        /* ========== 个人信息区域 ========== */
        /* 个人信息容器：包含头像和文字 */
        .profile {
            display: flex;              /* 弹性布局 */
            align-items: center;        /* 垂直居中对齐 */
            gap: 15px;                  /* 子元素间距15像素 */
        }

        /* 头像包装器 */
        .profile-img-wrapper {
            position: relative;         /* 相对定位，为SVG装饰提供定位上下文 */
            width: 100px;               /* 宽度100像素 */
            height: 100px;              /* 高度100像素 */
        }

        /* 头像图片 */
        .profile img {
            width: 100px;               /* 宽度100像素 */
            height: 100px;              /* 高度100像素 */
            object-fit: contain;        /* 保持图片比例 */
            filter: drop-shadow(4px 4px 8px rgba(0, 0, 0, 0.4)); /* 投影效果 */
            transition: all 0.3s ease;  /* 过渡动画 */
        }

        /* ========== 头像角落装饰线 ========== */
        /* SVG折线装饰基础样式 */
        .corner-line {
            position: absolute;         /* 绝对定位 */
            width: 120px;               /* 宽度120像素 */
            height: 120px;              /* 高度120像素 */
            pointer-events: none;       /* 不响应鼠标事件 */
            z-index: 10;                /* 层级10，在头像上方 */
        }

        /* 左上角折线 */
        .corner-line-tl {
            top: -10px;                 /* 向上偏移10像素 */
            left: -10px;                /* 向左偏移10像素 */
        }

        /* 右下角折线 */
        .corner-line-br {
            bottom: -10px;              /* 向下偏移10像素 */
            right: -10px;               /* 向右偏移10像素 */
        }

        /* ========== 个人信息文字区域 ========== */
        /* 文字容器 */
        .profile-text {
            color: rgb(2, 154, 255);            /* 蓝色文字 */
            font-size: 32px;                    /* 字体大小 */
            font-weight: bold;                  /* 粗体 */
            letter-spacing: 3px;                /* 字符间距 */
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3); /* 文字阴影 */
            display: flex;                      /* 弹性布局 */
            flex-direction: column;             /* 纵向排列 */
            gap: 5px;                           /* 子元素间距5像素 */
        }

        /* 名字容器 */
        .profile-name {
            display: inline-block;      /* 行内块元素 */
        }

        /* 名字中的每个字符（由JS动态生成） */
        /* 【Vue注意】scoped样式无法直接选中JS动态生成的子元素，需要用:deep() */
        .profile-name :deep(span) {
            display: inline-block;      /* 行内块元素，支持transform */
            transition: all 0.3s ease;  /* 过渡动画 */
            cursor: default;            /* 默认光标 */
        }

        /* 单个字符悬停效果 */
        .profile-name :deep(span:hover) {
            color: rgb(0, 166, 226);                        /* 颜色变化 */
            transform: translateY(-1px);                    /* 向上移动1像素 */
            text-shadow: 2px 2px 6px rgba(50, 200, 255, 0.6); /* 增强阴影 */
        }

        /* 名字下方的装饰线 */
        .profile-name::after {
            content: '';                        /* 创建伪元素 */
            display: block;                     /* 块级元素 */
            width: 100%;                        /* 宽度100% */
            height: 1px;                        /* 高度1像素 */
            background-color: rgb(201, 92, 252); /* 紫色 */
            margin-top: 3px;                    /* 上边距3像素 */
        }

        /* 个人描述文字 */
        .profile-desc {
            font-size: 12px;                            /* 小字体 */
            color: #5c14e4;                             /* 紫色 */
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* 文字阴影 */
            letter-spacing: normal;                     /* 正常字符间距 */
            font-weight: normal;                        /* 正常字重 */
            transition: all 0.3s ease;                  /* 过渡动画 */
        }

        /* 描述文字悬停效果 */
        .profile-desc:hover {
            color: #7a3aff;             /* 颜色变亮 */
        }

        /* ========== 响应式：小屏幕 ========== */
        @media (max-width: 768px) {
            .profile-text {
                letter-spacing: 1px;            /* 减小字符间距 */
                transform: translateX(-10px);   /* 向左移动 */
            }
            .profile {
                flex-direction: column;         /* 纵向排列 */
                align-items: flex-start;        /* 左对齐 */
            }
        }
</style>
