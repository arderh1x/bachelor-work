export default {
    brand: "RedS7",
    common: {
        save: "Зберегти",
        cancel: "Скасувати",
        edit: "Редагувати",
        delete: "Видалити",
        next: "Далі",
        back: "Назад",
        loading: "Завантаження...",
        no_photo: "Фото відсутнє",
        currency: "грн",
        category: "Категорія",
        buy: "Купити",
        no_items: "Товарів не знайдено",
        delete_success: "Видалено успішно",
    },

    nav: {
        home: "Головна",
        login: "Увійти",
        logout: "Вийти",
        toggle_theme: "Змінити тему",
        toggle_lang: "Змінити мову",
        mode_toggle: "Змінити режим",
        mode_customer: "Режим замовника",
        mode_producer: "Режим виробника",
    },

    theme: {
        light: "Світла тема",
        dark: "Темна тема",
    },

    sidebar: {
        home: "Головна сторінка",
        inventory: "Мій інвентар",
        orders: "Замовлення",
        faq: "FAQ",
        settings: "Налаштування",
        profile: "Профіль",
    },

    auth: {
        registration_title: "Реєстрація",
        login_title: "Вхід",
        register_button: "Зареєструватися",
        register_success: "Реєстрація успішна!",
        mode_switched_success: "Режим успішно змінено",
        mode_switched_error: "Помилка при зміні режиму",
        have_account: "Вже маєте акаунт?",
        no_account: "Немає акаунту?",
        register_link: "Створити акаунт",
    },

    home: {
        title: "Наші виробники",
        subtitle: "Оберіть професіонала для вашого індивідуального проекту",
        no_producers: "Наразі не знайдено жодного зареєстрованого виробника.",
        no_bio: "Опис відсутній.",
        view_workshop: "Відвідати майстерню",
    },

    profile: {
        settings_title: "Налаштування профілю",
        edit_title: "Редагувати профіль",
        customer_title: "Профіль покупця",
        username: "Ім'я користувача",
        password: "Пароль",
        about_me: "Про мене",
        about_workshop: "Про майстерню",
        workshop_name: "Назва майстерні",
        avatar_url: "Посилання на аватар",
        bio: "Біографія / Опис",
        no_bio: "Біографія відсутня",
        payment_methods: "Методи оплати",
        payment_placeholder: "Наприклад: Картка Monobank, Готівка при зустрічі",
        no_methods: "Методи оплати не вказані",
        producer_mode: "Режим виробника",
        edit_button: "Редагувати профіль",
        save_success: "Профіль успішно оновлено",
        payment: "Допустимі методи оплати",
    },

    inventory: {
        title: "Мій інвентар",
        add_item: "Додати виріб",
        edit_item: "Редагувати виріб",
        item_name: "Назва виробу",
        price: "Ціна",
        description: "Опис виробу",
        image_url: "Посилання на фото",
        update_success: "Дані оновлено",
        add_success: "Виріб додано",
        delete_confirm: "Ви впевнені, що хочете видалити цей виріб?",
    },

    orders: {
        title: "Замовлення",
        producer_subtitle: "Запити від клієнтів",
        customer_subtitle: "Ваші замовлення",
        item_title: "Виріб",
        custom_title: "Індивідуальне замовлення",
        custom_project: "Спецпроект",
        quantity: "Кількість",
        phone: "Номер телефону",
        phone_placeholder: "+380...",
        delivery_address: "Адреса доставки",
        address_placeholder: "Місто, відділення пошти...",
        comment: "Коментар до замовлення",
        confirm: "Підтвердити замовлення",
        success_message: "Замовлення успішно створено!",
        status_updated: "Статус замовлення оновлено",
        empty_list: "Список замовлень порожній",
        step_params: "Параметри",
        step_delivery: "Доставка",
        action: {
            accept: "Прийняти",
            start: "Почати роботу",
            ship: "Відправити",
            complete: "Завершити",
        }
    },

    status: {
        pending: "Очікує",
        accepted: "Прийнято",
        in_progress: "В роботі",
        shipped: "Відправлено",
        completed: "Виконано",
        cancelled: "Скасовано",
    },

    categories: {
        Table: "Столи",
        Chair: "Стільці",
        Wardrobe: "Шафи",
        Bed: "Ліжка",
        Sofa: "Дивани",
        Other: "Інше",
    },

    producer: {
        catalog_title: "Каталог майстерні",
        catalog_subtitle: "Оберіть готові вироби або зробіть індивідуальний запит",
        order_custom: "Замовити унікальний виріб",
    },

    faq: {
        title: "Часті запитання",
        questions: {
            how_it_works: {
                question: "Як зробити замовлення?",
                answer: [
                    "Оберіть виробника в списку на головній сторінці.",
                    "Перейдіть у його каталог та оберіть виріб або натисніть 'Замовити унікальний виріб'.",
                    "Заповніть контактні дані та чекайте підтвердження."
                ]
            },
            payment: {
                question: "Які способи оплати доступні?",
                answer: [
                    "Оплата зазвичай здійснюється частинами: завдаток та фінальний розрахунок.",
                    "Методи оплати вказані в профілі кожного виробника."
                ]
            },
            delivery: {
                question: "Як здійснюється доставка?",
                answer: [
                    "Доставка обговорюється індивідуально.",
                    "Можливий самовивіз або відправка поштовими службами."
                ]
            }
        }
    },

    errors: {
        fetch_producers: "Не вдалося завантажити список виробників",
        fetch_profile: "Помилка завантаження даних профілю",
        fetch_failed: "Помилка завантаження даних",
        update_failed: "Не вдалося оновити інформацію",
        order_failed: "Помилка при створенні замовлення",
        profile_not_found: "Профіль не знайдено",
        page_not_found: "Сторінку не знайдено",
        page_not_found_desc: "Схоже, ці меблі ще не зібрали.",
        delete_failed: "Не вдалося видалити",
        register_failed: "Помилка при реєстрації",
    },
};