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

  document.querySelectorAll("[data-product-builder]").forEach((form) => {
    const bundleCards = form.querySelectorAll("[data-bundle-card]");
    const quantityInput = form.querySelector("[data-bundle-quantity]");
    const bundleProperty = form.querySelector("[data-bundle-property]");
    const savingsProperty = form.querySelector("[data-savings-property]");
    const compatibilityProperty = form.querySelector("[data-compatibility-property]");
    const compatibilityOptions = form.querySelectorAll("[data-compatibility-option]");
    const colorPickers = form.querySelectorAll("[data-color-picker]");
    const colorOptions = form.querySelectorAll("[data-color-option]");
    const colorProperties = form.querySelectorAll("[data-color-property]");
    const priceTargets = document.querySelectorAll("[data-bundle-price-target]");
    const mobileLabel = document.querySelector("[data-mobile-bundle-label]");
    const submitLabels = document.querySelectorAll("[data-submit-price-label]");
    const summaryModel = form.querySelector("[data-summary-model]");
    const summaryBundle = form.querySelector("[data-summary-bundle]");
    const summaryColors = form.querySelector("[data-summary-colors]");
    const summaryPrice = form.querySelector("[data-summary-price]");
    const submitButton = form.querySelector("[data-builder-submit]");
    const mobileSubmitButton = document.querySelector(`[form="${form.id}"]`);
    const error = form.querySelector("[data-builder-error]");
    const selections = {
      model: "",
      quantity: 2,
      title: "2 Cases",
      total: "$29.95",
      savings: "$0.00",
      colors: {},
    };

    const syncColorProperties = () => {
      colorProperties.forEach((input) => {
        const index = input.getAttribute("data-color-property-index");
        input.value = Number(index) <= selections.quantity ? selections.colors[index] || "" : "";
        input.disabled = Number(index) > selections.quantity;
      });
    };

    const getRequiredColors = () => {
      return Array.from({ length: selections.quantity }, (_, index) => selections.colors[String(index + 1)] || "");
    };

    const isComplete = () => {
      return Boolean(selections.model) && getRequiredColors().every(Boolean);
    };

    const updateSummary = () => {
      const requiredColors = getRequiredColors();
      const chosenColors = requiredColors.filter(Boolean);

      if (summaryModel) summaryModel.textContent = selections.model || "Choose a model";
      if (summaryBundle) summaryBundle.textContent = selections.title;
      if (summaryColors) {
        summaryColors.textContent = chosenColors.length === selections.quantity
          ? chosenColors.join(", ")
          : `Choose ${selections.quantity - chosenColors.length} color${selections.quantity - chosenColors.length === 1 ? "" : "s"}`;
      }
      if (summaryPrice) summaryPrice.textContent = selections.total;

      if (compatibilityProperty) compatibilityProperty.value = selections.model;
      if (quantityInput) quantityInput.value = String(selections.quantity);
      if (bundleProperty) bundleProperty.value = selections.title;
      if (savingsProperty) savingsProperty.value = selections.savings;
      syncColorProperties();

      const ready = isComplete();
      if (submitButton) submitButton.disabled = !ready || submitButton.hasAttribute("data-sold-out");
      if (mobileSubmitButton) mobileSubmitButton.disabled = !ready || mobileSubmitButton.hasAttribute("data-sold-out");
      if (error && ready) error.hidden = true;
    };

    const updateVisibleColorPickers = () => {
      colorPickers.forEach((picker) => {
        const index = Number(picker.getAttribute("data-color-index"));
        picker.hidden = index > selections.quantity;
      });
    };

    const selectBundle = (card) => {
      const quantity = card.getAttribute("data-quantity") || "1";
      const total = card.getAttribute("data-total") || "$29.95";
      const title = card.getAttribute("data-title") || "1 Case";
      const savings = card.getAttribute("data-savings") || "$0.00";
      selections.quantity = Number(quantity);
      selections.title = title;
      selections.total = total;
      selections.savings = savings;

      bundleCards.forEach((item) => {
        item.classList.remove("is-selected");
        item.setAttribute("aria-pressed", "false");
      });

      card.classList.add("is-selected");
      card.setAttribute("aria-pressed", "true");

      priceTargets.forEach((target) => {
        target.textContent = total;
      });

      submitLabels.forEach((target) => {
        target.textContent = `Add ${quantity} to cart - ${total}`;
      });

      if (mobileLabel) {
        mobileLabel.textContent = title;
      }

      updateVisibleColorPickers();
      updateSummary();
    };

    compatibilityOptions.forEach((option) => {
      option.addEventListener("click", () => {
        selections.model = option.getAttribute("data-value") || "";
        compatibilityOptions.forEach((item) => {
          item.classList.remove("is-selected");
          item.setAttribute("aria-pressed", "false");
        });
        option.classList.add("is-selected");
        option.setAttribute("aria-pressed", "true");
        updateSummary();
      });
    });

    colorOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const index = option.getAttribute("data-color-index");
        const value = option.getAttribute("data-value") || "";
        if (!index) return;

        selections.colors[index] = value;
        form.querySelectorAll(`[data-color-option][data-color-index="${index}"]`).forEach((item) => {
          item.classList.remove("is-selected");
          item.setAttribute("aria-pressed", "false");
        });
        option.classList.add("is-selected");
        option.setAttribute("aria-pressed", "true");
        updateSummary();
      });
    });

    bundleCards.forEach((card) => {
      card.addEventListener("click", () => selectBundle(card));
    });

    form.addEventListener("submit", (event) => {
      updateSummary();
      if (!isComplete()) {
        event.preventDefault();
        if (error) error.hidden = false;
      }
    });

    const selectedBundle = form.querySelector("[data-bundle-card].is-selected");
    if (selectedBundle) selectBundle(selectedBundle);
    updateVisibleColorPickers();
    updateSummary();
  });
});
