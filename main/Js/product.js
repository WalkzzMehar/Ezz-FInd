const showPopupButton = document.getElementById('location-pop');
const closePopupButton = document.querySelector('.closePopupButton');
const popup = document.getElementById('loc-popup');
const overlay = document.getElementById('overlay');

showPopupButton.addEventListener('click', () => {
  popup.style.display = 'block';
  overlay.style.display = 'block';
});

closePopupButton.addEventListener('click', () => {
  popup.style.display = 'none';
  overlay.style.display = 'none';
});

overlay.addEventListener('click', (event) => {
  if (!popup.contains(event.target)) {
    popup.style.display = 'none';
    overlay.style.display = 'none';
  }
});

popup.addEventListener('click', (event) => {
  event.stopPropagation();
});

// Handle zip code form submission
document.querySelector('.closePopupButton').addEventListener('click', function () {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('loc-popup').style.display = 'none';
});

function getCity() {
  const zipCode = document.getElementById('zip').value;
  const zipToCity = {
    '10001': 'New York',
    '94103': 'San Francisco',
    '60601': 'Chicago',
    '90001': 'Los Angeles',
    '73301': 'Austin'
  };

  const city = zipToCity[zipCode];
  const resultElement = document.getElementById('result');

  if (city) {
    document.getElementById('location-pop').innerHTML = `Deliver to: <br>${city}`;
    showSuccessPopup();
  } else {
    resultElement.textContent = `No city found for zip code ${zipCode}.`;
  }

  return false; // Prevent form submission
}

function showSuccessPopup() {
  document.getElementById('loc-popup').style.display = 'none';
  document.getElementById('success-popup').style.display = 'block';

  setTimeout(function () {
    document.getElementById('success-popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
  }, 2000);
}

// Handle shipping country selector
function toggleDropdown() {
  document.getElementById("shiping-dropdown").classList.toggle("show");
}

function selectCountry(country) {
  document.getElementById("countryInput").value = country;
  document.getElementById("shiping-dropdown").classList.remove("show");
}

window.onclick = function(event) {
  if (!event.target.matches('#countryInput') && !event.target.closest('.shiping-dropdown')) {
    var dropdowns = document.getElementsByClassName("shiping-dropdown");
    for (var i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

document.getElementById("countryInput").addEventListener('input', function(event) {
  const dropdown = document.getElementById("shiping-dropdown");
  const filter = event.target.value.toUpperCase();
  const links = dropdown.getElementsByTagName('a');

  let anyVisible = false;
  for (let i = 0; i < links.length; i++) {
    const txtValue = links[i].textContent || links[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      links[i].style.display = "";
      anyVisible = true;
    } else {
      links[i].style.display = "none";
    }
  }
  dropdown.style.display = anyVisible ? "block" : "none";
});



  //search drop down js

  function updatePlaceholder() {
    const searchSelect = document.getElementById('search-select');
    const searchInput = document.getElementById('search-input');
    const selectedOption = searchSelect.options[searchSelect.selectedIndex].text;
    searchInput.placeholder = `Search ${selectedOption}...`;
}




//sub-navbar dropdown js

function toggleDropdown(event) {
    event.preventDefault();
    var dropdownContent = event.currentTarget.nextElementSibling;
    dropdownContent.classList.toggle('show');
}

window.onclick = function(event) {
    if (!event.target.matches('.sub-dropdown-link')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};


//product sliderjs and cart js

document.addEventListener("DOMContentLoaded", function() {
  // Favorite button functionality
  const favoriteBtns = document.querySelectorAll(".favorite-btn");
  favoriteBtns.forEach(btn => {
      btn.addEventListener("click", function() {
          btn.classList.toggle("active");
      });
  });

  // Cart dropdown and item management
  const cartButton = document.getElementById("cartButton");
  const cartDropdown = document.getElementById("cartDropdown");
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  const cartTotalDropdown = document.getElementById("cartTotalDropdown");
  const cartItemCount = document.getElementById("cartItemCount");
  let total = 0;
  let itemCount = 0;
  const cart = {};

  cartButton.addEventListener("click", () => {
      cartDropdown.style.display = cartDropdown.style.display === "none" || !cartDropdown.style.display ? "block" : "none";
  });

  document.querySelectorAll(".add-to-cart").forEach(button => {
      button.addEventListener("click", (e) => {
          const card = button.closest(".product-card");
          const productId = card.getAttribute("data-id");
          const price = parseFloat(card.getAttribute("data-price"));
          const productImage = card.getAttribute("data-image");
          const productInfo = card.querySelector(".card-content-name").textContent;
          const quantityControls = card.querySelector(".quantity-controls");

          button.style.display = "none";
          quantityControls.style.display = "flex";

          if (!cart[productId]) {
              cart[productId] = { info: productInfo, price: price, quantity: 1, image: productImage };
              const listItem = document.createElement("li");
              listItem.setAttribute("data-id", productId);
              listItem.innerHTML = `
                  <img src="${productImage}" alt="${productInfo}" style="width: 25px; height: 25px; vertical-align: middle;">
                  ${productInfo} <span class="item-quantity">(${cart[productId].quantity})</span> - $<span class="item-price">${price.toFixed(2)}</span>
                  <button class="remove-item"><i class="fa-solid fa-xmark"></i></button>
              `;
              cartItems.appendChild(listItem);

              listItem.querySelector(".remove-item").addEventListener("click", () => {
                  itemCount -= cart[productId].quantity;
                  delete cart[productId];
                  quantityControls.style.display = "none";
                  button.style.display = "block";
                  cartItems.removeChild(listItem);
                  updateTotal();
              });

              quantityControls.querySelector(".increment").addEventListener("click", () => {
                  if (cart[productId].quantity < 7) {
                      cart[productId].quantity++;
                      itemCount++;
                      quantityControls.querySelector(".quantity").textContent = cart[productId].quantity;
                      updateCartItem(productId);
                      updateTotal();
                  }
              });

              quantityControls.querySelector(".decrement").addEventListener("click", () => {
                  if (cart[productId].quantity > 1) {
                      cart[productId].quantity--;
                      itemCount--;
                      quantityControls.querySelector(".quantity").textContent = cart[productId].quantity;
                      updateCartItem(productId);
                      updateTotal();
                  } else {
                      itemCount--;
                      delete cart[productId];
                      quantityControls.style.display = "none";
                      button.style.display = "block";
                      cartItems.removeChild(listItem);
                      updateTotal();
                  }
              });

              itemCount++;
              updateTotal();
          } else {
              cart[productId].quantity++;
              itemCount++;
              quantityControls.querySelector(".quantity").textContent = cart[productId].quantity;
              updateCartItem(productId);
              updateTotal();
          }
      });
  });

  window.addEventListener("click", (e) => {
      if (!cartDropdown.contains(e.target) && !cartButton.contains(e.target)) {
          cartDropdown.style.display = "none";
      }
  });

  function updateCartItem(productId) {
      const listItem = cartItems.querySelector(`li[data-id="${productId}"]`);
      const item = cart[productId];
      listItem.querySelector('.item-price').textContent = (item.quantity * item.price).toFixed(2);
      listItem.querySelector('.item-quantity').textContent = `(${item.quantity})`;
  }

  function updateTotal() {
      total = Object.values(cart).reduce((acc, item) => acc + item.price * item.quantity, 0);
      cartTotal.textContent = total.toFixed(2);
      cartTotalDropdown.textContent = total.toFixed(2);
      cartItemCount.textContent = itemCount;
  }

    // Slider functionality
    const productSlider = document.getElementById("uniqueProductSlider");
    const sliderContainer = document.querySelector(".product-slider-container");
    const prevButton = document.getElementById("prevButton2");
    const nextButton = document.getElementById("nextButton2");
    let slideIndex = 0;

    function adjustSlider() {
        const slideWidth = productSlider.querySelector(".product-card").offsetWidth + 20; // Adjusting for margin/padding
        const containerWidth = sliderContainer.offsetWidth;
        const maxSlideIndex = Math.ceil(productSlider.children.length - containerWidth / slideWidth);
        slideIndex = Math.max(0, Math.min(slideIndex, maxSlideIndex));
        productSlider.style.transform = `translateX(${-slideIndex * slideWidth}px)`;
    }

    prevButton.addEventListener("click", function() {
        const slideWidth = productSlider.querySelector(".product-card").offsetWidth + 20; // Adjusting for margin/padding
        slideIndex = Math.max(0, slideIndex - 1);
        productSlider.style.transform = `translateX(${-slideIndex * slideWidth}px)`;
    });

    nextButton.addEventListener("click", function() {
        const slideWidth = productSlider.querySelector(".product-card").offsetWidth + 20; // Adjusting for margin/padding
        const containerWidth = sliderContainer.offsetWidth;
        const maxSlideIndex = Math.ceil(productSlider.children.length - containerWidth / slideWidth);
        slideIndex = Math.min(maxSlideIndex, slideIndex + 1);
        productSlider.style.transform = `translateX(${-slideIndex * slideWidth}px)`;
    });

    window.addEventListener("resize", adjustSlider);
    adjustSlider();
});















