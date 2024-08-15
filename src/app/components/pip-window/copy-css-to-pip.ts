/**
 * @description
 * this func will copy all css in head of native window to any other window (in this case is Pip window)
 *
 * @param {Window} pip Window
 */
export default function copyCssToPipWindow(pip: Window) {
  [...document.styleSheets].forEach((styleSheet) => {
    try {
      const cssRules = [...styleSheet.cssRules]
        .map((rule) => rule.cssText)
        .join('');
      const style = document.createElement('style');

      style.textContent = cssRules;
      /* if (styleSheet.href != null) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = styleSheet.href;
        pip.document.head.appendChild(link);
        return;
      } */
      pip.document.head.appendChild(style);
    } catch {
      const link = document.createElement('link');
      if (styleSheet.href == null) {
        return;
      }

      link.rel = 'stylesheet';
      link.type = styleSheet.type;
      link.media = styleSheet.media.toString();
      link.href = styleSheet.href;
      pip.document.head.appendChild(link);
    }
  });
}
