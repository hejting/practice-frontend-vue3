export function MP(ak) {
  return new Promise((resolve, reject) => {
    window.init = function () {
      resolve(window.BMap)
    }
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://api.map.baidu.com/api?v=3.0&ak=${ak}&callback=init`
    script.onerror = reject
    document.head.appendChild(script)
  })
}