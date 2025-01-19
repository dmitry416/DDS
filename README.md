## Движение денежных средств (DDS)
### Инструкция по запуску
#### Установка зависимостей
Убедитесь, что у вас установлен Python 3.8 или выше. Затем установите зависимости:
```shell
pip install -r requirements.txt
```

#### Настройка базы данных
Примените миграции для создания таблиц в базе данных:
```shell
python manage.py migrate
```

#### Загрузите начальные данные (опционально)
Если вам нужно заполнить базу данных начальными данными (статусами, типами, категориями и подкатегориями), выполните:
```shell
python manage.py loaddata initial_data.json
```

#### Запуск веб-сервиса
```shell
python manage.py runserver
```
По умолчанию веб-сервис будет доступен по адресу: http://127.0.0.1:8000/

## API

### Status

GET /api/statuses/ — список всех статусов.

GET /api/statuses/{id}/ — детали конкретного статуса.

POST /api/statuses/ — создание нового статуса.

PUT /api/statuses/{id}/ — обновление статуса.

DELETE /api/statuses/{id}/ — удаление статуса.

### Type

<b>GET</b> /api/types/ — список всех типов.

<b>GET</b> /api/types/{id}/ — детали конкретного типа.

<b>POST</b> /api/types/ — создание нового типа.

<b>PUT</b> /api/types/{id}/ — обновление типа.

<b>DELETE</b> /api/types/{id}/ — удаление типа.

### Category

<b>GET</b> /api/categories/ — список всех категорий.

<b>GET</b> /api/categories/{id}/ — детали конкретной категории.

<b>POST</b> /api/categories/ — создание новой категории.

<b>PUT</b> /api/categories/{id}/ — обновление категории.

<b>DELETE</b> /api/categories/{id}/ — удаление категории.

### SubCategory

<b>GET</b> /api/subcategories/ — список всех подкатегорий.

<b>GET</b> /api/subcategories/{id}/ — детали конкретной подкатегории.

<b>POST</b> /api/subcategories/ — создание новой подкатегории.

<b>PUT</b> /api/subcategories/{id}/ — обновление подкатегории.

<b>DELETE</b> /api/subcategories/{id}/ — удаление подкатегории.

### Record

<b>GET</b> /api/records/ — список всех записей.

<b>GET</b> /api/records/{id}/ — детали конкретной записи.

<b>POST</b> /api/records/ — создание новой записи.

<b>PUT</b> /api/records/{id}/ — обновление записи.

<b>DELETE</b> /api/records/{id}/ — удаление записи.