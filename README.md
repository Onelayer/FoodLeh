**Proposed Level of Achievement:** Apollo 11


**Motivation**

Through the growing rise of “smart kitchens” in Singapore, we realise there are small food and beverage companies that have to rely on FoodPanda and Grab to deliver food. In this case, “smart kitchens” refer to those who do not own a storefront but just a central kitchen that focuses on self-collection and/or delivery only. This may harm their business as they would have to pay up to 30-40% of revenue per food item to the aforementioned food delivery services in order to list their menu on their Apps. Moreover, small local food and beverage companies usually do not have a website for their frequent or potential customers to visit to obtain information about their operations. As for those who have a website, they are of bare minimum and only display the basic information such as the address of the shop and the operating hours, making the websites unintuitive and not frequented by many.


**Aim**

Our aim is to create an interactive website that food and beverage companies can use as a platform to not only inform but also to attract customers to their restaurant or cafe. Customers can also use it to order food for self-collection for instance, especially for “smart kitchens”.


**User stories:**

   1. Users will be able to see the details of the company, like its location, contact number, menu and pictures of different food, put together in a cohesive design and is        intuitive to use.


   2. Users will be able to use the website to pay and order food for self-collection and delivery.


   3. Users will be able to log in and have their own account (membership system). They will then have access to special promotions and receive credit when they buy food.


**Scope of Project:**

1. Our website consists of two components, the interface for the customer side and the interface for the hawker side.
    a) For the customer side, there will be user interface with a front page which will contain buttons to access different hawker centres. Each hawker centre will have its          own page, where it will contain hawker stores. Customers can then choose the store they want, and enter the page. Here, they can order using the menu and make choices        such as the size of the food and add these food to the cart. When they are ready to checkout, they can go over the the checkout page and checkout. A receipt will be          generated and give them an estimated time for them to collect their food from the store. The order data will be written in firebase realtime database.

    b) For the hawker side, there will be a login page where they can register for an account using the register page before login in. After login in, they will be able to          access the dashboard. Here, orders from the realtime database is read here for the hawker to see their customer's orders. The hawker can then get the food ready for          the customer. There will be a tick box for the customer to tick after they have collected the payment and passed over the food. Orders are cleared daily.
    
2. Tech stack
    - HTML, CSS, Javascript
    - Vue.js
    - Firebase
    - Bootstrap

3. Timeline

    a) Features to be completed by end June:
         - Dashboard for store-owners.
         - Menu system for an individual store.
         - Integrate an ordering system.
    
    b) Features to be completed by end July:
         - Expand to multiple stores per hawker centre and multiple hawker centres.


**How are we different from similar platforms?**

   - While we are unable to compete with big names like grabfood and foodpanda, we plan for our code to be open-sourced for hawker centre owners to used to help out the            hawkers. This will greatly reduce hawkers reliance on grabfood and foodpanda and able to improve their profit margins.

