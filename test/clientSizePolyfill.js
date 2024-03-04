Object.defineProperties(window.HTMLElement.prototype, {
  clientHeight: {
    get() {
      if (this === document.body)
        return (
          window.innerHeight ||
          document.clientHeight ||
          document.body.clientHeight ||
          0
        )
      let style = window.getComputedStyle(this)
      if (!style.height && this.firstChild)
        style = window.getComputedStyle(this.firstChild)
      return parseFloat(style.height) || 0
    },
  },
  clientWidth: {
    get() {
      if (this === document.body)
        return (
          window.innerWidth ||
          document.clientWidth ||
          document.body.clientWidth ||
          0
        )
      let style = window.getComputedStyle(this)
      if (!style.width && this.firstChild)
        style = window.getComputedStyle(this.firstChild)
      return parseFloat(style.width) || 0
    },
  },
})
