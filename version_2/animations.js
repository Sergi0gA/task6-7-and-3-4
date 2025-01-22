const navigation = document.querySelector(".desktop-nav");
const topSection = document.querySelector(".app-header__top-section");
const fullHeader = document.querySelector(".app-header");

const threeLineCheckbox = document.querySelector(".three-line-button-input");
const lines = document.querySelectorAll(".line");
const dropoutNames = ["products", "profserv", "events", "support"];
let dropoutCheckers = {
  "products-dropout": false,
  "profserv-dropout": false,
  "events-dropout": false,
  "support-dropout": false,
};
const radioNames = [
  "iaas",
  "saas",
  "dbaas",
  "secaas",
  "naas",
  "ai",
  "consulting",
  "outsourcing",
  "custom",
];
let radioCheckers = {
  "iaas-accordion": false,
  "saas-accordion": false,
  "dbaas-accordion": false,
  "secaas-accordion": false,
  "naas-accordion": false,
  "ai-accordion": false,
  "consulting-accordion": false,
  "outsourcing-accordion": false,
  "custom-accordion": false,
};
let threeLineClicked = false;
threeLineCheckbox.addEventListener("click", () => {
  threeLineClicked = !threeLineClicked;
  if (threeLineClicked) {
    lines[0].style.transform = "translateY(6px) rotate(45deg) scaleX(1.2)";
    lines[1].style.transform = "scale(0)";
    lines[2].style.transform = "translateY(-6px) rotate(-45deg) scaleX(1.2)";
    topSection.style.backgroundColor = "#fff";
    topSection.style.boxShadow =
      "0 0 6px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.08)";
    topSection.style.backgroundColor = "#fff";
    navigation.classList.add("unhidden");
  } else {
    lines[0].style.transform = "";
    lines[1].style.transform = "";
    lines[2].style.transform = "";
    topSection.style.boxShadow = "";
    topSection.style.backgroundColor = "#f2f3f7";
    navigation.classList.remove("unhidden");
  }
});

const buttons = document.querySelectorAll(".mws-button");
buttons.forEach((button) => {
  button.addEventListener("mouseover", () => {
    button.style.transform = "scale(1.02)";
  });
  button.addEventListener("mouseout", () => {
    button.style.transform = "scale(1)";
  });
  button.addEventListener("mousedown", () => {
    button.style.transform = "scale(0.98)";
  });
  button.addEventListener("mouseup", () => {
    button.style.transform = "scale(1.02)";
  });
});

const accordionHeaders = document.querySelectorAll(".desktop-nav__list-header");

const treeAccordionHeaders = document.querySelectorAll(
  ".tree-accordion-header"
);

treeAccordionHeaders.forEach((treeHeader) => {
  const treeButton = treeHeader.querySelector(".tree-open-button");
  const id = treeButton.id;
  const treeContent = treeHeader.nextElementSibling;
  const verticalLine = treeHeader.querySelector(".vertical-line");

  treeButton.addEventListener("click", () => {
    radioCheckers[id] = !radioCheckers[id];
    if (radioCheckers[id]) {
      treeContent.style.maxHeight = "3000px";
      verticalLine.style.transform = "rotate(0)";
    } else {
      treeContent.style.maxHeight = "";
      verticalLine.style.transform = "";
    }
  });
});

function showMenu(event) {
  const accordion = event.target;
  const menu = document.querySelector(`.${accordion.dataset.name}-menu`);

  if (accordion.checked) {
    menu.classList.add("active-menu");
  } else {
    menu.classList.remove("active-menu");
  }
}

function resetButtons() {
  Object.keys(dropoutCheckers).forEach((key) => (dropoutCheckers[key] = false));
  document.querySelectorAll(".dropout-menu").forEach((menu) => {
    menu.classList.remove("active-menu");
  });

  document.querySelectorAll(".desktop-nav__list-header").forEach((header) => {
    const accordionName = header.querySelector(".desktop-nav__header-name");
    const accordionArrow = header.querySelector("svg");
    const content = header.nextElementSibling;
    content.style.maxHeight = "";
    accordionName.style.color = "";
    accordionArrow.style.transform = "";
    accordionArrow.style.color = "";
  });
}

dropoutNames.forEach((name) => {
  const dropoutButton = document.querySelector(`.${name}-dropout`);

  dropoutButton.addEventListener("click", () => {
    dropoutCheckers[`.${name}-dropout`] = !dropoutCheckers[`.${name}-dropout`];
    const menu = document.querySelector(`.${name}-menu`);
    const isClicked = dropoutCheckers[`.${name}-dropout`];
    const header = dropoutButton.parentElement;
    const content = header.nextElementSibling;
    const accordionName = header.querySelector(".desktop-nav__header-name");
    const accordionArrow = header.querySelector("svg");
    if (isClicked) {
      resetButtons();
      dropoutCheckers[`.${name}-dropout`] = true;
      menu.classList.add("active-menu");
      content.style.maxHeight = "3000px";
      accordionName.style.color = "#ff0032";
      accordionArrow.style.transform = "rotate(-180deg)";
      accordionArrow.style.color = "#ff0032";
    } else {
      menu.classList.remove("active-menu");
      content.style.maxHeight = "";
      accordionName.style.color = "";
      accordionArrow.style.transform = "";
      accordionArrow.style.color = "";
    }

    topSection.style.backgroundColor = isClicked ? "#fff" : "";
    navigation.style.backgroundColor = isClicked ? "#fff" : "";
    fullHeader.style.boxShadow = isClicked
      ? "0 0 16px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.08)"
      : "";
  });
});

function changeMenuSection() {
  radioNames.forEach((radioName) => {
    const content = document.querySelector(`.base-menu-content-${radioName}`);
    if (content) {
      content.style.display = "none";
    }
  });

  radioNames.forEach((radioName) => {
    const radio = document.querySelector(`.big-menu-${radioName}-radio`);
    const content = document.querySelector(`.base-menu-content-${radioName}`);

    if (radio && radio.checked && content) {
      content.style.display = "block";
    }
  });
}

changeMenuSection();

radioNames.forEach((radioName) => {
  const radio = document.querySelector(`.big-menu-${radioName}-radio`);
  if (radio) {
    radio.addEventListener("change", changeMenuSection);
  }
});

const bigMenuLabels = document.querySelectorAll(".big-menu-label");

bigMenuLabels.forEach((label) => {
  const radio = label.previousElementSibling;

  function styleSections() {
    bigMenuLabels.forEach((label) => {
      label.style.backgroundColor = label.previousElementSibling.checked
        ? "#1d2023"
        : "#fff";
      label.style.color = label.previousElementSibling.checked
        ? "#fafafa"
        : "#1d2023";
    });
  }

  styleSections();

  radio.addEventListener("change", () => {
    styleSections();
    if (!radio.checked) {
      label.style.backgroundColor = "#fff";
      label.style.color = "#1d2023";
    }
  });
});
