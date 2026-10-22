// 客户端模块：通过官方 ModuleLoader 挂载，全量硬编码注入，杜绝外部路径解析崩溃。
window.__ModuleLoader__.load({
  id: 'dsh-theme-long-march-terminal',
  factory() {
    return {
      inject: ['styles'],
      apply(ctx) {
        const css = `
/* 1. 纯 CSS 注入底层背景，带红黑网格兜底 */
body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -999;
    background-color: #050505;
    background-image:
        url('./assets/bg.jpg'), /* 若图片缺失，自动降级为下方网格 */
        repeating-linear-gradient(0deg, rgba(255,0,0,0.05) 0 1px, transparent 1px 40px),
        repeating-linear-gradient(90deg, rgba(255,0,0,0.05) 0 1px, transparent 1px 40px);
    background-size: cover, auto, auto;
    background-position: center;
    background-repeat: no-repeat, repeat, repeat;
    pointer-events: none;
}

/* 2. 全局清洗与防白块 */
:root { color-scheme: dark !important; }
* { border-radius: 0 !important; box-shadow: none !important; font-family: 'Courier New', Courier, monospace !important; }
body, .chat-container, .sidebar, [class*="container"], [class*="layout"] { background: transparent !important; }
input, select, button { background-color: #050505 !important; color: #E0E0E0 !important; border: 1px solid rgba(255, 0, 0, 0.4) !important; }
input[type="checkbox"] { accent-color: #FF0000 !important; }

/* 3. 顶部与侧栏 */
header, [class*="header"], [class*="nav"] { background: rgba(0, 0, 0, 0.8) !important; border-bottom: 1px solid #FF0000 !important; }
[class*="sidebar"] [class*="active"], .workspace-item.active { background: rgba(255, 0, 0, 0.1) !important; box-shadow: inset 2px 0 0 #FF0000 !important; color: #FFFFFF !important; }

/* 4. 聊天终端化 */
[class*="user"] .message-bubble, .message-user { background: rgba(0, 0, 0, 0.8) !important; border: none !important; border-left: 2px solid #FF0000 !important; color: #E0E0E0 !important; }
[class*="assistant"] .markdown-body, .message-assistant { color: #FF3333 !important; text-shadow: 0 0 2px rgba(255,0,0,0.3) !important; }

/* 5. 终端化输入框与按钮 */
[class*="input-box"], textarea { background: rgba(0, 0, 0, 0.9) !important; border: 1px solid #FF0000 !important; color: #E0E0E0 !important; }
[class*="input-box"]::before { content: '[CMD] >_'; color: #FF0000; position: absolute; left: 10px; top: 12px; font-size: 12px; z-index: 10; }
textarea { padding-left: 70px !important; }
button[type="submit"], [class*="send"] { background: #FF0000 !important; color: #000 !important; border: none !important; }
        `;
        
        // 安全地获取并注入 styles 服务
        const stylesService = ctx.styles || (ctx.get && ctx.get('styles'));
        if (stylesService && typeof stylesService.insert === 'function') {
            stylesService.insert(css);
        }
      },
    };
  },
});
