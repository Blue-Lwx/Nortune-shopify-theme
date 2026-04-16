document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-menu-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      const nav = document.querySelector("[data-mobile-nav]");
      if (!nav) return;

      const isOpen = nav.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });

  document.querySelectorAll("[data-product-gallery]").forEach((gallery) => {
    const mainImage = gallery.querySelector("[data-gallery-main]");
    const thumbs = gallery.querySelectorAll("[data-gallery-thumb]");

    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        if (!mainImage) return;

        const nextSrc = thumb.getAttribute("data-image-src");
        const nextAlt = thumb.getAttribute("data-image-alt") || "";

        if (nextSrc) mainImage.setAttribute("src", nextSrc);
        mainImage.setAttribute("alt", nextAlt);

        thumbs.forEach((item) => item.classList.remove("is-active"));
        thumb.classList.add("is-active");
      });
    });
  });

  document.querySelectorAll("[data-bundle-form]").forEach((form) => {
    const bundleCards = form.querySelectorAll("[data-bundle-card]");
    const quantityInput = form.querySelector("[data-bundle-quantity]");
    const bundleProperty = form.querySelector("[data-bundle-property]");
    const savingsProperty = form.querySelector("[data-savings-property]");
    const priceTargets = document.querySelectorAll("[data-bundle-price-target]");
    const mobileLabel = document.querySelector("[data-mobile-bundle-label]");
    const submitLabels = document.querySelectorAll("[data-submit-price-label]");

    const selectBundle = (card) => {
      const quantity = card.getAttribute("data-quantity") || "1";
      const total = card.getAttribute("data-total") || "$29.95";
      const title = card.getAttribute("data-title") || "1 Case";
      const savings = card.getAttribute("data-savings") || "$0.00";

      bundleCards.forEach((item) => {
        item.classList.remove("is-selected");
        item.setAttribute("aria-pressed", "false");
      });

      card.classList.add("is-selected");
      card.setAttribute("aria-pressed", "true");

      if (quantityInput) quantityInput.value = quantity;
      if (bundleProperty) bundleProperty.value = title;
      if (savingsProperty) savingsProperty.value = savings;

      priceTargets.forEach((target) => {
        target.textContent = total;
      });

      submitLabels.forEach((target) => {
        target.textContent = `Add ${quantity} to cart - ${total}`;
      });

      if (mobileLabel) {
        mobileLabel.textContent = title;
      }
    };

    bundleCards.forEach((card) => {
      card.addEventListener("click", () => selectBundle(card));
    });
  });
});
