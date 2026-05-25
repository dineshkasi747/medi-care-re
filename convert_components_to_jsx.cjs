const fs = require('fs');
const path = require('path');

// Reusable tag sanitizer logic from convert_html_to_jsx.cjs
function sanitizeTagAttributes(tagMarkup) {
  const tagMatch = tagMarkup.match(/^<([a-zA-Z0-9:-]+)(\s[\s\S]*?)?(\/?)>$/);
  if (!tagMatch) return tagMarkup;

  const tagName = tagMatch[1];
  let attrsStr = tagMatch[2] || '';
  const selfClose = tagMatch[3] || '';

  if (!attrsStr.trim()) {
    if (['img', 'input', 'br', 'hr'].includes(tagName.toLowerCase())) {
      return `<${tagName} />`;
    }
    return tagMarkup;
  }

  const attrRegex = /([@:a-zA-Z0-9._-]+)(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|(?:\{([^}]*)\})|([^\s>]+)))?/g;
  let match;
  const newAttrs = [];

  while ((match = attrRegex.exec(attrsStr)) !== null) {
    let name = match[1];
    let val = match[2] !== undefined ? match[2] : (match[3] !== undefined ? match[3] : (match[4] !== undefined ? match[4] : match[5]));

    let newName = name;
    let isStyle = false;

    if (newName.startsWith('@')) {
      newName = 'data-vue-on-' + newName.slice(1);
    } else if (newName.startsWith(':')) {
      newName = 'data-vue-' + newName.slice(1);
    } else if (newName.startsWith('v-')) {
      newName = 'data-vue-' + newName;
    }

    newName = newName.replace(/[:.]/g, '-');

    if (newName === 'class') {
      newName = 'className';
    } else if (newName === 'for') {
      newName = 'htmlFor';
    } else if (newName === 'tabindex') {
      newName = 'tabIndex';
    } else if (newName === 'autocomplete') {
      newName = 'autoComplete';
    } else if (newName === 'readonly') {
      newName = 'readOnly';
    } else if (newName === 'maxlength') {
      newName = 'maxLength';
    } else if (newName === 'novalidate') {
      newName = 'noValidate';
    } else if (newName === 'ref') {
      if (val && !val.startsWith('{')) {
        newName = 'data-vue-ref';
      }
    }

    const svgAttributes = {
      'viewbox': 'viewBox',
      'fill-rule': 'fillRule',
      'fill-opacity': 'fillOpacity',
      'clip-rule': 'clipRule',
      'xml-space': 'xmlSpace',
      'stroke-width': 'strokeWidth',
      'stroke-linecap': 'strokeLinecap',
      'stroke-linejoin': 'strokeLinejoin',
      'stroke-miterlimit': 'strokeMiterlimit',
      'stroke-dasharray': 'strokeDasharray',
      'stroke-dashoffset': 'strokeDashoffset',
      'stroke-opacity': 'strokeOpacity',
      'font-size': 'fontSize',
      'font-weight': 'fontWeight',
      'letter-spacing': 'letterSpacing',
      'text-anchor': 'textAnchor',
      'clip-path': 'clipPath',
      'xlink-href': 'xlinkHref',
      'xmlns-xlink': 'xmlnsXlink'
    };
    if (svgAttributes[newName.toLowerCase()]) {
      newName = svgAttributes[newName.toLowerCase()];
    }

    if (newName === 'style' && val && !val.trim().startsWith('{')) {
      const styles = val.split(';').map(s => s.trim()).filter(s => s.length > 0);
      const styleObj = {};
      styles.forEach(style => {
        const parts = style.split(':');
        const k = parts[0].trim();
        const v = parts.slice(1).join(':').trim();
        if (k && v) {
          let property = k.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
          if (property.startsWith('webkit') || property.startsWith('ms') || property.startsWith('moz')) {
            property = property.charAt(0).toUpperCase() + property.slice(1);
          }
          styleObj[property] = v;
        }
      });
      val = `{${JSON.stringify(styleObj)}}`;
      isStyle = true;
    }

    if ((tagName.toLowerCase() === 'input' || tagName.toLowerCase() === 'textarea') && newName === 'value') {
      newName = 'defaultValue';
    }

    if (val !== undefined) {
      if (isStyle) {
        newAttrs.push(`${newName}=${val}`);
      } else {
        const escapedVal = val.replace(/"/g, '&quot;');
        newAttrs.push(`${newName}="${escapedVal}"`);
      }
    } else {
      newAttrs.push(newName);
    }
  }

  const isSelfClosing = selfClose || ['img', 'input', 'br', 'hr'].includes(tagName.toLowerCase());
  return `<${tagName} ${newAttrs.join(' ')}${isSelfClosing ? ' /' : ''}>`;
}

function closeListItems(html) {
  return html.replace(/(<li\s+id="menu-item-[0-9]+"[^>]*?><a[^>]*?>[\s\S]*?<\/a>)(?=\s*(?:<li|<\/ul>))/gi, '$1</li>');
}

function processHtmlToJsx(html) {
  let cleaned = html;
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');
  
  const entities = {
    '&raquo;': '»',
    '&laquo;': '«',
    '&ndash;': '–',
    '&mdash;': '—',
    '&hellip;': '…',
    '&middot;': '·',
    '&bull;': '•',
    '&rsquo;': '’',
    '&lsquo;': '‘',
    '&rdquo;': '”',
    '&ldquo;': '“',
    '&amp;': '&',
    '&nbsp;': ' ',
    '&#8211;': '–',
    '&#038;': '&',
    '&#8217;': '’',
    '&#8216;': '‘',
    '&#8220;': '“',
    '&#8221;': '”'
  };
  for (const [key, value] of Object.entries(entities)) {
    cleaned = cleaned.replace(new RegExp(key, 'g'), value);
  }

  cleaned = cleaned.replace(/\{\{([\s\S]*?)\}\}/g, '{"{{$1}}"}');
  
  // Close any unclosed sub-menu list items safely
  cleaned = closeListItems(cleaned);

  cleaned = cleaned.replace(/<[a-zA-Z0-9:-]+(?:\s[\s\S]*?)?\/?>/g, sanitizeTagAttributes);
  return cleaned;
}

// Convert Header component
const headerPath = path.join(__dirname, 'src', 'components', 'Header.jsx');
if (fs.existsSync(headerPath)) {
  const headerContent = fs.readFileSync(headerPath, 'utf8');
  // Find headerHtml string block
  const match = headerContent.match(/const headerHtml = `([\s\S]*?)`;/);
  if (match) {
    const rawHtml = match[1];
    const jsxMarkup = processHtmlToJsx(rawHtml);
    
    const newHeaderCode = `import React, { useEffect } from 'react';

export default function Header() {
  useEffect(() => {
    // Robust React Mobile Hamburger Menu Toggle handler
    const handleToggle = (e) => {
      const toggler = e.target.closest('.elementskit-menu-toggler');
      if (toggler) {
        const menuContainer = document.querySelector('.elementskit-menu-container');
        const overlay = document.querySelector('.elementskit-menu-overlay');
        if (menuContainer) {
          menuContainer.classList.toggle('active');
          menuContainer.classList.toggle('elementskit-menu-show');
        }
        if (overlay) {
          overlay.classList.toggle('active');
        }
      }
    };
    
    // Close menu when a navigation item is clicked
    const handleNavItemClick = (e) => {
      const navLink = e.target.closest('.ekit-menu-nav-link, .dropdown-item');
      if (navLink) {
        const menuContainer = document.querySelector('.elementskit-menu-container');
        const overlay = document.querySelector('.elementskit-menu-overlay');
        if (menuContainer && menuContainer.classList.contains('active')) {
          menuContainer.classList.remove('active', 'elementskit-menu-show');
        }
        if (overlay && overlay.classList.contains('active')) {
          overlay.classList.remove('active');
        }
      }
    };

    document.addEventListener('click', handleToggle);
    document.addEventListener('click', handleNavItemClick);
    return () => {
      document.removeEventListener('click', handleToggle);
      document.removeEventListener('click', handleNavItemClick);
    };
  }, []);

  return (
    <div className="ekit-template-content-markup ekit-template-content-header ekit-template-content-theme-support">
      ${jsxMarkup}
    </div>
  );
}
`;
    fs.writeFileSync(headerPath, newHeaderCode, 'utf8');
    console.log('Successfully compiled Header.jsx to NATIVE JSX!');
  }
}

// Convert Footer component
const footerPath = path.join(__dirname, 'src', 'components', 'Footer.jsx');
if (fs.existsSync(footerPath)) {
  const footerContent = fs.readFileSync(footerPath, 'utf8');
  // Find footerHtml string block
  const match = footerContent.match(/const footerHtml = `([\s\S]*?)`;/);
  if (match) {
    const rawHtml = match[1];
    const jsxMarkup = processHtmlToJsx(rawHtml);
    
    const newFooterCode = `import React from 'react';

export default function Footer() {
  return (
    <div className="ekit-template-content-markup ekit-template-content-footer ekit-template-content-theme-support">
      ${jsxMarkup}
    </div>
  );
}
`;
    fs.writeFileSync(footerPath, newFooterCode, 'utf8');
    console.log('Successfully compiled Footer.jsx to NATIVE JSX!');
  }
}
