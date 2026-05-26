const fs = require('fs');
const path = require('path');

const PAGES = [
  {
    fileName: 'home.html',
    componentName: 'Home',
    startLine: 827,
    endLine: 2590
  },
  {
    fileName: 'about.html',
    componentName: 'AboutUs',
    startLine: 210,
    endLine: 1095
  },
  {
    fileName: 'services.html',
    componentName: 'Services',
    startLine: 208,
    endLine: 1091
  },
  {
    fileName: 'cardiology-clinic.html',
    componentName: 'CardiologyClinic',
    startLine: 204,
    endLine: 772
  },
  {
    fileName: 'pathology-clinic.html',
    componentName: 'PathologyClinic',
    startLine: 204,
    endLine: 772
  },
  {
    fileName: 'laboratory-analysis.html',
    componentName: 'LaboratoryAnalysis',
    startLine: 204,
    endLine: 772
  },
  {
    fileName: 'pediatric-clinic.html',
    componentName: 'PediatricClinic',
    startLine: 204,
    endLine: 772
  },
  {
    fileName: 'cardiac-clinic.html',
    componentName: 'CardiacClinic',
    startLine: 204,
    endLine: 772
  },
  {
    fileName: 'neurology-clinic.html',
    componentName: 'NeurologyClinic',
    startLine: 204,
    endLine: 772
  },
  {
    fileName: 'contactus.html',
    componentName: 'ContactUs',
    startLine: 205,
    endLine: 377
  },
  {
    fileName: 'book-appointement.html',
    componentName: 'BookAppointment',
    startLine: 217,
    endLine: 1334
  }
];

const PAGES_DIR = path.join(__dirname, 'src', 'pages');

if (!fs.existsSync(PAGES_DIR)) {
  fs.mkdirSync(PAGES_DIR, { recursive: true });
}

PAGES.forEach(page => {
  const filePath = path.join(__dirname, page.fileName);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${page.fileName}`);
    return;
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const lines = fileContent.split(/\r?\n/);
  const extractedLines = lines.slice(page.startLine - 1, page.endLine);
  let html = extractedLines.join('\n');

  // 1. Remove HTML Comments to prevent compile errors
  html = html.replace(/<!--[\s\S]*?-->/g, '');

  // 2. Unescape common HTML entities so JSX handles them as plain text
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
    html = html.replace(new RegExp(key, 'g'), value);
  }

  // 3. Escape Vue double curly brace interpolations "{{ ... }}" in text nodes to valid JSX string expressions {"{{ ... }}"}
  html = html.replace(/\{\{([\s\S]*?)\}\}/g, '{"{{$1}}"}');

  // 4. Tag-by-Tag Attribute Sanitization & React conversion
  function sanitizeTagAttributes(tagMarkup) {
    const tagMatch = tagMarkup.match(/^<([a-zA-Z0-9:-]+)(\s[\s\S]*?)?(\/?)>$/);
    if (!tagMatch) return tagMarkup;

    const tagName = tagMatch[1];
    let attrsStr = tagMatch[2] || '';
    const selfClose = tagMatch[3] || '';

    // Handle closing tag matching / tag without attributes
    if (!attrsStr.trim()) {
      if (['img', 'input', 'br', 'hr'].includes(tagName.toLowerCase())) {
        return `<${tagName} />`;
      }
      return tagMarkup;
    }

    // Match attributes inside tag
    // Match either name="value" or name='value' or name={value} or name
    const attrRegex = /([@:a-zA-Z0-9._-]+)(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|(?:\{([^}]*)\})|([^\s>]+)))?/g;
    let match;
    const newAttrs = [];

    while ((match = attrRegex.exec(attrsStr)) !== null) {
      let name = match[1];
      let val = match[2] !== undefined ? match[2] : (match[3] !== undefined ? match[3] : (match[4] !== undefined ? match[4] : match[5]));

      let newName = name;
      let isStyle = false;

      // Convert Vue shortcuts/handlers
      if (newName.startsWith('@')) {
        newName = 'data-vue-on-' + newName.slice(1);
      } else if (newName.startsWith(':')) {
        newName = 'data-vue-' + newName.slice(1);
      } else if (newName.startsWith('v-')) {
        newName = 'data-vue-' + newName;
      }

      // Sanitize colons, periods, or special characters in the name to conform to valid XML/JSX names
      newName = newName.replace(/[:.]/g, '-');

      // Map standard React attributes
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
        // Renaming Vue string ref to data-vue-ref to prevent React 19 warnings/errors
        if (val && !val.startsWith('{')) {
          newName = 'data-vue-ref';
        }
      }

      // SVG attribute camelCasing
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

      // Inline styles conversion
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

      // Value conversion for uncontrolled components
      if ((tagName.toLowerCase() === 'input' || tagName.toLowerCase() === 'textarea') && newName === 'value') {
        newName = 'defaultValue';
      }

      if (val !== undefined) {
        if (isStyle) {
          newAttrs.push(`${newName}=${val}`);
        } else {
          // Escape quotes in attributes
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

  // Parse HTML tags and process opening tags to sanitize them
  html = html.replace(/<[a-zA-Z0-9:-]+(?:\s[\s\S]*?)?\/?>/g, sanitizeTagAttributes);

  // 9. Write the clean React Component with native JSX rendering
  const componentCode = `import React from 'react';

export default function ${page.componentName}() {
  return (
    <>
      ${html}
    </>
  );
}
`;

  const componentPath = path.join(PAGES_DIR, `${page.componentName}.jsx`);
  fs.writeFileSync(componentPath, componentCode, 'utf8');
  console.log(`Successfully generated NATIVE JSX Component: ${page.componentName}.jsx`);
});
console.log('All React Page Components compiled to clean native JSX successfully!');
