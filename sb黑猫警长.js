// ==UserScript==
// @name         fuck-黑猫警长100
// @namespace    http://tampermonkey.net/
// @version      1.0.1
// @description  屏蔽一切[畜生科技](黑猫警长100)
// @author       黑牛警长100
// @include     *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 定义一个键来存储用户的选择
    const storageKey = 'siteAlertDismissed';

    // 检测函数，检查页面内容、标题或链接是否包含特定文本或URL
    const checkPage = () => {
        // 检查sessionStorage以查看用户是否已选择继续浏览
        if (sessionStorage.getItem(storageKey) === 'true') {
            return; // 如果用户已选择继续浏览，则不显示提示
        }

        // 检查页面标题中是否包含"Hmjz100"
        const titleContainsText = /Hmjz100/i.test(document.title);

        // 检查页面源码中是否包含"Hmjz100"
        const pageContainsText = /Hmjz100/i.test(document.body.textContent);

        // 检查链接中是否包含"https://addbeflashlite.epizy.com"或"https://github.com/hmjz100"
        const linksContainSpecificUrls = Array.from(document.links).some(link =>
            link.href.includes('https://addbeflashlite.epizy.com') || link.href.includes('https://github.com/hmjz100')
        );

        // 如果页面标题、内容或链接满足条件，显示模态对话框
        if (titleContainsText || pageContainsText || linksContainSpecificUrls) {
            showModal();
        }
    };

    // 检测用户颜色模式设置
    const userColorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    // 设置CSS变量
    const setCSSVariables = () => {
        const style = document.createElement('style');
        document.head.appendChild(style);
        if (userColorScheme === 'dark') {
            style.sheet.insertRule(`:root {
                --board-bg-color: #252d38;
                --text-color: #c4c6c9;
                --scrollbar-color: #687582;
                --highlight-bg-color: #303030;
            }`, style.sheet.cssRules.length);
        } else {
            style.sheet.insertRule(`:root {
                --board-bg-color: #fff;
                --text-color: #3c4858;
                --scrollbar-color: #c4c6c9;
                --highlight-bg-color: #f6f8fa;
            }`, style.sheet.cssRules.length);
        }
    };

    setCSSVariables();

    // 创建模态对话框的HTML和CSS
    const modalHTML = `
        <div id="siteAlertModal" align="center" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 20px; background: var(--board-bg-color); border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.5); z-index: 1000; display: none; color: var(--text-color);">
            <p>检测到[畜生科技](黑猫警长100)，您想要继续赤石还是退出？</p><br>
            <button id="continueBtn" class="button" style="margin-right: 26px;">继续赤石</button>
            <button id="exitBtn" class="button">退出</button>
        </div>
        <div id="modalOverlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.3); z-index: 999; display: none;"></div>
    `;
    
      // 将模态对话框添加到页面中
      document.body.insertAdjacentHTML('beforeend', modalHTML);    

    // 添加按钮样式
    const buttonStyle = document.createElement('style');
    document.head.appendChild(buttonStyle);
    buttonStyle.sheet.insertRule(`
        .button {
          display: inline-block;
          padding: 0.4rem 1.2rem;
          border-radius: 50px;
          background-color: var(--board-bg-color);
          text-align: center;
          text-decoration: none;
          color: var(--text-color);
          border: 2px solid var(--scrollbar-color);
          transition: background-color 0.3s, border-color 0.3s;
          cursor: pointer;
          font-size: 15px;
        }
    `, buttonStyle.sheet.cssRules.length);
    buttonStyle.sheet.insertRule(`
        .button:hover {
          background-color: var(--body-bg-color);
          color: var(--text-color);
          border-color: var(--highlight-bg-color);
        }
    `, buttonStyle.sheet.cssRules.length);

      // 获取模态对话框和按钮的元素
      const modal = document.getElementById('siteAlertModal');
      const overlay = document.getElementById('modalOverlay');
      const continueBtn = document.getElementById('continueBtn');
      const exitBtn = document.getElementById('exitBtn');
  
    // 显示模态对话框的函数
    const showModal = () => {
        // 确保模态对话框的HTML已经被插入到页面中
        if (!document.getElementById('siteAlertModal')) {
            // 插入模态对话框的HTML和CSS
            // ... (插入HTML和CSS的代码)
        }

        document.getElementById('siteAlertModal').style.display = 'block';
        document.getElementById('modalOverlay').style.display = 'block';
    };

    // 隐藏模态对话框的函数
    const hideModal = () => {
        document.getElementById('siteAlertModal').style.display = 'none';
        document.getElementById('modalOverlay').style.display = 'none';
    };

    // 继续浏览按钮的事件监听器
    document.getElementById('continueBtn').addEventListener('click', () => {
        hideModal();
        // 存储用户的选择，表示他们不想再看到提示
        sessionStorage.setItem(storageKey, 'true');
    });

    // 退出按钮的事件监听器
    document.getElementById('exitBtn').addEventListener('click', () => {
        window.close();
    });

    // 运行主检测函数
    checkPage();

    // 监听页面变化，以便动态内容加载后也能检测
    const observer = new MutationObserver(mutations => {
        checkPage();
    });

    const config = { childList: true, subtree: true };
    observer.observe(document.body, config);
})();
