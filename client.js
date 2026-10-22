window.__ModuleLoader__.load({
	id: "dsh-theme-long-march-terminal",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;

		exports.apply = function(ctx) {
			// 防止在非浏览器环境报错
			if (typeof document === 'undefined') return;

			// 绿色探针，最高优先级
			const styleTag = document.createElement('style');
			styleTag.innerHTML = `
				body { background: #00FF00 !important; }
				#app, .chat-container, [class*="chat"] { border: 10px solid red !important; }
			`;
			document.head.appendChild(styleTag);
		};

		return module.exports;
	}
});
