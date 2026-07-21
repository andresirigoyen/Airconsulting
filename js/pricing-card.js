/**
 * Reusable pricing card — light DOM so data-i18n / currency stay compatible.
 *
 * Usage:
 * <pricing-card
 *   title="Landing page"
 *   title-key="price.landingTitle"
 *   price="desde ~USD 600"
 *   price-key="mkt.priceFrom600"
 *   desc="…"
 *   desc-key="price.landingDesc"
 *   href="/landing-pages"
 *   cta="Cotizar este servicio"
 *   cta-key="services.ctaQuote"
 *   cta-href="/?service=landing#contact"
 * ></pricing-card>
 */
class PricingCard extends HTMLElement {
  static get observedAttributes() {
    return [
      'title', 'title-key',
      'price', 'price-key',
      'desc', 'desc-key',
      'href',
      'cta', 'cta-key', 'cta-href',
    ];
  }

  connectedCallback() {
    this.render();
    this._ready = true;
  }

  attributeChangedCallback() {
    if (!this._ready) return;
    this.render();
  }

  render() {
    const title = this.getAttribute('title') || '';
    const titleKey = this.getAttribute('title-key') || '';
    const price = this.getAttribute('price') || '';
    const priceKey = this.getAttribute('price-key') || '';
    const desc = this.getAttribute('desc') || '';
    const descKey = this.getAttribute('desc-key') || '';
    const href = this.getAttribute('href') || '';
    const cta = this.getAttribute('cta') || '';
    const ctaKey = this.getAttribute('cta-key') || '';
    const ctaHref = this.getAttribute('cta-href') || '';

    this.classList.add('pricing-card');

    const titleAttrs = titleKey ? ` data-i18n="${escapeAttr(titleKey)}"` : '';
    const priceAttrs = priceKey ? ` data-i18n="${escapeAttr(priceKey)}"` : '';
    const descAttrs = descKey ? ` data-i18n="${escapeAttr(descKey)}"` : '';

    const titleInner = href
      ? `<a href="${escapeAttr(href)}"${titleAttrs}>${escapeHtml(title)}</a>`
      : `<span${titleAttrs}>${escapeHtml(title)}</span>`;

    let ctaHtml = '';
    if (ctaHref && (cta || ctaKey)) {
      const ctaAttrs = ctaKey ? ` data-i18n="${escapeAttr(ctaKey)}"` : '';
      ctaHtml = `<a href="${escapeAttr(ctaHref)}" class="project-link"><span${ctaAttrs}>${escapeHtml(cta)}</span></a>`;
    }

    this.innerHTML = `
      <h3 class="pricing-card__title">${titleInner}</h3>
      <p class="pricing-card__price price-range"${priceAttrs}>${escapeHtml(price)}</p>
      <p class="pricing-card__desc"${descAttrs}>${escapeHtml(desc)}</p>
      ${ctaHtml}
    `;
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  return String(str).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

if (!customElements.get('pricing-card')) {
  customElements.define('pricing-card', PricingCard);
}
