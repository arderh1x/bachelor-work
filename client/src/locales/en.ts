export default {
    brand: "RedS7",
    common: {
        save: "Save",
        cancel: "Cancel",
        edit: "Edit",
        delete: "Delete",
        next: "Next",
        back: "Back",
        loading: "Loading...",
        no_photo: "No photo",
        currency: "UAH",
        category: "Category",
        buy: "Buy",
        no_items: "No items found",
        delete_success: "Deleted successfully",
    },

    nav: {
        home: "Home",
        login: "Login",
        logout: "Logout",
        toggle_theme: "Toggle Theme",
        toggle_lang: "Toggle Language",
        mode_toggle: "Toggle Mode",
        mode_customer: "Customer Mode",
        mode_producer: "Producer Mode",
    },

    theme: {
        light: "Light Mode",
        dark: "Dark Mode",
    },

    sidebar: {
        home: "Main page",
        inventory: "My Inventory",
        orders: "Orders",
        faq: "FAQ",
        settings: "Settings",
        profile: "Profile",
    },

    auth: {
        registration_title: "Registration",
        login_title: "Login",
        register_button: "Register",
        register_success: "Registration successful!",
        mode_switched_success: "Mode switched successfully",
        mode_switched_error: "Error switching mode",
        have_account: "Already have an account?",
        no_account: "No account?",
        register_link: "Create account",
    },

    home: {
        title: "Our Producers",
        subtitle: "Choose a professional for your custom project",
        no_producers: "No registered producers found at the moment.",
        no_bio: "No description provided.",
        view_workshop: "Visit Workshop",
    },

    profile: {
        settings_title: "Profile Settings",
        edit_title: "Edit Profile",
        customer_title: "Customer Profile",
        username: "Username",
        password: "Password",
        about_me: "About Me",
        about_workshop: "About Workshop",
        workshop_name: "Workshop Name",
        avatar_url: "Avatar URL",
        bio: "Bio / Description",
        no_bio: "No bio provided",
        payment_methods: "Payment Methods",
        payment_placeholder: "E.g.: Card, Cash on delivery",
        no_methods: "No payment methods specified",
        producer_mode: "Producer Mode",
        edit_button: "Edit Profile",
        save_success: "Profile updated successfully",
        verified_producer: "Verified producer",
    },

    inventory: {
        title: "My Inventory",
        add_item: "Add Item",
        edit_item: "Edit Item",
        item_name: "Item Name",
        price: "Price",
        description: "Description",
        image_url: "Image URL",
        update_success: "Item updated",
        add_success: "Item added",
        delete_confirm: "Are you sure you want to delete this item?",
    },

    orders: {
        title: "Orders",
        producer_subtitle: "Client requests",
        customer_subtitle: "Your orders",
        item_title: "Item",
        custom_title: "Custom Order",
        custom_project: "Special Project",
        quantity: "Quantity",
        phone: "Phone Number",
        phone_placeholder: "+380...",
        delivery_address: "Delivery Address",
        address_placeholder: "City, post office...",
        comment: "Comment",
        confirm: "Confirm Order",
        success_message: "Order created successfully!",
        status_updated: "Status updated",
        empty_list: "Order list is empty",
        step_params: "Parameters",
        step_delivery: "Delivery",
        action: {
            accept: "Accept",
            start: "Start Work",
            ship: "Ship",
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

    categories: {
        Table: "Tables",
        Chair: "Chairs",
        Wardrobe: "Wardrobes",
        Bed: "Beds",
        Sofa: "Sofas",
        Other: "Other",
    },

    producer: {
        catalog_title: "Workshop Catalog",
        catalog_subtitle: "Choose ready-made items or make an individual request",
        order_custom: "Order custom furniture",
    },

    faq: {
        title: "FAQ",
        questions: {
            how_it_works: {
                question: "How to order?",
                answer: [
                    "Select a producer on the main page.",
                    "Go to their catalog and choose an item.",
                    "Fill in your contact info and wait for confirmation."
                ]
            },
            payment: {
                question: "Payment methods?",
                answer: [
                    "Usually a deposit and final payment.",
                    "Check the producer's profile for details."
                ]
            },
            delivery: {
                question: "How about delivery?",
                answer: [
                    "Discussed individually with the producer.",
                    "Pickup or shipping is available."
                ]
            }
        }
    },

    errors: {
        fetch_producers: "Failed to load producers list",
        fetch_profile: "Failed to load profile data",
        fetch_failed: "Error loading data",
        update_failed: "Failed to update information",
        order_failed: "Failed to create order",
        profile_not_found: "Profile not found",
        page_not_found: "Page Not Found",
        page_not_found_desc: "It seems this link is no more valid.",
        delete_failed: "Failed to delete",
        register_failed: "Registration failed",
    },
};