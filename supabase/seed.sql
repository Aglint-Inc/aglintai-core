select
    vault.create_secret(
        'http://127.0.0.1:3000',
        'APP_URL',
        'This is the APP_URL'
    );