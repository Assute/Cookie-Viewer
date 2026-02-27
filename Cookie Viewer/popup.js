const cookieTextEl = document.getElementById('cookieText');
const statusEl = document.getElementById('status');
const copyBtn = document.getElementById('copyBtn');
const downloadBtn = document.getElementById('downloadBtn');

function setStatus(text) {
  statusEl.textContent = text || '';
}

// 把 cookies 数组拼成“a=1; b=2; c=3”这种字符串
function buildCookieHeaderValue(cookies) {
  // 只要 name=value，不要其他属性
  return cookies.map(c => `${c.name}=${c.value}`).join('; ');
}

// 打开弹窗时自动加载当前标签页 Cookie
document.addEventListener('DOMContentLoaded', () => {
  setStatus('正在获取当前标签页和 Cookie...');

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || tabs.length === 0) {
      cookieTextEl.value = '';
      setStatus('未找到当前标签页。');
      return;
    }

    const tab = tabs[0];
    const url = tab.url;

    if (!url || !url.startsWith('http')) {
      cookieTextEl.value = '';
      setStatus('当前页面不是普通网页（可能是扩展、Chrome 设置页面等）。');
      return;
    }

    chrome.cookies.getAll({ url: url }, (cookies) => {
      if (chrome.runtime.lastError) {
        cookieTextEl.value = '';
        setStatus('获取 Cookie 出错：' + chrome.runtime.lastError.message);
        return;
      }

      if (!cookies || cookies.length === 0) {
        cookieTextEl.value = '';
        setStatus('当前站点没有可用的 Cookie。');
        return;
      }

      // 这里就是你要的 “cookie: ” 后面那一整段
      const headerValue = buildCookieHeaderValue(cookies);

      // 只展示后面这一部分，不带 "cookie: "
      cookieTextEl.value = headerValue;

      setStatus(`已生成 cookie 头部内容，共 ${cookies.length} 条 Cookie。`);
    });
  });
});

// 复制到剪贴板
copyBtn.addEventListener('click', () => {
  const text = cookieTextEl.value.trim();
  if (!text) {
    setStatus('没有可复制的内容。');
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    setStatus('已复制到剪贴板。');
  }).catch(err => {
    setStatus('复制失败：' + err);
  });
});

// 下载为 cookie.txt
downloadBtn.addEventListener('click', () => {
  const text = cookieTextEl.value.trim();
  if (!text) {
    setStatus('没有可下载的内容。');
    return;
  }

  // 这里下载的内容就是那串 “a=1; b=2; ...”
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const blobUrl = URL.createObjectURL(blob);

  chrome.downloads.download(
    {
      url: blobUrl,
      filename: 'cookie.txt',  // 配合你设置的下载目录使用
      saveAs: false
    },
    (downloadId) => {
      if (chrome.runtime.lastError) {
        setStatus('下载失败：' + chrome.runtime.lastError.message);
      } else {
        setStatus('已触发下载：cookie.txt，请在浏览器下载目录查看。');
      }
    }
  );
});
