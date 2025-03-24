// init isotope
var $grid = $('.collection-list').isotope({
    // options
});
// filter items on button click
$('.filter-button-group').on('click', 'button', function() {
    var filterValue = $(this).attr('data-filter');
    
    resetFilterBtns();
    $(this).addClass('active-filter-btn');
    $grid.isotope({ filter: filterValue });
});

var filterBtns = $('.filter-button-group').find('button');
function resetFilterBtns(){
    filterBtns.each(function(){
        $(this).removeClass('active-filter-btn');
    });
}
// end of isotope


// add to cart
// Function to handle adding items to the cart
function addToCart(productName, productPrice) {
    // Retrieve the cart from local storage or initialize it if not present
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Create a new item object
    const newItem = {
        name: productName,
        price: parseFloat(productPrice),
    };

    // Add the new item to the cart
    cart.push(newItem);

    // Save the updated cart back to local storage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Update the cart count badge
    updateCartCount();

    // Notify the user
    alert(`${productName} has been added to your cart!`);
}

// Function to update the cart count badge
function updateCartCount() {
    // Retrieve the cart from local storage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Get the cart count badge element
    const cartCountBadge = document.querySelector('.fa-shopping-cart + .position-absolute');

    // Update the badge's text with the cart's length
    cartCountBadge.textContent = cart.length;
}

// Function to display the cart items in a modal
function showCart() {
    // Retrieve the cart from local storage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Get the cart items container
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Clear previous items

    // Check if the cart is empty
    if (cart.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.className = 'list-group-item text-center';
        emptyMessage.textContent = 'Your cart is empty.';
        cartItemsContainer.appendChild(emptyMessage);
    } else {
        // Populate the cart items
        cart.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;

            cartItemsContainer.appendChild(listItem);
        });
    }

    // Show the modal (using Bootstrap's modal functionality)
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

// Add event listeners to the "Add to Cart" buttons
document.querySelectorAll('.btn.btn-primary.mt-3').forEach(button => {
    button.addEventListener('click', function () {
        // Get the product details from the current item's container
        const productElement = this.closest('.col-md-6.col-lg-4.col-xl-3.p-2');
        const productName = productElement.querySelector('.text-center p').textContent.trim();
        const productPrice = productElement.querySelector('.text-center .fw-bold').textContent.trim().replace('$', '');

        // Add the item to the cart
        addToCart(productName, productPrice);
    });
});

// Add event listener to the cart icon button
document.querySelector('.fa-shopping-cart').closest('button').addEventListener('click', showCart);

// Initialize the cart count badge on page load
updateCartCount();

// end of cart