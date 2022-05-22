import { useCallback, useEffect } from 'react'

const paragraphJustify = [
  'justifyLeft',
  'justifyCenter',
  'justifyRight',
  'justifyFull',
]

const removeButtonParagraphActive = (command) => {
  if (paragraphJustify.includes(command)) {
    document.querySelector('#justifyLeft').classList.remove('active')
    document.querySelector('#justifyCenter').classList.remove('active')
    document.querySelector('#justifyRight').classList.remove('active')
    document.querySelector('#justifyFull').classList.remove('active')
  }
}

const toggleAllButtonEditor = () => {
  const buttons = document.querySelectorAll('.btn-editor')
  buttons.forEach((button) =>
    button.classList.toggle('active', document.queryCommandState(button.id))
  )
}

const toggleExecButtonEditor = (event, command) => {
  removeButtonParagraphActive(command)
  event.preventDefault()

  document.execCommand(command)
  document
    .querySelector(`#${command}`)
    .classList.toggle('active', document.queryCommandState(command))
}

const useKeyPress = () => {
  const handleKeyShortcut = useCallback((event) => {
    if (!event.altKey && !event.metaKey && !event.shiftKey) {
      if (event.ctrlKey && event.which === 66) {
        toggleExecButtonEditor(event, 'bold')
      } else if (event.ctrlKey && event.which === 73) {
        toggleExecButtonEditor(event, 'italic')
      } else if (event.ctrlKey && event.which === 85) {
        toggleExecButtonEditor(event, 'underline')
      } else if (event.ctrlKey && event.which === 68) {
        toggleExecButtonEditor(event, 'strikeThrough')
      } else if (event.ctrlKey && event.which === 76) {
        toggleExecButtonEditor(event, 'justifyLeft')
      } else if (event.ctrlKey && event.which === 69) {
        toggleExecButtonEditor(event, 'justifyCenter')
      } else if (event.ctrlKey && event.which === 82) {
        toggleExecButtonEditor(event, 'justifyRight')
      } else if (event.ctrlKey && event.which === 74) {
        toggleExecButtonEditor(event, 'justifyFull')
      } else if (event.which === 9) {
        event.preventDefault()
        document.execCommand('insertText', false, '    ')
      }
    }
  }, [])

  useEffect(() => {
    document
      .querySelector('.editor-content')
      .addEventListener('keydown', handleKeyShortcut)

    return () =>
      document
        .querySelector('.editor-content')
        .removeEventListener('keydown', handleKeyShortcut)
  }, [handleKeyShortcut])
}

export { toggleAllButtonEditor, toggleExecButtonEditor, useKeyPress }
