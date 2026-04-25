export default {
    brand: "RedS7",
    nav: {
        home: "Home",
        hello: "Hello",
        login: "Login",
        logout: "Logout",
        toggle_theme: "Toggle Theme",
        toggle_lang: "Toggle Language",
        mode_customer: "Customer Mode",
        mode_producer: "Producer Mode",
    },
    sidebar: {
        home: "Main page",
        inventory: "My Inventory",
        orders: "Orders",
        faq: "FAQ",
        profile: "Profile",
    },
    home: {
        title: "Our Masters",
        subtitle: "Choose a professional for your custom project",
        no_producers: "No registered masters found at the moment.",
        no_bio: "No description provided.",
        view_workshop: "Visit Workshop",
        private_workshop: "Private Workshop"
    },
    producer: {
        catalog_title: "Workshop Catalog",
        catalog_subtitle: "Choose ready-made items or make an individual request",
        order_custom: "Order something unique",
        bio_limit: "Short bio",
    },
    profile: {
        settings_title: "Profile Settings",
        edit_title: "Edit Profile",
        customer_title: "Customer Profile",
        about_me: "About Me",
        about_workshop: "About Workshop",
        workshop_name: "Workshop Name",
        payment_methods: "Accepted Payment Methods",
        payment_placeholder: "e.g. Card, Cash, PayPal",
        bio: "Description",
        avatar_url: "Avatar Image URL",
        no_bio: "No description provided yet.",
        no_methods: "Payment methods not specified.",
        save_success: "Profile updated successfully!",
        edit_button: "Edit Profile",
        username: "Username",
        password: "Password",
        upload_avatar: "Update Photo",
    },
    inventory: {
        title: "My Inventory",
        add_item: "Add New Item",
        edit_item: "Edit Item",
        item_name: "Item Name",
        price: "Price",
        delete_confirm: "Are you sure you want to delete this item?",
        add_success: "Item added successfully!",
        update_success: "Item updated successfully!",
    },
    orders: {
        title: "Orders",
        custom_title: "Custom Project Request",
        item_title: "Order Placement",
        step_params: "Item Parameters",
        step_delivery: "Delivery & Contact",
        quantity: "Quantity (pcs)",
        phone: "Phone Number",
        delivery_address: "Delivery Address",
        address_placeholder: "City, post office or street",
        comment: "Order Comment",
        confirm: "Confirm Order",
        success_message: "Order created successfully!",
        custom_project: "Individual Project",
        empty_list: "No orders found.",
        status_updated: "Status updated successfully",
        producer_subtitle: "Manage incoming orders and update their statuses",
        customer_subtitle: "Track your orders and purchase history",
        action: {
            accept: "Accept",
            start: "Start Work",
            ship: "Ship Order",
            complete: "Complete",
        }
    },
    status: {
        pending: "Pending",
        accepted: "Accepted",
        in_progress: "In Progress",
        shipped: "Shipped",
        completed: "Completed",
        cancelled: "Cancelled",
    },
    common: {
        buy: "Order Now",
        edit: "Edit",
        delete: "Delete",
        save: "Save",
        cancel: "Cancel",
        next: "Next",
        currency: "USD",
        loading: "Loading...",
        no_items: "No products found.",
        no_photo: "No photo",
        category: "Category",
        back: "Back",
        delete_success: "Deleted successfully",
    },
    categories: {
        Table: "Tables",
        Chair: "Chairs",
        Wardrobe: "Wardrobes",
        Bed: "Beds",
        Sofa: "Sofas",
        Other: "Other"
    },
    auth: {
        registration_title: "Registration",
        register_button: "Register",
        register_success: "Registration successful! You can now log in.",
        no_account: "Don't have an account?",
        register_link: "Create one",
        have_account: "Already have an account?",
        mode_switched_success: "Mode switched successfully!",
    },
    faq: {
        title: "Frequently Asked Questions",
        questions: {
            how_it_works: {
                question: "How does the furniture ordering work?",
                answer: [
                    "You choose a craftsman in our catalog or browse ready-made items in their workshop.",
                    "You can send an individual request for the manufacture of a unique item.",
                    "After clarifying the details, the master gets to work, and you receive order status updates."
                ]
            },
            payment: {
                question: "What payment methods are available?",
                answer: [
                    "Payment is usually made in installments: a deposit for the purchase of materials and the final payment upon receipt.",
                    "Each master indicates their payment methods (card, cash, or bank transfer) in their profile."
                ]
            },
            delivery: {
                question: "How is delivery carried out?",
                answer: [
                    "Delivery is discussed individually with each master.",
                    "Pickup from the workshop or delivery via popular postal services throughout Ukraine is possible."
                ]
            }
        }
    },

    errors: {
        fetch_producers: "Failed to load the list of masters",
        fetch_profile: "Failed to load profile data",
        update_failed: "Failed to update information",
        order_failed: "Failed to create order",
        profile_not_found: "Profile not found",
        page_not_found: "Page Not Found",
        page_not_found_desc: "It seems this furniture hasn't been assembled yet, or you've followed a broken link.",
        delete_failed: "Failed to delete the item",
        fetch_failed: "Error loading data",
    }
};