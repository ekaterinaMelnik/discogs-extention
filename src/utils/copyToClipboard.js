function fallbackCopyToClipboard(text) {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  } catch (err) {
    console.error('Cannot copy to clipboard', err);
  }

  document.body.removeChild(textArea);
}

function copyToClipboard(content) {
  if (!navigator.clipboard) {
    fallbackCopyToClipboard(content);
    return;
  }

  navigator.clipboard.writeText(content);
}

export default copyToClipboard;
