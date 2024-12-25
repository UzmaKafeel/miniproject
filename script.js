// Add 
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const itemIdInput = document.getElementById('item-id');
    const itemNameInput = document.getElementById('item-name');
    const quantityInput = document.getElementById('quantity');
    const costInput = document.getElementById('cost');
    const sellingInput = document.getElementById('selling');
  
    form.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent form submission
  
      // Validate inputs
      const itemId = itemIdInput.value.trim();
      const itemName = itemNameInput.value.trim();
      const quantity = parseInt(quantityInput.value, 10);
      const costPrice = parseFloat(costInput.value);
      const sellingPrice = parseFloat(sellingInput.value);
  
      if (!itemId || !itemName || isNaN(quantity) || quantity <= 0 || isNaN(costPrice) || costPrice <= 0 || isNaN(sellingPrice) || sellingPrice <= 0) {
        alert('Please fill in all fields with valid values.');
        return;
      }
  
      // Calculate profit margin
      const profitMargin = sellingPrice - costPrice;
  
      // Display success message
      alert(`Item "${itemName}" (ID: ${itemId}) has been added successfully!\nQuantity: ${quantity}\nCost Price: ₹${costPrice.toFixed(2)}\nSelling Price: ₹${sellingPrice.toFixed(2)}\nProfit Margin: ₹${profitMargin.toFixed(2)}`);
  
      // Reset form fields
      form.reset();
    });
  });
  

  //Sales
  document.addEventListener('DOMContentLoaded', () => {
    const totalSalesElement = document.querySelector('.sales-container h2:nth-of-type(1) + p');
    const todaysSalesElement = document.querySelector('.sales-container h2:last-of-type + p');
    const inputs = document.querySelectorAll('.sales-container input');
    const soldButton = document.querySelector('.sales-container button');
  
    let totalSales = 0; // Keeps track of total sales
    let todaysSales = 0; // Keeps track of today's sales
  
    soldButton.addEventListener('click', () => {
      const productIdOrName = inputs[0].value.trim();
      const quantitySold = parseInt(inputs[1].value, 10);
      const soldPrice = parseFloat(inputs[2].value);
  
      // Validate input
      if (!productIdOrName || isNaN(quantitySold) || quantitySold <= 0 || isNaN(soldPrice) || soldPrice <= 0) {
        alert('Please provide valid input for all fields.');
        return;
      }
  
      // Update sales data
      const saleAmount = quantitySold * soldPrice;
      totalSales += saleAmount;
      todaysSales += saleAmount;
  
      // Update UI
      totalSalesElement.textContent = `₹ ${totalSales.toFixed(2)}`;
      todaysSalesElement.textContent = `${todaysSales}`;
  
      // Display confirmation
      alert(`Product "${productIdOrName}" sold successfully!\nQuantity: ${quantitySold}\nTotal Sale Amount: ₹${saleAmount.toFixed(2)}`);
  
      // Reset input fields
      inputs.forEach(input => input.value = '');
    });
  });
  

  
  //Stock
  // Get the current date
  const today = new Date();

  // Format the date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = today.toLocaleDateString('en-US', options);

  // Display the date on the page
  document.getElementById('current-date').textContent = ` ${formattedDate}`;


  document.addEventListener("DOMContentLoaded", () => {
    // Data structure to track the stock
    const stockData = {};

    // DOM elements
    const totalStockCostElement = document.querySelector(".stock-card h2");
    const stockQuantityElement = document.querySelectorAll(".stock-card ul li")[0];
    const stockRateElement = document.querySelectorAll(".stock-card ul li")[1];
    const stockMRPElement = document.querySelectorAll(".stock-card ul li")[2];

    const addItemForm = document.querySelector("form");
    const itemIdInput = document.querySelector("#item-id");
    const itemNameInput = document.querySelector("#item-name");
    const quantityInput = document.querySelector("#quantity");
    const costInput = document.querySelector("#cost");
    const sellingInput = document.querySelector("#selling");

    const soldButton = document.querySelector(".sales-container button");
    const productIdInput = document.querySelector('input[placeholder="Product ID/Name"]');
    const quantitySoldInput = document.querySelector('input[placeholder="Quantity sold"]');

    // Function to update the stock display
    const updateStockDisplay = (itemId) => {
        const item = stockData[itemId];
        if (item) {
            const totalStockCost = item.quantity * item.costPrice;
            totalStockCostElement.textContent = `Total Stock Cost: ₹${totalStockCost.toFixed(2)}`;
            stockQuantityElement.textContent = `Quantity: ${item.quantity}`;
            stockRateElement.textContent = `Rate: ₹${item.costPrice.toFixed(2)}`;
            stockMRPElement.textContent = `M.R.P.: ₹${item.sellingPrice.toFixed(2)}`;
        } else {
            totalStockCostElement.textContent = "Total Stock Cost: ₹0.00";
            stockQuantityElement.textContent = "Quantity: 0";
            stockRateElement.textContent = "Rate: ₹0.00";
            stockMRPElement.textContent = "M.R.P.: ₹0.00";
        }
    };

    // Add new item to the stock
    addItemForm.addEventListener("submit", (event) => {
        event.preventDefault();  // Prevent the form from submitting
        const itemId = itemIdInput.value.trim();
        const itemName = itemNameInput.value.trim();
        const quantity = parseInt(quantityInput.value, 10);
        const costPrice = parseFloat(costInput.value);
        const sellingPrice = parseFloat(sellingInput.value);

        if (!itemId || !itemName || isNaN(quantity) || quantity <= 0 || isNaN(costPrice) || costPrice <= 0 || isNaN(sellingPrice) || sellingPrice <= 0) {
            alert("Please enter valid item details.");
            return;
        }

        // Add item to stockData
        if (!stockData[itemId]) {
            stockData[itemId] = {
                name: itemName,
                quantity: quantity,
                costPrice: costPrice,
                sellingPrice: sellingPrice
            };
        } else {
            stockData[itemId].quantity += quantity;
        }

        // Reset form
        itemIdInput.value = "";
        itemNameInput.value = "";
        quantityInput.value = "";
        costInput.value = "";
        sellingInput.value = "";

        // Update stock display for the newly added item
        updateStockDisplay(itemId);
    });

    // Function to handle sale and reduce stock
    soldButton.addEventListener("click", () => {
        const productId = productIdInput.value.trim();
        const quantitySold = parseInt(quantitySoldInput.value, 10);

        if (!productId || isNaN(quantitySold) || quantitySold <= 0) {
            alert("Please enter valid sale details.");
            return;
        }

        const item = stockData[productId];

        if (!item || item.quantity < quantitySold) {
            alert("Not enough stock available.");
            return;
        }

        // Reduce the stock
        item.quantity -= quantitySold;

        // Reset sale inputs
        productIdInput.value = "";
        quantitySoldInput.value = "";

        // Update stock display
        updateStockDisplay(productId);
    });
});

  
  
  // Record
  document.addEventListener("DOMContentLoaded", () => {
    const salesData = {
        daily: {
            totalSales: 0,
            totalProfit: 0
        },
        monthly: {
            totalSales: 0,
            totalProfit: 0
        },
        runningAverageSale: 0,
        saleCount: 0
    };

    // DOM elements
    const totalSaleElement = document.querySelector(".sales-container p");
    const todaysSaleElement = document.querySelector(".sales-container p:nth-child(4)");
    const runningAvgElement = document.querySelector(".report-summary p");
    const dailySalesElement = document.querySelectorAll(".report-details .daily .card p");
    const monthlySalesElement = document.querySelectorAll(".report-details .monthly .card p");

    const soldButton = document.querySelector(".sales-container button");
    const productIdInput = document.querySelector('input[placeholder="Product ID/Name"]');
    const quantitySoldInput = document.querySelector('input[placeholder="Quantity sold"]');
    const priceSoldInput = document.querySelector('input[placeholder="Product sold at (Price)"]');

    // Function to update the reports
    const updateReports = () => {
        totalSaleElement.textContent = `₹ ${salesData.daily.totalSales.toFixed(2)}`;
        todaysSaleElement.textContent = `₹ ${salesData.daily.totalSales.toFixed(2)}`;
        runningAvgElement.textContent = `Running Average Sale: ₹ ${salesData.runningAverageSale.toFixed(2)}`;
        
        // Update daily report
        dailySalesElement[0].textContent = `₹ ${salesData.daily.totalSales.toFixed(2)}`;
        dailySalesElement[1].textContent = `₹ ${salesData.daily.totalProfit.toFixed(2)}`;
        
        // Update monthly report
        monthlySalesElement[0].textContent = `₹ ${salesData.monthly.totalSales.toFixed(2)}`;
        monthlySalesElement[1].textContent = `₹ ${salesData.monthly.totalProfit.toFixed(2)}`;
    };

    // Function to handle sale recording
    soldButton.addEventListener("click", () => {
        const productId = productIdInput.value.trim();
        const quantitySold = parseInt(quantitySoldInput.value, 10);
        const priceSoldAt = parseFloat(priceSoldInput.value);

        if (!productId || isNaN(quantitySold) || isNaN(priceSoldAt) || quantitySold <= 0 || priceSoldAt <= 0) {
            alert("Please enter valid sale details.");
            return;
        }

        const totalSaleAmount = quantitySold * priceSoldAt;
        const costPrice = 0; // Replace with actual cost price from the inventory
        const profit = totalSaleAmount - costPrice;

        // Update daily data
        salesData.daily.totalSales += totalSaleAmount;
        salesData.daily.totalProfit += profit;

        // Update monthly data
        salesData.monthly.totalSales += totalSaleAmount;
        salesData.monthly.totalProfit += profit;

        // Calculate running average sale
        salesData.saleCount += 1;
        salesData.runningAverageSale = salesData.daily.totalSales / salesData.saleCount;

        // Clear input fields
        productIdInput.value = "";
        quantitySoldInput.value = "";
        priceSoldInput.value = "";

        // Update the reports
        updateReports();
    });

    // Initial call to update the reports
    updateReports();
});

  


  //Registration
        const registrationForm = document.getElementById('registrationForm');
        const errorMessage = document.getElementById('errorMessage');

        registrationForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                errorMessage.textContent = "Passwords do not match.";
                return;
            }

            // Submit the form data to the server (using AJAX)
            // ... (replace with your server-side logic) ...

            // Redirect to a success page
            window.location.href = "success.html"; // Replace with the actual success page URL
        });
     

    