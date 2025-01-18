let statuses = [];
let types = [];
let categories = [];
let subcategories = [];

$.get('/api/statuses', (data, textStatus) => {
    statuses = data;
    statuses.forEach(status => {
        $('#status').append(`<option value="${status.id}">${status.name}</option>`)
    });
});
$.get('/api/types', (data, textStatus) => {
    types = data;
    types.forEach(type => {
        $('#type').append(`<option value="${type.id}">${type.name}</option>`)
    });
});
$.get('/api/categories', (data, textStatus) => {
    categories = data;
    $('#type').change(function (){
        const selectedValue = $(this).val();
        $('#subcategory')
            .empty()
            .append(`<option value="">Выберите подкатегорию</option>`);
        $('#category')
            .empty()
            .append(`<option value="">Выберите категорию</option>`);
        categories.forEach(category => {
            if (category.type == selectedValue) {
                $('#category').append(`<option value="${category.id}">${category.name}</option>`)
            }
        });
    });
});
$.get('/api/subcategories', (data, textStatus) => {
    subcategories = data;
    $('#category').change(function () {
        const selectedValue = $(this).val();
        $('#subcategory')
            .empty()
            .append(`<option value="">Выберите подкатегорию</option>`);
        subcategories.forEach(subcategory => {
            if (subcategory.category == selectedValue) {
                $('#subcategory').append(`<option value="${subcategory.id}">${subcategory.name}</option>`)
            }
        });
    });
});
$(document).ready(function () {
    const today = new Date().toISOString().split('T')[0];
    $('#creation-date').val(today);

    $('#create-button').click(function () {
        const creationDate = $('#creation-date').val();
        const status = $('#status').val();
        const type = $('#type').val();
        const category = $('#category').val();
        const subcategory = $('#subcategory').val();
        const sum = $('#amount').val();
        const comment = $('#comment').val();

        if (!amount || !type || !category || !subcategory) {
            alert('Пожалуйста, заполните все обязательные поля: Сумма, Тип, Категория, Подкатегория.');
            return;
        }

        $.post('/api/records/', {
            date: creationDate,
            status: status,
            type: type,
            category: category,
            subcategory: subcategory,
            sum: sum,
            comment: comment
        });
        $('#creation-date').val(today);
        $('#status').val("");
        $('#type').val("");
        $('#category').empty().append(`<option value="">Выберите категорию</option>`);
        $('#subcategory').empty().append(`<option value="">Выберите подкатегорию</option>`);;
        $('#amount').val("");
        $('#comment').val("");
    });

    $('#cancel-button').click(function () {
        window.location.href = '/';
    });
});