/**
 * 💒 Wedding Card Maker - Event Delegation
 *
 * Sharma ji ki beti ki shaadi ka digital card banana hai! Event delegation
 * use karke dynamic elements handle karo. Ek parent pe listener lagao,
 * aur child elements ke events handle karo. Jaise shaadi mein ek event
 * manager saare kaam coordinate karta hai, waise hi ek parent listener
 * saare child events manage karta hai.
 *
 * Functions:
 *
 *   1. setupGuestList(containerElement)
 *      - Sets up event delegation on containerElement for click events
 *      - Clicking any .remove-btn inside container removes its parent .guest-item
 *      - Returns object with:
 *        addGuest(name, side): creates div.guest-item with:
 *          - data-name attribute = name
 *          - data-side attribute = side ("bride" or "groom")
 *          - span with textContent = name
 *          - button.remove-btn with textContent "Remove"
 *          Appends to container. Returns the created element.
 *        removeGuest(name): finds .guest-item with data-name matching name,
 *          removes it. Returns true if found and removed, false otherwise.
 *        getGuests(): returns array of {name, side} objects from current
 *          .guest-item children in the container
 *      - Agar containerElement null/undefined, return null
 *
 *   2. setupThemeSelector(containerElement, previewElement)
 *      - Creates 3 button.theme-btn elements inside containerElement:
 *        "traditional", "modern", "royal" (textContent and data-theme)
 *      - Event delegation on containerElement: clicking any .theme-btn:
 *        - Sets previewElement.className to the clicked theme name
 *        - Sets previewElement's data-theme attribute to the theme name
 *      - Returns object with:
 *        getTheme(): returns previewElement's current data-theme value or null
 *      - Agar containerElement or previewElement null/undefined, return null
 *
 *   3. setupCardEditor(cardElement)
 *      - Event delegation on cardElement for click events
 *      - Clicking any element with [data-editable] attribute:
 *        - Removes "editing" class and contentEditable from any currently
 *          editing element inside cardElement
 *        - Sets clicked element's contentEditable = "true"
 *        - Adds class "editing" to clicked element
 *      - Clicking on cardElement itself (not on a [data-editable] child):
 *        - Removes "editing" class and contentEditable from any editing element
 *      - Returns object with:
 *        getContent(field): finds element with data-editable=field,
 *          returns its textContent. Returns null if not found.
 *      - Agar cardElement null/undefined, return null
 *
 * Hint: Event delegation means: ek parent pe listener lagao, then
 *   event.target se check karo ki actual click kahan hua. event.target.closest()
 *   use karo parent elements check karne ke liye.
 *
 * @example
 *   const container = document.createElement("div");
 *   const guestList = setupGuestList(container);
 *
 *   guestList.addGuest("Rahul", "groom");
 *   guestList.addGuest("Priya", "bride");
 *   guestList.getGuests();
 *   // => [{ name: "Rahul", side: "groom" }, { name: "Priya", side: "bride" }]
 *
 *   guestList.removeGuest("Rahul"); // => true
 *   guestList.getGuests();
 *   // => [{ name: "Priya", side: "bride" }]
 */
export function setupGuestList(containerElement) {
  // Your code here
  if (!containerElement) return null;

  const handler = (e) => {
    const btn = e.target.closest(".remove-btn");
    if (!btn) return;

    const guestItem = btn.closest(".guest-item");
    if (guestItem) {
      containerElement.removeChild(guestItem);
    }
  };

  containerElement.addEventListener("click", handler);

  return {
    addGuest(name, side) {
      const div = document.createElement("div");
      div.className = "guest-item";
      div.setAttribute("data-name", name);
      div.setAttribute("data-side", side);

      const span = document.createElement("span");
      span.textContent = name;

      const button = document.createElement("button");
      button.className = "remove-btn";
      button.textContent = "Remove";

      div.appendChild(span);
      div.appendChild(button);

      containerElement.appendChild(div);

      return div;
    },

    removeGuest(name) {
      const items = Array.from(
        containerElement.querySelectorAll(".guest-item"),
      );

      const target = items.find((el) => el.getAttribute("data-name") === name);

      if (!target) return false;

      containerElement.removeChild(target);
      return true;
    },

    getGuests() {
      const items = Array.from(
        containerElement.querySelectorAll(".guest-item"),
      );

      return items.map((el) => ({
        name: el.getAttribute("data-name"),
        side: el.getAttribute("data-side"),
      }));
    },
  };
}

export function setupThemeSelector(containerElement, previewElement) {
  // Your code here
  if (!containerElement || !previewElement) return null;

  const themes = ["traditional", "modern", "royal"];

  themes.forEach((theme) => {
    const btn = document.createElement("button");
    btn.className = "theme-btn";
    btn.textContent = theme;
    btn.setAttribute("data-theme", theme);
    containerElement.appendChild(btn);
  });

  const handler = (e) => {
    const btn = e.target.closest(".theme-btn");
    if (!btn) return;

    const theme = btn.getAttribute("data-theme");

    previewElement.className = theme;
    previewElement.setAttribute("data-theme", theme);
  };

  containerElement.addEventListener("click", handler);

  return {
    getTheme() {
      return previewElement.getAttribute("data-theme") || null;
    },
  };
}

export function setupCardEditor(cardElement) {
  // Your code here
   if (!cardElement) return null;

   const handler = (e) => {
     const editable = e.target.closest("[data-editable]");

     // remove existing editing
     const current = cardElement.querySelector(".editing");
     if (current) {
       current.classList.remove("editing");
       current.contentEditable = "false";
     }

     if (editable && cardElement.contains(editable)) {
       editable.contentEditable = "true";
       editable.classList.add("editing");
     }
   };

   cardElement.addEventListener("click", handler);

   return {
     getContent(field) {
       const el = cardElement.querySelector(`[data-editable="${field}"]`);
       if (!el) return null;
       return el.textContent;
     },
   };
}
