const customers = [
    {
        id: "C001",
        name: "ABC Stores",
        creditLimit: 100000,
        currentExposure: 70000,
        overdueAmount: 0,
        risk: "Low"
    },

    {
        id: "C002",
        name: "XYZ Retail",
        creditLimit: 100000,
        currentExposure: 85000,
        overdueAmount: 15000,
        risk: "High"
    },

    {
        id: "C003",
        name: "TechMart",
        creditLimit: 200000,
        currentExposure: 120000,
        overdueAmount: 5000,
        risk: "Medium"
    }
];
const salesOrders = [
    {
        id: "SO1001",
        customerId: "C001",
        material: "Laptop",
        quantity: 10,
        orderValue: 30000,
        status: "Blocked"
    },

    {
        id: "SO1002",
        customerId: "C002",
        material: "Laptop",
        quantity: 20,
        orderValue: 50000,
        status: "Blocked"
    },

    {
        id: "SO1003",
        customerId: "C003",
        material: "Monitor",
        quantity: 15,
        orderValue: 60000,
        status: "Blocked"
    }
];

function displayOrders() {

    const container = document.getElementById("ordersContainer");

    container.innerHTML = "";

    salesOrders.forEach(order => {

        const customer = customers.find(
            customer => customer.id === order.customerId
        );

        const orderCard = document.createElement("div");

        orderCard.className = "order-card";

        orderCard.innerHTML = `
            <div>
                <h3>${order.id}</h3>
                <p><strong>Customer:</strong> ${customer.name}</p>
                <p><strong>Material:</strong> ${order.material}</p>
            </div>

            <div>
                <p><strong>Order Value:</strong> ₹${order.orderValue.toLocaleString()}</p>
                <p><strong>Status:</strong> ${order.status}</p>
            </div>

            <button onclick="reviewOrder('${order.id}')">
                Review
            </button>
        `;

        container.appendChild(orderCard);
    });
}
displayOrders();
updateKPIs();
function displayOrders() {

    const container = document.getElementById("ordersContainer");

    container.innerHTML = "";

   salesOrders
    .filter(order => order.status === "Blocked")
    .forEach(order => {

        const customer = customers.find(
            customer => customer.id === order.customerId
        );

        const orderCard = document.createElement("div");

        orderCard.className = "order-card";

        orderCard.innerHTML = `
            <div>
                <h3>${order.id}</h3>
                <p><strong>Customer:</strong> ${customer.name}</p>
                <p><strong>Material:</strong> ${order.material}</p>
            </div>

            <div>
                <p><strong>Order Value:</strong> ₹${order.orderValue.toLocaleString()}</p>
                <p><strong>Status:</strong> ${order.status}</p>
            </div>

            <button onclick="reviewOrder('${order.id}')">
                Review
            </button>
        `;

        container.appendChild(orderCard);
    });
}
function getCreditDecision(customer, order) {

    const projectedExposure =
        customer.currentExposure + order.orderValue;

    const excessAmount =
        projectedExposure - customer.creditLimit;

    const creditUtilization =
        (projectedExposure / customer.creditLimit) * 100;

    if (projectedExposure <= customer.creditLimit) {

        return {
            decision: "RELEASE",
            message: "Order is within the customer's credit limit.",
            projectedExposure: projectedExposure,
            excessAmount: 0,
            creditUtilization: creditUtilization
        };

    } else {

        return {
            decision: "REVIEW REQUIRED",
            message: "Projected exposure exceeds the customer's credit limit.",
            projectedExposure: projectedExposure,
            excessAmount: excessAmount,
            creditUtilization: creditUtilization
        };
    }
}

displayOrders();
function reviewOrder(orderId) {

    const order = salesOrders.find(
        order => order.id === orderId
    );

    const customer = customers.find(
        customer => customer.id === order.customerId
    );

    const decision = getCreditDecision(customer, order);

    const projectedExposure =
        decision.projectedExposure;

    const creditUtilization =
        decision.creditUtilization;

    const excessAmount =
        decision.excessAmount;

    const reviewContainer =
        document.getElementById("reviewContainer");

        function releaseOrder(orderId) {

    const order = salesOrders.find(
        order => order.id === orderId
    );

    const customer = customers.find(
        customer => customer.id === order.customerId
    );

    const decision = getCreditDecision(customer, order);

    if (decision.projectedExposure > customer.creditLimit) {

        showMessage(
            `❌ Release blocked. Projected exposure is ₹${decision.projectedExposure.toLocaleString()}, which exceeds the customer's credit limit by ₹${decision.excessAmount.toLocaleString()}.`,
            "error"
        );

        return;
    }

    order.status = "Released";

    showMessage(
        `✅ Order ${order.id} has been released successfully.`,
        "success"
    );

    displayOrders();
}

function holdOrder(orderId) {

    const order = salesOrders.find(
        order => order.id === orderId
    );

    order.status = "On Hold";

    showMessage(
        `⏸ Order ${order.id} has been placed on hold.`,
        "success"
    );

    displayOrders();
    const blockedOrders = salesOrders
    .filter(order => order.status === "Blocked")
    .map(order => {

        const customer = customers.find(
            customer => customer.id === order.customerId
        );

        const priority =
            getOrderPriority(customer, order);

        return {
            ...order,
            priorityScore: priority.score,
            priority: priority.priority
        };
    })
    .sort((a, b) => b.priorityScore - a.priorityScore);
}
function escalateOrder(orderId) {

    const reason = prompt(
        "Enter reason for escalation:"
    );

    if (!reason || reason.trim() === "") {

        showMessage(
            "❌ Escalation reason is required.",
            "error"
        );

        return;
    }

    const order = salesOrders.find(
        order => order.id === orderId
    );

    const statusValidation =
        validateStatus(order);

    if (!statusValidation.valid) {

        showMessage(
            `❌ ${statusValidation.message}`,
            "error"
        );

        return;
    }

    order.status = "Escalated";

    order.escalationReason = reason;

    showMessage(
        `⚠ Order ${order.id} has been escalated successfully.`,
        "success"
    );

    displayOrders();
}
function showMessage(message, type) {

    const reviewContainer =
        document.getElementById("reviewContainer");

    const messageBox =
        document.createElement("div");

    messageBox.className = `system-message ${type}`;

    messageBox.textContent = message;

    reviewContainer.prepend(messageBox);
}

    reviewContainer.innerHTML = `

        <div class="review-grid">

            <div>
                <h3>Sales Order</h3>
                <p>${order.id}</p>
            </div>

            <div>
                <h3>Customer</h3>
                <p>${customer.name}</p>
            </div>

            <div>
                <h3>Material</h3>
                <p>${order.material}</p>
            </div>

            <div>
                <h3>Quantity</h3>
                <p>${order.quantity}</p>
            </div>

            <div>
                <h3>Order Value</h3>
                <p>₹${order.orderValue.toLocaleString()}</p>
            </div>

            <div>
                <h3>Credit Limit</h3>
                <p>₹${customer.creditLimit.toLocaleString()}</p>
            </div>

            <div>
                <h3>Current Exposure</h3>
                <p>₹${customer.currentExposure.toLocaleString()}</p>
            </div>

            <div>
                <h3>Projected Exposure</h3>
                <p>₹${projectedExposure.toLocaleString()}</p>
            </div>
            <div>
                <h3>Credit Status</h3>
                <p>${decision.decision}</p>
            </div>
            <div>
                <h3>Excess Amount</h3>
                <p>₹${excessAmount.toLocaleString()}</p>
            </div>

            <div>
                <h3>Credit Utilization</h3>
                <p>${creditUtilization.toFixed(1)}%</p>
            </div>

            <div>
                <h3>Customer Risk</h3>
                <p>${customer.risk}</p>
            </div>

        </div>
        <div class="credit-message">

            <h3>Credit Assessment</h3>

        <p>
               ${decision.message}
        </p>

        </div>
        
        <div class="decision-box">

            <h3>Decision</h3>

            <button onclick="releaseOrder('${order.id}')">
                Release
            </button>

            <button onclick="holdOrder('${order.id}')">
                Hold
            </button>

            <button onclick="escalateOrder('${order.id}')">
                Escalate
            </button>

        </div>
    `;

    document.getElementById("reviewSection")
        .scrollIntoView({
            behavior: "smooth"
        });
}
function validateOrder(order) {

    if (order.quantity <= 0) {
        return {
            valid: false,
            message: "Order quantity must be greater than zero."
        };
    }

    return {
        valid: true,
        message: ""
    };
}
function releaseOrder(orderId) {

    const order = salesOrders.find(
        order => order.id === orderId
    );

    const validation = validateOrder(order);

    if (!validation.valid) {

        showMessage(
            `❌ ${validation.message}`,
            "error"
        );

        return;
    }

    const customer = customers.find(
        customer => customer.id === order.customerId
    );
    const customerValidation =
    validateCustomer(customer);

if (!customerValidation.valid) {

    showMessage(
        `❌ ${customerValidation.message}`,
        "error"
    );

    return;
}

    // remaining code...
    function validateCustomer(customer) {

    if (!customer) {
        return {
            valid: false,
            message: "Customer information is missing."
        };
    }

    return {
        valid: true,
        message: ""
    };
}
}
function validateCreditLimit(customer, order) {

    const projectedExposure =
        customer.currentExposure + order.orderValue;

    if (projectedExposure > customer.creditLimit) {

        const excess =
            projectedExposure - customer.creditLimit;

        return {
            valid: false,
            message:
                `Projected exposure exceeds the credit limit by ₹${excess.toLocaleString()}.`
        };
    }

    return {
        valid: true,
        message: ""
    };
}function validateCreditLimit(customer, order) {

    const projectedExposure =
        customer.currentExposure + order.orderValue;

    if (projectedExposure > customer.creditLimit) {

        const excess =
            projectedExposure - customer.creditLimit;

        return {
            valid: false,
            message:
                `Projected exposure exceeds the credit limit by ₹${excess.toLocaleString()}.`
        };
    }

    return {
        valid: true,
        message: ""
    };
}
function validateStatus(order) {

    if (order.status !== "Blocked") {

        return {
            valid: false,
            message:
                `Order ${order.id} is already ${order.status}.`
        };
    }

    return {
        valid: true,
        message: ""
    };
}
function getRiskRecommendation(customer, order) {

    const projectedExposure =
        customer.currentExposure + order.orderValue;

    const creditUtilization =
        (projectedExposure / customer.creditLimit) * 100;

    let score = 0;
    let reasons = [];

    // Credit limit breach
    if (projectedExposure > customer.creditLimit) {
        score += 40;

        reasons.push(
            `Projected exposure exceeds the credit limit by ₹${(
                projectedExposure - customer.creditLimit
            ).toLocaleString()}`
        );
    }

    // Overdue amount
    if (customer.overdueAmount > 0) {
        score += 20;

        reasons.push(
            `Customer has ₹${customer.overdueAmount.toLocaleString()} overdue`
        );
    }

    // Customer risk
    if (customer.risk === "High") {
        score += 25;

        reasons.push(
            "Customer is classified as high risk"
        );
    }

    // Credit utilization
    if (creditUtilization >= 100) {
        score += 15;

        reasons.push(
            `Credit utilization would reach ${creditUtilization.toFixed(1)}%`
        );
    }

    let recommendation;

    if (score >= 60) {
        recommendation = "HOLD";
    } else if (score >= 40) {
        recommendation = "ESCALATE";
    } else {
        recommendation = "RELEASE";
    }

    return {
        score,
        recommendation,
        reasons
    };
}
function updateKPIs() {

    const blockedOrders = salesOrders.filter(
        order => order.status === "Blocked"
    );

    const blockedValue = blockedOrders.reduce(
        (total, order) => total + order.orderValue,
        0
    );

    const highRiskOrders = blockedOrders.filter(order => {

        const customer = customers.find(
            customer => customer.id === order.customerId
        );

        return customer && customer.risk === "High";
    });

    document.getElementById("blockedOrders").textContent =
        blockedOrders.length;

    document.getElementById("blockedValue").textContent =
        `₹${blockedValue.toLocaleString()}`;

    document.getElementById("highRiskOrders").textContent =
        highRiskOrders.length;
}
function getOrderPriority(customer, order) {

    const projectedExposure =
        customer.currentExposure + order.orderValue;

    const creditUtilization =
        (projectedExposure / customer.creditLimit) * 100;

    let score = 0;

    if (projectedExposure > customer.creditLimit) {
        score += 40;
    }

    if (customer.risk === "High") {
        score += 30;
    } else if (customer.risk === "Medium") {
        score += 15;
    }

    if (customer.overdueAmount > 0) {
        score += 20;
    }

    if (creditUtilization >= 100) {
        score += 10;
    }

    let priority;

    if (score >= 70) {
        priority = "High";
    } else if (score >= 40) {
        priority = "Medium";
    } else {
        priority = "Low";
    }

    return {
        score: score,
        priority: priority
    };
}