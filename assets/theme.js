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
    const itemCards = form.querySelectorAll("[data-bundle-item]");
    const itemModelOptions = form.querySelectorAll("[data-item-model-option]");
    const itemColorOptions = form.querySelectorAll("[data-item-color-option]");
    const itemSummaries = form.querySelectorAll("[data-item-summary]");
    const bundleLines = form.querySelector("[data-bundle-lines]");
    const bundleLinesList = form.querySelector("[data-bundle-lines-list]");
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
    let submitAttempted = false;

    if (variantsJson) {
      try {
        variants = JSON.parse(variantsJson.textContent || "[]");
      } catch (parseError) {
        variants = [];
      }
    }

    const createItemSelection = () => ({
      color: "",
      colorOptionValue: "",
      colorImage: "",
      model: "",
      modelOptionValue: "",
      variant: null,
    });

    const selections = {
      quantity: 2,
      title: "Buy 2",
      total: "$48.99",
      now: "$48.99",
      was: "$67.98",
      savings: "$18.99",
      saveLabel: "Save $18.99",
      variantId: variantIdInput ? variantIdInput.value : "",
      items: [createItemSelection(), createItemSelection(), createItemSelection()],
    };

    const isManagedLimitedInventory = (variant) => {
      return Boolean(
        variant &&
        variant.inventory_management &&
        variant.inventory_policy !== "continue" &&
        typeof variant.inventory_quantity === "number"
      );
    };

    const variantMatches = (variant, colorOptionValue, modelOptionValue) => {
      const options = Array.isArray(variant.options) ? variant.options : [];

      return (
        (
          variant.option1 === colorOptionValue ||
          options.includes(colorOptionValue)
        ) &&
        (
          variant.option2 === modelOptionValue ||
          options.includes(modelOptionValue)
        )
      );
    };

    const findSelectedVariant = (item) => {
      if (!item.colorOptionValue || !item.modelOptionValue) return null;

      return variants.find((variant) => {
        return variant.available && variantMatches(variant, item.colorOptionValue, item.modelOptionValue);
      }) || null;
    };

    const getActiveItems = () => {
      return selections.items.slice(0, selections.quantity);
    };

    const syncSelectedVariants = () => {
      getActiveItems().forEach((item) => {
        item.variant = findSelectedVariant(item);
      });

      const firstVariant = getActiveItems().find((item) => item.variant);
      selections.variantId = firstVariant ? String(firstVariant.variant.id) : "";
    };

    const getValidationMessage = () => {
      const activeItems = getActiveItems();
      const variantQuantities = new Map();

      for (let index = 0; index < activeItems.length; index += 1) {
        const item = activeItems[index];
        const itemNumber = index + 1;

        if (!item.model) return `Please choose a model for item ${itemNumber}.`;
        if (!item.color) return `Please choose a color for item ${itemNumber}.`;
        if (!item.variant) return `This variant is sold out for item ${itemNumber}.`;

        const variantId = String(item.variant.id);
        variantQuantities.set(variantId, (variantQuantities.get(variantId) || 0) + 1);
      }

      for (const [variantId, quantity] of variantQuantities.entries()) {
        const variant = variants.find((item) => String(item.id) === variantId);
        if (isManagedLimitedInventory(variant) && quantity > variant.inventory_quantity) {
          return "This variant is sold out.";
        }
      }

      return "";
    };

    const isComplete = () => !getValidationMessage();

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

    const updateGallery = (item) => {
      if (!galleryMain || !item.colorImage) return;

      galleryMain.setAttribute("src", item.colorImage);
      galleryMain.setAttribute("alt", `${item.color} AirPods case`);
      galleryThumbs.forEach((thumb) => {
        const isActive = thumb.getAttribute("data-image-src") === item.colorImage;
        thumb.classList.toggle("is-active", isActive);
        if (isActive) {
          thumb.setAttribute("aria-current", "true");
        } else {
          thumb.removeAttribute("aria-current");
        }
      });
    };

    const updateItemVisibility = () => {
      itemCards.forEach((card) => {
        const index = Number(card.getAttribute("data-item-index") || "0");
        card.hidden = index > selections.quantity;
      });
    };

    const updateOptionAvailability = () => {
      itemModelOptions.forEach((option) => {
        const index = Number(option.getAttribute("data-item-index") || "1") - 1;
        const item = selections.items[index];
        const modelValue = option.getAttribute("data-option-value") || "";
        const hasAvailableVariant = variants.some((variant) => {
          if (!variant.available) return false;
          if (!item.colorOptionValue) return variant.options.includes(modelValue) || variant.option2 === modelValue;
          return variantMatches(variant, item.colorOptionValue, modelValue);
        });

        option.disabled = !hasAvailableVariant;
        option.classList.toggle("is-disabled", !hasAvailableVariant);
      });

      itemColorOptions.forEach((option) => {
        const index = Number(option.getAttribute("data-item-index") || "1") - 1;
        const item = selections.items[index];
        const colorValue = option.getAttribute("data-option-value") || "";
        const hasAvailableVariant = variants.some((variant) => {
          if (!variant.available) return false;
          if (!item.modelOptionValue) return variant.options.includes(colorValue) || variant.option1 === colorValue;
          return variantMatches(variant, colorValue, item.modelOptionValue);
        });

        option.disabled = !hasAvailableVariant;
        option.classList.toggle("is-disabled", !hasAvailableVariant);
      });
    };

    const getCartItems = () => {
      const grouped = new Map();

      getActiveItems().forEach((item, index) => {
        if (!item.variant) return;

        const id = String(item.variant.id);
        const existing = grouped.get(id) || {
          id: Number(item.variant.id),
          quantity: 0,
          labels: [],
        };

        existing.quantity += 1;
        existing.labels.push(`Item ${index + 1}: ${item.color} / ${item.model}`);
        grouped.set(id, existing);
      });

      return Array.from(grouped.values()).map((item) => ({
        id: item.id,
        quantity: item.quantity,
        properties: {
          Bundle: selections.title,
          "Displayed bundle price": selections.total,
          "Displayed bundle savings": selections.savings,
          "Selected cases": item.labels.join("; "),
        },
      }));
    };

    const updateSelectedLines = () => {
      if (!bundleLines || !bundleLinesList) return;

      const activeItems = getActiveItems();
      const hasSelections = activeItems.some((item) => item.color || item.model);
      bundleLines.hidden = !hasSelections;
      bundleLinesList.innerHTML = "";

      activeItems.forEach((item, index) => {
        const line = document.createElement("li");
        line.textContent = `Item ${index + 1}: ${item.model || "Choose model"} / ${item.color || "Choose color"}`;
        bundleLinesList.appendChild(line);
      });
    };

    const updateSummary = () => {
      syncSelectedVariants();
      updateItemVisibility();
      updateOptionAvailability();

      if (summaryBundle) summaryBundle.textContent = selections.title;
      if (summaryColor) {
        summaryColor.textContent = getActiveItems().map((item, index) => {
          return `Item ${index + 1}: ${item.color || "Choose color"}`;
        }).join(" | ");
      }
      if (summaryModel) {
        summaryModel.textContent = getActiveItems().map((item, index) => {
          return `Item ${index + 1}: ${item.model || "Choose model"}`;
        }).join(" | ");
      }
      if (summaryPrice) summaryPrice.textContent = selections.total;
      if (summarySavings) summarySavings.textContent = selections.saveLabel || "No discount";
      itemSummaries.forEach((summary) => {
        const index = Number(summary.getAttribute("data-item-summary") || "1") - 1;
        const item = selections.items[index];
        if (!item) return;
        summary.textContent = `${item.model || "Choose model"} / ${item.color || "Choose color"}`;
      });

      if (variantIdInput) variantIdInput.value = selections.variantId;
      if (quantityInput) quantityInput.value = String(selections.quantity);
      if (bundleProperty) bundleProperty.value = selections.title;
      if (bundlePriceProperty) bundlePriceProperty.value = selections.total;
      if (savingsProperty) savingsProperty.value = selections.savings;
      updatePriceDisplay();
      updateSelectedLines();

      const ready = isComplete();
      if (submitButton) submitButton.disabled = submitButton.hasAttribute("data-sold-out");
      if (mobileSubmitButton) mobileSubmitButton.disabled = mobileSubmitButton.hasAttribute("data-sold-out");
      if (error) {
        const message = getValidationMessage();
        error.textContent = message || "";
        error.hidden = !message || !submitAttempted;
      }
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

    itemColorOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const index = Number(option.getAttribute("data-item-index") || "1") - 1;
        const item = selections.items[index];
        const value = option.getAttribute("data-value") || "";
        const optionValue = option.getAttribute("data-option-value") || "";
        const colorImage = option.getAttribute("data-color-image") || "";
        if (!item || !value || !optionValue || option.disabled) return;

        item.color = value;
        item.colorOptionValue = optionValue;
        item.colorImage = colorImage;
        form.querySelectorAll(`[data-item-color-option][data-item-index="${index + 1}"]`).forEach((swatch) => {
          swatch.classList.remove("is-selected");
          swatch.setAttribute("aria-pressed", "false");
        });
        option.classList.add("is-selected");
        option.setAttribute("aria-pressed", "true");
        updateGallery(item);
        updateSummary();
      });
    });

    itemModelOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const index = Number(option.getAttribute("data-item-index") || "1") - 1;
        const item = selections.items[index];
        const value = option.getAttribute("data-value") || "";
        const optionValue = option.getAttribute("data-option-value") || "";
        if (!item || !value || !optionValue || option.disabled) return;

        item.model = value;
        item.modelOptionValue = optionValue;
        form.querySelectorAll(`[data-item-model-option][data-item-index="${index + 1}"]`).forEach((button) => {
          button.classList.remove("is-selected");
          button.setAttribute("aria-pressed", "false");
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
      submitAttempted = true;
      updateSummary();
      if (!isComplete()) {
        event.preventDefault();
        if (error) {
          error.textContent = getValidationMessage();
          error.hidden = false;
        }
        return;
      }

      event.preventDefault();
      const cartItems = getCartItems();
      if (!cartItems.length) return;

      if (submitButton) submitButton.disabled = true;
      if (mobileSubmitButton) mobileSubmitButton.disabled = true;

      fetch("/cart/add.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ items: cartItems }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((payload) => {
              throw new Error(payload.description || payload.message || "Unable to add this bundle to cart.");
            });
          }
          return response.json();
        })
        .then(() => {
          window.location.href = "/cart";
        })
        .catch((cartError) => {
          if (error) {
            error.textContent = cartError.message;
            error.hidden = false;
          }
          if (submitButton) submitButton.disabled = false;
          if (mobileSubmitButton) mobileSubmitButton.disabled = false;
        });
    });

    const selectedBundle = form.querySelector("[data-bundle-card].is-selected");
    if (selectedBundle) selectBundle(selectedBundle);
    updateSummary();
  });

  document.querySelectorAll("[data-cart-form]").forEach((form) => {
    const subtotalTarget = form.querySelector("[data-cart-subtotal]");
    const shippingRow = form.querySelector("[data-cart-shipping]");
    const shippingLabel = form.querySelector("[data-cart-shipping-label]");
    const shippingValue = form.querySelector("[data-cart-shipping-value]");
    const shippingHelper = form.querySelector("[data-cart-shipping-helper]");
    const status = form.querySelector("[data-cart-status]");
    const updateButton = form.querySelector('button[name="update"]');
    const checkoutButton = form.querySelector('button[name="checkout"]');
    const threshold = Number(shippingRow?.getAttribute("data-shipping-threshold") || "3998");
    const underThresholdPrice = shippingRow?.getAttribute("data-under-threshold-price") || "$1.99";
    let quantityTimer = null;

    const formatMoney = (cents) => {
      const currency = window.Shopify?.currency?.active || "USD";

      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
      }).format((Number(cents) || 0) / 100);
    };

    const setStatus = (message) => {
      if (!status) return;
      status.textContent = message;
    };

    const setLoading = (isLoading) => {
      form.classList.toggle("is-updating", isLoading);
      if (checkoutButton) checkoutButton.disabled = isLoading;
    };

    const updateHeaderCartCount = (itemCount) => {
      const cartLink = document.querySelector(".site-header__cart");
      if (!cartLink) return;

      let count = cartLink.querySelector(".cart-count");
      if (itemCount > 0) {
        if (!count) {
          count = document.createElement("span");
          count.className = "cart-count";
          cartLink.appendChild(count);
        }
        count.textContent = String(itemCount);
      } else if (count) {
        count.remove();
      }
    };

    const updateShippingDisplay = (totalPrice) => {
      if (!shippingLabel || !shippingValue || !shippingHelper) return;

      if (totalPrice < threshold) {
        shippingLabel.textContent = "Standard Shipping";
        shippingValue.textContent = underThresholdPrice;
        shippingHelper.textContent = "Orders under $39.98 ship for $1.99. Final shipping options are confirmed at checkout.";
      } else {
        shippingLabel.textContent = "Shipping";
        shippingValue.textContent = "Calculated at checkout";
        shippingHelper.textContent = "Eligible shipping rates are confirmed by Shopify at checkout.";
      }
    };

    const updateCartDom = (cart) => {
      if (subtotalTarget) subtotalTarget.textContent = formatMoney(cart.total_price);
      updateShippingDisplay(cart.total_price);
      updateHeaderCartCount(cart.item_count);

      const returnedItems = new Map(cart.items.map((item) => [item.key, item]));
      form.querySelectorAll("[data-cart-line]").forEach((line) => {
        const key = line.getAttribute("data-cart-line-key");
        const item = returnedItems.get(key);

        if (!item) {
          line.remove();
          return;
        }

        const quantityInput = line.querySelector("[data-cart-quantity]");
        const priceTarget = line.querySelector("[data-cart-line-price]");
        const compareTarget = line.querySelector("[data-cart-line-compare]");

        if (quantityInput) quantityInput.value = String(item.quantity);
        if (priceTarget) priceTarget.textContent = formatMoney(item.final_line_price);
        if (compareTarget) {
          compareTarget.textContent = formatMoney(item.original_line_price);
          compareTarget.hidden = item.original_line_price === item.final_line_price;
        }
      });

      if (cart.item_count === 0) {
        window.location.href = "/cart";
      }
    };

    const changeCartLine = (key, quantity) => {
      if (!key) return Promise.resolve();

      setLoading(true);
      setStatus("Updating cart...");

      return fetch("/cart/change.js", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({ id: key, quantity }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((payload) => {
              throw new Error(payload.description || payload.message || "Unable to update cart.");
            });
          }
          return response.json();
        })
        .then((cart) => {
          updateCartDom(cart);
          setStatus("Cart updated.");
        })
        .catch((error) => {
          setStatus(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    form.querySelectorAll("[data-cart-remove]").forEach((removeLink) => {
      removeLink.addEventListener("click", (event) => {
        event.preventDefault();
        changeCartLine(removeLink.getAttribute("data-cart-line-key"), 0);
      });
    });

    form.querySelectorAll("[data-cart-quantity]").forEach((input) => {
      input.addEventListener("change", () => {
        window.clearTimeout(quantityTimer);
        quantityTimer = window.setTimeout(() => {
          const quantity = Math.max(0, Number(input.value) || 0);
          input.value = String(quantity);
          changeCartLine(input.getAttribute("data-cart-line-key"), quantity);
        }, 250);
      });
    });

    if (updateButton) {
      updateButton.hidden = true;
    }
  });
});
