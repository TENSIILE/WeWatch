class ActionHotKey {
  constructor(history) {
    ActionHotKey.history = history
  }

  static jumpToHome() {
    this.history.push('/home')
  }

  static jumpToVideo() {
    this.history.push('/video')
  }

  static jumpToChat() {
    this.history.push('/chat')
  }

  static jumpToSearch() {
    this.history.push('/search')
  }

  static jumpToSettings() {
    this.history.push('/settings')
  }
}

export class SystemHotkey extends ActionHotKey {
  constructor(history) {
    super(history)
    document.addEventListener('keyup', this.keydown)
  }

  keydown(e) {
    if (e.ctrlKey && e.shiftKey && e.code === 'Digit1') {
      ActionHotKey.jumpToHome()
    }

    if (e.ctrlKey && e.shiftKey && e.code === 'Digit2') {
      ActionHotKey.jumpToVideo()
    }

    if (e.ctrlKey && e.shiftKey && e.code === 'Digit3') {
      ActionHotKey.jumpToChat()
    }

    if (e.ctrlKey && e.shiftKey && e.code === 'Digit4') {
      ActionHotKey.jumpToSearch()
    }

    if (e.ctrlKey && e.shiftKey && e.code === 'Digit5') {
      ActionHotKey.jumpToSettings()
    }
  }
}
