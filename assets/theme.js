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

        thumbs.forEach((item) => {
          item.classList.remove("is-active");
          item.removeAttribute("aria-current");
        });
        thumb.classList.add("is-active");
        thumb.setAttribute("aria-current", "true");
      });
    });
  });

  document.querySelectorAll("[data-product-builder]").forEach((form) => {
    const bundleCards = form.querySelectorAll("[data-bundle-card]");
    const quantityInput = form.querySelector("[data-bundle-quantity]");
    const variantIdInput = form.querySelector("[data-variant-id-input]");
    const bundleProperty = form.querySelector("[data-bundle-property]");
    const bundlePriceProperty = form.querySelector("[data-bundle-price-property]");
    const savingsProperty = form.querySelector("[data-savings-property]");
    const colorOptions = form.querySelectorAll("[data-color-option]");
    const colorProperty = form.querySelector("[data-color-property]");
    const modelOptions = form.querySelectorAll("[data-model-option]");
    const modelProperty = form.querySelector("[data-model-property]");
    const variantsJson = form.querySelector("[data-product-variants-json]");
    const galleryMain = document.querySelector("[data-gallery-main]");
    const galleryThumbs = document.querySelectorAll("[data-gallery-thumb]");
    const priceTarget = document.querySelector("[data-bundle-price-target]");
    const nowTarget = document.querySelector("[data-bundle-now]");
    const wasTarget = document.querySelector("[data-bundle-was]");
    const saveTarget = document.querySelector("[data-bundle-save]");
    const mobilePrice = document.querySelector("[data-mobile-price]");
    const mobileLabel = document.querySelector("[data-mobile-bundle-label]");
    const submitLabels = document.querySelectorAll("[data-submit-price-label]");
    const summaryBundle = form.querySelector("[data-summary-bundle]");
    const summaryColor = form.querySelector("[data-summary-color]");
    const summaryModel = form.querySelector("[data-summary-model]");
    const summaryPrice = form.querySelector("[data-summary-price]");
    const summarySavings = form.querySelector("[data-summary-savings]");
    const submitButton = form.querySelector("[data-builder-submit]");
    const mobileSubmitButton = document.querySelector(`[form="${form.id}"]`);
    const error = form.querySelector("[data-builder-error]");
    let variants = [];

    if (variantsJson) {
      try {
        variants = JSON.parse(variantsJson.textContent || "[]");
      } catch (parseError) {
        variants = [];
      }
    }

    const selections = {
      quantity: 2,
      title: "Buy 2",
      total: "$48.99",
      now: "$48.99",
      was: "$67.98",
      savings: "$18.99",
      saveLabel: "Save $18.99",
      color: "",
      colorOptionValue: "",
      model: "",
      modelOptionValue: "",
      variantId: variantIdInput ? variantIdInput.value : "",
    };

    const findSelectedVariant = () => {
      if (!selections.colorOptionValue || !selections.modelOptionValue) return null;

      return variants.find((variant) => {
        const options = Array.isArray(variant.options) ? variant.options : [];

        return (
          variant.available &&
          (
            (
              variant.option1 === selections.colorOptionValue ||
              options.includes(selections.colorOptionValue)
            ) &&
            (
              variant.option2 === selections.modelOptionValue ||
              options.includes(selections.modelOptionValue)
            )
          )
        );
      }) || null;
    };

    const syncSelectedVariant = () => {
      const variant = findSelectedVariant();
      selections.variantId = variant ? String(variant.id) : "";
    };

    const isComplete = () => {
      return Boolean(selections.variantId && selections.color && selections.model);
    };

    const updatePriceDisplay = () => {
      if (nowTarget) nowTarget.textContent = selections.now;
      if (wasTarget) {
        wasTarget.textContent = selections.was;
        wasTarget.hidden = !selections.was;
      }
      if (saveTarget) {
        saveTarget.textContent = selections.saveLabel;
        saveTarget.hidden = !selections.saveLabel;
      }
      if (priceTarget) {
        priceTarget.classList.toggle("has-savings", Boolean(selections.saveLabel));
      }
      if (mobilePrice) mobilePrice.textContent = selections.total;
    };

    const updateSummary = () => {
      syncSelectedVariant();

      if (summaryBundle) summaryBundle.textContent = selections.title;
      if (summaryColor) summaryColor.textContent = selections.color || "Choose a color";
      if (summaryModel) summaryModel.textContent = selections.model || "Choose a model";
      if (summaryPrice) summaryPrice.textContent = selections.total;
      if (summarySavings) summarySavings.textContent = selections.saveLabel || "No discount";

      if (variantIdInput) variantIdInput.value = selections.variantId;
      if (quantityInput) quantityInput.value = String(selections.quantity);
      if (bundleProperty) bundleProperty.value = selections.title;
      if (bundlePriceProperty) bundlePriceProperty.value = selections.total;
      if (savingsProperty) savingsProperty.value = selections.savings;
      if (colorProperty) colorProperty.value = selections.color;
      if (modelProperty) modelProperty.value = selections.model;
      updatePriceDisplay();

      const ready = isComplete();
      if (submitButton) submitButton.disabled = !ready || submitButton.hasAttribute("data-sold-out");
      if (mobileSubmitButton) mobileSubmitButton.disabled = !ready || mobileSubmitButton.hasAttribute("data-sold-out");
      if (error && ready) error.hidden = true;
    };

    const selectBundle = (card) => {
      const quantity = card.getAttribute("data-quantity") || "1";
      const total = card.getAttribute("data-total") || "$33.99";
      const title = card.getAttribute("data-title") || "1 Case";
      const savings = card.getAttribute("data-savings") || "$0.00";
      const now = card.getAttribute("data-now") || total;
      const was = card.getAttribute("data-was") || "";
      const saveLabel = card.getAttribute("data-save-label") || "";
      selections.quantity = Number(quantity);
      selections.title = title;
      selections.total = total;
      selections.savings = savings;
      selections.now = now;
      selections.was = was;
      selections.saveLabel = saveLabel;

      bundleCards.forEach((item) => {
        item.classList.remove("is-selected");
        item.setAttribute("aria-pressed", "false");
      });

      card.classList.add("is-selected");
      card.setAttribute("aria-pressed", "true");

      submitLabels.forEach((target) => {
        target.textContent = `Add ${quantity} to cart - ${total}`;
      });

      if (mobileLabel) {
        mobileLabel.textContent = title;
      }

      updateSummary();
    };

    colorOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const value = option.getAttribute("data-value") || "";
        const optionValue = option.getAttribute("data-option-value") || "";
        if (!value || !optionValue || option.disabled) return;

        selections.color = value;
        selections.colorOptionValue = optionValue;
        colorOptions.forEach((item) => {
          item.classList.remove("is-selected");
          item.setAttribute("aria-pressed", "false");
        });
        option.classList.add("is-selected");
        option.setAttribute("aria-pressed", "true");

        const colorImage = option.getAttribute("data-color-image");
        if (galleryMain && colorImage) {
          galleryMain.setAttribute("src", colorImage);
          galleryMain.setAttribute("alt", `${value} AirPods case`);
          galleryThumbs.forEach((thumb) => {
            const isActive = thumb.getAttribute("data-image-src") === colorImage;
            thumb.classList.toggle("is-active", isActive);
            if (isActive) {
              thumb.setAttribute("aria-current", "true");
            } else {
              thumb.removeAttribute("aria-current");
            }
          });
        }

        updateSummary();
      });
    });

    modelOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const value = option.getAttribute("data-value") || "";
        const optionValue = option.getAttribute("data-option-value") || "";
        if (!value || !optionValue || option.disabled) return;

        selections.model = value;
        selections.modelOptionValue = optionValue;
        modelOptions.forEach((item) => {
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
    updateSummary();
  });
});
