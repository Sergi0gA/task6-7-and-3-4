const navigation = document.querySelector(".desktop-nav");
const topSection = document.querySelector(".app-header__top-section");
const fullHeader = document.querySelector(".app-header");

const threeLineCheckbox = document.querySelector(".three-line-checkbox");
const lines = document.querySelectorAll(".line");
const dropoutNames = ["products", "profserv", "events", "support"];
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
threeLineCheckbox.addEventListener("change", () => {
  if (threeLineCheckbox.checked) {
    lines[0].style.transform = "translateY(6px) rotate(45deg) scaleX(1.2)";
    lines[1].style.transform = "scale(0)";
    lines[2].style.transform = "translateY(-6px) rotate(-45deg) scaleX(1.2)";
  } else {
    lines[0].style.transform = "";
    lines[1].style.transform = "";
    lines[2].style.transform = "";
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

threeLineCheckbox.addEventListener("change", () => {
  if (threeLineCheckbox.checked) {
    topSection.style.backgroundColor = "#fff";
    topSection.style.boxShadow =
      "0 0 6px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.08)";

    navigation.classList.add("unhidden");
  } else {
    topSection.style.backgroundColor = "";
    topSection.style.boxShadow = "";

    navigation.classList.remove("unhidden");
  }
});

const accordionHeaders = document.querySelectorAll(".desktop-nav__list-header");

accordionHeaders.forEach((header) => {
  const checkbox = header.querySelector(".hidden-checkbox");
  const content = header.nextElementSibling;
  const accordionName = header.querySelector(".desktop-nav__header-name");
  const accordionArrow = header.querySelector("svg");

  checkbox.addEventListener("change", () => {
    content.style.maxHeight = checkbox.checked ? "3000px" : "";
    accordionName.style.color = checkbox.checked ? "#ff0032" : "";
    accordionArrow.style.transform = checkbox.checked ? "rotate(-180deg)" : "";
    accordionArrow.style.color = checkbox.checked ? "#ff0032" : "";
  });
});

const treeAccordionHeaders = document.querySelectorAll(
  ".tree-accordion-header"
);

treeAccordionHeaders.forEach((treeHeader) => {
  const treeCheckbox = treeHeader.querySelector(".checkbox-tree-accordion");
  const treeContent = treeHeader.nextElementSibling;
  const verticalLine = treeHeader.querySelector(".vertical-line");

  treeCheckbox.addEventListener("change", () => {
    if (treeCheckbox.checked) {
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

function handleCheckboxChange(event) {
  const checkbox = event.target;
  const header = checkbox.closest(".desktop-nav__list-header");
  const accordionAction = header.querySelector("svg");
  const isChecked = checkbox.checked;

  accordionAction.style.transform = isChecked ? "rotate(-180deg)" : "";
  accordionAction.style.color = isChecked ? "#ff0032" : "";
  topSection.style.backgroundColor = isChecked ? "#fff" : "";
  navigation.style.backgroundColor = isChecked ? "#fff" : "";
  fullHeader.style.boxShadow = isChecked
    ? "0 0 16px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.08)"
    : "";
}

function isBigScreen() {
  if (window.innerWidth > 1281) {
    accordionHeaders.forEach((header) => {
      const checkbox = header.querySelector(".hidden-checkbox");
      const isChecked = checkbox.checked;

      if (isChecked) {
        topSection.style.backgroundColor = "#fff";
      }
    });

    dropoutNames.forEach((name) => {
      const accordion = document.querySelector(`.${name}-dropout`);
      accordion.dataset.name = name;

      accordion.addEventListener("change", showMenu);

      accordionHeaders.forEach((header) => {
        const checkbox = header.querySelector(".hidden-checkbox");

        checkbox.addEventListener("change", handleCheckboxChange);
      });
    });

    function changeMenuSection() {
      radioNames.forEach((radioName) => {
        const content = document.querySelector(
          `.base-menu-content-${radioName}`
        );
        if (content) {
          content.style.display = "none";
        }
      });

      radioNames.forEach((radioName) => {
        const radio = document.querySelector(`.big-menu-${radioName}-radio`);
        const content = document.querySelector(
          `.base-menu-content-${radioName}`
        );

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
  } else {
    if (threeLineCheckbox.checked) {
      topSection.style.backgroundColor = "#fff";
      topSection.style.boxShadow =
        "0 0 6px rgba(0,0,0,.08),0 4px 16px rgba(0,0,0,.08)";
    } else {
      topSection.style.backgroundColor = "#f2f3f7";
    }

    dropoutNames.forEach((name) => {
      document
        .querySelector(`.${name}-dropout`)
        .removeEventListener("change", showMenu);
    });

    accordionHeaders.forEach((header) => {
      const checkbox = header.querySelector(".hidden-checkbox");

      checkbox.removeEventListener("change", handleCheckboxChange);
    });
  }
}

isBigScreen();

window.addEventListener("resize", isBigScreen);
