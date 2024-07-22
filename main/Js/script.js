
//preloader

$(document).ready(function(){
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(500).fadeOut("slow");
    });
  });













//bg-img slider js

const myslide = document.querySelectorAll('.bg-slider-1'),
dot = document.querySelectorAll('.dot');

let counter = 1;
slidefun(counter);

let timer = setInterval(autoslide, 8000)
function autoslide() {
    counter += 1;
    slidefun(counter);
}
function plusSlides(n) {
    counter += n;
    slidefun(counter);
    resetTimer();
}
function currentSlide(n) {
    counter = n;
    slidefun(counter);
    resetTimer();
}
function resetTimer() {
    clearInterval(timer);
    timer = setInterval(autoslide, 8000)
}

function slidefun(n) {
    let i;
    for(i = 0;i<myslide.length;i++){
        myslide[i].style.display = "none";
    }
    for(i = 0;i<dot.length;i++){
       dot[i].classList.remove('active');
    }
    if(n > myslide.length) {
        counter = 1;
    }
    if(n < 1){
        counter = myslide.length;
    }
    myslide[counter - 1].style.display = "block";
    dot[counter - 1].classList.add('active');

}


// location pop up
const showPopupButtons = document.querySelectorAll('#location-pop, #loc-done'); 
const closePopupButton = document.querySelector('.closePopupButton');
const popup = document.getElementById('loc-popup');
const overlay = document.getElementById('overlay');

// Add event listeners to both buttons
showPopupButtons.forEach(button => {
  button.addEventListener('click', () => {
    popup.style.display = 'block';
    overlay.style.display = 'block';
  });
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



  



//main slider first

document.addEventListener("DOMContentLoaded", function() {
    const slider = document.getElementById('slider');
    const slides = slider.querySelectorAll('.product');
    const slideCount = slides.length;
    let currentIndex = 0;

    function updateSliderPosition() {
        const slideWidth = slides[0].clientWidth + 20; // 20px margin
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSliderPosition();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSliderPosition();
    }

    document.getElementById("prevButton1").addEventListener("click", prevSlide);
    document.getElementById("nextButton1").addEventListener("click", nextSlide);
});











//img slider js code

document.addEventListener('DOMContentLoaded', () => {
    const thirdSlide = document.getElementById('thirdSlide');
    const thirdImages = document.querySelectorAll('#thirdSlide .img-container');
    const prevBtn3 = document.getElementById('prev-btn3');
    const nextBtn3 = document.getElementById('next-btn3');
    const thirdScrollbarThumb = document.getElementById('thirdScrollbarThumb');
  
    let currentIndex3 = 0;
    const totalImages3 = thirdImages.length;
    const visibleImages3 = 6; 
  
    for (let i = 0; i < visibleImages3; i++) {
      thirdSlide.appendChild(thirdImages[i].cloneNode(true));
      thirdSlide.insertBefore(thirdImages[totalImages3 - 1 - i].cloneNode(true), thirdSlide.firstChild);
    }
  
    const updatedThirdImages = document.querySelectorAll('#thirdSlide .img-container');
    const updatedTotalImages3 = updatedThirdImages.length;
  
    currentIndex3 = visibleImages3;
  
    const updateThirdSlider = () => {
      thirdSlide.style.transition = 'transform 0.5s ease-in-out';
      thirdSlide.style.transform = `translateX(-${currentIndex3 * 100 / visibleImages3}%)`;
      thirdScrollbarThumb.style.width = `${(currentIndex3 % totalImages3) * 100 / totalImages3}%`;
    };
  
    const checkThirdIndex = () => {
      if (currentIndex3 >= updatedTotalImages3 - visibleImages3) {
        thirdSlide.style.transition = 'none';
        currentIndex3 = visibleImages3;
        thirdSlide.style.transform = `translateX(-${currentIndex3 * 100 / visibleImages3}%)`;
      } else if (currentIndex3 <= 0) {
        thirdSlide.style.transition = 'none';
        currentIndex3 = updatedTotalImages3 - 2 * visibleImages3;
        thirdSlide.style.transform = `translateX(-${currentIndex3 * 100 / visibleImages3}%)`;
      }
    };
  
    prevBtn3.addEventListener('click', () => {
      currentIndex3--;
      updateThirdSlider();
    });
  
    nextBtn3.addEventListener('click', () => {
      currentIndex3++;
      updateThirdSlider();
    });
  
    thirdSlide.addEventListener('transitionend', checkThirdIndex);
  
    thirdSlide.style.transform = `translateX(-${currentIndex3 * 100 / visibleImages3}%)`;
  });
  






















  






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
    const slider = document.getElementById('slider');
    const slides = slider.querySelectorAll('.product');
    const slideCount = slides.length;
    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID = 0;

    slides.forEach(slide => {
        const clone = slide.cloneNode(true);
        slider.appendChild(clone);
    });

    function updateSliderPosition() {
        const slideWidth = slides[0].clientWidth + 20; // 20px margin
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSliderPosition();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        updateSliderPosition();
    }

    const productSlider = document.getElementById("uniqueProductSlider");
    const sliderContainer = document.querySelector(".product-slider-container");
    let slideIndex = 0;

    window.addEventListener("resize", () => {
        adjustSlider();
    });

    function adjustSlider() {
        const slideWidth = productSlider.querySelector(".product-card").offsetWidth;
        const containerWidth = sliderContainer.offsetWidth;
        const maxSlideIndex = Math.ceil(productSlider.children.length - containerWidth / slideWidth);
        slideIndex = Math.max(0, Math.min(slideIndex, maxSlideIndex));
        productSlider.style.transform = `translateX(${-slideIndex * slideWidth}px)`;
    }

    window.prevProductSlide = function() {
        const slideWidth = productSlider.querySelector(".product-card").offsetWidth;
        slideIndex = Math.max(0, slideIndex - 1);
        productSlider.style.transform = `translateX(${-slideIndex * slideWidth}px)`;
    };

    window.nextProductSlide = function() {
        const slideWidth = productSlider.querySelector(".product-card").offsetWidth;
        const containerWidth = sliderContainer.offsetWidth;
        const maxSlideIndex = Math.ceil(productSlider.children.length - containerWidth / slideWidth);
        slideIndex = Math.min(maxSlideIndex, slideIndex + 1);
        productSlider.style.transform = `translateX(${-slideIndex * slideWidth}px)`;
    };

    adjustSlider();
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
    





//hidden card 
document.addEventListener("DOMContentLoaded", function() {
    const loadMoreButton = document.getElementById("loadMore");
    const loadLessButton = document.getElementById("loadLess");
    const hiddenCards = document.querySelectorAll(".card.hidden");

    loadMoreButton.addEventListener("click", function() {
        let visibleCount = 0;
        for (let card of hiddenCards) {
            if (visibleCount < 8) {
                card.classList.remove("hidden");
                visibleCount++;
            }
        }
        loadMoreButton.classList.add("hidden");
        loadLessButton.classList.remove("hidden");
    });

    loadLessButton.addEventListener("click", function() {
        for (let card of hiddenCards) {
            card.classList.add("hidden");
        }
        loadMoreButton.classList.remove("hidden");
        loadLessButton.classList.add("hidden");
    });
});






document.addEventListener("DOMContentLoaded", function() {
    const prevPageButton = document.getElementById("prevPage");
    const nextPageButton = document.getElementById("nextPage");
    const pageNumber = document.getElementById("pageNumber");
    let currentPage = 1;
    const totalPages = 100; // Adjust as needed

    prevPageButton.addEventListener("click", function() {
        if (currentPage > 1) {
            currentPage--;
            updatePageNumber();
        }
    });

    nextPageButton.addEventListener("click", function() {
        if (currentPage < totalPages) {
            currentPage++;
            updatePageNumber();
        }
    });

    function updatePageNumber() {
        pageNumber.textContent = `Page ${currentPage} of ${totalPages}`;
    }
});















// mystore js


document.addEventListener('DOMContentLoaded', () => {
    const storeForm = document.getElementById('store-form');
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');

    // Handle store creation form submission
    storeForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const storeName = document.getElementById('store-name').value;
        const storeDescription = document.getElementById('store-description').value;

        // Display store creation details (this can be extended to save to a backend)
        alert(`Store created successfully!\nName: ${storeName}\nDescription: ${storeDescription}`);
        storeForm.reset();
    });

    // Handle product form submission
    productForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const productLink = document.getElementById('product-link').value;

        // Mock function to fetch product details from a URL
        const fetchProductDetails = async (url) => {
            // This function should be replaced with actual code to fetch product details from the URL
            // Here we return mock data for demonstration purposes
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        name: 'Sample Product',
                        description: 'This is a sample product description.',
                        price: 19.99,
                        imageUrl: 'https://via.placeholder.com/150',
                        source: 'Famous Website'
                    });
                }, 1000);
            });
        };

        fetchProductDetails(productLink).then(productDetails => {
            // Create a new product item element
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
                <div class="product-image">
                    <img src="${productDetails.imageUrl}" alt="${productDetails.name}">
                </div>
                <div class="product-details">
                    <h3>${productDetails.name}</h3>
                    <p>${productDetails.description}</p>
                    <p>Price: $${productDetails.price}</p>
                    <p>Source: ${productDetails.source}</p>
                </div>
            `;

            // Append the product item to the product list
            productList.appendChild(productItem);

            // Clear form fields
            productForm.reset();
            alert('Product added successfully!');
        });
    });
});


     





























    let dropdownBtn = document.getElementById("drop-text");
let list = document.getElementById("list");
let icon = document.getElementById("icon");
let span = document.getElementById("span");
let input = document.getElementById("search");
let listItems = document.querySelectorAll(".dropdown-list-item");

dropdownBtn.onclick = function () {
    if(list.classList.contains('show')) {
        icon.style.rotate = "0deg";
}else{
    icon.style.rotate = "-180deg";
}
    list.classList.toggle("show");
    
};

window.onclick = function (e) {
if (
    e.target.id !== "drop-text" &&
    e.target.id !== "span" &&
    e.target.id !== "icon" 
) {
    list.classList.remove("show");

    icon.style.rotate = "0deg";
}
};

for (item of listItems) {
    item.onclick = function (e) {
        span.innerText = e.target.innerText;
if(e.target.innerText == "All") {
input.placeholder = "Search Anything...";
}else{
        input.placeholder = "Search in " + e.target.innerText + "...";
    }
    };
}








